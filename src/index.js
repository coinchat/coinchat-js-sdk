/** * omd 让你写的javascript代码兼容所有的运行环境，符合amd, cmd, commonjs规范，在原生环境中也能运行
 * 例如，你写了一堆代码，在没有模块化加载的时候可以使用，在模块化框架下也可以使用
 */
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

var dsBridge=require("dsbridge");
var clone = require('clone');

//签名方法
function getHashByData(data,api_secret) {
    var myObj = data,
      keys = [],
      k, i, len;

    for (k in myObj) {
      if (myObj.hasOwnProperty(k)) {
        keys.push(k);
      }
    }

    keys.sort();
    len = keys.length;

    var str = '';
    for (i = 0; i < len; i++) {
      k = keys[i];
      str += '&' + k + '=' + myObj[k];
    }

    str = str.substr(1);

    var sign =  hmacSHA256(str,api_secret).toString();
    return sign;
}

function invoke(sdkName, args, handler) {

    console.log('invoke-start',sdkName,args,handler)
    // var sign = getHashByData(args);
    // args['sign'] = sign;

    //Call asynchronously
    dsBridge.call("invoke",{'sdkname':sdkName,'args':args}, function (res) {
        console.log('调用成功',res);
        execute(sdkName, res, handler)
    })

}


function getLanguage() {
    //Call asynchronously
    return dsBridge.call("getLanguage")
}

function on(sdkName, listener, handler) {
    global.CoinchatJSBridge ? CoinchatJSBridge.on(sdkName, function(res) {
        handler && handler.trigger && handler.trigger(res);
        execute(sdkName, res, listener);
    }) : (handler ? logEventInfo(sdkName, handler) : logEventInfo(sdkName, listener));
}


function execute(sdkName, res, handler) {

    // "openEnterpriseChat" == sdkName && (res.errCode = res.err_code);
    // delete res.err_code, delete res.err_desc, delete res.err_detail;
    // var errMsg = res.errMsg;
    // errMsg || (errMsg = res.err_msg, delete res.err_msg, errMsg = formatErrMsg(sdkName, errMsg), res.errMsg = errMsg);
    // handler = handler || {};
    // handler._complete && (handler._complete(res), delete handler._complete);
    // errMsg = res.errMsg || "";
    // settings.debug && !handler.isInnerInvoke && alert(JSON.stringify(res));
    // var separatorIndex = errMsg.indexOf(":"),
    //     status = errMsg.substring(separatorIndex + 1);
    var resObj = JSON.parse(res);
    var status = resObj.status;

    console.log('execute:res',res);
    console.log('execute:res',resObj);
    console.log('execute:status',status);
    console.log('execute:handler',handler);

    switch (status) {
        case "success":
            handler._success && handler._success(resObj);
            break;
        case "cancel":
            handler._cancel && handler._cancel(resObj);
            break;
        default:
            handler._fail && handler._fail(resObj)
    }
    handler._complete && handler._complete(resObj)
}

// function addVerifyInfo(data) {
//     data = data || {};
//     data.appId = settings.appId;
//     data.verifyAppId = settings.appId;
//     data.verifySignType = "sha1";
//     data.verifyTimestamp = settings.timestamp + "";
//     data.verifyNonceStr = settings.nonceStr;
//     data.verifySignature = settings.signature;

//     return data;
// }


// function formatErrMsg(sdkName, errMsg) {
//     var name = sdkName,
//         event = sdkNameEventMap[sdkName];
//     event && (name = event);
//     var status = "ok";
//     if (errMsg) {
//         var separatorIndex = errMsg.indexOf(":");
//         status = errMsg.substring(separatorIndex + 1);
//         "confirm" == status && (status = "ok");
//         "failed" == status && (status = "fail"); - 1 != status.indexOf("failed_") && (status = status.substring(7)); - 1 != status.indexOf("fail_") && (status = status.substring(5));
//         status = status.replace(/_/g, " ");
//         status = status.toLowerCase();
//         ("access denied" == status || "no permission to execute" == status) && (status = "permission denied");
//         "config" == sdkName && "function not exist" == status && (status = "ok");
//         "" == status && (status = "fail");
//     }
//     return errMsg = name + ":" + status;
// }

