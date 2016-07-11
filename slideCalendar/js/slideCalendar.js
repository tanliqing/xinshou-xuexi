function slideCalendar(){
    //输出到DOM节点
    this.id = document.getElementById("slideCalendar");
    //初始化年份
    this.year = [2000,2020];
    //初始化日期,默认当前最新时间，输入格式是new Date(2014,6,5) ，月份是从0开始算的，0=1月……
    this.initDate = new Date();
    //绑定到某个id上，点击显示，将返回的值传给该ID
    this.binding = document.getElementById("new-date");
}
slideCalendar.prototype = {
    //初始化
    init:function(){
        this.initNewDate();
        this.slide();
        //this.confirm();
        this.click();
    },
    //保存年，月，日，方便后续调用
    keepNewDate:[],
    //上下滑动选择
    slide: function () {
        //定时器
        var timer,timer2,timer3;
        var ul = this.id;
        var slideCalendar = this;
        ul.addEventListener("touchstart", function (e) {
            var slideUl = e.target.parentNode.getAttribute("class");
            if (slideUl == "date-year" || slideUl == "date-month" || slideUl == "date-day") {
                //每次点击时先清除定时器
                clearInterval(timer);
                clearInterval(timer2);
                clearInterval(timer3);
                //获取首次触碰的坐标，后续计算移动的距离
                var jl = e.touches[0].pageY;
                var eNumber = e.target.parentNode.getAttribute("style");
                e.preventDefault();
                //手指移动时，不断刷新当前元素的坐标
                ul.addEventListener("touchmove", function (e) {
                    var slideUl = e.target.parentNode.getAttribute("class");
                    if (slideUl == "date-year" || slideUl == "date-month" || slideUl == "date-day") {
                        var top = -(jl-e.touches[0].pageY)/2;
                        if(eNumber){
                            var sum  = parseFloat(eNumber.slice("4","-2"))+top;
                            e.target.parentNode.setAttribute("style","top:"+sum+"px");
                        }else{
                            e.target.parentNode.setAttribute("style","top:"+top+"px");
                        }
                    }
                })
            }
        });
        ul.addEventListener("touchend",function(e){
            var slideUl = e.target.parentNode.getAttribute("class");
            if (slideUl == "date-year" || slideUl == "date-month" || slideUl == "date-day") {
                var timerNumber = 0;
                var liHeight = e.target.offsetHeight;
                var eNumber = e.target.parentNode.getAttribute("style");
                var sum = parseFloat(eNumber.slice("4","-2"));
                var reduce = Math.round(sum/liHeight)*liHeight;
                var reduceSum = reduce-sum;
                //限制拖动的范围，超出最大距离，进行回滚
                var limitHeight = -(e.target.parentNode.offsetHeight - e.target.parentNode.parentNode.offsetHeight);
                var newTop = e.target.parentNode.getAttribute("style");
                var newSum = parseFloat(newTop.slice("4","-2"));
                var round = Math.round(newSum/liHeight)*liHeight;
                if(newSum>e.target.offsetHeight){
                    timer3 = setInterval(function(){
                        var newENumber = e.target.parentNode.getAttribute("style");
                        var newSum = parseFloat(newENumber.slice("4","-2"));
                        var jg = (e.target.offsetHeight-newSum)/8;
                        var njl = jg > 0 ?Math.ceil(jg):Math.floor(jg);
                        e.target.parentNode.setAttribute("style","top:"+Math.ceil(njl+newSum)+"px");
                        if(njl >= 0){
                            var selectNumber = parseFloat(e.target.parentNode.getAttribute("style").slice("4","-2"));
                            slideCalendar.slideDate(selectNumber,e);
                            clearInterval(timer3);
                        }
                    },"10");
                }else if(round < limitHeight-e.target.offsetHeight){
                    timer2 = setInterval(function(){
                        var newENumber = e.target.parentNode.getAttribute("style");
                        var newSum = parseFloat(newENumber.slice("4","-2"));
                        var offParentHeight = -( e.target.parentNode.offsetHeight - e.target.offsetHeight -e.target.offsetHeight);
                        var jg = (offParentHeight-newSum)/8;
                        var njl = jg > 0 ?Math.ceil(jg):Math.floor(jg);
                        e.target.parentNode.setAttribute("style","top:"+Math.ceil(njl+newSum)+"px");
                        if(njl == offParentHeight || njl==0){
                            var selectNumber = parseFloat(e.target.parentNode.getAttribute("style").slice("4","-2"));
                            slideCalendar.slideDate(selectNumber,e);
                            clearInterval(timer2);
                        }
                    },"10");
                }else{
                    //当手指离开屏幕时，触发回调动画效果
                    timer = setInterval(function(){
                        if(reduceSum>0.5){
                            timerNumber =timerNumber+0.5;
                        }else if(reduceSum<(-0.5)){
                            timerNumber =timerNumber-0.5;
                        }
                        e.target.parentNode.setAttribute("style","top:"+Math.ceil(sum+timerNumber)+"px");
                        if(reduceSum == timerNumber){
                            var selectNumber = parseFloat(e.target.parentNode.getAttribute("style").slice("4","-2"));
                            slideCalendar.slideDate(selectNumber,e);
                            clearInterval(timer);
                        }
                    },"10");
                }
            }
        })
    },
    //滑动时，判断坐标，获取当前时间
    slideDate:function(slectNumber,e){
        /*获取父元素的高度+当前top的偏移量，再获取父元素的高度+额外一个子元素的高度（因为是要取居中li的坐标）。两者向减，
         最后除以li的高度，并转换成绝对值，得到当前坐标的索引值*/
        var thisIndex =  Math.abs(((e.target.parentNode.offsetHeight + slectNumber) - (e.target.parentNode.offsetHeight+ e.target.offsetHeight)) / e.target.offsetHeight);
        var ul = e.target.parentNode;
        var liLen = ul.getElementsByTagName("li");
        for(var i= 0,item=liLen.length;i<item;i++){
            liLen[i].setAttribute("class","");
        }
        liLen[thisIndex].setAttribute("class","select");
        if(ul.getAttribute("class") == "date-year"){
            this.keepNewDate[0] =  liLen[thisIndex].innerText;
        }else if(ul.getAttribute("class") == "date-month"){
            this.keepNewDate[1] =  liLen[thisIndex].innerText;
        }else{
            this.keepNewDate[2] =  liLen[thisIndex].innerText;
        }
        this.month(liLen[thisIndex]);
    },
    //初始化内容
    initNewDate:function(){
        //初始化结构
        var slideCalendar = this.id;
        slideCalendar.innerHTML ="<div class='control'><span id='Calendar-hidden'>取消</span><span id='Calendar-confirm'>确定</span></div><ul class='date-tile'><li>年</li><li>月</li><li>日</li></ul><div class='date-d'> <ul class='date-year' id='date-year'></ul><ul class='date-month' id='date-month'></ul><ul class='date-day' id='date-day'></ul>";
        //初始化年份
        var year = document.getElementById("date-year");
        year.innerHTML = null;
        for(var i=this.year[0];i<this.year[1];i++){
            year.innerHTML += "<li>"+i+"</li>";
        }
        this.keepNewDate[0] = this.initDate.getFullYear();
        this.keepNewDate[1] = this.initDate.getMonth()+1;
        this.keepNewDate[2] = this.initDate.getDate();
        //初始化月份
        var month = document.getElementById("date-month");
        month.innerHTML = null;
        for(var z=1;z<13;z++){
            month.innerHTML += "<li>"+z+"</li>";
        }
        var day = document.getElementById("date-day");
        day.innerHTML=null;
        //初始化天数
        for(var d=1;d<32;d++){
            var newDate = new Date(this.keepNewDate[0],this.keepNewDate[1],d);
            if(d>25 && newDate.getDate()<5){
                continue;
            }
            day.innerHTML+="<li>"+newDate.getDate()+"</li>";
        }
        //初始化ul的top和select
        function initTop(li,dateNumber){
            var monthLi = li.getElementsByTagName("li");
            for(var m= 0,item2=monthLi.length;m<item2;m++){
                if(monthLi[m].innerText ==  dateNumber){
                    var top2 = m * monthLi[m].offsetHeight -monthLi[m].offsetHeight;
                    monthLi[m].setAttribute("class","select");
                    li.setAttribute("style","top:"+(-top2)+"px");
                    break;
                }
            }
        }
        initTop(year,this.keepNewDate[0]);
        initTop(month,this.keepNewDate[1]);
        initTop(day,this.keepNewDate[2]);
    },
    //滑动年or月时，重置天
    month:function(date1){
        if(date1.parentNode.getAttribute("class") == "date-month"){
            day(date1,this.keepNewDate[0],this.keepNewDate[2]);
        }else if(date1.parentNode.getAttribute("class") == "date-year"){
            day(this.keepNewDate[1],this.keepNewDate[0],this.keepNewDate[2]);
        }
        function day(date,dateN,date2){
            var day = document.getElementById("date-day");
            day.innerHTML = null;
            console.log();
            for(var i=1;i<32;i++){
                if(date.innerText){
                    var newDate = new Date(dateN,date.innerText-1,i);
                }else{
                    var newDate = new Date(dateN,date-1,i);
                }
                if(i>25 && newDate.getDate()<5){
                    continue;
                }
                day.innerHTML+="<li>"+newDate.getDate()+"</li>";
            }
            //防止当前天数的高小于top的值
            var dateDay = document.getElementById("date-day");
            var dateDayLiH = dateDay.getElementsByTagName("li")[0].offsetHeight;
            if(dateDay.getAttribute("style")){
                var dayTop = dateDay.getAttribute("style");
                var dateDayTop  = parseFloat(dayTop.slice("4","-2"));
                if(dateDay.offsetHeight-dateDayLiH <= Math.abs(dateDayTop)){
                    dateDay.setAttribute("style","top:"+(-(dateDay.offsetHeight-dateDayLiH*2))+"px");
                }
                //当坐标改变时，重新获取当前坐标内天数的值
                var newTop = parseFloat(dateDay.getAttribute("style").slice("4","-2"));
                var thisIndex =  Math.abs(((dateDay.offsetHeight + newTop) - (dateDay.offsetHeight+ dateDayLiH)) / dateDayLiH);
                dateDay.getElementsByTagName("li")[thisIndex].setAttribute("class","select");
                date2 = dateDay.getElementsByTagName("li")[thisIndex].innerText;
            }
        }
    },
    //确定按钮，点击返回当前选择日期
    /*confirm:function(){
     var confirm1 =  document.getElementById("confirm");
     var parentThis = this;
     confirm1.addEventListener("click",function(){
     console.log(parentThis.keepNewDate.join("-"))
     })
     },*/
    //绑定到input上，点击显示
    click:function(){
        var Calendar = this;
        Calendar.id.setAttribute("style","display:none");
        this.binding.addEventListener("click",function(){
            Calendar.id.setAttribute("style","display:block");
        });
        document.getElementById("Calendar-hidden").addEventListener("click",function(){
            Calendar.id.setAttribute("style","display:none");
        })
        document.getElementById("Calendar-confirm").addEventListener("click",function(){
            Calendar.binding.value = Calendar.keepNewDate.join("-");
            Calendar.id.setAttribute("style","display:none");
        })
    }
};
var Calendar = new slideCalendar();
Calendar.init();