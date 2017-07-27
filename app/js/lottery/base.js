// 基础功能模块

import $ from 'jquery';

class Base{
     /**
     * 初始化各玩法的说明
     * @return {[type]} [description]
     */
    initPlayList() {
        // play_list 是一个 Map 数据结构
        this.play_list
            .set('r2', {
                name: '任二',
                bonus: 6,
                tip: '从01~11中任选两个或多个号码，所选中号码与开奖号码任意两个号码相同，即中奖<strong class="red">6</strong>元',
            })
            .set('r3', {
                name: '任三',
                bonus: 19,
                tip: '从01~11中任选三个或多个号码，所选中号码与开奖号码任意三个号码相同，即中奖<strong class="red">19</strong>元',
            })
            .set('r4', {
                name: '任四',
                bonus: 78,
                tip: '从01~11中任选四个或多个号码，所选中号码与开奖号码任意四个号码相同，即中奖<strong class="red">78</strong>元',
            })
            .set('r5', {
                name: '任五',
                bonus: 540,
                tip: '从01~11中任选五个或多个号码，所选中号码与开奖号码号码相同，即中奖<strong class="red">540</strong>元',
            })
            .set('r6', {
                name: '任六',
                bonus: 90,
                tip: '从01~11中任选六个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">90</strong>元',
            })
            .set('r7', {
                name: '任七',
                bonus: 26,
                tip: '从01~11中任选七个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">26</strong>元',
            })
            .set('r8', {
                name: '任八',
                bonus: 9,
                tip: '从01~11中任选八个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">9</strong>元',
            });
    }

    /**
     * [initNumber 初始化号码]
     * @return {[type]} [description]
     */
    initNumber(){
        for( let i=1;i<12;i++){
            // number 是一个 Set 数据结构,不允许重复号码
            this.number.add((''+i).padStart(2,'0'));
        }
    }

    /**
     * 设置遗漏数据
     * @param {Map} omit 遗漏数据的 Map 集合
     */
    setOmit(omit){
        // 逻辑：先清空，再重新赋值
        let self = this;
        self.omit.clear();
        // 保存到数据结构中
        for(let [index,item] of omit.entries()){
            self.omit.set(index,item);
        }
        // 反映到页面
        $(self.omit_el).each(function(index,item) {
            $(item).text(self.omit.get(index))
        });
    }

    /**
     * 设置开奖数据
     * @param {Map} open_code 开奖数据的 Set 集合
     */
    setOpenCode(code) {
        // 先清空，再重新赋值
        let self = this;
        self.open_code.clear();
        // Set 集合,开奖号码不重复
        for(let item of code.values()){
            self.open_code.add(item);
        }
        // 调用接口
        self.updateOpenCode && self.updateOpenCode.call(self, code);
    }

    /**
     * 号码选中与取消
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    toggleCodeActive(e) {
        let self = this;
        // 获取当前选中的对象
        let $cur = $(e.currentTarget);
        $cur.toggleClass('btn-boll-active');
        self.getCount();
    }

    /**
     * 切换玩法
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    changePlayNav(e) {
        let self = this;
        let $cur = $(e.currentTarget);
         // 选中的 active，没选中的去掉 active
        $cur.addClass('active').siblings().removeClass('active');
        // 获取玩法字符串，并转为小写
        self.cur_play = $cur.attr('desc').toLocaleLowerCase();
        // 更新 DOM
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
        // 切换玩法后要把上次选中的号码重置
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        self.getCount();
    }

    /**0
     * 操作区：全 大 小 奇 偶 清空
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    assistHandle(e) {
        // 阻止默认事件
        e.preventDefault();
        let self = this;
        let $cur = $(e.currentTarget);
        // 返回当前选中集合的索引
        let index = $cur.index();
        $('.boll-list .btn-boll').removeClass('btn-boll-active');

        // 全选
        if (index === 0) {
            $('.boll-list .btn-boll').addClass('btn-boll-active');
        }

        // 大
        if (index === 1) {
            $('.boll-list .btn-boll').each(function(i, t) {
                if (t.textContent > 5) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }

        // 小
        if (index === 2) {
            $('.boll-list .btn-boll').each(function(i, t) {
                if (t.textContent < 6) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }

        // 奇
        if (index === 3) {
            $('.boll-list .btn-boll').each(function(i,t) {
                if (t.textContent % 2 === 1) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }

        // 偶
        if (index === 4) {
            $('.boll-list .btn-boll').each(function(i, t) {
                if (t.textContent % 2 === 0) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }

        self.getCount();
    }

    /**
     * 获取当前彩票的名称
     * @return {[type]} [description]
     */
    getName() {
        return this.name;
    }

