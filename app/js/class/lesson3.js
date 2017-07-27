{
    let arr = Array.of(3,4,7,9,11);
    console.log("arr=",arr);
}
{
    let p = document.querySelectorAll('p');
    let pArr = Array.from(p);
    pArr.forEach(function(item){
        console.log(item.textContent);
    });

    console.log(Array.from([1,3,5],function(item){
        return item*2
    }));
}

{
    for(let index of ['1','c','ks'].keys()){
        console.log('keys',index);
    }
    for(let value of ['1','c','ks'].values()){
        console.log('values',value);
    }
    for(let [index,value] of ['1','c','ks'].entries()){
        console.log('keys',index,"values",value);
    }
}

{
  console.log([1,2,3,4,5,6].find(function(item){return item>3}));   // 4

  console.log([1,2,3,4,5,6].findIndex(function(item){return item>3}));   // 3
}


