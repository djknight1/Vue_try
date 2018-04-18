    var Event = new Vue();

    Vue.component('address-list',{
        template:'#li-tpl',
        props:["item","index","currentIndex"],
        /*子组件点击方法触发action方法,传递两个参数,一个是自定义事件名,另一个是参数
        /*action方法触发自定义名字为name的事件*/
        /*在父组件挂载的时候触发 父组件挂载时就是Vue mounted*/
        methods:{
            action:function (fun_name,param) {
                Event.$emit(fun_name, param);
            },
        }
    });

    new Vue({
        el:".container",
        data:{
            addressList:[],
            key:1,
            limitedNum:3,
            is_more:false,
            currentIndex:0,
            deliverWay:1,
            is_add_newAddress:0,
            newitem:{"isDefault":false,},
        },
        mounted:function () {
            var me = this;
            this.getData();
            Event.$on("changeDefault",function (params) {
                me.changeDefault(params);
            });
            Event.$on("choose",function (params) {
                me.choose(params);
                console.log(params);
            });
            Event.$on("show_delete",function (params) {
                me.show_delete(params);
                console.log(params);
            });
        },
        computed:{
            filterAddress:function () {
                return this.addressList.slice(0,this.limitedNum);/*返回一个新的数组*/
            }
        },
        methods:{
            getData:function () {
                var me = this;
               this.$http.get("data/address.json").then(function (res) {
                   me.addressList = res.body.result;
               })
            },
            show_more:function () {
                this.is_more = !this.is_more;
                if(this.is_more){
                    this.limitedNum = this.addressList.length;
                }
                else{
                    this.limitedNum = 3;
                }
            },
            choose:function (index) {
                this.currentIndex = index;
                console.log(this.currentIndex);
            },
            changeDefault:function (addressId) {
                this.addressList.forEach(function (node,index) {
                    if(node.addressId ===addressId){
                        node.isDefault = true;
                    }
                    else {
                        node.isDefault = false;
                    }
                })
            },
            change_isAddNewAddress:function () {
                this.is_add_newAddress = !this.is_add_newAddress;
            },
            saveNewAddress:function () {
                this.change_isAddNewAddress();
                var new_item = Object.assign({},this.newitem);
                this.addressList.push(new_item);
                console.log(this.addressList);
            },
            show_delete:function (addressId) {
                var index = this.find_index_by_id(addressId);
                this.addressList.splice(index, 1);
            },
            find_index_by_id:function (id) {
                this.addressList.findIndex(function (item) {
                    return item.addressId === id;
                })
            }
        }
    });