function cartNumJuage() {
  var shopNum = 0;
  var contnewArr = JSON.parse(localStorage.getItem("contArr"));
  if (contnewArr == null || $(contnewArr).length == 0 || contnewArr == []) { //判断这个数组是否为空 或者长度为0 总之判断它是否存在 是否有值 执行显隐效果
    $('#cartNum').css('visibility', 'hidden');
  } else {
    for (let i = 0; i < JSON.parse(localStorage.getItem("contArr")).length; i++) {
      var commodityNum = JSON.parse(localStorage.getItem("contArr"))[i].count;
      shopNum += commodityNum;
    }
    if (shopNum > 0) {
      $('#cartNum').css('visibility', 'visible');
      $('#cartNum').html(shopNum);
    }
  }
}