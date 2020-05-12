cartNumJuage(); //直接判断购物车数量的逻辑  在是引入的cartNumJuage.js里面的一个函数

//顶部分类
$('.options ul li').click(function (e) { //分类选项里面的li点击事件
  e.preventDefault();
  $(this).find('a').addClass('liHover').parent().siblings().find('a').removeClass('liHover');
  $('.cont-itemIm').eq($(this).index()).fadeIn(500).siblings().fadeOut(50);
  $('.options ul').animate({
    left: -$(this).find('a').attr('data-left')
  }, 50)
})

var contArr = []; //定义一个空数组
if (JSON.parse(localStorage.getItem("contArr")) !== null) { //判断localStorage中是否存在contArr数组 若存在则将存在的加入新定义的空contArr
  for (let i = 0; i < JSON.parse(localStorage.getItem("contArr")).length; i++) {
    contArr.push(JSON.parse(localStorage.getItem("contArr"))[i])
  }
}
$('.cont').on('click', '.addcart', function (e) { //购物车点击事件
  e.preventDefault();
  e.stopPropagation();
  $('.modalCase').show(); //购物车模态的显示与隐藏
  setTimeout(function () {
    $('.modalCase').hide();
  }, 800)
  let shopCont = { //定义一个数组并在里面写入相对应的键值对
    name: $(this).parents('.itemPrice').find('p:eq(1)').html(), //名字
    engname: $(this).parents('.itemPrice').find('p:eq(0)').html(), //英文名
    price: parseInt($(this).parents('.itemPrice').find('.itemmoney').text().split('¥')[1]), //单价
    weight: $(this).parents('.itemPrice').find('.item-weight').text().split('/')[1], //规格
    addPrice: parseInt($(this).parents('.itemPrice').find('.itemmoney').text().split('¥')[1]), // 定义总价 -后期数据重复会修改总价
    img: $(this).parents('.contText-item').find('.itemImg img').attr('src'), //图片
    count: 1, //数量默认
  };
  if (contArr.length > 0) { //如果数据重复 走此逻辑   当前数组内的数量+1 并且价格也相对应数量
    for (let i = 0; i < contArr.length; i++) { //循环数组
      if (shopCont.name == contArr[i].name) { //如果数据重复 走此逻辑  判断获取到的名字跟数组内哪条数组i的名字相等
        contArr[i].count++; //那么当前i的数量+1
        contArr[i].addPrice = contArr[i].count * shopCont.price; //设置当前i的总价格  数量*单价
        localStorage.setItem("contArr", JSON.stringify(contArr)); //将修改后的contArr重新存进本地的localStorage
        cartNumJuage(); //运行购物车数量逻辑
        console.log(contArr);
        return; //若走了此逻辑 到这里直接返回 不走之后的逻辑
      }
    }
  }
  contArr.push(shopCont); // 如果数据不重复  直接push
  localStorage.setItem("contArr", JSON.stringify(contArr)); //将修改后的contArr重新存进本地的localStorage
  cartNumJuage(); //运行购物车数量逻辑
});



