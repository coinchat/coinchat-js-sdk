/** * omd 让你写的javascript代码兼容所有的运行环境，符合amd, cmd, commonjs规范，在原生环境中也能运行
 * 例如，你写了一堆代码，在没有模块化加载的时候可以使用，在模块化框架下也可以使用
 */
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

!function(spacename,dependencies,window,factory){
    // 当define被定义的情况下
    if(typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
        console.log('define',typeof define)
        console.log('define1',define.amd)
        console.log('define2',define.cmd)
        define(dependencies,function() {
            return factory(window);
        });
    }
    // 当define没有被定义的情况下
    else {
        var ex = factory(window);
        // CommonJS NodeJS
        if(typeof module !== 'undefined' && typeof exports === 'object') {
            // 由于exports被定义，函数中的exports已经是全局变量，因此，这里就不进行任何操作
            module.exports = ex;
        }
        // 原生Javascript，接口将被作为一个window的子对象
        else {
            window[spacename] = ex;
        }
    }
}('coinchat',['dsbridge'],window,function(window,isGlobalMode = true){
    // var $ = require('jquery');
    var dsBridge=require("dsbridge");

    /**
     * 如何上手呢？
     * 1. 修改上面的'spaceName'为当前文件的名称（不要后缀）【在非模块化环境中使用其接口会加载到window中，例如你可以使用类似window.spaceName.function()来调用某个接口函数】
     * 2. 修改上面['jquery']的内容为依赖包列表【在模块化环境中可能使用】
     * 3. window就是window，有你需要的window属性
     * 4. 加载$，如果你的项目中依赖了jQuery或Zepto，则选择上面注释中的一种，使$可用
     * 5. 接口，通过return返回接口
     */

    function getHashByData(data) {

        var api_key = "v1ymtpfgaautzakupen4xocrnnvnxwjz";
        var api_secret = '9cltjeoremroutzowcucjcl9y1j5tj4j';

        // console.log('要签名的数据是',data);
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
          str += k + '=' + myObj[k];
        }

        var sign =  hmacSHA256(str,api_secret).toString();
        console.log('签名字符串是',str);
        console.log('签名后是',sign);
        return sign;
    }

    // var d = {user_id: 1, group_id: 2, timestamp: 1234567890, nonce: "some_random_character", api_key: "foo"};
    // getHashByData(d);


    function invoke(sdkName, args, handler) {
        // console.log('invoke_show_toastxx',global.CoinchatJSBridge);
        // console.log('invoke_show_toastxx0',global.CoinchatJSBridge);
        // console.log('invoke_show_toastxx1',CoinchatJSBridge);
        // global.CoinchatJSBridge ? CoinchatJSBridge.showToast('123') : null;
        // return;
        console.log('global.CoinchatJSBridge',global.CoinchatJSBridge)
        console.log('sdkName',sdkName)
        // console.log('addVerifyInfo(args)',addVerifyInfo(args))

        // console.log('callback',callback)
        // console.log('global_data',global);
        // var str=dsBridge.call("testSyn","testSyn");


        var callback = function(res) {
            console.log('this is call back',res);
            execute(sdkName, res, handler)
        };

        var sign = getHashByData(args);
        args['sign'] = sign;

        //Call asynchronously
        dsBridge.call("invoke",{'sdkname':sdkName,'args':args}, function (res) {
            console.log('调用成功');
            alert(res);
            execute(sdkName, res, handler)
        })

        console.log('新方法调用invoke_finished');

        // global.CoinchatJSBridge ? CoinchatJSBridge.invoke(sdkName, 'this is params', callback) : logEventInfo(sdkName, handler);
    }

    function on(sdkName, listener, handler) {
        global.CoinchatJSBridge ? CoinchatJSBridge.on(sdkName, function(res) {
            handler && handler.trigger && handler.trigger(res);
            execute(sdkName, res, listener);
        }) : (handler ? logEventInfo(sdkName, handler) : logEventInfo(sdkName, listener));
    }

    function addVerifyInfo(data) {
        data = data || {};
        data.appId = settings.appId;
        data.verifyAppId = settings.appId;
        data.verifySignType = "sha1";
        data.verifyTimestamp = settings.timestamp + "";
        data.verifyNonceStr = settings.nonceStr;
        data.verifySignature = settings.signature;

        return data;
    }

    function execute(sdkName, res, handler) {
        "openEnterpriseChat" == sdkName && (res.errCode = res.err_code);
        delete res.err_code, delete res.err_desc, delete res.err_detail;
        var errMsg = res.errMsg;
        errMsg || (errMsg = res.err_msg, delete res.err_msg, errMsg = formatErrMsg(sdkName, errMsg), res.errMsg = errMsg);
        handler = handler || {};
        handler._complete && (handler._complete(res), delete handler._complete);
        errMsg = res.errMsg || "";
        settings.debug && !handler.isInnerInvoke && alert(JSON.stringify(res));
        var separatorIndex = errMsg.indexOf(":"),
            status = errMsg.substring(separatorIndex + 1);
        switch (status) {
            case "ok":
                handler.success && handler.success(res);
                break;
            case "cancel":
                handler.cancel && handler.cancel(res);
                break;
            default:
                handler.fail && handler.fail(res)
        }
        handler.complete && handler.complete(res)
    }

    function formatErrMsg(sdkName, errMsg) {
        var name = sdkName,
            event = sdkNameEventMap[sdkName];
        event && (name = event);
        var status = "ok";
        if (errMsg) {
            var separatorIndex = errMsg.indexOf(":");
            status = errMsg.substring(separatorIndex + 1);
            "confirm" == status && (status = "ok");
            "failed" == status && (status = "fail"); - 1 != status.indexOf("failed_") && (status = status.substring(7)); - 1 != status.indexOf("fail_") && (status = status.substring(5));
            status = status.replace(/_/g, " ");
            status = status.toLowerCase();
            ("access denied" == status || "no permission to execute" == status) && (status = "permission denied");
            "config" == sdkName && "function not exist" == status && (status = "ok");
            "" == status && (status = "fail");
        }
        return errMsg = name + ":" + status;
    }

    function eventArrToSdkNameArr(jsApiList) {
        if (jsApiList) {
            for (var i = 0, length = jsApiList.length; length > i; ++i) {
                var event = jsApiList[i],
                    sdkName = eventSdkNameMap[event];
                sdkName && (jsApiList[i] = sdkName);
            }
            return jsApiList;
        }
    }

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

    function report(data) {
        if (!(isNormalPC || isCoinchatDeBugger || settings.debug || "6.0.2" > coinchatVersion || info.systemType < 0)) {
            var img = new Image;
            info.appId = settings.appId;
            info.initTime = loadTimeInfo.initEndTime - loadTimeInfo.initStartTime;
            info.preVerifyTime = loadTimeInfo.preVerifyEndTime - loadTimeInfo.preVerifyStartTime;
            jCoinchat.getNetworkType({
                isInnerInvoke: true,
                success: function(res) {
                    info.networkType = res.networkType;
                    var reportUrl = "https://open.coinchat.qq.com/sdk/report?v=" + info.version + "&o=" + info.isPreVerifyOk + "&s=" + info.systemType + "&c=" + info.clientVersion + "&a=" + info.appId + "&n=" + info.networkType + "&i=" + info.initTime + "&p=" + info.preVerifyTime + "&u=" + info.url;
                    img.src = reportUrl;
                }
            });
        }
    }

    function getTime() {
        return new Date().getTime();
    }

    function startup(callback) {
        isCoinchat && (global.CoinchatJSBridge ? callback() : document.addEventListener && document.addEventListener("CoinchatJSBridgeReady", callback, false))
    }

    function enableBetaApi() {
        jCoinchat.invoke || (jCoinchat.invoke = function(sdkName, args, handler) {
            global.CoinchatJSBridge && CoinchatJSBridge.invoke(sdkName, addVerifyInfo(args), handler)
        }, jCoinchat.on = function(sdkName, args) {
            global.CoinchatJSBridge && CoinchatJSBridge.on(sdkName, args)
        });
    }

    if (!global.jCoinchat) {


        console.log('init_coinchat',global.document,global);

        var eventSdkNameMap = {
                config: "preVerifyJSAPI",
                // onMenuShareTimeline: "menu:share:timeline",
                // onMenuShareAppMessage: "menu:share:appmessage",
                // onMenuShareQQ: "menu:share:qq",
                // onMenuShareWeibo: "menu:share:weiboApp",
                // onMenuShareQZone: "menu:share:QZone",
                // previewImage: "imagePreview",
                // getLocation: "geoLocation",
                // openProductSpecificView: "openProductViewWithPid",
                // addCard: "batchAddCard",
                // openCard: "batchViewCard",
                // chooseWXPay: "getBrandWCPayRequest",
                // openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
                // startSearchBeacons: "startMonitoringBeacons",
                // stopSearchBeacons: "stopMonitoringBeacons",
                // onSearchBeacons: "onBeaconsInRange",
                // consumeAndShareCard: "consumedShareCard",
                // openAddress: "editAddress"
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
                    settings = data;
                    logEventInfo("config", data);
                    var callback = {};

                    settings['debug'] = (data['debug'] == true) ? true : false;
                    delete data['debug'];

                    invoke('config', data, function() {
                        console.log('callback',callback)
                        callback._complete = function(res) {
                            // delete res.type
                            console.log('调用完成');
                        };
                        callback._success = function(res) {
                            // delete res.type
                            console.log('调用成功');
                        };
                        callback._cancel = function(res) {
                            // delete res.type
                            console.log('调用取消');
                        };
                        callback._fail = function(res) {
                            // delete res.type
                            console.log('调用失败');
                        };
                        return callback;
                    }());
                    // var needCheck = settings.check === false ? false : true;
                    // startup(function() {
                    //     if (needCheck) {
                    //         invoke(eventSdkNameMap.config, {
                    //             verifyJsApiList: eventArrToSdkNameArr(settings.jsApiList)
                    //         }, function() {
                    //             handler._complete = function(data) {
                    //                 loadTimeInfo.preVerifyEndTime = getTime();
                    //                 resource.state = 1;
                    //                 resource.data = data;
                    //             };
                    //             handler.success = function(data) {
                    //                 info.isPreVerifyOk = 0;
                    //             };
                    //             handler.fail = function(data) {
                    //                 handler._fail ? handler._fail(data) : resource.state = -1;
                    //             };
                    //             var _completes = handler._completes;
                    //             _completes.push(function() {
                    //                 report();
                    //             });
                    //             handler.complete = function(data) {
                    //                 for (var i = 0, length = _completes.length; length > i; ++i) {
                    //                     _completes[i]();
                    //                 }
                    //             };
                    //             handler._completes = [];
                    //             return handler;
                    //         }());
                    //         loadTimeInfo.preVerifyStartTime = getTime();
                    //     } else {
                    //         resource.state = 1;
                    //         var _completes = handler._completes;
                    //         for (var i = 0, length = _completes.length; length > i; ++i) {
                    //             _completes[i]();
                    //         }
                    //         handler._completes = [];
                    //     }
                    // });
                    // settings.beta && enableBetaApi();
                },
                ready: function(callback) {
                    0 != resource.state ? callback() : (handler._completes.push(callback), !isCoinchat && settings.debug && callback())
                },
                error: function(callback) {
                    "6.0.2" > coinchatVersion || (-1 == resource.state ? callback(resource.data) : handler._fail = callback)
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

                // checkJsApi: function(data) {
                //     var formatResultData = function(data) {
                //         var checkResult = data.checkResult;
                //         for (var key in checkResult) {
                //             var event = sdkNameEventMap[key];
                //             event && (checkResult[event] = checkResult[key], delete checkResult[key]);
                //         }
                //         return data;
                //     };
                //     invoke("checkJsApi", {
                //         jsApiList: eventArrToSdkNameArr(data.jsApiList)
                //     }, function() {
                //         data._complete = function(data) {
                //             if (isAndroid) {
                //                 var resultStr = data.checkResult;
                //                 resultStr && (data.checkResult = JSON.parse(resultStr));
                //             }
                //             data = formatResultData(data);
                //         };
                //         return data;
                //     }());
                // },
                onMenuShareTimeline: function(data) {
                    on(eventSdkNameMap.onMenuShareTimeline, {
                        complete: function() {
                            invoke("shareTimeline", {
                                title: data.title || title,
                                desc: data.title || title,
                                img_url: data.imgUrl || "",
                                link: data.link || location.href,
                                type: data.type || "link",
                                data_url: data.dataUrl || ""
                            }, data);
                        }
                    }, data);
                },
                onMenuShareAppMessage: function(data) {
                    on(eventSdkNameMap.onMenuShareAppMessage, {
                        complete: function() {
                            invoke("sendAppMessage", {
                                title: data.title || title,
                                desc: data.desc || "",
                                link: data.link || location.href,
                                img_url: data.imgUrl || "",
                                type: data.type || "link",
                                data_url: data.dataUrl || ""
                            }, data);
                        }
                    }, data);
                },
                onMenuShareQQ: function(data) {
                    on(eventSdkNameMap.onMenuShareQQ, {
                        complete: function() {
                            invoke("shareQQ", {
                                title: data.title || title,
                                desc: data.desc || "",
                                img_url: data.imgUrl || "",
                                link: data.link || location.href
                            }, data);
                        }
                    }, data);
                },
                onMenuShareWeibo: function(data) {
                    on(eventSdkNameMap.onMenuShareWeibo, {
                        complete: function() {
                            invoke("shareWeiboApp", {
                                title: data.title || title,
                                desc: data.desc || "",
                                img_url: data.imgUrl || "",
                                link: data.link || location.href
                            }, data);
                        }
                    }, data);
                },
                onMenuShareQZone: function(data) {
                    on(eventSdkNameMap.onMenuShareQZone, {
                        complete: function() {
                            invoke("shareQZone", {
                                title: data.title || title,
                                desc: data.desc || "",
                                img_url: data.imgUrl || "",
                                link: data.link || location.href
                            }, data);
                        }
                    }, data);
                },
                getNetworkType: function(data) {
                    var formatErrMsg = function(res) {
                        var errMsg = res.errMsg;
                        res.errMsg = "getNetworkType:ok";
                        var subtype = res.subtype;
                        delete res.subtype
                        if (subtype)
                            res.networkType = subtype;
                        else {
                            var separatorIndex = errMsg.indexOf(":"),
                                status = errMsg.substring(separatorIndex + 1);
                            switch (status) {
                                case "wifi":
                                case "edge":
                                case "wwan":
                                    res.networkType = status;
                                    break;
                                default:
                                    res.errMsg = "getNetworkType:fail"
                            }
                        }
                        return res;
                    };
                    invoke("getNetworkType", {}, function() {
                        data._complete = function(res) {
                            res = formatErrMsg(res);
                        };
                        return data;
                    }());
                },
                getLocation: function(data) {
                    data = data || {};
                    invoke(eventSdkNameMap.getLocation, {
                        type: data.type || "wgs84"
                    }, function() {
                        data._complete = function(res) {
                            delete res.type
                        };
                        return data;
                    }());
                },
                hideOptionMenu: function(data) {
                    invoke("hideOptionMenu", {}, data);
                },
                showOptionMenu: function(data) {
                    invoke("showOptionMenu", {}, data);
                },
                closeWindow: function(data) {
                    data = data || {};
                    invoke("closeWindow", {}, data);
                },
                hideMenuItems: function(data) {
                    invoke("hideMenuItems", {
                        menuList: data.menuList
                    }, data);
                },
                showMenuItems: function(data) {
                    invoke("showMenuItems", {
                        menuList: data.menuList
                    }, data);
                },
                hideAllNonBaseMenuItem: function(data) {
                    invoke("hideAllNonBaseMenuItem", {}, data);
                },
                showAllNonBaseMenuItem: function(data) {
                    invoke("showAllNonBaseMenuItem", {}, data);
                },
                scanQRCode: function(data) {
                    data = data || {};
                    invoke("scanQRCode", {
                        needResult: data.needResult || 0,
                        scanType: data.scanType || ["qrCode", "barCode"]
                    }, function() {
                        data._complete = function(res) {
                            if (isIOs) {
                                var resultStr = res.resultStr;
                                if (resultStr) {
                                    var result = JSON.parse(resultStr);
                                    res.resultStr = result && result.scan_code && result.scan_code.scan_result
                                }
                            }
                        };
                        return data;
                    }());
                }
            },
            next_iOSLocalImgId = 1,
            iOS_LocalImgMap = {};

        // 兼容 iOS WKWebview 不支持 localId 直接显示图片的问题
        document.addEventListener("error", function(event) {
            if (!isAndroid) {
                var target = event.target,
                    targetTagName = target.tagName,
                    targetSrc = target.src;
                if ("IMG" == targetTagName || "VIDEO" == targetTagName || "AUDIO" == targetTagName || "SOURCE" == targetTagName) {
                    var isWxlocalresource = targetSrc.indexOf("wxlocalresource://") != -1;
                    if (isWxlocalresource) {
                        event.preventDefault(), event.stopPropagation();
                        var wxId = target["wx-id"];
                        wxId || (wxId = next_iOSLocalImgId++, target["wx-id"] = wxId);
                        if (iOS_LocalImgMap[wxId]) {
                            return;
                        }
                        iOS_LocalImgMap[wxId] = true;
                        wx.ready(function() {
                            wx.getLocalImgData({
                                localId: targetSrc,
                                success: function(res) {
                                    target.src = res.localData
                                }
                            })
                        });
                    }
                }
            }
        }, true);
        document.addEventListener("load", function(event) {
            if (!isAndroid) {
                var target = event.target,
                    targetTagName = target.tagName,
                    targetSrc = target.src;
                if ("IMG" == targetTagName || "VIDEO" == targetTagName || "AUDIO" == targetTagName || "SOURCE" == targetTagName) {
                    var wxId = target["wx-id"];
                    wxId && (iOS_LocalImgMap[wxId] = false);
                }
            }
        }, true);

        console.log('set_ready')
        window._is_coinchat_init = true;

        return isGlobalMode && (global.coinchat = global.jCoinchat = jCoinchat), jCoinchat

    }


});