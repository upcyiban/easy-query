/**
 * @file app shell store
 * @author wulei123(1534563365@qq.com)
 */

import * as types from '../mutation-types';

let state = {

    /**
     * 是否需要页面切换动画
     *
     * @type {boolean}
     */
    needPageTransition: true,

    /**
     * 多个页面是否处于切换中
     *
     * @type {boolean}
     */
    isPageSwitching: false,

    /**
     * 多个页面切换效果名称
     *
     * @type {string}
     */
    pageTransitionName: '',

    /**
     * 上个页面 scroll 的信息
     *
     * @type {Object}
     */
    historyPageScrollTop: {}
};

let actions = {

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    enablePageTransition({commit}) {
        commit(types.ENABLE_PAGE_TRANSITION, true);
    },

    /**
     * 关闭页面切换动画
     *
     * @param {Function} commit commit
     */
    disablePageTransition({commit}) {
        commit(types.DISABLE_PAGE_TRANSITION, false);
    },

    /**
     * 设置页面是否处于切换中
     *
     * @param {Function} commit commit
     * @param {boolean} isPageSwitching isPageSwitching
     */
    setPageSwitching({commit}, isPageSwitching) {
        commit(types.SET_PAGE_SWITCHING, isPageSwitching);
    },

    /**
     * 保存页面 scroll 高度
     *
     * @param {[type]} options.commit [description]
     * @param {string} options.path path
     * @param {number} options.scrollTop scrollTop
     */
    saveScrollTop({commit}, {path, scrollTop}) {
        commit(types.SAVE_SCROLLTOP, {path, scrollTop});
    }
};

let mutations = {
    [types.SET_PAGE_SWITCHING](state, isPageSwitching) {
        state.isPageSwitching = isPageSwitching;
    },
    [types.SET_PAGE_TRANSITION_NAME](state, {pageTransitionName}) {
        state.pageTransitionName = pageTransitionName;
    },
    [types.SAVE_SCROLLTOP](state, {path, scrollTop}) {
        state.historyPageScrollTop[path] = scrollTop;
    }
};

export default {
    namespaced: true,
    /* eslint-disable */
    actions,
    mutations,
    state,
    /* eslint-enable */
    modules: {

        /**
         * 顶部导航栏的数据
         *
         * @type {Object}
         */
        appHeader: {
            namespaced: true,
            state: {

                /**
                 * 是否展示顶部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 标题内容
                 *
                 * @type {string}
                 */
                title: 'Lavas',

                /**
                 * logo图标名称
                 *
                 * @type {string}
                 */
                logoIcon: '',

                /**
                 * 是否展示左侧菜单图标
                 *
                 * @type {boolean}
                 */
                showMenu: true,

                /**
                 * 是否展示左侧返回图标
                 *
                 * @type {boolean}
                 */
                showBack: false,

                /**
                 * 是否展示左侧logo
                 *
                 * @type {boolean}
                 */
                showLogo: true,
                
                showSelector: true,

                selectorAction: {items:[],selected:'',action:Function},

                showSelectDialog: false,

                selectDialogAction:{week:0,day:0,n:0,action:Function},

                /**
                 * 右侧操作按钮数组
                 *
                 * @type {Array}
                 */
                actions: []
            },
            actions: {

                /**
                 * 设置顶部导航条
                 *
                 * @param {Function} commit commit
                 * @param {Object} appHeader appHeader
                 */
                setAppHeader({commit}, appHeader) {
                    commit(types.SET_APP_HEADER, appHeader);
                },

                setSelected({commit}, selected){
                    console.log(selected)
                    commit(types.SET_SELECTED, selected)
                },
                setSelectorItems({commit}, items){
                    console.warn(items)
                    commit(types.SET_SELECTOR_ITEMS, items)
                },
                setSelectDialogAction({commit},action){
                    console.log(action)
                    commit(types.SET_SELECT_DIALOG_ACTION,action)
                }
            },
            mutations: {
                [types.SET_APP_HEADER](state, appHeader) {
                    state = Object.assign(state, appHeader);
                },
                [types.SET_SELECTED](state, selected){
                    state.selectorAction.selected = selected;
                },
                [types.SET_SELECTOR_ITEMS](state, items){
                    state.selectorAction.items = items
                },
                [types.SET_SELECT_DIALOG_ACTION](state,action){
                    console.log(action)
                    state.selectDialogAction.week = action.week
                    state.selectDialogAction.day = action.day
                    state.selectDialogAction.n = action.n
                }
            }
        },

        /**
         * 左侧侧边栏的数据
         *
         * @type {Object}
         */
        appSidebar: {
            namespaced: true,
            state: {
                show: false, // 是否显示sidebar

                // 头部条的相关配置
                title: {
                    imageLeft: '',
                    altLeft: '',
                    svgLeft: '',
                    iconLeft: 'home',
                    text: '更多功能',
                    imageRight: '',
                    altRight: '',
                    svgRight: '',
                    iconRight: ''
                },

                // 分块组
                blocks: [
                    {
                        // 子列表1
                        sublistTitle: '更多功能',
                        list: [
                            {
                                text: '正在开发敬请期待',
                                icon: 'svg-sentiment-very-satisfied',
                                route: ''
                            }
                        ]
                    }
                ]
            },
            actions: {

                /**
                 * 展示侧边栏
                 *
                 * @param {Function} commit commit
                 */
                showSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, true);
                },

                /**
                 * 隐藏侧边栏
                 *
                 * @param {Function} commit commit
                 */
                hideSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, false);
                }
            },
            mutations: {
                [types.SET_SIDEBAR_VISIBILITY](state, sidebarVisibility) {
                    state.show = sidebarVisibility;
                }
            }
        },

        /**
         * app shell 底部导航栏的数据
         *
         * @type {Object}
         */
        appBottomNavigator: {
            namespaced: true,
            state: {

                /**
                 * 是否展示底部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 导航按钮列表
                 *
                 * @type {Array.<Object>}
                 */
                navs: [
                    {
                        // 按钮的名字
                        name: 'schedule',

                        // 显示的 icon
                        icon: 'event',

                        // 显示的文字
                        text: '课表',

                        // 是否是当前激活的
                        active: true,

                        // 路由
                        route: {
                            name: 'schedule',
                            path: '/'
                        }
                    },
                    {
                        // 按钮的名字
                        name: 'scores',

                        // 显示的 icon
                        icon: 'assignment',

                        // 显示的文字
                        text: '成绩',

                        // 路由信息
                        route: '/scores'
                    },
                    {
                        name: "classroom",
                        icon: "directions",
                        text: "自习教室",
                        route: "/classroom"
                    }
                ]
            },
            actions: {

                /**
                 * 隐藏底部导航
                 *
                 * @param {Function} commit commit
                 */
                hideBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: false});
                },

                /**
                 * 显示底部导航
                 *
                 * @param {Function} commit commit
                 */
                showBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: true});
                },

                /**
                 * 激活底部导航
                 *
                 * @param {Function} commit commit
                 * @param {string} name name
                 */
                activateBottomNav({commit}, name) {
                    commit(types.ACTIVATE_APP_BOTTOM_NAV, name);
                }
            },
            mutations: {
                [types.ACTIVATE_APP_BOTTOM_NAV](state, name) {
                    state.navs = state.navs.map(nav => {
                        nav.active = nav.name === name;
                        return nav;
                    });
                },
                [types.SET_APP_BOTTOM_NAV](state, appBottomNavigator) {
                    state = Object.assign(state, appBottomNavigator);
                }
            }
        }
    }
};
