COINCHAT JS SDK文档
====

如何使用
----

传统用法
1. 在网页中引入./src/build/index.js的JS文件。
2. 在网页前端调用coinchat.config()接口来执行config动作。
3. 完成后在coinchat.ready()中传入config完成后的执行代码。

目前最新版本号为0.1.3 （测试版，尚不能用于生产环境）


模块引入

    npm install coinchat-js-sdk

在文件中引入

    import coinchat from 'coinchat-js-sdk'



示例
----

1.网页引入JS文件
    
    <script src="../src/build/js/index.js"></script>

2.在服务器通过API_KEY和SECRET_KEY签名，把签名后的sign传入网页，具体签名文档见[签名文档](https://github.com/coinchat/docs/blob/master/zh/%E5%95%86%E6%88%B7%E7%9B%B8%E5%85%B3API.md)

3.在网页上执行config动作

    coinchat.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        partner_no  : '1528949462419631"', // 必填，唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonce    : 'nonce_str', // 必填，生成签名的随机串
        sign     : 'ad4b36a22f78c6d9409dd21644702cc6ec9c0b08a9d1b00cd0c2436bd9fbd58f'
    });

4.在网页上用coinchat.ready(function(){}) 来执行你的代码。

    coinchat.ready(function(){
        console.log('coinchat签名通过')
        coinchat.getLoginUserInfo();
    });
    
JS-SDK方法
----

###  获得是否在Coinchat中打开

    coinchat.isCoinchat();


###  获得Coinchat当前版本号

    coinchat.getVersion();

###  获得Coinchat当前的语言环境

    coinchat.getLanguage();

###  获得签名

    coinchat.getSign(data,api_secret);


###  获得登录用户信息
需要config后才可以调用用户登录信息

    coinchat.getLoginUserInfo({
        'success' : function(res) {
            console.log('获得用户成功',res)
            var user = res.data;
            console.log('user',user)
        },
        'fail'    : function(res) {
            console.log('获得用户失败',res);
        }
    })


###  支付订单(至第三方托管账户)
需要config后才可以调用支付

    coinchat.entrustPay({
        'deposit_no':json.data.deposit.deposit_no,
        'timestamp':timestamp,
        'nonce':timestamp,
        'partner_no':'1528949462419631',
        'callback_url' : 'your callback notify url',
        'success' : function(res) {
            console.log('支付成功',res)
       },
       'fail'    : function(res) {
            console.log('支付失败',res);
       }
    })

支付的订单号deposit_no需要由服务器端通过API“/v1/entrust_wallet/deposit/add.html”下单后得到
支付成功会回调你设置的回调地址。

同时提供了退款，执行智能合约的API。在[API文档](https://github.com/coinchat/docs/blob/master/zh/%E6%89%98%E7%AE%A1%E9%92%B1%E5%8C%85API%E5%8F%8A%E6%B5%81%E7%A8%8B.md)可以查看。

###  支付订单(至商家账户余额)
需要config后才可以调用支付

    coinchat.Pay({
        'order_no'  :'order_no',
        'timestamp' :timestamp,
        'nonce'     :timestamp,
        'partner_no':'1528949462419631',
        'callback_url' : 'your callback notify url',
        'success'   : function(res) {
            console.log('支付成功',res)
       },
       'fail'    : function(res) {
            console.log('支付失败',res);
       }
    })

支付的订单号order_no需要由服务器端通过API“/v1/pay/order/add.html”下单后得到
支付成功会回调你设置的回调地址


#### 关于“支付订单”2个接口，“至第三方托管账户“和“至商家账户余额“的区别和使用场景说明。

简单的说，支付至第三方托管账户仅提供给智能合约提供商，需要让用户去执行智能合约的第三方来调用。

* 支付至第三方托管账户代表的是金额存入了一个小的热钱包，商家拥有完全的管理权限，可以调用接口执行转账，发起智能合约等操作。Coinchat仅托管了此钱包，对于商家发起的任意请求，都会签名发布到网络上。在发起转账，调智能合约等请求，都需要此钱包额外的支付矿工费用。因此在最初存入的时候，请预估好未来需要的矿工费。
* 支付至商家账户，商家立即可以获得收款，此笔收款提现在商户账户上；此账户仅可转账给商家创建人的Coinchat个人账户，转账到创建人账户并不会收取手续费，在实际提现的时候才会有手续费。







