// 计算模块

class Calculate{
    /**
     * [computeCount 计算注数]
     * @param  {number} active    [当前选中的号码]
     * @param  {[type]} play_name [当前玩法标识]
     * @return {number}           [注数]
     */
    computeCount(active,play_name){
        let count = 0;
        // play_list 是一个 Map 数据结构
        const exist = this.play_list.has(play_name);
        // 生成一个长度为 active 的数组，并全部填充 0
        const arr = new Array(active).fill('0');
        if(exist && play_name.at(0) === 'r'){
            // 取 rx 后面的 x
            count = Calculate.combine(arr,play_name.split('')[1]).length;
        }
        return count;
    }

    /**
     * [computeBonus 奖金范围预测]
     * @param  {number} active    [当前选中的号码]
     * @param  {string} play_name [当前的玩法标识]
     * @return {array}           [奖金范围]
     */
    computeBonus(active,play_name){
        const play = play_name.split('');
        const self = this;
        let arr = new Array(play[1]*1).fill(0);
        let min,max;
        if(play[0] === 'r'){
            let min_active = 5-(11-active);
            if(min_active>0){
                if(min_active-play[1]>=0){
                    arr = new Array(min_active).fill(0);
                    min = Calculate.combine(arr,play[1]).length;
                }else{
                    if(play[1]-5>0 && active-play[1]>=0){
                       arr = new Array(active-5).fill(0);
                       min = Calculate.combine(arr,play[1]-5).length;
                    }else{
                        min = active-play[1]>-1?1:0
                    }
                }
            }else{
                min = active-play[1]>-1?1:0;
            }
            let max_active = Math.min(active,5);
            if(play[1]-5>0){
                if(active-play[1]>=0){
                    arr = new Array(active-5).fill(0);
                    max = Calculate.combine(arr,play[1]-5).length;
                }else{
                    max = 0;
                }
            }else if(play[1]-5<0){
                arr = new Array(Math.min(active,5)).fill(0);
                max = Calculate.combine(arr,play[1]).length;
            }else{
                max = 1;
            }
        }
        return [min,max].map(item => item*self.play_list.get(play_name).bonus);
    }


    /**
     * 排列组合运算
     * @param  {array} arr 选号列表，如：[01, 02, 03, 04]
     * @param  {number} size 玩法后缀，如：3
     * @return {number}     注数
     */
    static combine(arr,size){
        // 保存最后各种组合的结果
        let allResult = [];

        // restlt 初始为 []
        (function f(arr,size,result) {
           let arrLen = arr.length;
           if(size > arrLen){
             return;
           }
           if(size === arrLen){
             allResult.push([].concat(result,arr))
           }else{
            // 不断增加新的数组
             for(let i=0;i<arrLen;i++){
                // 保存上次运行结果
                let newResult = [].concat(result);
                newResult.push(arr[i]);

                // 如果选择的是‘任一’，则结束计算
                if(size === 1){
                    allResult.push(newResult);
                }else{
                    // 保存上次运行结果
                    let newArr = [].concat(arr);
                    // 截取数组片段
                    newArr.splice(0,i+1);
                    // 递归
                    f(newArr,size-1,newResult)
                }
             }
           }
        })(arr,size,[])
        return allResult;
    }
}

export default Calculate;