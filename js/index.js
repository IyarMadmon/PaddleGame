const directions = {
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

const consts = {
  stepSize: 1
}

const movePaddle = (obj) => {
  const $paddle = $(`#${obj.paddleId}`); 
  const currPos = parseInt($paddle.position().top);
  let newPos;
  if(obj.dir) newPos = currPos - consts.stepSize; 
  else newPos = currPos + consts.stepSize;
  if(newPos <= 0 || newPos >= consts.boardBottom - consts.paddleHeight) return;
  $paddle.css({top: newPos+'px'});
};

$("body").keydown(function(e){
  if(directions[e.which] != null) {
    directions[e.which].active = true;
  }
});

$("body").keyup(function(e){
  if(directions[e.which] != null) {
    directions[e.which].active = false;
  }
});

const timer = (key) => {
  const obj = directions[key];
  if(obj.active) {
    movePaddle(obj);
  }
}

$.each( directions, function(index,value){
 setInterval(timer, 5, index);
})

$(document).ready(function() {
  consts.boardBottom = $("#board").height();
  consts.paddleHeight = $(".paddle").height();
});