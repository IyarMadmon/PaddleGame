const paddleKeys = {
  87: {paddleId: "left-paddle",//w
       dir:true,
      active:false},
  83: {paddleId: "left-paddle",//s
       dir:false,
       active:false},
  104: {paddleId: "right-paddle",//8
        dir:true,
        active:false},
  101: {paddleId: "right-paddle",//5
        dir:false,
        active:false},
};

let $ball, initialBallLeft, initialBallTop, ballWidth, ballHeight;

const consts = {
  paddleStepSize: 1
}

let ballTopStep = 1;
let ballLeftStep = 2;

const movePaddle = (obj) => {
  const $paddle = $(`#${obj.paddleId}`); 
  const currPos = parseInt($paddle.position().top);
  let newPos;
  if(obj.dir) newPos = currPos - consts.paddleStepSize; 
  else newPos = currPos + consts.paddleStepSize;
  if(newPos <= 0 || newPos >= consts.boardHeight - consts.paddleHeight) return;
  $paddle.css({top: newPos+'px'});
};

$("body").keydown((e) => {
  if(paddleKeys[e.which] != null) {
    paddleKeys[e.which].active = true;
  }
});

$("body").keyup((e) => {
  if(paddleKeys[e.which] != null) {
    paddleKeys[e.which].active = false;
  }
});

const timer = (key) => {
  const obj = paddleKeys[key];
  if(obj.active) {
    movePaddle(obj);
  }
}

$.each( paddleKeys, (index,value) => {
 setInterval(timer, 5, index);
})

$(document).ready(() =>  {
  consts.boardHeight = $("#board").height();
  consts.boardWidth = $("#board").width();
  consts.paddleHeight = $(".paddle").height();
  $ball = $(".ball");
  ballWidth = $ball.width();
  ballHeight = $ball.height();
  initialBallTop = consts.boardHeight/2 - ballHeight/2;
  initialBallLeft = consts.boardWidth/2 - ballWidth/2;
  resetBall();
  setInterval(moveBall, 5);
});

const resetBall = () => {
  $ball.css({top: initialBallTop +'px', left : initialBallLeft+'px'});
}

const moveBall = () => {
  let ballTopPos = parseInt($ball.position().top);
  let ballLeftPos = parseInt($ball.position().left);
  ballTopPos += ballTopStep;
  ballLeftPos += ballLeftStep;
  
  if(ballTopPos < 0 || ballTopPos > consts.boardHeight - ballHeight) {
    ballTopStep = -ballTopStep;
  }
  if(ballLeftPos < 0 || ballLeftPos > consts.boardWidth - ballWidth) {
    ballLeftStep = -ballLeftStep;
  }
  
  $ball.css({top: ballTopPos+'px', left : ballLeftPos+'px'});
}


const randomize = (min, max, onlyIntegers) => {
  if(onlyIntegers) return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.random() * (max - min) + min;
}