$.ajax({
  type: "GET",
  contentType: "application/json; charset=utf-8",
  url: "http://localhost:5000/detail",
  dataType: "json",
  success: function (res) {
    var cakeOL = [], //蛋糕的线上产品数组
      cakeLS = [], //蛋糕的下架产品数组
      creamOL = [], //冰淇淋的线上产品数组
      creamLS = [], //冰淇淋的下架产品数组
      teaOL = [], //咖啡下午茶的线上产品数组
      teaLS = [] //咖啡下午茶的下架产品数组
      let cakeArr=[];
      let IceCreamArr=[];
      let AfternoonTArr=[];
      let breadOL=[];
      let normalCakeOL=[];
      let giftOL=[];
      for (let i = 0; i < res.length; i++) {
        switch (res[i].dataItem) {
          case 'cake':
            cakeArr.push(res[i])
            break;
          case 'IceCream':
            IceCreamArr.push(res[i])
            break;
          case 'AfternoonTea':
            AfternoonTArr.push(res[i])
            break;
          case 'bread':
            breadOL.push(res[i])
            break;
          case 'NormalTemperatureCake':
            normalCakeOL.push(res[i])
            break;
          case 'gift':
            giftOL.push(res[i])
            break;
          default:
            break;
        }
    }
    for (const key in cakeArr) {
      if (cakeArr[key].dataOnline == 'online') {
        cakeOL.push(cakeArr[key]);
      } else {
        cakeLS.push(cakeArr[key]);
      }
    }
    for (const key in IceCreamArr) {
      if (IceCreamArr[key].dataOnline == 'online') {
        creamOL.push(IceCreamArr[key]);
      } else {
        creamLS.push(IceCreamArr[key]);
      }
    }
    for (const key in AfternoonTArr) {
      if (AfternoonTArr[key].dataOnline == 'online') {
        teaOL.push(AfternoonTArr[key]);
      } else {
        teaLS.push(AfternoonTArr[key]);
      }
    }
    var cakeOL_Html = '',
      cakeLS_Html = '',
      creamOL_Html = '',
      creamLS_Html = '',
      teaOL_Html = '',
      teaLS_Html = '',
      breadOL_Html = '',
      normalCakeOL_Html = '',
      giftOL_Html = ''

    for (const i in cakeOL) { //蛋糕
      cakeOL_Html += `<div class="contText-item" data-Item="${cakeOL[i].dataItem}" data-id="${cakeOL[i].id}" data-online="${cakeOL[i].dataOnline}" data-img="http://127.0.0.1:3000/${cakeOL[i].img}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${cakeOL[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${cakeOL[i].engname}</p>
        <p>${cakeOL[i].name}</p>
        <p><span class="itemmoney">¥${cakeOL[i].price}</span><span class="item-weight">.00元/${cakeOL[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
      <div class="posAb"><img src="http://127.0.0.1:3000/${cakeOL[i].posiImg}"></div>
    </div>`
    }
    for (const i in cakeLS) {
      cakeLS_Html += `<div class="contText-item" data-Item="${cakeLS[i].dataItem}" data-img="http://127.0.0.1:3000/${cakeLS[i].img}" data-id="${cakeLS[i].id}" data-online="${cakeLS[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${cakeLS[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${cakeLS[i].engname}</p>
        <p>${cakeLS[i].name}</p>
        <p><span class="itemmoney">¥${cakeLS[i].price}</span><span class="item-weight">.00元/${cakeLS[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
      <div class="posAb"><img src="./img/mingxing.png"></div>
      <div class="posAb-lack">敬请期待</div>
    </div>`
    }

    for (const i in creamOL) { //冰淇淋
      creamOL_Html += `<div class="contText-item" data-Item="${creamOL[i].dataItem}" data-img="http://127.0.0.1:3000/${creamOL[i].img}"  data-id="${creamOL[i].id}" data-online="${creamOL[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${creamOL[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${creamOL[i].engname}</p>
        <p>${creamOL[i].name}</p>
        <p><span class="itemmoney">¥${creamOL[i].price}</span><span class="item-weight">.00元/${creamOL[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
    </div>`
    }
    for (const i in creamLS) {
      creamLS_Html += `<div class="contText-item" data-Item="${creamLS[i].dataItem}" data-img="http://127.0.0.1:3000/${creamLS[i].img}"  data-id="${creamLS[i].id}" data-online="${creamLS[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${creamLS[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${creamLS[i].engname}</p>
        <p>${creamLS[i].name}</p>
        <p><span class="itemmoney">¥${creamLS[i].price}</span><span class="item-weight">.00元/${creamLS[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
      <div class="posAb-lack">敬请期待</div>
    </div>`
    }

    for (const i in teaOL) { //咖啡下午茶
      teaOL_Html += `<div class="contText-item" data-Item="${teaOL[i].dataItem}" data-img="http://127.0.0.1:3000/${teaOL[i].img}"  data-id="${teaOL[i].id}" data-online="${teaOL[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${teaOL[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${teaOL[i].engname}</p>
        <p>${teaOL[i].name}</p>
        <p><span class="itemmoney">¥${teaOL[i].price}</span><span class="item-weight">.00元/${teaOL[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
    </div>`
    }
    for (const i in teaLS) {
      teaLS_Html += `<div class="contText-item" data-Item="${teaLS[i].dataItem}" data-img="http://127.0.0.1:3000/${teaLS[i].img}"  data-id="${teaLS[i].id}" data-online="${teaLS[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${teaLS[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${teaLS[i].engname}</p>
        <p>${teaLS[i].name}</p>
        <p><span class="itemmoney">¥${teaLS[i].price}</span><span class="item-weight">.00元/${teaLS[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
      <div class="posAb-lack">敬请期待</div>
    </div>`
    }

    for (const i in breadOL) { //面包
      breadOL_Html += `<div class="contText-item" data-Item="${breadOL[i].dataItem}" data-img="http://127.0.0.1:3000/${breadOL[i].img}"  data-id="${breadOL[i].id}" data-online="${breadOL[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${breadOL[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${breadOL[i].engname}</p>
        <p>${breadOL[i].name}</p>
        <p><span class="itemmoney">¥${breadOL[i].price}</span><span class="item-weight">.00元/${breadOL[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
    </div>`
    }

    for (const i in normalCakeOL) { //常温蛋糕
      normalCakeOL_Html += `<div class="contText-item" data-img="http://127.0.0.1:3000/${normalCakeOL[i].img}"  data-Item="${normalCakeOL[i].dataItem}" data-id="${normalCakeOL[i].id}" data-online="${normalCakeOL[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${normalCakeOL[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${normalCakeOL[i].engname}</p>
        <p>${normalCakeOL[i].name}</p>
        <p><span class="itemmoney">¥${normalCakeOL[i].price}</span><span class="item-weight">.00元/${normalCakeOL[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
    </div>`
    }

    for (const i in giftOL) { //设计师礼物
      giftOL_Html += `<div class="contText-item" data-Item="${giftOL[i].dataItem}" data-img="http://127.0.0.1:3000/${giftOL[i].img}"  data-id="${giftOL[i].id}" data-online="${giftOL[i].dataOnline}">
      <div class="itemImg"><img src="http://127.0.0.1:3000/${giftOL[i].img}" alt=""></div>
      <div class="itemPrice">
        <p>${giftOL[i].engname}</p>
        <p>${giftOL[i].name}</p>
        <p><span class="itemmoney">¥${giftOL[i].price}</span><span class="item-weight">.00元/${giftOL[i].weight}</span></p>
        <i class="addcart"></i>
      </div>
    </div>`
    }

    //将模块填入对应盒子
    $('.cont-cake-online').html(cakeOL_Html);
    $('.cont-cake-LowerShelf').html(cakeLS_Html);
    $('.cont-IceCream-online').html(creamOL_Html);
    $('.cont-IceCream-LowerShelf').html(creamLS_Html);
    $('.cont-AfternoonTea-online').html(teaOL_Html);
    $('.cont-AfternoonTea-LowerShelf').html(teaLS_Html);
    $('.cont-bread-online').html(breadOL_Html);
    $('.cont-NormalTemperatureCake-online').html(normalCakeOL_Html);
    $('.cont-gift-online').html(giftOL_Html);
  }
})
//点击跳转
$('.cont').on('click', '.contText-item', function (e) { //点击带参跳转
  e.preventDefault();
  e.stopPropagation();
  // window.location.href = "./detailsPage.html?id=" + $(this).attr('data-id'); //根据data-id的值进行跳转
  window.location.href = "./detailsPage.html?id=" + $(this).attr('data-id') + '&item=' + $(this).attr('data-item') + '&online=' + $(this).attr('data-online'); //根据data-id的值进行跳转
  let commodityArr = { //定义一个数组并在里面写入相对应的键值对
    img: $(this).attr('data-img'),
    online: $(this).attr('data-online'),
    item: $(this).attr('data-item'),
  };
  localStorage.setItem("commodityArr", JSON.stringify(commodityArr)); //将定义好的commodityArr存进本地的localStorage
});