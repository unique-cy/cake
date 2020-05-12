var express = require('express');
var router = express.Router();
var multiparty=require('multiparty')
var fs=require('fs')
var db=require('../modules/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  let username=req.session.userInfo.username;
  db.find('detail',{},data=>{
    res.render('detailData/detail', {
        username:username,
        detailArr:data
    });
    console.log(data)
  }) 
});


router.get('/addDetail', function(req, res, next) {
    let username=req.session.userInfo.username;
    res.render('detailData/addDetail', {username:username});
});

router.post('/addDetail', function(req, res, next) {
    let form=new multiparty.Form();
    form.uploadDir='img';
    
    form.parse(req,(err,fields,files)=>{
        if (err) throw err;
        console.log(fields)
        console.log(".........................");
        console.log(files);


        let oldPath=files.img[0].path;
        let newPath='img/'+files.img[0].originalFilename;
        fs.rename(oldPath,newPath,err=>{
            if(!err)console.log('上传成功');
        })

        let lunboArr=files.lunboImg;
        let lunbo=[]
        for(let i=0;i<lunboArr.length;i++){
            let arr={img:lunboArr[i].originalFilename};
            let oldPath=lunboArr[i].path;
            let newPath='img/'+lunboArr[i].originalFilename;
            fs.rename(oldPath,newPath,err=>{
                if(!err)console.log('上传成功');
            })
            lunbo.push(arr);
        }

        let showArr=files.showImg;
        let show=[];
        for(let i=0;i<lunboArr.length;i++){
            let arr={img:lunboArr[i].originalFilename};
            let oldPath=showArr[i].path;
            let newPath='img/'+showArr[i].originalFilename;
            fs.rename(oldPath,newPath,err=>{
                if(!err)console.log('上传成功');
            })
            show.push(arr);
        }
        
        let id = fields.id[0];
        let img =files.img[0].originalFilename;
        let name =fields.name[0];
        let introduce =fields.introduce[0];
        let price =fields.price[0];
        let weight =fields.weight[0];
        let dataItem =fields.dataItem[0];
        let introduceText =fields.introduceText[0];
        let json={id,name,introduce,price,weight,dataItem,introduceText,img,lunbo,show}
        db.insert('detail',json,data=>{
            if(data.result.n==1){
                console.log("--------上传图片成功---------");
                res.redirect('/detail');
            }
        })
    })
});

router.get('/updateDetail', function(req, res, next) {
    let username=req.session.userInfo.username;
    let id=req.query.id;
    db.find('detail',{id},data=>{
        res.render('detailData/updateDetail', {
            username:username,
            detailArr:data
        });
    }) 
});

router.post('/updateDetail', function(req, res, next) {
    let form=new multiparty.Form();
    form.uploadDir='img';
    
    form.parse(req,(err,fields,files)=>{
        if (err) throw err;
        console.log(fields)
        console.log(".........................");
        console.log(files);

        let oldPath=files.img[0].path;
        let newPath='img/'+files.img[0].originalFilename;
        fs.rename(oldPath,newPath,err=>{
            if(!err)console.log('上传成功');
        })

        //     // 做判断，是否更新图片的判断
        let newFilename = files.img[0].originalFilename;          
            
        if (newFilename) {   // 上传新的图片 --- 更新了图片
            // 删除老的图片
            let oldNew_Img = fields.detail_Img[0];  
            fs.unlink('./img/'+oldNew_Img,(err)=>{
                if (err) {
                    console.log('-------------老图片缓存删除成功！--------------');
                }
            })
            var img = files.img[0].originalFilename;
        } else {  // 没有上传新的图片 --- 没有更新图片
            let oldNewrPath = files.img[0].path;
            fs.unlink(oldNewrPath,(err)=>{
                if (!err) {
                    console.log('-------------老图片缓存删除成功！--------------');
                }         
            })
            var img = fields.detail_Img[0];
        }

        let lunboArr=files.lunboImg;
        let lunbo=[];
        for (let i = 0; i < lunboArr.length; i++) {
            let oldPath=lunboArr[i].path;
            let newPath='img/'+lunboArr[i].originalFilename;
            fs.rename(oldPath,newPath,err=>{
                if(!err)console.log('上传成功');
            })
            //     // 做判断，是否更新图片的判断
            let newFilename = lunboArr[i].originalFilename;          
                
            if (newFilename) {   // 上传新的图片 --- 更新了图片
                // 删除老的图片
                let oldNew_Img = fields.detail_lunbo[i];  
                fs.unlink('./img/'+oldNew_Img,(err)=>{
                    if (err) {
                        console.log('-------------老图片缓存删除成功！--------------');
                    }
                })
                let arr={img:lunboArr[i].originalFilename};
                lunbo.push(arr);
            } else {  // 没有上传新的图片 --- 没有更新图片
                let oldNewrPath = lunboArr[i].path;
                fs.unlink(oldNewrPath,(err)=>{
                    if (!err) {
                        console.log('-------------老图片缓存删除成功！--------------');
                    }         
                })
                let arr={img:fields.detail_lunbo[i]};
                lunbo.push(arr);
            }   
        }

        let showArr=files.showImg;
        let show=[]
        for (let i = 0; i < showArr.length; i++) {
            let oldPath=showArr[i].path;
            let newPath='img/'+showArr[i].originalFilename;
            fs.rename(oldPath,newPath,err=>{
                if(!err)console.log('上传成功');
            })
            //     // 做判断，是否更新图片的判断
            let newFilename = showArr[i].originalFilename;          
                
            if (newFilename) {   // 上传新的图片 --- 更新了图片
                // 删除老的图片
                let oldNew_Img = fields.detail_show[i];  
                fs.unlink('./img/'+oldNew_Img,(err)=>{
                    if (err) {
                        console.log('-------------老图片缓存删除成功！--------------');
                    }
                })
                let arr={img:showArr[i].originalFilename};
                show.push(arr);
            } else {  // 没有上传新的图片 --- 没有更新图片
                let oldNewrPath = showArr[i].path;
                fs.unlink(oldNewrPath,(err)=>{
                    if (!err) {
                        console.log('-------------老图片缓存删除成功！--------------');
                    }         
                })
                let arr={img:fields.detail_show[i]};
                show.push(arr);
            }   
        }

        let detail_Id =  new db.ObjectID(fields.detail_Id[0]);

        // 需要更新的数据
        let id = fields.id[0];
        let name =fields.name[0];
        let introduce =fields.introduce[0];
        let price =fields.price[0];
        let weight =fields.weight[0];
        let dataItem =fields.dataItem[0];
        let introduceText =fields.introduceText[0];

        db.update('detail',{"_id":detail_Id},{id,name,introduce,price,weight,dataItem,introduceText,img,lunbo,show},(data)=>{
            if (data.result.n == 1 ) {
                console.log('-------------修改广告成功！--------------');
                res.redirect('/detail');
            }      
        })
    })
});


router.get('/deleteDetail', function(req, res, next) {
    let id=req.query.id;
    let img=req.query.img;
    fs.unlink('./img/'+img,(err)=>{
        if (!err) {
            console.log('-------------老图片缓存删除成功！--------------');
        }
        db.delete('detail',{id},data=>{
            if (data.result.n == 1 ) {
                console.log('-------------删除广告成功！--------------');
                res.redirect('/detail');
            }  
        }) 
    });
});




module.exports = router;