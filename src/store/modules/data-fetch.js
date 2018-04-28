/**
 * @file fetch data store
 * @author wulei123(1534563365@qq.com)
 */

import * as types from '../mutation-types';
import { SET_FULL_SCHEDULE, SET_FULL_SCORES, SET_FULL_CLASSROOM } from '../mutation-types';
const colors = [
    'red lighten-3',
    'pink lighten-3',
    'purple lighten-3',
    'deep-purple lighten-3',
    'indigo lighten-3',
    'blue lighten-3',
    'light-blue lighten-3',
    'cyan lighten-3',
    'teal lighten-3',
    'green lighten-3',
    'light-green lighten-3',
    'lime lighten-3',
    'yellow lighten-3',
    'amber lighten-3',
    'orange lighten-3',
    'deep-orange lighten-3'
]
function scheduleItemCompare(d, dc) {
    if (d.SKSJ === dc.SKSJ
        && d.SKZCMX === dc.SKZCMX
        && d.KKXQM === dc.KKXQM
        && d.JXDD === dc.JXDD
        && d.JSXM === dc.JSXM) {
        return true
    }
    return false
}

let state = {
    /**
     * 所有课表
     * @type {array} 
     */
    schedule: [],

    /**
     * 所有成绩
     * @type {array} 
     */
    scores: [],

    /**
     * 自习教室
     * @type {object} 
     */
    classroom: {}
};

let actions = {

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    enablePageTransition({ commit }) {
        commit(types.ENABLE_PAGE_TRANSITION, true);
    },

    /**
     * 获取课程表
     * @param {Function} commit commit 
     */
    fetchSchedule({ commit }) {
        fetch(process.env.SCHEDULE_URL)
            .then(res => res.json())
            .then(data => {
                data.forEach((d, i) => {
                    data[i].skzcmx = new Set(d.SKZCMX.split(','));
                    data[i].skzcmx.delete("");
                    data[i].sksj = { ct: [], day: '' }
                    let j = data[i].SKSJ.length
                    for (j = data[i].SKSJ.length; j >= 1; j -= 2) {
                        if (data[i].SKSJ.slice(j - 2, j) !== "") {
                            data[i].sksj.ct.unshift(data[i].SKSJ.slice(j - 2, j))
                        }
                    }
                    data[i].sksj.day = data[i].SKSJ.slice(0, j + 2)
                })
                commit(SET_FULL_SCHEDULE, data)
            })
            .catch(err => {
                console.error(err)
            })
    },
    /**
     * 获取成绩
     * @param {Function} commit commit
     */
    fetchScores({ commit }) {
        fetch(process.env.SCORES_URL)
            .then(res => res.json())
            .then(data => commit(SET_FULL_SCORES, data))
            .catch(err => {
                console.error(err)
            })
    },
    /**
     * 获取自习教室
     * @param {Function} commit commit
     * @param {Number} week week
     * @param {Number} day day
     * @param {Number} n class number
     */
    fetchClassroom({ commit }, week = 0, day = 0, n = 0) {
        fetch(`${process.env.CLASSROOM}&week=${week}&day=${day}&n=${n}`)
            .then(res => res.json())
            .then(data => commit(SET_FULL_CLASSROOM, data))
            .catch(err => {
                console.error(err)
            })
    }

};

let mutations = {
    [types.SET_FULL_SCHEDULE](state, schedule) {
        state.schedule = schedule;
    },
    [types.SET_FULL_SCORES](state, scores) {
        state.scores = scores;
    },
    [types.SET_FULL_CLASSROOM](state, classroom) {
        state.classroom = classroom;
    }
};

