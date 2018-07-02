COINCHAT JS SDK文档
====

如何使用
----

注意：cmd和amd的加载方式将在近期给出，暂只支持普通的加载方式。

1. 在网页中引入./src/build/index.js的JS文件。
2. 在网页前端调用coinchat.config()接口来执行config动作。
3. 完成后在coinchat.ready()中传入config完成后的执行代码。

示例
----

1.网页引入JS文件
>       <script src="../src/build/js/index.js"></script>

2.在服务器通过API_KEY和SECRET_KEY签名，把签名后的sign传入网页，具体签名文档见[签名文档](https://github.com/coinchat/docs/blob/master/zh/%E5%95%86%E6%88%B7%E7%9B%B8%E5%85%B3API.md)

3.在网页上执行config动作

>   
    coinchat.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        partner_no  : '1528949462419631"', // 必填，唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonce    : 'nonce_str', // 必填，生成签名的随机串
        sign     : 'ad4b36a22f78c6d9409dd21644702cc6ec9c0b08a9d1b00cd0c2436bd9fbd58f'
    });

4.在网页上用coinchat.ready(function(){}) 来执行你的代码。


>   
    coinchat.ready(function(){
        console.log('coinchat签名通过')
        coinchat.getLoginUserInfo({},function(res){
            console.log('获得的用户信息是',res)
        });
    });
    
JS-SDK方法
----

###  获得登录用户信息
coinchat.getLoginUserInfo


>   
    coinchat.ready(function(){
        console.log('coinchat签名通过')
        coinchat.getLoginUserInfo({},function(res){
            console.log('获得的用户信息是',res)
        });
    });
    
###  支付订单
coinchat.payOrder


    
###  支付订单（调用智能合约）
coinchat.payOrderWithContract

