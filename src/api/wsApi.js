/* jshint esversion:6 */

import Socket from '@/utils/socket'
import WsConsts from '@/utils/wsConsts'
import store from '@/store/store'
import {
    getToken
} from '@/utils/auth'
import {MessageBox} from "element-ui";
import * as dlgUtils from "@/utils/dialogUtils";

/**websocket接口 */
const wsApi = {
    store: store,
    openReader: function (fnOnMsg, fnOnErr) {
        return this._apiBase(WsConsts.methods.openReader, getToken(), null, fnOnMsg, fnOnErr);
    },
    closeReader: function (fnOnMsg, fnOnErr) {
        return this._apiBase(WsConsts.methods.closeReader, getToken(), null, fnOnMsg, fnOnErr);
    },
    opeRsu: function (bizContent, fnOnMsg, fnOnErr) {
        return this._apiBase(WsConsts.methods.opeRsu, getToken(), bizContent, fnOnMsg, fnOnErr);
    },
    closeRsu: function (bizContent, fnOnMsg, fnOnErr) {
        return this._apiBase(WsConsts.methods.closeRsu, getToken(), bizContent, fnOnMsg, fnOnErr);
    },

    /** 状态心跳，返回定时器，需要在页面销毁时终止该定时器 */
    heartbeat: function (fnOnMsg, fnOnErr) {
        if (this.hbInterval === undefined || this.hbInterval === null) {
            this._apiBase(WsConsts.methods.heartbeat, getToken(), null, fnOnMsg, fnOnErr)
            this.hbInterval = setInterval(() => {
                this._apiBase(WsConsts.methods.heartbeat, getToken(), null, fnOnMsg, fnOnErr)
            }, WsConsts.hbInterval)
        } else {
            clearInterval(this.hbInterval);
            this.hbInterval = null;
        }
    },
    /**POS充值*/
    posRecharge: function (bizContent, fnOnMsg, fnOnErr) {
        return this._apiBase(WsConsts.methods.posRecharge, getToken(), bizContent, fnOnMsg, fnOnErr)
    },
    posCorrect: (bizContent, fnOnMsg, fnOnErr) => {
        return this._apiBase(WsConsts.methods.posCorrect, getToken(), bizContent, fnOnMsg, fnOnErr)
    },
    /** CPU卡号读取 */
    readCardId: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.readCardId, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 公务卡信息读取 */
    readOfficialCard: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.readOfficialCard, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** CPU信息读取 */
    readCpuInfo: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.readCpuInfo, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 读取卡内流水信息 */
    readCardJour: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.readCardJour, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 卡片发行 */
    cardIssue: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cpuIssue, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 卡片注销 */
    cpuCancel: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cpuCancel, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 卡片解锁 */
    cpuUnlock: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cpuUnlock, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** OBU信息读取 */
    readObuInfo: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.readObuInfo, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** OBU发行 */
    obuIssue: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.obuIssue, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 圈存 */
    cpuLoad: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cpuLoad, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 圈存异常处理 */
    cpuLoadAbnormal: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cpuLoadAbnormal, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 打开摄像头 */
    cameraOpen: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cameraOpen, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose, WsConsts.camUrl)
    },
    /** 关闭摄像头 */
    cameraClose: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cameraClose, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose, WsConsts.camUrl)
    },
    /** 获取摄像头数量 */
    cameraCounts: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cameraCounts, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose, WsConsts.camUrl)
    },
    /** 拍照 */
    cameraTakePicture: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cameraTakePicture, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose, WsConsts.camUrl)
    },
    /** 换卡销卡 */
    cardReplaceCancel: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cardReplaceCancel, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 补领换卡新发行 */
    cardReplaceIssue: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cardReplaceIssue, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 读配置 */
    readConfig: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.readConfig, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 写配置 */
    saveConfig: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.saveConfig, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /** 补领换卡新卡校验 */
    cardReplaceCheck: function (bizContent, fnOnMsg, fnOnErr, autoClose = true) {
        return this._apiBase(WsConsts.methods.cardReplaceCheck, getToken(), bizContent, fnOnMsg, fnOnErr, autoClose)
    },
    /**
     * 公共接口函数
     * @param method String 接口映射
     * @param ticket String 登录票据
     * @param bizContent Object 业务参数
     * @param fnOnMsg Callback websocket消息回调函数
     * @param fnOnErr Callback websocket错误回调函数
     * @param autoClose Boolean 是否自动关闭，默认自动关闭
     * @param url String 摄像头接口地址
     */
    _apiBase: function (method, ticket, bizContent, fnOnMsg, fnOnErr, autoClose = true, url = WsConsts.url) {
        //bizContent
        const param = {
            method: method,
            biz_content: JSON.stringify({
                ...(this._ignoreNull(bizContent)),
                op_code: store.getters.operatorInfo.op_code,
                op_name: store.getters.operatorInfo.op_name,
                branch_no: store.getters.operatorInfo.branch_no,
                branch_name: store.getters.operatorInfo.branch_name,
            }),
            ticket: ticket
        };
        return _._callWs(param, fnOnMsg, fnOnErr, autoClose, url)
    },
    _ignoreNull: function (obj) {
        let _newPar = {};
        for (let key in obj) {
            //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                //记录属性
                _newPar[key] = obj[key];
            }
        }
        //返回对象
        return _newPar;
    }
    /**
     * 心跳
     */
    // heartBeat: function(fnOnMsg, fnOnError) {
    // setInterval(() => {
    //     let a = methods.cameraClose;
    // _._callWs('{"bissnessType":"doSale","chargeWay":"03","heartbeat":"1","data":"{amount:1}"}', fnOnMsg, fnOnError)
    // }, 1000)
    // },
}
//websocket基础请求函数封装
const _ = {
    /**
     * 公共接口函数
     * @param method String
     * @param ticket String
     * @param bizContent Object
     * @param fnOnMsg Callback
     * @param fnOnErr Callback
     */
    /*_apiBase: function(method, ticket, bizContent, fnOnMsg, fnOnErr) {
        const param = {
            method: method,
            biz_content: Object.assign(bizContent, store.state.userInfo),
            ticket: ticket
        }
        return this._callWs(param, fnOnMsg, fnOnErr)
    },*/

    /**
     * 调用websocket发送数据，并注册消息回调
     * @param reqParams String
     * @param fnOnMsg Callback
     * @param fnOnErr Callback
     * @param autoClose Boolean
     * @param url String
     */
    _callWs: function (reqParams, fnOnMsg, fnOnErr, autoClose = true, url = WsConsts.url) {
        try {
            const wsClient = new Socket({
                // 网址（端口是我下面的服务器的端口）
                url: url //|| WsConsts.url
            })

            // console.log(WsConsts.url, "url");
            // 注册接收信息事件
            wsClient.onmessage((msg) => {
                //console.log(typeof  msg.data,typeof (msg.data) === 'string')
                if (typeof msg.data === 'string') {
                    let data = JSON.parse(msg.data)
                    // console.log(data)
                    if ((data.return_code == '803' || data.return_code == '802')) {
                        dlgUtils.loginTimeout()

                    }
                }
                if (fnOnMsg !== undefined && fnOnMsg !== null) {
                    // 触发收到消息接收
                    fnOnMsg(msg)
                }
                // 关闭websocket连接
                if (autoClose)
                    wsClient.close()
            }, true)

            // 注册开启事件
            wsClient.onopen((event) => {

                //短连接，在收到打开连接事件时发送数据
                wsClient.send(reqParams)
            })

            // 注册关闭事件
            wsClient.onclose((event) => {
                if (event.code !== 1000) {

                    if (reqParams.method != 'zjetc.desktop.status') {
                        // console.log(reqParams.method)
                        window.protocolCheck("zjetcDesktopClient://",
                            function () {
                                MessageBox.alert(
                                    '检测到您电脑未启动桌面发行端，请手动启动。',
                                    '提示',
                                    {
                                        confirmButtonText: '确定',
                                        //showClose: false,
                                        customClass: 'my_msgBox singelBtn',
                                        type: 'warning'
                                    }).then(res => {
                                    // window.open('/ZjetcDesktopClientSetup.msi', '_blank')
                                })
                                //alert("检测到您电脑ZjetcDesktopClient本地客户端未安装 请下载");
                            });
                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    }
                    // if (fnOnErr !== undefined && fnOnErr !== null) {
                    //     fnOnErr({
                    //         message: "与桌面发行终端的连接异常断开",
                    //         code: event.code
                    //     })
                    // }
                }
                // console.log('websocket onclose', event)
            })

            // 注册异常事件
            wsClient.onerror((event) => {
                console.log(event, "close")
                if (fnOnErr !== undefined && fnOnErr !== null) {

                    fnOnErr({
                        message: event['message'] || "与桌面发行终端的连接异常断开",
                        code: event.code
                    })
                }
                wsClient.close()
            })
            return wsClient;
        } catch (e) {
            console.log("websocket 连接失败", e)
            return null
        }

    }
}
//导出接口函数列表
export default wsApi