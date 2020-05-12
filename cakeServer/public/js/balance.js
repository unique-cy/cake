$('#myOptionC').click(function (e) { //点击退回事件
  window.history.go(-1);
});
var newAccount = location.search.replace('?', "") //获取url传来的参数id

var userArr = JSON.parse(localStorage.getItem("userArr"));
for (let i = 0; i < userArr.length; i++) {
  if (userArr[i].account == newAccount) {
    $('.money').html(userArr[i].balance + '.00');
    var Record = userArr[i].Record;
    var html = '';
    for (let i = 0; i < Record.length; i++) {
      html += `<li class="time">${Record[i].data}</li>
      <li class="event">${Record[i].Event}</li>
      <li class="deposit">${Record[i].Deposit}.00</li>`
    }
    $('.balance-list-content').html(html)
  }
}

get.onclick = () => window.history.go(-1);