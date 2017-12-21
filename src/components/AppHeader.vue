<template>
    <transition
        name="slide-down">
        <header class="app-header-wrapper" v-show="show">
            <div class="app-header-left">
                <v-btn
                    icon
                    dark
                    v-if="showMenu"
                    @click.native="handleClick('menu')">
                    <v-icon class="app-header-icon">menu</v-icon>
                </v-btn>
                <v-btn
                    icon
                    v-if="showBack"
                    @click.native="handleClick('back')">
                    <v-icon class="app-header-icon">arrow_back</v-icon>
                </v-btn>
                <div v-if="showLogo" @click="handleClick('logo')">
                    <slot name="logo">
                        <icon v-if="logoIcon" :name="logoIcon" class="app-header-icon"></icon>
                    </slot>
                </div>
            </div>
            <div class="app-header-middle" v-cloak>
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
            <div :style="selectorWidth(showSelector,selectorAction.items)">
                    <v-select
                    v-bind:items="selectorAction.items"
                    v-model="selectorAction.selected"
                    v-if="showSelector"
                    @input="handleSelectChange()"
                    label="    "
                    color="white"
                    item-text="text"
                    item-value="value"
                    single-line
                    bottom
                    dark
                ></v-select>
                </div>
            <v-btn color="primary" v-if="showSelectDialog" dark @click.native.stop="dialog = true">选择时间</v-btn>
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                  <v-card-title>
                      上课时间
                  </v-card-title>
                <v-card-text>
                    <v-select
                    v-bind:items="weeksItems"
                    label="选择周数"
                    item-text="text"
                    item-value="value"
                    v-model="week"
                    ></v-select>{{week}}
                    <v-select
                    v-bind:items="daysItems"
                    label="选择星期"
                    item-text="text"
                    item-value="value"
                    v-model="day"
                    ></v-select>{{day}}
                    <v-select
                    v-bind:items="nItems"
                    label="选择上课时间"
                    item-text="text"
                    item-value="value"
                    v-model="n"
                    ></v-select>{{n}}
                </v-card-text>
                <v-card-actions>
                  <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">取消</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click.native="handleSelectDialogConfirm">确定</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div class="app-header-right">
                <slot name="actions"
                    v-for="(action, actionIdx) in actions"
                    :icon="action.icon"
                    :route="action.route">
                    <v-btn
                        icon
                        dark
                        @click.native="handleClick('action', {actionIdx, route: action.route})">
                        <icon v-if="action.svg" :name="action.svg" class="app-header-icon"></icon>
                        <v-icon v-else-if="action.icon" class="app-header-icon">{{ action.icon }}</v-icon>
                    </v-btn>
                </slot>
            </div>
        </header>
    </transition>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import EventBus from '@/event-bus';

export default {
    name: 'appHeader',
    data:()=>({
        dialog : false,
        weeksItems : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map((v,i)=>({text:`第${v}周`,value:i+1})),
        daysItems : ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'].map((v,i)=>({text:v,value:i+1})),
        nItems : [1,2,3,4,5,6,7,8,9,10,11].map((v,i)=>({text:`第${v}小节`,value:i+1})),
        week:0,
        day:0,
        n:0
            }),
    computed: {
        ...mapState('appShell/appHeader', [
            'show',
            'showMenu',
            'showBack',
            'showLogo',
            'logoIcon',
            'title',
            'actions',
            'showSelector',
            'selectorAction',
            'showSelectDialog',
            'selectDialogAction'
        ]),
        ...mapState('appShell', [
            'isPageSwitching'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader',[
            'setSelected',
            'setSelectDialogAction'
        ]),
        selectorWidth(show,items){
            if(!show) return 'width:0'
            if(items.length>0){
                return `width:${items[0].text.length+4}em`
            }else{
                return 'width:6em'
            }
        },
        /**
         * 处理按钮点击事件
         *
         * @param {string} source 点击事件源名称 menu/logo/action
         * @param {Object} data 随点击事件附带的数据对象
         */
        handleClick(source, {actionIdx, route} = {}) {

            // 页面正在切换中，不允许操作，防止滑动效果进行中切换
            if (this.isPageSwitching) {
                return;
            }
            let eventData = {};

            // 点击右侧动作按钮，事件对象中附加序号
            if (source === 'action') {
                eventData.actionIdx = actionIdx;
            }

            // 发送给父组件，内部处理
            this.$emit(`click-${source}`, eventData);

            // 发送全局事件，便于非父子关系的路由组件监听
            EventBus.$emit(`app-header:click-${source}`, eventData);

            // 如果传递了路由对象，进入路由
            if (route) {
                this.$router.push(route);
            }
        },
        handleSelectChange(){
            this.setSelected(this.selectorAction.selected)
            this.selectorAction.action(this.selectorAction.selected)
        },
        handleSelectDialogConfirm(){
            this.dialog = false
            this.setSelectDialogAction({week:this.week,day:this.day,n:this.n})
            this.selectDialogAction.action({week:this.week,day:this.day,n:this.n})
        }

    }
};
</script>

<style lang="stylus" scoped>

$btn-color = #fff

.app-header-wrapper
    display flex
    justify-content space-between
    align-items center
    height $app-header-height
    background: $theme.primary
    color $btn-color
    padding 0
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
    transition transform 0.3s ease-out

    &.slide-down-enter,
    &.slide-down-leave-to
        transform translate(0, -100%)

    & > div
        display flex
        align-items center

    .app-header-middle
        flex 1
        font-size 1.2em


    // 改变 icon 大小
    .app-header-icon
        color $btn-color
        width 20px
        height 20px

</style>
