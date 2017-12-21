/**
 * @file store index
 * @author wulei123(1534563365@qq.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appShell from './modules/app-shell';
import dataFetch from './modules/data-fetch'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appShell,
        dataFetch
    }
});