// function eventArrToSdkNameArr(jsApiList) {
//     if (jsApiList) {
//         for (var i = 0, length = jsApiList.length; length > i; ++i) {
//             var event = jsApiList[i],
//                 sdkName = eventSdkNameMap[event];
//             sdkName && (jsApiList[i] = sdkName);
//         }
//         return jsApiList;
//     }
// }

function logEventInfo(name, data) {
    console.log('"' + name + '",', data || "")
    return ;
    if (!(!settings.debug || data && data.isInnerInvoke)) {
        var event = sdkNameEventMap[name];
        event && (name = event);
        data && data._complete && delete data._complete;
        console.log('"' + name + '",', data || "")
    }
}

// function report(data) {
//     if (!(isNormalPC || isCoinchatDeBugger || settings.debug || "6.0.2" > coinchatVersion || info.systemType < 0)) {
//         var img = new Image;
//         info.appId = settings.appId;
//         info.initTime = loadTimeInfo.initEndTime - loadTimeInfo.initStartTime;
//         info.preVerifyTime = loadTimeInfo.preVerifyEndTime - loadTimeInfo.preVerifyStartTime;
//         jCoinchat.getNetworkType({
//             isInnerInvoke: true,
//             success: function(res) {
//                 info.networkType = res.networkType;
//                 var reportUrl = "https://open.coinchat.qq.com/sdk/report?v=" + info.version + "&o=" + info.isPreVerifyOk + "&s=" + info.systemType + "&c=" + info.clientVersion + "&a=" + info.appId + "&n=" + info.networkType + "&i=" + info.initTime + "&p=" + info.preVerifyTime + "&u=" + info.url;
//                 img.src = reportUrl;
//             }
//         });
//     }
// }

function getTime() {
    return new Date().getTime();
}

function startup(callback) {
    isCoinchat && (global.CoinchatJSBridge ? callback() : document.addEventListener && document.addEventListener("CoinchatJSBridgeReady", callback, false))
}

// function enableBetaApi() {
//     jCoinchat.invoke || (jCoinchat.invoke = function(sdkName, args, handler) {
//         global.CoinchatJSBridge && CoinchatJSBridge.invoke(sdkName, addVerifyInfo(args), handler)
//     }, jCoinchat.on = function(sdkName, args) {
//         global.CoinchatJSBridge && CoinchatJSBridge.on(sdkName, args)
//     });
// }

