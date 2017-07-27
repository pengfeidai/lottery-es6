{
    // 基本定义
    let ajax = function (callback) {
        console.log("执行1");
        setTimeout(function(){
            callback&&callback.call();
        },1000);
    };
    ajax(function() {
        console.log("timtout1");
    })
}

{
    let ajax = function() {
        console.log("执行2");
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve();
            },1000);
        })
    };

    ajax().then(function(){
        console.log("promise",'timeout2');
    })
}

{
    let ajax = function(){
        console.log("执行3");
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve();
            },1000);
        })
    };
    ajax()
        .then(function(){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve();
            },2000);
        });
    })
        .then(function(){
        console.log("timeout3");
     })
    {
        let ajax = function (num) {
           console.log("执行4");
           return new Promise(function(resolve,reject){
               if(num>5){
                resolve();
               } else{
                throw new Error('出错了');
               }
           })
        };
        ajax(6).then(function(){
            console.log("log",6);
        }).catch(function(err){
            console.log("catch",err);
        });
        ajax(3).then(function(){
            console.log("log",3);
        }).catch(function(err){
            console.log("catch",err);
        });
    }
}


{
    // 所有的图片加载完再加载页面
    function loadImg(src){
        return new Promise((resolve,reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function() {
                reject(err);
            };
        })
    }
    function showImgs(imgs) {
        imgs.forEach(function(img){
           document.body.append(img);
        })
    }

    Promise.all([
        loadImg('http://mpic.tiankong.com/6e1/7bb/6e17bb70b1ea5d149dccf72805159151/640.jpg@360h'),
        loadImg('http://mpic.tiankong.com/290/73d/29073dc17ac1f443088fd09f67d7e26a/640.jpg@360h'),
        loadImg('http://mpic.tiankong.com/56d/9da/56d9da68b989c714e6f268e647436437/640.jpg@360h')
        ]).then(showImgs)
}

{
    // 有一个图片加载完就添加到页面
    function loadImg(src){
        return new Promise((resolve,reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function() {
                reject(err);
            };
        })
    }

    function showImgs(img){
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p)
    }

    Promise.race([
        loadImg('http://mpic.tiankong.com/6e1/7bb/6e17bb70b1ea5d149dccf72805159151/640.jpg@360h'),
        loadImg('http://mpic.tiankong.com/290/73d/29073dc17ac1f443088fd09f67d7e26a/640.jpg@360h'),
        loadImg('http://mpic.tiankong.com/56d/9da/56d9da68b989c714e6f268e647436437/640.jpg@360h')
        ]).then(showImgs)
}