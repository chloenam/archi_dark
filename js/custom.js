//DOM Cahsing -------------------------------
const $slider = $("#slider");
const $prev = $(".prev");
const $next = $(".next");

const $btns = $("#nav li");
const $boxs = $(".myScroll");
const leng = $btns.length;
let posArr = [];
let baseLine = -500;
let speed = 1000;
let ease = "easeOutCubic";

//event binding -------------------------------
setPos();
init($slider);

$(window).on("resize", setPos);

//btns click event
$btns.children("a").on("click", function (e) {
  e.preventDefault();
  moveScroll(this);
});

//scroll event
$(window).on("scroll", function () {
  let scroll = $(this).scrollTop();
  activeBtn(scroll);
});

//slide next
$next.on("click", function (e) {
  e.preventDefault();
  next($slider);
});

//slide prev
$prev.on("click", function (e) {
  e.preventDefault();
  prev($slider);
});

//function --------------------------------------
function setPos() {
  posArr = []; //초기화
  for (let i = 0; i < leng; i++) {
    posArr.push($boxs.eq(i).offset().top);
  }
}

function activeBtn(scroll) {
  for (let i = 0; i < leng; i++) {
    if (scroll >= posArr[i] + baseLine) {
      $btns.children("a").removeClass("on");
      $btns.eq(i).children("a").addClass("on");

      $boxs.eq(i).addClass("on"); 
    }
    if (scroll == 0) {
      $boxs.removeClass("on");
    }
  }
}

function moveScroll(el) {
  let target = $(el).attr("href");
  let targetPos = $(target).offset().top;

  $("html, body").animate(
    {
      scrollTop: targetPos,
    },
    speed
  );
}

function init(el) {
  el.children("ul").find("li").last().prependTo(el.children("ul"));
}

function next(el) {
  el.children("ul").animate({ marginLeft: "-200%" }, speed, ease, function () {
    $(this).css({ marginLeft: "-100%" });
    $(this).children("li").first().appendTo(this);
  });
}

function prev(el) {
  el.children("ul").animate({ marginLeft: 0 }, speed, ease, function () {
    $(this).css({ marginLeft: "-100%" });
    $(this).children("li").last().prependTo(this);
  });
}
