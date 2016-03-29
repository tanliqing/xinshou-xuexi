 window.onload =function(){
        //选项卡切换，为每个子节点添加移入事件，为每个子节点清除样式，再给当前节点添加样式
        function tabSwitch(element1,element2,class1,class2){
        for(var o=0;o<element1.length;o++){
        element1[o].index = o;
        element1[o].onmouseover = function (){
          for(var u=0;u<element1.length;u++){
            element1[u].className = "";
            element2[u].className = "";
          }
         this.className = class1 ;
         element2[this.index].className = class2;
        }
      }}
       var leftText = document.getElementById("left-text").children;
        var rightImg = document.getElementById("right-img").children;
       tabSwitch(leftText,rightImg,"left-border","show");
       //获取节点，输入参数并运行
       var headNotice = document.getElementById("tabs").children;
       var bodyText = document.getElementById("body-text").children;
       tabSwitch(headNotice,bodyText,"border-bottom","show");

       //头像选项卡切换，鼠标移入某个头像时，切换背景头像的样式
       function tabSwitch2(element1,element2,class1,class2){
        for(var o=0;o<element1.length;o++){      
        element1[o].index = o;
        element1[o].onmouseover = function (){
          for(var u=0;u<element1.length;u++){
            element1[u].className = "role"+(u+1);
            element2[u].className = "";
          } 

        this.className = "role"+(this.index+1)+" "+class1 ;
         element2[this.index].className = class2;
        }
      }}
       var roleData = document.getElementById("roledata").children;
       var dataDetails = document.getElementById("datadetails").children;
       tabSwitch2(roleData,dataDetails,"relay","show");


       //轮播图
       var curIndex = 0 ;
       var imgLen = $(".slider li").length;

      var autoChange = setInterval(function(){
      if(curIndex < imgLen-1){
         curIndex++;
      }else{
        curIndex=0;
      }
      changeTo(curIndex);
    },3000);
      
      //当鼠标触碰白点时，重置定时器
      function autoChangeAlign(){
       autoChange = setInterval(function(){
      if(curIndex < imgLen-1){
         curIndex++;
      }else{
        curIndex=0;
      }
      changeTo(curIndex);
    },3000);
    }

     function changeTo(num){
          var goLeft = num * 565;    
          $(".slider").animate({left: "-" + goLeft + "px"},500);      
          $("#slider-num").find("li").removeClass("on").eq(num).addClass("on");
            } 
    
     //对右下角按钮index进行事件绑定处理等  
     $("#slider-num").find("li").each(function(item){     
      $(this).hover(function(){       
        clearInterval(autoChange);      
        changeTo(item);      
        curIndex = item;    
      },function(){       
        autoChangeAlign();    
      });  
     });
   }

   