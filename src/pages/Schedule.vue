<template>
  <schedule-table></schedule-table>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import ScheduleTable from '@/components/ScheduleTable'
export default {
    name: 'schedule',
    props: {},
    components:{
        ScheduleTable
    },
    computed:{
        ...mapState('dataFetch/scheduleControl',[
            'table'
        ]),
        ...mapState('dataFetch/auth',[
            'authed'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader',
            "setSelectorItems",
            "setSelected"
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav',
            'activateBottomNav'
        ]),
        ...mapActions('dataFetch/scheduleControl',[
            'fetchSchedule',
            'setActiveWeek'
        ]),
        ...mapActions('dataFetch/auth',[
            'toAuth'
        ]),
    },
    async asyncData() {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
    },
    activated() {
        let items = []
        for(let i = 1; i < 26; i++){items.push({text:`第${i}周`,value:i})}
        this.setSelectorItems(items)
        this.setSelected(items[0])
        this.setAppHeader({
            show: true,
            title: '课表',
            showMenu: true,
            showBack: false,
            showLogo: true,
            showSelector: true,
            showSelectDialog: false,
            selectorAction:{
                selected:1,
                items: items,
                action:this.setActiveWeek
            }
            // actions: [
            //     {
            //         icon: 'search',
            //         route: '/search'
            //     }
            // ]
        });
        
        this.activateBottomNav('schedule');
        this.showBottomNav();
        if(!this.authed && !this.$route.query.verify_request){
            window.location = process.env.REDIRECT_URL
        }else if(!this.authed && this.$route.query.verify_request){
            this.toAuth(this.$route.query.verify_request).then((authed)=>{
                // console.log(authed)
                if(authed){
                    this.fetchSchedule();
                }else{
                    console.error('auth failed')
                }
            })
        }
        if(this.authed){ this.fetchSchedule(); }
    }
}
</script>
