var wx = 30,
    hx = 30,
    row = 30,
    col = 30;
// 每个方块的宽高以及行数与列数

// 一个Square的方块对象，每一个元素都是一个方块
function Square(x, y, classname) {
    this.x = x * wx;
    this.y = y * hx;
    this.name = classname;

    this.newnode = document.createElement('div');
    this.newnode.className = this.name;
    this.parent = document.getElementsByClassName('border')[0];

}

Square.prototype.create = function () {
    this.newnode.style.position = 'absolute';
    this.newnode.style.width = wx + 'px';
    this.newnode.style.height = hx +'px';
    this.newnode.style.left = this.x + 'px';
    this.newnode.style.top = this.y + 'px';
    this.parent.appendChild(this.newnode);
}

Square.prototype.removeNode = function () {
    this.parent.removeChild(this.newnode);
}


// 创建一个主体对象的构造函数，包括头，尾，包括位置点以及方向
function Sdman() {
    this.head = null;
    this.tail = null;
    this.pos = [];

    this.directionNum = {
        left:{
            x:-1,
            y: 0,
            rot: 0
        },
        right:{
            x: 1,
            y: 0,
            rot: 0
        },
        up:{
            x: 0,
            y: -1,
            rot: 0
        },
        down:{
            x: 0,
            y: 1,
            rot: 0
        }
    };
}

Sdman.prototype.init = function () {
    var sdhead = new Square(2, 0, 'sdhead');
    sdhead.create();
    this.head = sdhead;
    this.pos.push([2,0]);

    var sdbody1 = new Square(1, 0, 'sdbody');
    sdbody1.create();
    this.pos.push([1, 0]);

    var sdbody2 = new Square(0, 0, 'sdbody');
    sdbody2.create();
    this.tail = sdbody2;
    this.pos.push([0, 0]);

    this.direction = this.directionNum.right;

    // 创建一个链表的形式来处理整个结构
    sdhead.pre = null;
    sdhead.next = sdbody1;

    sdbody1.pre = sdhead;
    sdbody1.next = sdbody2;

    sdbody2.pre = sdbody1;
    sdbody2.next = null;
}

Sdman.prototype.getNextPos = function () {
    var nextPos = [
        this.head.x / wx + this.direction.x,
        this.head.y / hx + this.direction.y
    ]
    // 分情况1.下一个位置是自己的身体
    var headflag = false;
    this.pos.forEach(function (value) {
        if (value[0] == nextPos[0] && value[1] == nextPos[1]){
            headflag = true;
        }
    })
    if (headflag == true){
        console.log('撞到自己了');
        this.stateOfsdman.die.call(this);
        // die的方法是sdman的，而调用die的却是stateOfsdman，其中不能用this的属性，所以用call把当前sdman的this传进去
        // 用于调用同一个构造函数下不同方法内的方法
        return;
    }

    // 2.是墙，超过位置
    if(nextPos[0] < 0 || nextPos[1] <0 || nextPos[0] > row-1 || nextPos[1] > col-1){
        console.log('撞到墙了');
        this.stateOfsdman.die.call(this);
        return;
    }

    // 3.是gift可以吃掉
    if (food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]){
        console.log('chi!!!');
        this.stateOfsdman.eat.call(this);
        return;
    }

    // 4.啥都没有，走
    this.stateOfsdman.move.call(this);
}

Sdman.prototype.stateOfsdman =  {
    // 移动的方法是通过链表，头部变为下一个位置，尾部去除，每一个元素等于他的上一个元素
    move:function(formet) {
        var newbody = new Square(this.head.x/wx,this.head.y/hx,'sdbody');

        newbody.next = this.head.next;
        newbody.next.pre = newbody;
        newbody.pre = null;

        this.head.removeNode();
        newbody.create();

        var newhead = new Square( this.head.x / wx + this.direction.x,this.head.y / hx + this.direction.y,'sdhead');

        newhead.next = newbody;
        newhead.pre = null;
        newbody.pre = newhead;
        newhead.newnode.style.transform = "rotate(" + this.direction.rot + "deg)";
        newhead.create();

        this.pos.splice(0,0,[this.head.x / wx + this.direction.x,this.head.y / hx + this.direction.y]);
        // 数组的splice可以用于增删改，
        this.head = newhead;


        if (!formet){
            this.tail.removeNode();
            this.tail = this.tail.pre;
            this.tail.next = null;
            this.pos.pop();
        }
        // console.log('move')
    },
    eat:function() {
        this.stateOfsdman.move.call(this,true);
        food.removeNode();
        game.socer++;
        inputNode.value = game.socer;
        creatFood();
        // console.log('eat')
    },
    die:function(){
        game.over();
        alert('game over! your socer is:' + game.socer);
        console.log('die')
    }
    
}
    
    
function creatFood() {
    var x = null;
    var y = null;
    var ttye =Math.random();

    var incule = true;
    while(incule){
        x = Math.round(Math.random()*(row-1));
        y = Math.round(Math.random()*(col-1));

        sdman.pos.forEach(function (value) {
            if(x != value[0] && y != value[1]){
                incule = false;
            }
        });
    }
    if (ttye < 0.5){food = new Square(x,y,'sdfood');
    }else{
        food = new Square(x,y,'sdfood1');
    }
// food这这里定义没有加var和let直接定义给window，所以所以函数可以调用
    food.pos = [x,y];
    food.create();
}



function Game() {
    this.time = null;
    this.socer = 0;

}

Game.prototype.init =function () {

    sdman.init();

    // sdman.getNextPos();


    creatFood();

    document.body.onkeydown = function (ev) {
        let keys = ev.which;
        if (keys == 37 && sdman.direction != sdman.directionNum.right){
            sdman.direction = sdman.directionNum.left;
        }else if(keys == 39 && sdman.direction != sdman.directionNum.left){
            sdman.direction = sdman.directionNum.right;
        }else if(keys == 38 && sdman.direction != sdman.directionNum.down){
            sdman.direction = sdman.directionNum.up;
        }else if(keys == 40 && sdman.direction != sdman.directionNum.up){
            sdman.direction = sdman.directionNum.down;
        }
        // console.log(sdman.direction);
    }

    this.start();
}

Game.prototype.start = function () {
    this.timer1 = setInterval(function () {
        sdman.getNextPos();
    },200)

}
Game.prototype.over = function () {

    var allNode = document.getElementsByClassName('border')[0];
    allNode.innerHTML = "";
    // innerHTML可以用于清空内容
    clearInterval(this.timer1);
    sdman = new Sdman();
    game = new Game();
    game.init();

}

var sdman = new Sdman();
var game = new Game();


var startNode = document.getElementsByClassName('start')[0];
var goonNode = document.getElementsByClassName('goon')[0];
var pauseNode = document.getElementsByClassName('pause')[0];
var inputNode = document.getElementsByTagName('input')[0];


startNode.onclick = function(){
    game.over();
}

pauseNode.onclick = function () {
    clearInterval(game.timer1);
}

goonNode.onclick = function () {
    game.start();
}







