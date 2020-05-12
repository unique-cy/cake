$.ajax({ //ajax的轮播调取本地json数据
  type: "GET",
  contentType: "application/json; charset=utf-8",
  url: "http://localhost:5000/users",
  dataType: "json",
  success: function (res) {
    let newArray=[]
    let PopularityArray=[]
    let Birthday=[]
   for (let i = 0; i < res.length; i++) {
      if(res[i].dataItem=='new'){
        newArray.push(res[i])
      }else if(res[i].dataItem=='Popularity'){
        PopularityArray.push(res[i])
      }else{
        Birthday.push(res[i])
      }
   }  
    let newHtml = '',
    PopularityHtml = '',
    birthdayHtml = '';
    for (let i = 0; i < newArray.length; i++) {
      newHtml += `<div class="cont-img" data-id="${newArray[i].id}" data-img="http://127.0.0.1:3000/${newArray[i].dataImg}" data-engname = "${newArray[i].engname}" 
      data-item = "${newArray[i].dataItem}" data-online = "${newArray[i].dataOnline}">
      <div class="cont-imgbox"><img src="http://127.0.0.1:3000/${newArray[i].img}" alt=""></div>
      <div class="cont-p">
        <p class="cont-p1"><span class="cont-p1-name">${newArray[i].name}</span> <span class="cont-p1-span1">¥${newArray[i].price}.00</span><span
            class="cont-p1-span2">元/${newArray[i].weight}</span>
        </p>
        <p class="cont-p2">${newArray[i].introduce}</p>
        <button><i class="addcart"></i> </button>
      </div>
    </div>`
    }
    for (let i = 0; i < PopularityArray.length; i++) {
      PopularityHtml += `<div class="cont-img" data-id="${PopularityArray[i].id}" data-img="http://127.0.0.1:3000/${PopularityArray[i].dataImg}" data-engname = "${PopularityArray[i].engname}"
      data-item = "${PopularityArray[i].dataItem}" data-online = "${PopularityArray[i].dataOnline}">
      <div class="cont-imgbox"><img src="http://127.0.0.1:3000/${PopularityArray[i].img}" alt=""></div>
      <div class="cont-p">
        <p class="cont-p1"><span class="cont-p1-name">${PopularityArray[i].name}</span> <span class="cont-p1-span1">¥${PopularityArray[i].price}.00</span><span
            class="cont-p1-span2">元/${PopularityArray[i].weight}</span>
        </p>
        <p class="cont-p2">${PopularityArray[i].introduce}</p>
        <button><i class="addcart"></i> </button>
      </div>
    </div>`
    }
    for (let i = 0; i < Birthday.length; i++) {
      birthdayHtml += `<div class="cont-img" data-id="${Birthday[i].id}" data-img="http://127.0.0.1:3000/${Birthday[i].dataImg}" data-engname = "${Birthday[i].engname}"
      data-item = "${Birthday[i].dataItem}" data-online = "${Birthday[i].dataOnline}">
      <div class="cont-imgbox"><img src="http://127.0.0.1:3000/${Birthday[i].img}" alt=""></div>
      <div class="cont-p">
        <p class="cont-p1"><span class="cont-p1-name">${Birthday[i].name}</span> <span class="cont-p1-span1">¥${Birthday[i].price}.00</span><span
            class="cont-p1-span2">元/${Birthday[i].weight}</span>
        </p>
        <p class="cont-p2">${Birthday[i].introduce}</p>
        <button><i class="addcart"></i> </button>
      </div>
    </div>`
    }
    $('#cont-newBox').html(newHtml); //将新品模板放进盒子
    $('#cont-Popularity').html(PopularityHtml); //将人气模板放进盒子
    $('#cont-Birthday').html(birthdayHtml); //将生日模板放进盒子
  }
})

$('.cont').on('click', '.cont-img', function (e) { //点击带参跳转
  window.location.href = "./detailsPage.html?id=" + $(this).attr('data-id') + '&item=' + $(this).attr('data-item') + '&online=' + $(this).attr('data-online'); //根据data-id的值进行跳转
  let commodityArr = { //定义一个数组并在里面写入相对应的键值对
    img: $(this).attr('data-img'),
    online: $(this).attr('data-online'),
    item: $(this).attr('data-item'),
  };
  localStorage.setItem("commodityArr", JSON.stringify(commodityArr)); //将定义好的commodityArr存进本地的localStorage
});


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
    name: $(this).parents('.cont-img').find('.cont-p1-name').html(), //名字
    engname: $(this).parents('.cont-img').attr('data-engname'), //英文名
    price: parseInt($(this).parents('.cont-img').find('.cont-p1-span1').html().split('.')[0].replace(/[^0-9]/ig, "")), //单价
    weight: $(this).parents('.cont-img').find('.cont-p1-span2').html().split('/')[1], //规格
    addPrice: parseInt($(this).parents('.cont-img').find('.cont-p1-span1').html().split('.')[0].replace(/[^0-9]/ig, "")), // 定义总价 -后期数据重复会修改总价
    img: $(this).parents('.cont-img').attr('data-img'), //英文名
    count: 1, //数量默认
  };
  if (contArr.length > 0) { //如果数据重复 走此逻辑   当前数组内的数量+1 并且价格也相对应数量
    for (let i = 0; i < contArr.length; i++) { //循环数组
      if (shopCont.name == contArr[i].name) { //如果数据重复 走此逻辑  判断获取到的名字跟数组内哪条数组i的名字相等
        contArr[i].count++; //那么当前i的数量+1
        contArr[i].addPrice = contArr[i].count * shopCont.price; //设置当前i的总价格  数量*单价
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