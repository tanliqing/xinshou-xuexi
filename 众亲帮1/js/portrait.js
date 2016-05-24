/**
 * Created by Administrator on 2016/5/17.
 */

jQuery(function() {
    var $ = jQuery,
        $list = $('#fileList'),

    // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        thumbnailWidth = 500 * ratio,
        thumbnailHeight = 500 * ratio,

    // Web Uploader实例
        uploader;



    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 自动上传。
        auto: false,
        // swf文件路径
        swf:'css/Uploader.swf',

        //以二进制
        sendAsBinary:false,

        // 文件接收服务端。
        server: "",//以后补上

        //图片压缩质量
       quality:70,

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {


        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            var portrait = document.getElementById("portrait");
            portrait.setAttribute("src",src);
            console.log(src);
        });

    });
    // 文件上传失败，现实上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });
});
