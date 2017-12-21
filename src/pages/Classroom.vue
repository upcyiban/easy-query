<template>
 <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="purple darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">南教</div>
            </v-card-title>
            <v-card-text>
                {{classroom.njLists}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card color="purple darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">南堂</div>
            </v-card-title>
            <v-card-text>
                {{classroom.ntLists}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card color="purple darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">东环</div>
            </v-card-title>
            <v-card-text>
                {{classroom.dhLists}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card color="purple darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">西环</div>
            </v-card-title>
            <v-card-text>
                {{classroom.xhLists}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card color="purple darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">东廊</div>
            </v-card-title>
            <v-card-text>
                {{classroom.dlLists}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card color="purple darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">西廊</div>
            </v-card-title>
            <v-card-text>
                {{classroom.xlLists}}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import {mapActions,mapState} from 'vuex';
export default {
    name: 'classroom',
    props: {},
    computed:{
        ...mapState('appShell/appHeader',[
            'selectDialogAction'
        ]),
        ...mapState('dataFetch/classroomControl',[
            'classroom'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav',
            'activateBottomNav'
        ]),
        ...mapActions('dataFetch/classroomControl',[
            'fetchClassroom'
        ])
    },
    async asyncData() {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '自习教室',
            showMenu: true,
            showBack: false,
            showLogo: true,
            showSelector: false,
            showSelectDialog: true,
            selectDialogAction: {
                week:0,day:0,n:0,
                action:this.fetchClassroom
            }
        });

        this.activateBottomNav('classroom');
        this.showBottomNav();
        this.fetchClassroom({
            week:this.selectDialogAction.week,
            day:this.selectDialogAction.day,
            n:this.selectDialogAction.n}
        )
    }
}
</script>
