import coinchat from './../../index.js'

console.log('coinchat',coinchat);
console.log('coinchat_sign',coinchat.getSign({'data':'123'}));

coinchat.ready(function(){
    console.log('this is coinchat ready callback');
})

coinchat.ready(function(){
    console.log('this is coinchat ready callback2');
})

export default coinchat;