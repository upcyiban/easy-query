<template>
  <v-layout fluid  row  justify-center>
      <v-flex d-flex xs12 sm6 style="padding-top:5px" class="elevation-1">
          <v-layout column>
              <v-flex>
                    <v-card color="grey lighten-4" class="elevation-0" height="30px"></v-card>
                    <v-card text-xs-center v-for="i in 12" :key="i" color="grey lighten-4" class="elevation-0" style="height:60px">{{i}}</v-card>
              </v-flex>
          </v-layout>
            <v-layout v-for="(dayc,index) in table" style="width:12.5%" :key="index" column>
                <v-flex xs12 sm12 offset-sm0>
                    <v-card color="grey lighten-4" class="elevation-0" height="30px" style="line-height:30px;">周{{weekn[index]}}</v-card>
                    <v-card text-xs-center v-for="(c, i) in dayc" :key="i" :color="c.color" :height="60*c.count+'px'" class="card_text elevation-0">
                        <v-card-text class="px-0 white--text">
                            {{c.class.KCMC}} <br/>
                            @{{c.class.JXDD}}
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
      </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data: ()=>({
        weekn:['一','二','三','四','五','六','日']
    }),
  computed:{
      ...mapState('dataFetch/scheduleControl',[
          'table'
      ])
  }
}
</script>
