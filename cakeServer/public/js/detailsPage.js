let Id, item, online; //定义并获取url传来的三个参数
for (let i = 0; i < (location.search).split('&').length; i++) {
  Id = (location.search).split('&')[0].split('=')[1];
  item = (location.search).split('&')[1].split('=')[1];
  online = (location.search).split('&')[2].split('=')[1];
}

$.ajax({ //JQajax向php发送GET请求
  type: "get",
  url: "http://localhost:5000/detail",
  dataType: "json",
  success: function (res) {
    let detailsArr;
    let cakeArr=[];
    let IceCreamArr=[];
    let AfternoonTArr=[];
    let breadArr=[];
    let NormalTempArr=[];
    let giftArr=[];
    let newArr=[];
    let PopularityArr=[];
    let BirthdayArr=[];
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
          breadArr.push(res[i])
          break;
        case 'NormalTemperatureCake':
          NormalTempArr.push(res[i])
          break;
        case 'gift':
          giftArr.push(res[i])
          break;
        case 'new':
          newArr.push(res[i])
          break;
        case 'Popularity':
          PopularityArr.push(res[i])
          break;
        case 'Birthday':
          BirthdayArr.push(res[i])
          break;
        default:
          break;
      }
   }
    //根据url传值获取item的元素判断后期需要循环的数组是哪个
    if (item == 'cake') {
      detailsArr = cakeArr;
    } else if (item == 'IceCream') {
      detailsArr = IceCreamArr;
    } else if (item == 'AfternoonTea') {
      detailsArr = AfternoonTArr;
    } else if (item == 'bread') {
      detailsArr = breadArr;
    } else if (item == 'NormalTemperatureCake') {
      detailsArr =NormalTempArr;
    } else if (item == 'gift') {
      detailsArr = giftArr;
    } else if (item == 'new') {
      detailsArr = newArr;;
    } else if (item == 'Popularity') {
      detailsArr = PopularityArr;
    } else if (item == 'Birthday') {
      detailsArr = BirthdayArr;
    }
    console.log(detailsArr)
    let lunboHtml = '',
      showHtml = '',
      labelHtml = '';
    for (let i = 0; i < detailsArr.length; i++) { //循环刚刚判断得到的数组
      if (Id == detailsArr[i].id) { //判断值id与数组内哪一串数组相等
        console.log(detailsArr[i])
        console.log(detailsArr[i].lunbo[0].img)
        $('.introduceText').html(detailsArr[i].introduceText) //写入简介
        $('.pro-title-name').text(detailsArr[i].name); //写入名字
        $('.pro-title-engname').text(detailsArr[i].engname); //写入英文名
        $('.top-price').text('¥' + detailsArr[i].price + '.00'); //写入价格
        $('.select-card-weight').text(detailsArr[i].weight); //写入规格
        $('.details-options-size').text(detailsArr[i].weight.split('/')[0]); //写入尺寸
        $('.details-options-size').text(detailsArr[i].weight.split('(')[0]); //写入尺寸
        for (const key in detailsArr[i].lunbo) {
          lunboHtml += `<div class="swiper-slide"><img src="http://127.0.0.1:3000/${(detailsArr[i].lunbo)[key].img}" alt=""></div>`
        }
        for (const key in detailsArr[i].show) {
          showHtml += `<div class="swiper-slide"><img src="http://127.0.0.1:3000/${(detailsArr[i].show)[key].img}" alt=""></div>`
        }
        if (detailsArr[i].Label !== 'undefined') {
          if (detailsArr[0].Label == 'null') {
            $('.pro-details-label').hide();
          } else {
            for (const key in detailsArr[i].Label) {
              
              if(detailsArr[i].Label[key].label=="null"){
                labelHtml +='';
              }else{
                labelHtml += `<a href="#">${(detailsArr[i].Label)[key].label}&nbsp;›</a>`;
              }
            }
          }
        }
      }

    }
    console.log(lunboHtml)
    $('.swiper-wrapper').html(lunboHtml);
    $('.details-img').html(showHtml);
    $('.pro-details-label').html(labelHtml);
  }
});

$(document).ready(function () {
  //判断传来的参数online是否为LowerShelf 若是则执行显隐事件
  if (online == 'LowerShelf') {
    $('#btnPurchase').hide();
    $('#btnAddcar').hide();
    $('#carLoweslef').show();
  }
  let contArr = []; //定义一个空数组
  if (JSON.parse(localStorage.getItem("contArr")) !== null) { //判断localStorage中是否存在contArr数组 若存在则将存在的加入新定义的空contArr
    for (let i = 0; i < JSON.parse(localStorage.getItem("contArr")).length; i++) {
      contArr.push(JSON.parse(localStorage.getItem("contArr"))[i])
    }
  }
  $('#details').on('click', '#btnAddcar,#btnPurchase', function (e) { //立即购买和加入购物车按钮 都会加入购物车 但不一样的是 立即购买把商品加入购物车后会立马跳到购物车页面
    //购物车点击事件
    e.preventDefault();
    e.stopPropagation();
    $('.modalCase1').show(); //购物车模态的显示与隐藏
    setTimeout(function () {
      $('.modalCase1').hide();
    }, 800)

    let shopCont = { //定义一个数组并在里面写入相对应的键值对
      name: $('.pro-title-name').html(), //名字
      engname: $('.pro-title-engname').html(), //英文名字
      price: parseInt($('.top-price').html().split('.')[0].replace(/[^0-9]/ig, "")), //单价
      weight: $('.select-card-weight').html(), //规格
      addPrice: parseInt($('.top-price').html().split('.')[0].replace(/[^0-9]/ig, "")), // 定义总价 -后期数据重复会修改总价
      img: JSON.parse(localStorage.getItem("commodityArr")).img, //图片从本地web存储获取 
      count: 1, //数量默认
    };
    if (contArr.length > 0) { //如果数据重复 走此逻辑   当前数组内的数量+1 并且价格也相对应数量
      for (let i = 0; i < contArr.length; i++) { //循环数组
        if (shopCont.name == contArr[i].name) { //如果数据重复 走此逻辑  判断获取到的名字跟数组内哪条数组i的名字相等
          contArr[i].count++; //那么当前i的数量+1
          contArr[i].addPrice = contArr[i].count * parseInt(shopCont.price); //设置当前i的总价格  数量*单价
          localStorage.setItem("contArr", JSON.stringify(contArr)); //将修改后的contArr重新存进本地的localStorage
          cartNumJuage(); //运行购物车数量逻辑
          return; //若走了此逻辑 到这里直接返回 不走之后的逻辑
        }
      }
    }
    contArr.push(shopCont); // 如果数据不重复  直接push
    localStorage.setItem("contArr", JSON.stringify(contArr)); //将修改后的contArr重新存进本地的localStorage
    cartNumJuage(); //运行购物车数量逻辑
  });

  $('#details').on('click', '#btnPurchase', function (e) { //立即购买按钮 点击后跳转购物车页面
    window.location.href = "./shopCar.html"
  });

  $('#myOptionC').on('click', function () { //点击退回页面按钮
    window.history.go(-1);
  });

});