window.onload = function () {
      var imgs = document.querySelectorAll('.img'),
        img_container = document.querySelector('.banner'),
        menu_icon = document.querySelector('.left-menu'),
        menu = document.querySelector('.menu'),
        flag = 0,
        timer = null;
      if(window.innerWidth < 767){
        var banner_imgs = img_container.querySelectorAll('img');
        for(var i=0;i<banner_imgs.length;i++){
          banner_imgs[i].src = banner_imgs[i].src.replace('banner', 'm-banner');
        }
        banner_imgs = null;
      }
      start();


      function showOrHideMenu(event) {
      if(event.target && event.target.nodeName.toUpperCase() === 'IMG') {
        if (menu.className.indexOf('show-menu') != -1) {
          menu.className = menu.className.replace(' show-menu', '');
        }else{
          menu.className += ' show-menu';
        }
      }
    }
    function render(index){//也可定义@keyframe，通过切换css类实现图片消失与出现。
        for(var i=0;i<imgs.length;i++){
          imgs[i].className = imgs[i].className.replace(/\s*on/, '');
        }
        imgs[index].className += ' on';
    }

    function play(){
      timer=setInterval(function(){
            if (flag==imgs.length-1) {
                flag=0;
            }else{
                flag++;
            }
            render(flag);
        },5000);
    }

    function btnClick(event) {
      if(event.target && event.target.nodeName.toUpperCase() === 'SPAN') {
        if(event.target.className.toUpperCase() === 'GO-LEFT'){
          flag = flag == 0 ? imgs.length - 1 : flag -1;
        }else{
          flag = flag == imgs.length - 1 ? 0 : flag + 1;
        }
        render(flag);
      }
    }
    function stop(){
      clearInterval(timer);
    }
    function start(){
      img_container.addEventListener('click', btnClick, false);
      img_container.addEventListener('mouseenter', stop, false);
      img_container.addEventListener('mouseleave', play, false);
      menu_icon.addEventListener('click', showOrHideMenu, false);
      play();
    }
}
