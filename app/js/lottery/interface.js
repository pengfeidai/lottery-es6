import $ from 'jquery';

class Interface{
    /**
     * [getDmit 获取遗漏数据]
     * @param  {string} issue [当前期号]
     * @return {[type]}       [description]
     */
    getOmit(issue) {
        let self = this;
        return new Promise((resolve,reject) => {
            $.ajax({
                url:'/get/omit',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function(res) {
                    self.setOmit(res.data);
                    resolve.call(self,res);
                },
                error:function(err) {
                    reject.call(err);
                }
            })
        });
    }
    /**
     * [getOpenCode 获取开奖号码]
     * @param  {string} issue [期号]
     * @return {[type]}       [description]
     */
    getOpenCode(issue){
        let self = this;
        return new Promise((resolve,reject) => {
            $.ajax({
                url:'/get/opencode',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function(res) {
                    self.setOpenCode(res.data);
                    resolve.call(self,res);
                },
                error:function(err) {
                    reject.call(err);
                }
            })
        });
    }

    /**
     * [getState 获取当前状态]
     * @param  {string} issue [当前期号]
     * @return {[type]}       [description]
     */
    getState(issue){
        let self = this;
        // 为什么要先保存this,而不是在箭头函数中直接用this，因为在箭头函数的this指向是在它定义的时候，而不是运行时候
        return new Promise((resolve,reject) => {
            $.ajax({
                url:'/get/state',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function(res) {
                    resolve.call(self,res);
                },
                error:function(err) {
                    reject.call(err);
                }
            })
        });
    }
}
export default Interface;