/**
 * @file 开发环境相关配置文件
 * @author wulei123(1534563365@qq.com)
 */

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SCHEDULE_URL: '"http://yb.upc.edu.cn:8083/api/schedule"',
    SCORES_URL: '"http://yb.upc.edu.cn:8083/api/scores"',
    CLASSROOM_URL: '"http://yb.upc.edu.cn:8083/api/classroom"',
    REDIRECT_URL: '"/#/?vq=d0020c642ac40b29d23355f08fe07f45e9ab9c0c79eee1e79524d37f5a34008af9ed233148bce64e98a7ae6c21d0f7c09afceaa9f5b269109cb84b3490bc1b491324b76a75fa91150ae50670a0c1ad80"',
    AUTH_URL:'"http://yb.upc.edu.cn:8083/api/auth"'
    // SCHEDULE_URL: '"http://yb.upc.edu.cn:8081/api/schedule"',
    // SCORES_URL: '"http://yb.upc.edu.cn:8081/api/scores"',
    // CLASSROOM_URL: '"http://yb.upc.edu.cn:8081/api/classroom"',
    // REDIRECT_URL: '"http://f.yiban.cn/iapp33017"',
    // AUTH_URL:'"http://yb.upc.edu.cn:8081/api/auth"'
});
//http://yb.upc.edu.cn:8081/?verify_request=d0020c642ac40b29d23355f08fe07f45446862d0ae771d41bbffe9a4159346b3da025411a63dbc7679a0ca59c7a57ebdc7e2be973fcce40ed8c80237d1c705a386ae02973ce74f21f040b991f77941ce5887bde3489462401fea3a9d5bbe3eb267eaadeb01f5df85c3a959b9f757d5ff0d6f319e3563fde199003259fe88d2cc383d4de04c2b22519ca21bd52f9043aca293c5c26c58846d15fd3740b12cdee9a6cf1c0ce950ac4cdc27fb8a096ca1e42b72715676b5916311b213ecb1efcf6cd6e65783faa04d31688e77b209bafea4bbdc3471edfa0602e7222b5d8e52d8203d4d750190540bd3ab3880a9e2534248