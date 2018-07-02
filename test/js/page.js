console.log('coinchat接口');
console.log('coinchat',coinchat);

// var coinchat = coinchatInit();


coinchat.ready(function(){
    console.log('coinchat签名通过')
    show_toast();
});

coinchat.error(function(){
    console.log('coinchat签名错误')
});

function show_toast() {
    console.log('show_toast');
    coinchat.showToast({'msg':'123'});
}

function coinchat_config() {
    console.log('coinchat_config');
    var timestamp = new Date().getTime();
    coinchat.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        partner_no  : '1528949462419631"', // 必填，唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonce    : 'xxr', // 必填，生成签名的随机串
    });
}
/*
coinchat.startCCPay({
    timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: '', // 支付签名随机串，不长于 32 位
    package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: '', // 支付签名
    success: function (res) {
    // 支付成功后的回调函数
    }
});
coinchat.startCCPayByContract({
    timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: '', // 支付签名随机串，不长于 32 位
    package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: '', // 支付签名
    success: function (res) {
    // 支付成功后的回调函数
    }
});
*/