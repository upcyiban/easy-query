<template>
  <v-layout>
      <v-flex xs12>
          <table class="scores-table" border="0" :data="sItems(semesterItems)">
                <tr>
                  <th>课程名</th>
                  <th>类型</th>
                  <th>成绩</th>
                </tr>
                <tr v-for="(score, index) in scoresps" :key="index">
                  <td>{{score.KCMC}}</td>
                  <td>{{score.kclbmc}}</td>
                  <td>{{score.zcj}}</td>
                </tr>
            </table>
      </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "scores",
  computed: {
    ...mapState("dataFetch/scoresControl", ["semesterItems", "scoresps"]),
    ...mapState("dataFetch/auth",["authed"])
  },
  methods: {
    ...mapActions("appShell/appHeader", [
      "setAppHeader",
      "setSelectorItems",
      "setSelected"
    ]),
    ...mapActions("appShell/appBottomNavigator", [
      "showBottomNav",
      "activateBottomNav"
    ]),
    ...mapActions("dataFetch/scoresControl", [
      "fetchScores",
      "setActiveSemester"
    ]),
    ...mapActions("dataFetch/auth",[
      "toAuth"
    ]),
    sItems(items) {
      // if (items.length > 0) {
      //   console.log(items)
      //   this.setSelectorItems(items);
      //   this.setSelected(items[0]);
      // }
    }
  },
  async asyncData() {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 500);
    });
  },
  activated() {
    this.setAppHeader({
      show: true,
      title: "成绩",
      showMenu: true,
      showBack: false,
      showLogo: true,
      showSelector: true,
      showSelectDialog: false,
      selectorAction: {
        items: [],
        action: this.setActiveSemester
      }
      // actions: [
      //     {
      //         icon: 'search',
      //         route: '/search'
      //     }
      // ]
    });

    this.activateBottomNav("scores");
    this.showBottomNav();
    if (!this.authed && !this.$route.query.vq) {
      window.location = process.env.REDIRECT_URL;
    } else if (!this.authed && this.$route.query.vq) {
      this.toAuth(this.$route.query.vq).then(authed => {
        console.log(authed);
        if (authed) {
          this.fetchScores().then(data => {
            let items = new Set();
            data.map(v => {
              items.add(v.xnxqm);
            });
            items = Array.from(items);
            items = items.map(v => ({ text: v, value: v }));
            console.log(items);
            this.setSelectorItems(items);
            this.setSelected(items[0].value);
          });
        } else {
          console.log("auth failed");
        }
      });
    }
    if(this.authed){
      this.fetchScores().then(data => {
            let items = new Set();
            data.map(v => {
              items.add(v.xnxqm);
            });
            items = Array.from(items);
            items = items.map(v => ({ text: v, value: v }));
            console.log(items);
            this.setSelectorItems(items);
            this.setSelected(items[0].value);
          });
    }
  }
};
</script>
<style lang="stylus">
.scores-table {
  width: 100%;

  tr {
    & th {
      background: #f5f5f5;
      height: 36px;
    }

    th:nth-child(1) {
      width: 40%;
    }

    th:nth-child(2) {
      width: 30%;
    }

    th:nth-child(3) {
      width: 30%;
    }

    td:nth-child(1) {
      width: 40%;
    }

    td:nth-child(2) {
      width: 30%;
    }

    td:nth-child(3) {
      width: 30%;
    }

    & td {
      height: 35px;
    }
  }
}
</style>
