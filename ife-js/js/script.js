/**
 * Created by Administrator on 2016/4/15.
 */
window.onload = function(){
    var popUpButton = document.getElementById("pop-up");
    popUpButton.addEventListener("click",popUp,false);
    var div = document.getElementById("pop-up-text");
    div.style.left =  (document.documentElement.clientWidth/2-200)+"px";
    div.style.top = (document.documentElement.clientHeight/2-100)+"px";
    div.onmousedown = function (e) {
        mouseDown(this, e);
    }
    div.onmousemove = function (e){
        mouseMove(e);
    }
    div.onmouseup = function (e) {
        mouseUp(e);
    }
    tableNumber();
}
function popUp(){
    //设置弹出层和遮罩层的显示
    var popUpText = document.getElementById("pop-up-text");
    var body1 = document.getElementById("layer");
    popUpText.style.display = "block";
    body1.style.display = "block";

    //设置弹出层的确定和取消（均是关闭弹出层和隐藏遮罩层）
    var confirm = document.getElementById("confirm");
    var countermand = document.getElementById("countermand");
    confirm.onclick = function(){
        show(popUpText,body1);
    }
    countermand.onclick = function(){
        show(popUpText,body1);
    }
    body1.onclick = function(){
        show(popUpText,body1);
    }
}
function show(element1,element2){
    element1.style.display = "none";
    element2.style.display = "none";
    return false;
}
var div = document.getElementById("pop-up-text");

var mouseX,mouseY;
var objX,objY;
var isDowm = false;
function mouseDown(obj,e){
    obj.style.cursor = "move";
    objX = div.style.left;
    objY = div.style.top;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isDowm = true;
}
function mouseMove(e) {
    var div = document.getElementById("pop-up-text");
    var x = e.clientX;
    var y = e.clientY;

    if (isDowm==true) {
        console.log(objX);
        console.log(x);
        console.log(mouseX);
        div.style.left = parseInt(objX) + parseInt(x) - parseInt(mouseX) + "px";
        div.style.top = parseInt(objY) + parseInt(y) - parseInt(mouseY) + "px";
    }
}
function mouseUp(e) {
    if (isDowm) {
        var x = e.clientX;
        var y = e.clientY;
        var div = document.getElementById("pop-up-text");
        div.style.left = parseInt(x) - parseInt(mouseX) + parseInt(objX) + "px";
        div.style.top = parseInt(y) - parseInt(mouseY) + parseInt(objY) + "px";
        div.style.cursor = "default";
        isDowm = false;
    }
}

var table = document.getElementById("table");
var tableTh = table.getElementsByTagName("tr")[0].children;
var tableTr = document.getElementById("table").getElementsByTagName("tr");
    for(var i=1;i<tableTh.length;i++){
    tableTh[i].onclick = function(){
        var number2 = index(tableTh,this);
        console.log(number2);
        tableSort(number2);
 }
 }
//查找子元素在父元素的索引位置并返回索引位置的值
function index(obj,obj2){
    for(var i=0;i<obj.length;i++){
        if(obj[i] == obj2){
            return i;
        }
    }
}
var tableData = [["张三","2","88","20"],["李四","8","46","57"],["王明","9","75","10"],["李红","1","78","55"],["红","6","8","5"]];
//控制数值的排序方式（从大到小或者从小到大）
var atty = false;
//执行数值排序并重新输出到HTML
function tableSort(number){
   if(atty == false){
       tableData.sort (function (a, b)
       {
           var x = a[number], y = b[number];
           return x - y ;
       });
       atty = true;
   }else{
       tableData.sort (function (a, b)
       {
           var x = a[number], y = b[number];
           return  y - x;
       });
       atty = false;
   }
    //console.log(tableData[number]);
    for(var u=1;u<tableTr.length;u++) {
        tableTr[u].innerHTML = null;
    }
    tableOutput();
}
//输出数组的总分并添加到数组的末尾
function tableNumber(){
for(var i=0; i<tableData.length;i++){
    var numBer=0;
    for(var j=0;j<tableData[i].length;j++){
        //判断是否为数值
        if(!isNaN(tableData[i][j])){
            numBer += parseInt(tableData[i][j])
        }
    }
    tableData[i].push(numBer);
}
    tableOutput();
}

//将数组输出到HTML中
function tableOutput(){
    for(var i=0; i<tableData.length;i++){
        var trData = document.createElement("tr");
        for(var j=0;j<tableData[i].length;j++){
            var tdData = document.createElement("td");
            var tdDataText = document.createTextNode(tableData[i][j]);
            tdData.appendChild(tdDataText);
            trData.appendChild(tdData);
        }
        table.appendChild(trData);
    }
}