export default {
    namespaced: true,
    /* eslint-disable */
    state: {},
    actions: {},
    mutations: {},
    /* eslint-enable */
    modules: {
        auth:{
            namespaced: true,
            state:{
                authed:false
            },
            actions:{
                toAuth({commit}, vq){
                    return new Promise(
                        (resolve,reject)=>{
                            fetch(`${process.env.AUTH_URL}?verify_request=${vq}`,{credentials:'include'})
                            .then(res => res.json())
                            .then(data => {
                                if (data.code === 1){
                                    commit(types.SET_IS_AUTHED,true)
                                    resolve(true)
                                }else{
                                    console.error(data.detail)
                                    reject(false)
                                }
                            })
                        }
                    )
                }
            },
            mutations:{
                [types.SET_IS_AUTHED](state, isAuthed){
                    state.authed = isAuthed
                }
            }
        },
        scheduleControl: {
            namespaced: true,
            state: {
                /**
                * 所有课表
                * @type {array} 
                */
                schedule: [],
                /**
                 * 用以显示的周数
                 * @type {Number} week
                 */
                week: 1,
                /**
                 * 当前显示周的课程表
                 * @type {Array} table
                 */
                table: []
            },
            actions: {
                /**
                * 获取课程表
                * @param {Function} commit commit 
                */
                fetchSchedule({ commit }) {
                    fetch(process.env.SCHEDULE_URL,{credentials:'include'})
                        .then(res => res.json())
                        .then(dataOrigin => {
                            let data = []
                            dataOrigin.map(dc => {
                                let repeat = false;
                                data.map(d => {
                                    if (scheduleItemCompare(d, dc)) {
                                        repeat = true;
                                    }
                                })
                                if (!repeat) {
                                    data.push(dc)
                                }
                            })
                            let classColor = new Map()
                            data.forEach((d, i) => {
                                if (!classColor.get(d.KCMC)) {
                                    classColor.set(d.KCMC, colors[classColor.size % colors.length])
                                }
                                data[i].skzcmx = new Set(d.SKZCMX.split(','));
                                data[i].skzcmx.delete("");
                                data[i].skzcmx = Array.from(data[i].skzcmx);
                                data[i].skzcmx = data[i].skzcmx.map(v => +v);
                                data[i].sksj = { ct: [], week: '' };
                                let j = data[i].SKSJ.length
                                for (j = data[i].SKSJ.length; j >= 1; j -= 2) {
                                    if (data[i].SKSJ.slice(j - 2, j) !== "") {
                                        data[i].sksj.ct.unshift(+data[i].SKSJ.slice(j - 2, j))
                                    }
                                }
                                data[i].sksj.week = +data[i].SKSJ.slice(0, j + 2)
                                data[i].color = classColor.get(data[i].KCMC)
                            })
                            commit(types.SET_FULL_SCHEDULE, data)
                            commit(types.SET_ACTIVE_WEEK)
                        })
                        .catch(err => {
                            console.error('fetch schedule error')
                        })
                },
                setActiveWeek({ commit }, week) {
                    commit(types.SET_ACTIVE_WEEK, week)
                }
            },
            mutations: {
                [types.SET_FULL_SCHEDULE](state, schedule) {
                    state.schedule = schedule;
                },
                [types.SET_ACTIVE_WEEK](state, week) {
                    state.table = []
                    let tmpTable = []
                    if (week == undefined) {
                        week = 1
                    } else {
                        state.week = week;
                    }
                    state.schedule.map(dc => {
                        if (dc.skzcmx.includes(week)) {
                            tmpTable.push(dc)
                        }
                    })
                    // tmpTable.map(v => { console.log(`${v.KCMC} : ${v.JSXM} : ${v.SKSJ} : ${v.SKZCMX}`) })
                    let tmpTable1 = []
                    let tableWeek = []
                    for (let i = 0; i < 7; i++) {
                        tableWeek.push([])
                        for (let j = 0; j < 12; j++) {
                            let done = false;
                            tmpTable.map(v => {
                                if (v.sksj.week == i + 1 && v.sksj.ct.includes(j + 1) && !done) {
                                    //console.log(v);
                                    tableWeek[i].push({ count: 1, class: v, color: v.color });
                                    done = true;
                                }
                            })
                            if (!done) {
                                tableWeek[i].push({ count: 1, class: 0, color: 'white' })
                            }
                        }
                    }
                    tableWeek.map((vw, ix) => {
                        state.table.push([])
                        vw.map((v, i) => {
                            if (i > 0 && (scheduleItemCompare(state.table[ix][state.table[ix].length - 1].class, v.class) || (vw[i - 1].class === v.class && v.class === 0))) {
                                state.table[ix][state.table[ix].length - 1].count++
                            } else {
                                state.table[ix].push(v)
                            }
                        })
                    })
                    // state.table.map((v, i) => {
                    //     v.map(v => {
                    //         console.log(`${v.class.KCMC} : ${v.class.JSXM} : ${v.class.SKSJ}: ${v.count} : ${v.class.SKZCMX}`)
                    //     })
                    // })
                    // console.log(state.table)
                }
            }
        },
        scoresControl: {
            namespaced: true,
            state: {
                scores:new Map(),
                semesterItems:[{text:'1970-1-1',value:'1970-1-1'}],
                semester:'',
                scoresps:[]
            },
            actions: {
                /**
                * 获取成绩
                * @param {Function} commit commit
                */
                fetchScores({ commit }) {
                    return new Promise(
                        (resolve, reject)=>{
                            fetch(process.env.SCORES_URL,{credentials:'include'})
                            .then(res => res.json())
                            .then(data => {
                                commit(types.SET_FULL_SCORES, data)
                                commit(types.SET_SCORES_ACTIVE_SEMESTER)
                                resolve(data)
                            })
                            .catch(err => {
                                console.error(err)
                                reject(err)
                            })
                    }
                    )
                },
                setActiveSemester({commit},semester){
                    commit(types.SET_SCORES_ACTIVE_SEMESTER,semester)
                }
            },
            mutations: {
                [types.SET_FULL_SCORES](state, scores) {
                    let semesterItems = new Set()
                    state.scores = new Map()
                    scores.map((v,i)=>{
                        semesterItems.add(v.xnxqm)
                        if(state.scores.get(v.xnxqm)){
                            let sc = state.scores.get(v.xnxqm)
                            sc.push(v)
                            state.scores.set(v.xnxqm,sc)
                        }else{
                            state.scores.set(v.xnxqm,[v])
                        }
                    })
                    state.semesterItems = (Array.from(semesterItems)).map(v=>({text:v,value:v}))
                    // console.log(state.semesterItems)
                    // console.log(state.scores)
                },
                [types.SET_SCORES_ACTIVE_SEMESTER](state, semester){
                    if(semester==undefined){
                        state.semester = state.scores.keys().next().value
                    }else{
                        state.semester = semester
                    }
                    state.scoresps = state.scores.get(state.semester)
                    // console.warn(state.scores)
                    // console.log(state.semester)
                    // console.warn(state.scoresps)
                }
            }
        },
        classroomControl:{
            namespaced: true,
            state:{
                classroom : {}
            },
            actions:{
                /**
                * 获取自习教室
                * @param {Function} commit commit
                * @param {Number} week week
                * @param {Number} day day
                * @param {Number} n class number
                */
                fetchClassroom({ commit }, date) {
                   fetch(`${process.env.CLASSROOM_URL}?week=${date.week}&day=${date.day}&n=${date.n}`)
                       .then(res => res.json())
                       .then(data => commit(SET_FULL_CLASSROOM, data))
                       .catch(err => {
                           console.error(err)
                       })
                    }
            },
            mutations:{
                [types.SET_FULL_CLASSROOM](state, classroom) {
                    classroom.njLists = classroom.njLists.replace(/,/g,', ')
                    classroom.ntLists = classroom.ntLists.replace(/,/g,', ')
                    classroom.dhLists = classroom.dhLists.replace(/,/g,', ')
                    classroom.xhLists = classroom.xhLists.replace(/,/g,', ')
                    classroom.dlLists = classroom.dlLists.replace(/,/g,', ')
                    classroom.xlLists = classroom.xlLists.replace(/,/g,', ')
                    state.classroom = classroom;
                }
            }
        }
    }
};
