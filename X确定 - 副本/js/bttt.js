       $(function() {

           $("#apl_btn").find("li").eq(0).addClass("ap_lino");


           $("#apl_btn").find("li").click(function () {
               //控制vip选中
               $(this).addClass("ap_lino").siblings().removeClass("ap_lino");

               var _index = $(this).index();
               $("#ap_right").find(".hide").eq(_index).fadeIn().siblings().hide();
               $("#ap_right").show();
               $("#apr_bt").hide();

               $("#apl_btnr").find("li").removeClass("ap_lir");

           });

           $("#apl_btnr").find("li").click(function () {
               $(this).addClass("ap_lir").siblings().removeClass("ap_lir");
               var _index = $(this).index();
               $("#apr_bt").find(".wind").eq(_index).fadeIn().siblings().hide();
               $("#ap_right").hide();
               $("#apr_bt").show();
               $("#apl_btn").find("li").removeClass("ap_lino");


           });

           //banner

           var index = 0;
           //默认第一个
           $("#circular_btn").find("li").eq(0).addClass("white").siblings().removeClass("white");

           // 点击circular_btn
            $("#circular_btn").find("li").click(function(){
                var _index = $(this).index();
                $(this).addClass("white").siblings().removeClass("white");
                $("#b_pic").find("li").eq(_index).fadeIn("slow").siblings().hide();
                index=_index;
            });
            //点击.left-ear
            $(".left-ear").click(function () {
                index--;
                var length = $("#b_pic").find("li").length;
                if (index < 0) {
                    index = length - 1;
                }
                $("#b_pic").find("li").eq(0).fadeIn("slow").siblings().hide();
                $("#b_pic").find("li").eq(index).fadeIn("slow").siblings().hide();
            });
           //点击right-ear
           $(".right-ear").click(function () {
             index++;
              var length = $("#b_pic").find("li").length;
              if (index >= length) {
                    index = 0;
             }
            $("#b_pic").find("li").eq(0).fadeIn("slow").siblings().hide();
            $("#b_pic").find("li").eq(index).fadeIn("slow").siblings().hide();
            $("#circular_btn").find("li").eq(index).addClass("white").siblings().removeClass("white");
            });
           //滑动事件
           $("#b_btn").hide();

           //自动执行
           var iCount = setInterval(GetBack, 3000);

            function GetBack(){
               index++;
               var length = $("#b_pic").find("li").length;
               if (index >= length) {
                   index = 0;
               }
               $("#b_pic").find("li").eq(0).fadeIn("slow").siblings().hide();
               $("#b_pic").find("li").eq(index).fadeIn("slow").siblings().hide();
               $("#circular_btn").find("li").eq(index).addClass("white").siblings().removeClass("white");
           };


           $(".b_bg").hover(function () {

               $("#b_btn").fadeIn();
               clearInterval(iCount);

           }, function () {
               $("#b_btn").hide();
               iCount = setInterval(GetBack, 3000);
           });




           // 关注我们
           $("#fo_li_sh").hover(function(){
                          $(".we_qr").show();
               },function(){
               $(".we_qr").hide();
           });

       });
//index-2
$(function(){
    //六角形
    $("#small_eq").find(".box_hex").find("a").hover(function(){
        $(this).siblings().eq(1).addClass("blue");
        $(this).siblings().eq(0).addClass("blue_one");
        $(this).siblings().eq(2).addClass("blue_three");
    },function(){
        $(this).siblings().eq(1).removeClass("blue");
        $(this).siblings().eq(0).removeClass("blue_one");
        $(this).siblings().eq(2).removeClass("blue_three");
    });
    //六角形隐藏+显示
    $("#qz_btn").find("a").eq(0).hover(function(){
        $(".con_btn").hide();
        $("#small_eq").fadeIn("slow");
    });
    $("#small_eq").hover(function(){

    },function(){
        $("#small_eq").hide();
        $(".con_btn").fadeIn("slow");
    });
   //
    $("#journalism").find("a").hover(function(){
        _index = $(this).index();
        $("#journalism").find("a").eq(_index).addClass("url").siblings().removeClass("url");

    });
    //
    $(".con_ln").hover(function(){
        $(".ln_btn").fadeIn("slow");
        $(".con_ln").fadeOut("slow");
        $(".con_conter").fadeOut("slow");
    });
    $(".ln_btn").hover(function(){

    },function(){
        $(".ln_btn").fadeOut("slow");
        $(".con_ln").fadeIn("slow");
        $(".con_conter").fadeIn("slow");
    });
 //
  var height=$(window).height();
    if(height<=500){
        $(".two_bot").hide();
    }
    var  he = $(".con_btn").height();
    var top=(height-he)/2-100;
    $(".con_btn").attr("style","margin-top:"+top+"px");
    $(window).resize(function() {
        height=$(window).height();
         if(height<=500){
             $(".two_bot").hide();
         }else{
             $(".two_bot").show();
         }
        //bug  修改

       var  he = $(".con_btn").height();
        var top=(height-he)/2-100;
        $(".con_btn").attr("style","margin-top:"+top+"px");
    });
    //
    $(".ihn_lia ").hover(function(){
        $(this).addClass("ihn_lio").parent().siblings().find("a").removeClass("ihn_lio");
    });
    // small_eq居中


    var win=$(window).width();
    var wh=$("#small_eq").width();
    var sh=$("#small_eq").height();
    var left =(win-wh+124)/2;
    var tops=(height-he)/2-160;
    $("#small_eq").css({
        "margin-top":+tops,
        "margin-left":+left
    });
    $(window).resize(function() {
        var win=$(window).width();
        var wh=$("#small_eq").width();
        var sh=$("#small_eq").height();
        var left =(win-wh+124)/2;
        var tops=(height-he)/2-160;
        $("#small_eq").css({
            "margin-top":+tops,
            "margin-left":+left
        });
    })

window.onload = function(){
      var looping =document.getElementById("looping");
      looping.style.display = "none";
}


    });