if (!global.jCoinchat) {


    console.log('init_coinchat',global.document,global);

    var eventSdkNameMap = {

    },
    sdkNameEventMap = (function() {
        var map = {};
        for (var i in eventSdkNameMap)
            map[eventSdkNameMap[i]] = i;
        return map;
    })(),
    
    document = global.document,
    title = document.title,
    uaLowerCase = navigator.userAgent.toLowerCase(),
    platLowerCase = navigator.platform.toLowerCase(),
    isNormalPC = !(!uaLowerCase.match('mac') && !uaLowerCase.match('win')),
    isCoinchatDeBugger = uaLowerCase.indexOf('coinchatdebugger') != -1,
    isCoinchat = uaLowerCase.indexOf('coinchat') != -1,
    isAndroid = uaLowerCase.indexOf('android') != -1,
    isIOs = uaLowerCase.indexOf('iphone') != -1 || uaLowerCase.indexOf('ipad') != -1,
    coinchatVersion = (function() {
        var version = uaLowerCase.match(/coinchat\/(\d+\.\d+\.\d+)/) || uaLowerCase.match(/coinchat\/(\d+\.\d+)/);
        return version ? version[1] : ''
    })(),
    loadTimeInfo = {
        initStartTime: getTime(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
    },
    info = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: isIOs ? 1 : isAndroid ? 2 : -1,
        clientVersion: coinchatVersion,
        url: encodeURIComponent(location.href)
    },
    settings = {},
    handler = {
        _completes: []
    },
    resource = {
        state: 0,
        data: {}
    };

    var jCoinchat = {
            config: function(data) {
                settings = clone(data);
                logEventInfo("config", data);

                var callback = {};
                settings['debug'] = (data['debug'] == true) ? true : false;
                delete data['debug'];

                console.log('settings',settings)

                invoke('config', data, function() {
                    handler._complete = function(data) {
                        console.log('config_1');
                        loadTimeInfo.preVerifyEndTime = getTime();
                        resource.state = 1;
                        resource.data = data;
                    };
                    handler.success = function(data) {
                        console.log('config_success');
                        info.isPreVerifyOk = 0;
                    };
                    handler.fail = function(data) {
                        console.log('config_fail');
                        handler._fail ? handler._fail(data) : resource.state = -1;
                    };
                   
                    var _completes = handler._completes;
                    // _completes.push(function() {
                    //     report();
                    // });
                   
                    handler.complete = function(data) {
                        for (var i = 0, length = _completes.length; length > i; ++i) {
                            _completes[i]();
                        }
                    };
                    handler._completes = [];
                    return handler;
                }());
            },

            ready: function(callback) {
                if (resource.state != 0) {
                    callback();
                }else {
                    handler._completes.push(callback);
                    console.log('添加到等待执行的列表',handler);
                }
            },

            error: function(callback) {
                if (resource.state == -1) {
                    callback(resource.data);
                }else {
                    handler._fail = callback
                }
            },

            getSign: function(args,api_secret) {
                return getHashByData(args,api_secret);
            },

            getLoginUserInfo : function(data) {
                invoke('getLoginUserInfo', {}, function() {
                    data._complete = function(res) {
                        // delete res.type
                        console.log('调用完成');
                        if (data.complete) {
                            data.complete(res);
                        }
                    };
                    data._success = function(res) {
                        // delete res.type
                        console.log('调用成功');
                        if (data.success) {
                            data.success(res);
                        }
                    };
                    data._cancel = function(res) {
                        // delete res.type
                        console.log('调用取消');
                    };
                    data._fail = function(res) {
                        // delete res.type
                        console.log('调用失败');
                        if (data.fail) {
                            data.fail(res);
                        }
                    };
                    return data;
                }());
            },
            showToast: function(data) {
                data = data || {};
                console.log('invoke_show_toast');
                invoke('showToast', data, function() {
                    data._complete = function(res) {
                        // delete res.type
                        console.log('调用完成');
                    };
                    data._success = function(res) {
                        // delete res.type
                        console.log('调用成功');
                    };
                    data._cancel = function(res) {
                        // delete res.type
                        console.log('调用取消');
                    };
                    data._fail = function(res) {
                        // delete res.type
                        console.log('调用失败');
                    };
                    return data;
                }());
            },
            getVersion : function() {
                console.log('uaLowerCase',uaLowerCase)
                console.log('coinchatVersion',coinchatVersion)
                return coinchatVersion;
            },

            isCoinchat : function() {
                console.log('isCoinchat',isCoinchat)
                return isCoinchat;
            },

            entrustPay :function(res) {
                var data = {};
                invoke('entrustPay', res, function() {
                    data._complete = function(result) {
                        // delete res.type
                        console.log('调用完成');
                        if (res.complete) {
                            res.complete(result);
                        }
                    };
                    data._success = function(result) {
                        // delete res.type
                        console.log('调用成功',res,result);
                        if (res.success) {
                            res.success(result);
                        }
                    };
                    data._cancel = function(result) {
                        // delete res.type
                        console.log('调用取消');
                        if (res.cancel) {
                            res.cancel(result);
                        }
                    };
                    data._fail = function(result) {
                        // delete res.type
                        console.log('调用失败');
                        if (res.fail) {
                            res.fail(result);
                        }
                    };
                    return data;
                }());
            },

            pay :function(res) {
                var data = {};
                invoke('pay', res, function() {
                    data._complete = function(result) {
                        // delete res.type
                        console.log('调用完成');
                        if (res.complete) {
                            res.complete(result);
                        }
                    };
                    data._success = function(result) {
                        // delete res.type
                        console.log('调用成功',res,result);
                        if (res.success) {
                            res.success(result);
                        }
                    };
                    data._cancel = function(result) {
                        // delete res.type
                        console.log('调用取消');
                        if (res.cancel) {
                            res.cancel(result);
                        }
                    };
                    data._fail = function(result) {
                        // delete res.type
                        console.log('调用失败');
                        if (res.fail) {
                            res.fail(result);
                        }
                    };
                    return data;
                }());
            },

            getLanguage : function() {
                console.log('getLanguage',getLanguage())
                return getLanguage();
            },

        },
        next_iOSLocalImgId = 1,
        iOS_LocalImgMap = {};
    }

 
    console.log('set_ready')
    export default jCoinchat;
