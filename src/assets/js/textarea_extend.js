HTMLTextAreaElement.prototype.getCaretPosition = function () {
//return the caret position of the textarea
    return this.selectionStart;
};
HTMLTextAreaElement.prototype.setCaretPosition = function (position) {
//change the caret position of the textarea
    this.selectionStart = position;
    this.selectionEnd = position;
    this.focus();
};
HTMLTextAreaElement.prototype.hasSelection = function () {
//if the textarea has selection then return true
    if (this.selectionStart == this.selectionEnd) {
        return false;
    } else {
        return true;
    }
};
HTMLTextAreaElement.prototype.getSelectedText = function () {
//return the selection text
    return this.value.substring(this.selectionStart, this.selectionEnd);
};
HTMLTextAreaElement.prototype.setSelection = function (start, end) {
//change the selection area of the textarea
    this.selectionStart = start;
    this.selectionEnd = end;
    this.focus();
};

/*用来获取 调用此 js的vue 组件 实例 （this）*/
export let vm = null;

const sendThis = ( _this )=> {
    vm = _this;
};
export function sendThisOut(_this){
    sendThis(_this) //暴露函数
}
/*用来获取 调用此 js的vue 组件 实例 （this）*/

export function surpportTab(id){
    // var textarea = document.getElementsByTagName('textarea')[0];
    var textarea = document.getElementById(id);
    textarea.onkeydown = function(event) {
        //support tab on textarea
        if (event.keyCode == 9) { //tab was pressed
            var newCaretPosition;
            newCaretPosition = textarea.getCaretPosition() + " ".length;
            textarea.value = textarea.value.substring(0, textarea.getCaretPosition()) + " " + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
            textarea.setCaretPosition(newCaretPosition);
            return false;
        }
        if(event.keyCode == 8){
            //backspace
            if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == " ") {
                //it's a tab space
                var newCaretPosition;
                newCaretPosition = textarea.getCaretPosition() - 3;
                textarea.value = textarea.value.substring(0, textarea.getCaretPosition() - 3) + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
                textarea.setCaretPosition(newCaretPosition);
            }
        }
        if(event.keyCode == 37){ //left arrow
            var newCaretPosition;
            if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == " ") {
                //it's a tab space
                newCaretPosition = textarea.getCaretPosition() - 3;
                textarea.setCaretPosition(newCaretPosition);
            }
        }
        if(event.keyCode == 39){
            //right arrow
            var newCaretPosition;
            if (textarea.value.substring(textarea.getCaretPosition() + 4, textarea.getCaretPosition()) == " ") {
                //it's a tab space
                newCaretPosition = textarea.getCaretPosition() + 3;
                textarea.setCaretPosition(newCaretPosition);
            }
        }
    }
}
export function supportSave(id,callback){
    var textarea = document.getElementById(id);
    textarea.addEventListener('keydown', function(e) {
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey))      {
            e.preventDefault();
            callback && callback();
        }
    });
}