    /**
     * 添加号码到购物车
     */
    addCode() {
        let self = this;
        // 拿到选择的号码，\d 查找数字，[01 ,02, 03, 04]
        let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active = $active ? $active.length : 0;
        let count = self.computeCount(active, self.cur_play);

        if (count) {
            // join() 方法用于把数组中的所有元素放入一个字符串。
            self.addCodeItem($active.join(' '), self.cur_play, self.play_list.get(self.cur_play).name, count);
        }
    }

    /**
     * 添加单次号码到购物车
     * @param {[type]} code     [description]
     * @param {[type]} type     [description]
     * @param {[type]} typeName [description]
     * @param {[type]} count    [description]
     */
    addCodeItem(code, type, typeName, count) {
        let self = this;
        const tpl = `
        <li codes="${type} | ${code}" bouns="${count*2}" count="${count}">
            <div class="code">
                <b>${typeName}${count>1?'复式':'单式'}</b>
                <b class="em">${code}</b>
                [${count}注，<em class="code-list-money">${count*2}</em>元]
            </div>
        </li>
        `;
        // 反映到 DOM
        $(self.cart_el).append(tpl);
        self.getTotal();
    }

    getCount() {
        let self = this;
        let active = $('.boll-list .btn-boll-active').length;
        // 当前选中的注数
        let count = self.computeCount(active, self.cur_play);
        // 计算奖金范围
        let range = self.computeBonus(active, self.cur_play);
        let money = count * 2;
        let win1 = range[0] - money;
        let win2 = range[1] - money;
        let tpl;
        let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;
        let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;

        if (count === 0) {
            tpl = `您选了<b class="red">${count}</b>注，共<b class="red">${count*2}</b>元`;
        } else if (range[0] === range[1]) {
            tpl = `
            您选了<b>${count}</b>注，共<b>${count*2}</b>元，
            <em>若中奖，奖金：<strong class="red">${range[0]}</strong>元，
            您将${win1>=0?'盈利':'亏损'}
            <strong class="${win1>=0?'red':'green'}">${Math.abs(win1)}</strong>元</em>
            `;
        } else {
            tpl = `
            您选了<b>${count}</b>注，共<b>${count*2}</b>元，
            <em>若中奖，奖金：<strong class="red">${range[0]}</strong>元至<strong class="red">${range[1]}</strong>元，
            您将${(win1>=0&&win2>=0)?'盈利':'亏损'}
            <strong class="${win1>=0?'red':'green'}">${c1}</strong>元</em>至
            <strong class="${win2>=0?'red':'green'}">${c2}</strong>元
            `;
        }
        $('.sel_info').html(tpl);
    }

    /**
     * 计算购物车总金额
     * @return {[type]} [description]
     */
    getTotal() {
        let count = 0;
        $('.codelist li').each(function(index, item) {
            count += $(item).attr('count') * 1;
        });
        $('#count').text(count);
        $('#money').text(count * 2);
    }

    /**
     * 生成随机数
     * @param  {number} num 随机数的个数
     * @return {[type]}     [description]
     */
    getRandom(num) {
        let arr = [];
        let index;
        // 将 Set 集合转为 Array
        let number = Array.from(this.number);

        while (num--) {
            index = Number.parseInt(Math.random() * number.length);
            arr.push(number[index]);
            // 保证每次号码不重复
            number.splice(index, 1);
        }
        return arr.join(' ');
    }

    /**
     * 随机选号
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    getRandomCode(e) {
        e.preventDefault();
        // 获取注数
        let num = e.currentTarget.getAttribute('count');
        // 获取玩法
        let play = this.cur_play.match(/\d+/g)[0];
        let self = this;

        if (num === '0') {
            // 购物车清空
            $(self.cart_el).html('');
        } else {
            for (let i = 0; i < num; i++) {
                self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
            }
        }
    }
}

export default Base;