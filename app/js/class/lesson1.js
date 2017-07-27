{
  let a,b,rest;
  [a,b]=[1,2];
  console.log(a,b);  //1 2
}

{
    let a,b,rest;
    [a,b,...rest]=[1,2,3,4,5,6];
    console.log(a,b,rest);  //1 2 Array [ 3, 4, 5, 6 ]
}

{
    let a,b;
    ({a,b}={a:1,b:2})
    console.log(a,b);  // 1 2
}

{
  let a,b,c;
  [a,b,c=3]=[1,2];
  console.log(a,b,c);  //1 2 3
}
// c默认值为3，防止没有配对成功时，c的值为undefined

// 使用场景：
// 1.轻松实现变量交换
{
  let a = 1;
  let b = 2;
  [a,b] = [b,a];
  console.log(a,b);  //2 1
}

{
    function f() {
       return [1,2];
    }
    let a,b;
    [a,b]=f();
    console.log(a,b);
}


// 3.返回多个值时，可以选择性接收自己想要的某几个变量
{
    function f() {
        return [1,2,3,4,5];
    }
    let a,b,c;
    [a,,,b] = f();
    console.log(a,b);  //1 4
}

// 4.不知道函数返回数组的长度，只想取出前几个元素，其余用数组表示
{
    function f() {
      return [1,2,3,4,5];
    }
    let a,b,c;
    [a,...b] = f();
    console.log(a,b);  //1 [2,3,4,5]
}

// 对象解构赋值
{
    let a = {p:3,q:true};
    let {p,q} = a;
    console.log(p,q);  // 3 true
}

{
    let {a=10,b=5} = {a:3};
    console.log(a,b);  //3 5
}

{
    let metaData = {
        title:'abc',
        test:[{
          title:'test',
          desc:'description'
        }]
    }
    let {title:esTitle,test:[{title:cnTitle}]} = metaData;
    console.log(esTitle,cnTitle);  //'abc' test
}

