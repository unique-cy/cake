// 判断是否有用户在登录 若
if (localStorage.getItem('Offline')) {
  $('.Signsuc').show();
  $('.userSign').hide();
  $.ajax({
    type: "post",
    url: "./php/sign.php",
    data: {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    },
    dataType: "json",
    success: function (res) {
      console.log(res);
      $('.Signsuc').show();
      $('.userSign').hide();
      $('.Signsuc-name').html(res.name);
      $('.mem_logo img').attr('src', res.HeadPortraitimg);
      $('.balance').attr('data-account', res.username);
      $('.coupon').attr('data-account', res.username);
      $('.name').html(res.name);
      $('.phone').html(res.username)
      $('.price').html(res.balance)
      if (res.Coupon.length == undefined) {
        $('.couponCount').html('0')
      } else {
        $('.couponCount').html(res.Coupon.length)
      }
    }
  });
} else {
  $('.Signsuc').hide();
  $('.userSign').show();
}
//手机验证码点击时 提示框的显隐事件
$('.phoneLoginTitle ').click((e) => {
  $('.modalCont').fadeIn();
  setTimeout(() => {
    $('.modalCont').hide();
  }, 800);
});
//封装一个ajax请求
let signClick = () => {
  $.ajax({
    type: "post",
    url: "./php/sign.php",
    data: {
      username: $('#account').val(),
      password: $('#password').val()
    },
    dataType: "json",
    success: function (res) {
      if (res == false) {
        $('.err').text('请输入正确的账户名和密码');
        $('.err').css('visibility', 'visible');
        $('.Signsuc').hide();
        $('.userSign').show();
      } else {
        console.log(res);
        $('.err').css('visibility', 'hidden');
        localStorage.setItem('Offline', 'Offline');
        localStorage.setItem('username', $('#account').val());
        localStorage.setItem('password', $('#password').val());
        $('.Signsuc').show();
        $('.userSign').hide();
        $('.Signsuc-name').html(res.name);
        $('.mem_logo img').attr('src', res.HeadPortraitimg);
        $('.balance').attr('data-account', res.username);
        $('.coupon').attr('data-account', res.username);
        $('.name').html(res.name);
        $('.phone').html(res.username)
        $('.price').html(res.balance)
        if (res.Coupon.length == undefined) {
          $('.couponCount').html('0')
        } else {
          $('.couponCount').html(res.Coupon.length)
        }
      }
    }
  });
}
var accountReg = /^[A-z]{5,8}$/; //账户正则
var passwordReg = /^[A-z1-9][A-z0-9]{5,11}$/; //密码正则
//用户名框的键盘监控
let accountKeyup = $('#account').keyup((e) => {
  if (accountReg.test($('#account').val()) == false) {
    $('.err').text('请输入正确的用户名：5-8位英文字母');
    $('.err').css('visibility', 'visible');
  } else {
    $('.err').css('visibility', 'hidden');
  }
});
//密码框的键盘监控
let passwordKeyup = $('#password').keyup((e) => {
  if (passwordReg.test($('#password').val()) == false) {
    $('.err').text('密码错误');
    $('.err').css('visibility', 'visible');
  } else {
    $('.err').css('visibility', 'hidden');
  }
});
//enter快捷登录
$('#account,#password').on('keyup', (e) => {
  if (e.keyCode == 13) signClick();
});
//点击按钮登录
$('.sign').click((e) => {
  e.preventDefault();
  signClick();
});
// 退出登录按钮
$('.SignOut').click(() => {
  localStorage.removeItem('Offline');
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  $('.modalCont-tuichu').fadeIn();
  setTimeout(() => {
    $('.modalCont-tuichu').hide();
    $('.Signsuc').hide();
    $('.userSign').show();
  }, 800);
});
//点击余额跳转
// $('.balance').click(function () {
//   window.location.href = "./balance.html?" + $(this).attr('data-account'); //根据data-id的值进行跳转
// });
//点击优惠券跳转
// $('.coupon').click(function () {
//   window.location.href = "./coupon.html?" + $(this).attr('data-account'); //根据data-id的值进行跳转
// });