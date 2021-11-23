var headNode = document.getElementsByClassName('head')[0];
var bodaNode = document.getElementsByClassName('sdbody');

var sdx,sdy;

var speed = 30;
var dection = 2;

var timer = setInterval(function () {
    sdx = window.getComputedStyle(headNode,null)['left'];
    sdy = window.getComputedStyle(headNode,null)['top'];
    switch (dection) {
        case 0:
            headNode.style.left = parseInt(sdx) - speed + 'px';
            console.log(headNode.style.left);
            break;
        case 1:
            headNode.style.top = parseInt(sdy) - speed + 'px';
            break;
        case 2:
            headNode.style.left = parseInt(sdx) + speed + 'px';
            break;
        case 3:
            headNode.style.top= parseInt(sdy) + speed + 'px';
            break;
    }

    // console.log(sdx);

    if(parseInt(sdx) < 0 || parseInt(sdx) > 900 || parseInt(sdy) <0 || parseInt(sdy) > 900){
        alert('你输了，游戏结束！')
    }

},500)


setInterval(sayhi,100);
function sayhi() {
    console.log('hi');

}

var time5 = setInterval(catchbd,500);

function catchbd(idx1=0,idx2=1) {
    let orix = window.getComputedStyle(bodaNode[idx1],null)['left'];
    let oriy = window.getComputedStyle(bodaNode[idx1],null)['top'];
    let bdx = window.getComputedStyle(bodaNode[idx2],null)['left'];
    let bdy = window.getComputedStyle(bodaNode[idx2],null)['top'];
    let chaax = parseInt(orix) - parseInt(bdx);
    let chaay = parseInt(oriy) - parseInt(bdy);
    console.log(chaax)
    if (chaax !== 0){
        bodaNode[idx2].style.left = parseInt(bdx) + chaax + 'px';
    }
    if (chaay !==0 ){
        bodaNode[idx2].style.top = parseInt(bdy) + chaay + 'px';
    }
}

// var time5 = setInterval(
//     function (){
//         let orix = window.getComputedStyle(bodaNode[0],null)['left'];
//         let oriy = window.getComputedStyle(bodaNode[0],null)['top'];
//         let bdx = window.getComputedStyle(bodaNode[1],null)['left'];
//         let bdy = window.getComputedStyle(bodaNode[1],null)['top'];
//         let chaax = parseInt(orix) - parseInt(bdx);
//         let chaay = parseInt(oriy) - parseInt(bdy);
//         console.log(chaax)
//         if (chaax !== 0){
//             bodaNode[1].style.left = parseInt(bdx) + chaax + 'px';
//         }
//         if (chaay !==0 ){
//             bodaNode[1].style.top = parseInt(bdy) + chaay + 'px';
//         }
//     },500);





var timr2 = setInterval(function () {
    let bdx = window.getComputedStyle(bodaNode[0],null)['left'];
    let bdy = window.getComputedStyle(bodaNode[0],null)['top'];
    let chax = parseInt(sdx) - parseInt(bdx);
    let chay = parseInt(sdy) - parseInt(bdy);
    if (chax !== 0){
        bodaNode[0].style.left = parseInt(bdx) + chax + 'px';
    }
    if (chay !==0 ){
        bodaNode[0].style.top = parseInt(bdy) + chay + 'px';
    }

},500)



document.body.onkeydown = function (e) {
    // console.log(e)
    var keys = e.which;
    // console.log(keys)
    sdx = window.getComputedStyle(headNode,null)['left'];
    sdy = window.getComputedStyle(headNode,null)['top'];

    switch (e.which) {
        case 37:
            dection = 0;
            // headNode.style.left = parseInt(sdx) - 30 + 'px';
            break;
        case 38:
            dection = 1;
            // headNode.style.top = parseInt(sdy) - 30 + 'px';
            break;
        case 39:
            dection = 2;
            // headNode.style.left = parseInt(sdx) + 30 + 'px';
            break;
        case 40:
            dection = 3;
            // headNode.style.top= parseInt(sdy) + 30 + 'px';
            break;

    }

}