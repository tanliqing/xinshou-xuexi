/**
 * Created by Administrator on 2016/5/13.
 */
var register = document.getElementById("register").getElementsByTagName("input"),
    affirm  = document.getElementById("affirm");
affirm.onclick = function(){
    for(var i= 0,item=register.length;i<item;i++){
        if(register[i].value == ""){
            alert("不能为空");
            return false;
        }
    }
    var reg = /0?(13|14|15|18)[0-9]{9}/ ;
    if(!reg.test(register[0].value)){
        alert("请输入正确的手机号");
        return false;
    }
}