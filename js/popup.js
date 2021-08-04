let isCookie = document.cookie.indexOf("popup=done");
console.log(isCookie); //-1

if (isCookie == -1) {
  console.log("쿠키없음");
  $("#popup").show();
} else {
  console.log("쿠키있음");
  $("#popup").hide();
}

$("#popup .close").on("click", function (e) {
  e.preventDefault();

  let isChecked = $(this).prev().find("input[type=checkbox]").is(":checked");
  console.log(isChecked); //true, false

  let id_name = $(this).parent().parent().attr("id");
  if (isChecked) setCookie(id_name, "done", 1);
  $(this).parent().parent().fadeOut(500);
});

$(".del").on("click", function () {
  setCookie("popup", "done", 0);
  console.log("쿠키 삭제 완료");
});

$(".view").on("click", function () {
  console.log(document.cookie);
});

function setCookie(cookieName, cookieValue, time) {
  let today = new Date();
  let date = today.getDate();
  today.setDate(date + time);
  let duedate = today.toUTCString(); //toGMTString()
  console.log(duedate);

  document.cookie =
    cookieName + "=" + cookieValue + "; path = /; expires =" + duedate;
}
