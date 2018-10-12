window.onload = function(){
    var fileInput = document.getElementById('img-file'),
        selectBtn = document.getElementById('select'),
        saveBtn = document.getElementById('saveImg'),
        leftCanvas = document.getElementById('previewImg'),
        mask = document.querySelector('.mask');

    var leftImg = leftCanvas.getContext('2d');
    var img=null;
    selectBtn.addEventListener('click', function(){
        fileInput.click();
    });

    mask.addEventListener('click', function(e) {
        if(e.target && e.target.nodeName.toUpperCase() === 'SPAN'){
            this.style.visibility = 'hidden';
        }else if(e.target && e.target.id === 'saveImg'){
            convertCanvasToImg(theCanvas);
            console.log(e.target);
        }
    })

    fileInput.addEventListener('change', function(){
        var imageData = fileInput.files[0];
        var reader = new FileReader();
        img = null;
        img = new Image();

        if(!fileInput.value){
            console.log('no file');
            return;
        }

        if(imageData.type !== 'image/jpeg' && imageData.type !== 'image/jpg' && imageData.type !== 'imgage/gif'){
            console.log('not a image!');
            return;
        }

        reader.readAsDataURL(imageData);

        reader.onload = function(e){
            img.src = e.target.result;
        }
        img.onload = function(){

            rate = this.width / this.height;
            this.width = 500;
            this.height = this.width / rate;
            W = this.width;
            H = this.height;
            leftCanvas.width = this.width;
            leftCanvas.height = this.height;

            leftImg.drawImage(img, 0, 0, leftCanvas.width, leftCanvas.height);
            theCanvas.width = curData.width;
            theCanvas.height = curData.height;
            canvasImg.putImageData(curData, 0, 0);
        }

    });
    //截取部分展示所用canvas
    var theCanvas = document.getElementById('imgCanvas');
    var canvasImg = theCanvas.getContext('2d');
    var curData = leftImg.getImageData(0, 0, 500, 500);

    var flag = false,
        W = null,
        H = null,
        rate = 1;
        startX = 0,
        startY = 0;

    //当鼠标点击时获得鼠标起点坐标
    leftCanvas.addEventListener('mousedown', function(e){
        flag = true;
        startX = e.offsetX;
        startY = e.offsetY;
    });

    //当鼠标移动时
    leftCanvas.addEventListener('mousemove', function(e){
        if(flag){
            try{
                leftImg.clearRect(0, 0, W, H);
                leftImg.drawImage(img, 0, 0, W, H);
                leftImg.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
                canvasImg.clearRect(0, 0, curData.width, curData.height);//清空预览区
                curData = leftImg.getImageData(startX, startY, e.offsetX - startX, e.offsetY - startY);
                theCanvas.width = curData.width;
                theCanvas.height = curData.height;
                canvasImg.putImageData(curData, 0, 0);
            }catch(error){
                    ;//console.log(error);

            }
        }
    });
    leftCanvas.addEventListener('mouseup', function(e){
        flag = false;
        leftImg.clearRect(0, 0, W, H);
        leftImg.drawImage(img, 0, 0, W, H);
        showResult(mask);
    });


}
function showResult(mask) {
    mask.style.visibility = 'visible';
}
function convertCanvasToImg(canvas){
    // var img = new Image();
    // img.src = canvas.toDataURL('image/jpg').replace('image/png', 'image/octet-stream');
    // img.name = '1.jpg';
    // window.location.href = img.src
    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpg');
    a.download = 'cut.jpg';
    a.click();
}
