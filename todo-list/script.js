var config = {
    classShow: ' show',
    classHide: ' hide'
};

function ToDoList(name){
    this.list = document.querySelector('[data-list="' + name + '"]');
    this.childs = document.querySelectorAll('li');
    this.foot = document.querySelector('.foot');
    this.clearCompletedSpan = document.querySelector('.clearCompleted');
    this.completedCounter = 0;
    this.itemCount = document.querySelector('.itemCount');
    this.input = document.querySelector('[data-input="' + name + '"]');
    this.toggleAll = document.querySelector('.toggleAll');

    //绑定事件
    this.init = function(){

        //input按下enter键
        this.input.addEventListener('keyup', function(event){
            this.handleKeyup(event);
        }.bind(this));

        //事件委托，点击list
        this.list.addEventListener('click', function(event){
            this.handleListClick(event);
        }.bind(this));

        //点击Clear Completed时
        this.clearCompletedSpan.addEventListener('click', function(event){
            this.handleClearClick(event);
        }.bind(this));
        // 点击全选图标时
        this.toggleAll.addEventListener('click', function(){
            this.handleToggleAllClick(event);
        }.bind(this));
        //input的值变化时
        this.input.addEventListener('input', function(event){
            this.handleInputChange(event);
        }.bind(this));
    };
}

/*
 *handleToggleAllClick
 *
 *当点击全选图标时的事件处理器
 *
 *@{param} Object event
 *
*/
ToDoList.prototype.handleToggleAllClick = function(event){
    if(this.childs.length != 0) {
        this.toggleAllItem();
    }

}
/**
 *handleKeyup
 *
 *@{param} object event
 */
ToDoList.prototype.handleKeyup = function(event){
    event.preventDefault();
    event.stopPropagation();
    this.addItem(event.keyCode, event.target);
}
/*
 *handleListClick
 *
 *点击list, 事件冒泡阶段处理，委托事件
 *@{param} object event
 *
*/
ToDoList.prototype.handleListClick = function(event){
    event.preventDefault();
    event.stopPropagation();
    this.removeItem(event.target);
}

/*
 *handleClearClick
 *
 *点击Clear Completed 调用clearCompleted();
 *
 *@{param} object event
 *
*/
ToDoList.prototype.handleClearClick = function(event){
    event.preventDefault();
    event.stopPropagation();
    this.clearCompleted();
    this.toggleAll.className = 'toggleAll'; //去除全选图标样式
}

/*
 *handleInputChange
 *input内容改变，则模糊查找，调用findItem()函数
 *
 *@{param} object event
*/
ToDoList.prototype.handleInputChange = function(event){
    var value = event.target.value;
    event.preventDefault();
    event.stopPropagation();
    this.findItem(value);
}
ToDoList.prototype.toggleAllItem = function(){
    if(this.toggleAll.className.indexOf('toggleAll') != -1){
        this.toggleAll.className = 'toggled';
        for(i=0; i < this.childs.length; i++){
            if(this.childs[i].className.indexOf('completed_item') === -1){
                this.childs[i].className += ' completed_item';
            }
        }

    }else {
        this.toggleAll.className = 'toggleAll';
        for(i=0; i < this.childs.length; i++){
            if(this.childs[i].className.indexOf('completed_item') != -1) {
                this.childs[i].className = this.childs[i].className.replace(' completed_item', '');
            }
        }
    }
    this.setCounter();
    this.setClearCompletedSpan();
}
/*
 *addItem
 *增加一个todo-item
 *要绑定this
 *
 *@{param} number event.keyCode
 *@{param} object event.target
*/
ToDoList.prototype.addItem = function(keyCode, target){
    if(keyCode == 13 && target.value.trim().length > 0){
        this.append();
        this.childs = this.list.querySelectorAll('li');
        this.setCounter();
        this.foot.style.display = 'block';
        this.clearInput();
        this.findItem('');

    }
}

