import coinchat from './../../index.js'

console.log('coinchat',coinchat);
console.log('coinchat_sign',coinchat.getSign({'data':'123'}));

coinchat.ready(function(){
    console.log('this is coinchat ready callback');
})

coinchat.ready(function(){
    console.log('this is coinchat ready callback2');
})

//开始config
// var timestamp = Math.floor(new Date().getTime() / 1000);
// coinchat.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     partner_no  : '1528949462419631', // 必填，唯一标识
//     timestamp: timestamp, // 必填，生成签名的时间戳
//     nonce    : timestamp, // 必填，生成签名的随机串
// });

console.log('fetch开始');
function getPayment() {
    var form = new FormData();
    form.append('partner_no','1528949462419631');
    form.append('user_id','pRzhLlxJniGvsVjgI75x2U1eRKEQqEuyR');
    form.append('eth_fee','0.001');
    form.append('coin','eth');
    form.append('coin_amount','1.2');
    form.append('remark','测试支付');
    form.append('debug_skip_partner_signture','1');

    var url = 'http://api.coinchat.com/v1/entrust_wallet/deposit/add.html'
    fetch(url,{
        credentials: 'same-origin',
        method: 'POST', 
        body: form 
    }).then(response => {
        // console.log('typeof',typeof response,response,);
        if (typeof response == 'object' && !response.json) {
            return response
        }else {
            return response.json()
        }
    })
    .then(json => {
        console.log('json',json)

        coinchat.entrustPay({'deposit_no':json.data.deposit.deposit_no})
    })
}

coinchat.getPayment = getPayment
export default coinchat;