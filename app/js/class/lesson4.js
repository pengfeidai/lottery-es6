{
    function test(x,y = 'world') {
        console.log('默认值',x,y);
    }
    test('hello');
    test('hello','girl')
}

{
  let x = 'test';
  function test2(x,y=x){
    console.log('作用域',x,y);
  }
  test2('kill');  // kill kill
}

{
    function test(...arg){
        for(let v of arg){
            console.log('rest',v);
        }
    }
    test(1,2,3,4,5,'a');
}

{
    let arrow => v*2;
    // 相当于
    let arrow = function(v){
        return v*2;
    }

    let arrow2 = () =>5;
    // 相当于
     let arrow2 = function(){
        return 5;
    }
}

{

}