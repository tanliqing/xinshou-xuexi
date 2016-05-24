/**
 * Created by Administrator on 2016/5/20.
 */
window.onload = function(){
    var release = document.getElementById("release"),
        releaseInput = release.getElementsByTagName("input"),
        releaseText = release.getElementsByTagName("textarea")[0];
    var releaseA = document.getElementById("release").getElementsByTagName("a")[0];
    var reg = /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/ ;
    releaseInput[2].onchange  =  function(){
        if(!reg.test(releaseInput[2].value)){
            releaseInput[2].value = "";
        }
    }

    releaseA.onclick = function(){

        for(var i= 0,item =releaseInput.length;i<item;i++){

            if(releaseInput[i].value == ""){
                alert("需填写全部内容后再进行发布");
                return false;
            }
            if( releaseText.value == ""){
                alert("需填写全部内容后再进行发布");
                return false;
            }

        }
    }
}