/*
 *removeItem
 *删除/标记完成一个todo-item
 *
 *@{param} object event.target
 *
*/
ToDoList.prototype.removeItem = function(target){
    if(target){
        if(target.nodeName == 'SPAN' && target.className == 'del'){
            target.parentNode.parentNode.removeChild(target.parentNode);
            this.childs = this.list.querySelectorAll('li');
            this.setCounter();
            this.setClearCompletedSpan();
        }else if(target.nodeName == 'SPAN' && target.className == 'item_check'){
            //第一次点击是增加完成样式，第二次点击时删除完成样式
            if(target.parentNode.className.indexOf('completed_item') != -1){
                target.parentNode.className = target.parentNode.className.replace(" completed_item", '');
                this.setCounter();
                this.setClearCompletedSpan();
            }else{
                target.parentNode.className += ' completed_item';
                this.setCounter();
                this.setClearCompletedSpan();
            }
        }
    }
}

/*
 *查找输入的字符串是否存在
 *如果不存在，就显示所有的list
 *如果存在，就显示所在的
 *@{param} string value
*/
ToDoList.prototype.findItem = function(value){
    var find = false;
    //隐藏所有
    for (var i = 0; i < this.childs.length; i++){
        if(this.childs[i].className.indexOf(config.classHide) == -1){
            if(this.childs[i].className.indexOf(config.classShow) != -1){
                this.childs[i].className = this.childs[i].className.replace(config.classShow, config.classHide);
            }else{
                this.childs[i].className += config.classHide;
            }
        }
    }

    //如果有就显示
    for(var i = 0; i < this.childs.length; i++){
        var nowEl = this.childs[i];
        if(nowEl.firstChild.innerText.indexOf(value) != -1){
            nowEl.className = nowEl.className.replace(config.classHide, config.classShow);
            find = true;
        }
    }

    //如果都没有就全部显示
    if(!find){
        for(var i = 0; i < this.childs.length; i++){
            this.childs[i].className = this.childs[i].className.replace(config.classHide, config.classShow);
        }
    }
}

//清除输入框
ToDoList.prototype.clearInput = function(){
    this.input.value = '';
}

//统计未完成事项的数目
ToDoList.prototype.setCounter = function(){
    this.completedCounter = 0;
    for(var i = 0; i < this.childs.length; i++){
        if(this.childs[i].className.indexOf('completed_item') != -1){
            this.completedCounter++;
        }
    }
    this.itemCount.innerHTML = (this.childs.length - this.completedCounter) + ' items left';
    if(this.childs.length - this.completedCounter != 0 || this.childs.length === 0) {
        this.toggleAll.className = 'toggleAll';
    }
}
//为todo list append一个li标签
ToDoList.prototype.append = function(){
    var item = document.createElement('li');
    var checkSpan = document.createElement('span');
    var delSpan = document.createElement('span')
    var contentSpan = document.createElement('span');
    contentSpan.innerHTML = this.input.value.trim();
    checkSpan.className = 'item_check';//每一项前的状态图标
    delSpan.className = 'del';
    item.appendChild(contentSpan);
    item.appendChild(checkSpan);
    item.appendChild(delSpan);
    this.list.appendChild(item);
}
//删除所有已完成项
ToDoList.prototype.clearCompleted = function(){
    for(var i = 0; i < this.childs.length; i++){
        if(this.childs[i].className.indexOf('completed_item') != -1){
            this.list.removeChild(this.childs[i]);
        }
    }
    this.childs = this.list.querySelectorAll('li');
    this.clearCompletedSpan.style.display = 'none';
}

//显示或隐藏‘删除已完成’按键
ToDoList.prototype.setClearCompletedSpan = function(){
    if(this.completedCounter === 0 ){
        this.clearCompletedSpan.style.display = 'none';
    }else{
        this.clearCompletedSpan.style.display = 'inline';
    }
}
window.onload = function(){
    var todo = new ToDoList('work');
    todo.init();
}
