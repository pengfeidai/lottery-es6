{
    // 声明
    let a1 = Symbol();
    let a2 = Symbol();
    console.log(a1===a2);  // false
    let a3 = Symbol.for('a3');
    let a4 = Symbol.for('a3');
    console.log(a3===a4);
}

{
    let a1 = Symbol.for('abc');
    let obj = {
        [a1]:'123',
        'abc':345,
        'c':456
    };

}