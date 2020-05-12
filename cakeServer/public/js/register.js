//正则
var accountReg = /^[A-z]{5,8}$/;
var passwordReg = /^[A-z1-9][A-z0-9]{5,11}$/;
var nameReg = /[\u4e00-\u9fa5]{2,6}/;

let showEndHide = {
  show() {
    $('.register-last').css('visibility', 'visible');
  },
  hide() {
    $('.register-last').css('visibility', 'hidden');
  },
  accountKeyupFalse() {
    $('.register-last').html('请输入正确的用户名：5-8位英文字母');
    this.show();
  },
  nameKeyupFalse() {
    $('.register-last').html('请输入正确的昵称：2-6位中国汉字');
    this.show();
  },
  passwordKeyupFalse() {
    $('.register-last').html('密码由6～12字数字和英文字母组成 且第一位不能位0');
    this.show();
  },
  password1KeyupFalse() {
    $('.register-last').html('密码不重复');
    this.show();
  },
  repeat() {
    $('.register-last').html('用户名已存在');
    this.show();
  }
};

$('#account').keyup(function (e) {
  (accountReg.test($(this).val()) == false) ? showEndHide.accountKeyupFalse(): showEndHide.hide();
});
$('#name').keyup(function (e) {
  (nameReg.test($(this).val()) == false) ? showEndHide.nameKeyupFalse(): showEndHide.hide();
});
$('#password1').keyup(function (e) {
  (passwordReg.test($(this).val()) == false) ? showEndHide.passwordKeyupFalse(): showEndHide.hide();
});
$('#password2').keyup(function (e) {
  ($(this).val() !== $('#password1').val()) ? showEndHide.password1KeyupFalse(): showEndHide.hide();
});

$('.register-Det').click(function (e) {
  e.preventDefault();
  if (accountReg.test($('#account').val()) == false) {
    showEndHide.accountKeyupFalse();
  } else if (nameReg.test($('#name').val()) == false) {
    showEndHide.nameKeyupFalse();
  } else if (passwordReg.test($('#password1').val()) == false) {
    showEndHide.passwordKeyupFalse();
  } else if ($('#password2').val() !== $('#password1').val()) {
    showEndHide.password1KeyupFalse();
  } else { //当所有必填项验证完毕 开始向php发送请求
    $.ajax({
      type: "post",
      url: "./php/register.php",
      data: {
        username: $('#account').val(),
        password: $('#password1').val(),
        name: $('#name').val()
      },
      success: function (res) {
        console.log(res)
        console.log($('#account').val())
        console.log($('#password1').val())
        console.log($('#name').val())
        if (res == 'false') {
          showEndHide.repeat();
        } else {
          $('.modalCont').fadeIn(); //提示框的显隐事件
          setTimeout(function () {
            $('.modalCont').hide();
          }, 800)
          // setTimeout(function () {
          //   window.location.href = 'user.html'
          // }, 1000)
        }

      }
    });
  }
});