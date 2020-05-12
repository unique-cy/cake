$('#myOptionC').click(function (e) { //点击退回事件
  window.history.go(-1);
});
var newAccount = location.search.replace('?', "") //获取url传来的参数id

var userArr = JSON.parse(localStorage.getItem("userArr"));
for (let i = 0; i < userArr.length; i++) {
  if (userArr[i].account == newAccount) {
    let arr = userArr[i].Coupon;
    var html = ''
    for (let i = 0; i < arr.length; i++) {
      html += `<ul class="balance-list-content">
      <li class="time">${arr[i].money}</li>
      <li class="event">${arr[i].name}</li>
      <li class="deposit">
        <p>.${arr[i].limit.limit}</p>
        <p>.${arr[i].limit.limitDate}</p>
        <p>.${arr[i].limit.limitId}</p>
      </li>
      </ul>`
    }
    $('.content').html(html);
  }
}