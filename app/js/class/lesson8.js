{
    let obj = {
        time:'2017-07-16',
        name:'net',
        _r:123
    };

    let monitor = new Proxy(obj,{
        // 拦截对象属性的读取
        // get(target,key){
        //     return target[key].replace('2017','2018')
        // },

        // 拦截对象设置属性
        set(target,key,value){
           if(key === 'name'){
            return target[key] = value;
           }else{
            return target[key];
           }
        },
        // 拦截key in object操作
        has(target,key) {
            if(key === 'name') {
                return target[key];
            }else{
                return false;
            }
        },
        // 拦截delete
        deleetProperty(target,key){
            if(key.indexOf('_') > -1){
                delete target[key];
            }else{
                return target[key];
            }
        },
        // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
        ownKeys(target){
            return Object.keys(target).filter(item => item!='time');
        }

    });

    console.log("get",monitor.time);

    monitor.time = '2019';
    monitor.name = "慕课网";
    console.log("set", monitor.time,monitor);

    console.log("has",'name' in monitor);  // true

    // delete monitor._r;
    // console.log("delete",monitor);
    console.log("ownKeys",Object.keys(monitor));
}

// Reflect
{
   let obj = {
        time:'2017-07-16',
        name:'net',
        _r:123
    };

    console.log('reflect',Reflect.get(obj,'time'));

    Reflect.set(obj,'name','慕课网');
    console.log(obj);

    console.log('has',Reflect.has(obj,'name'));
}

//
{
   function validator(target,validator) {
     return new Proxy(target,{
        _validator:validator,
        set(target,key,value,proxy){
           if(target.hasOwnProperty(key)){
             let va = this._validator[key];
             if(!!va(value)){
                return Reflect.set(target,key,value,proxy)
             }
             else{
                throw Error(`不能设置${key}到${value}`)
             }
           }
           else{
             throw Error(`${key} 不存在`)
           }
        }
     })
   }
   const personValidators = {
    name(val){
        return typeof val ==='string';
    },
    age(val){
        return typeof val==='number' && val>18
    }
   }
   class Person{
      constructor(name,age){
        this.name = name;
        this.age = age;
        return validator(this,personValidators);
      }
   }
   const person = new Person('Davis',22);
   console.info(person);

   person.name = 48;
}