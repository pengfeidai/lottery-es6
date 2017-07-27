// ES5 new一个正则对象
{
    let regex = new RegExp('xyz', 'i');
    let regex2 = new RegExp(/xyz/i);
    console.log(regex.test('xyz123'),regex2.test('xyz123'));  // true true
//  ES6中第二个修饰符i 会覆盖第一个修饰符 ig
    let regex3 = new RegExp(/xyz/ig,'i');
     console.log(regex3.flags);  //flags用于获取修饰符
}

// y修饰符
{
    let s = 'bbb_bb_b';
    let a1 = /b+/g;
    let a2 = /b+/y;

    console.log("one",a1.exec(s),a2.exec(s));
    console.log("two",a1.exec(s),a2.exec(s));


}

