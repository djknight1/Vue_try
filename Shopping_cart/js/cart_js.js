var vm  =new Vue({
   el:"#app",

   data:{
       delFlag:false,
       totalMoney:50,
       productList:[],
       All_checked:false,
       currentItem:{}
   },


   mounted:function () {
        this.getData();
        console.log(this.delFlag);
   },


    /*过滤器*/
   filters:{
       /*默认会接受一个参数,就是使用该函数传过来的参数*/
       formatMoney:function (val,type) {
        /*传了一个值返回一个值*/

        return "$"+val.toFixed(2)+type;
       }
   },
    computed:{

    },
   methods:{
      getData:function () {
          /*在Vue实例里面所有的this都指向vue实例*/
          /*vue中methods对象里的this都指向vue实例*/
          var me = this;
          this.$http.get("data/cartData.json").then(function (res) {/*用vue-resources取得数据,res是返回的json数据*/
             this.productList = res.body.result.list;/*res是vue给我们封装的对象 result里面不在res里面*/
              this.totalMoney = res.body.result.totalMoney;
          })
      },

      changeAmount:function (item,type) {

          if(type == 1){
               item.productQuantity++;
          }
          else if(type == -1){
              if(item.productQuantity==0){
                    item.productQuantity=0;
               }
              else  item.productQuantity--;
          }
          this.calTotalPrice();
       },

      change_checked:function (item) {
          var me = this;
          /*TODO:修复如果有一个是未选中的则取消全选标志*/
          var flag = true;
          /*判断所有的checked都被选中时 不用点击全选也让全选选中*/
          Vue.set(item, "checked", !item.checked);
          if (!item.checked) this.All_checked = false;
          this.calTotalPrice();
      },

      checkAll:function () {
          this.All_checked = true;
          this.productList.forEach(function (val) {
              Vue.set(val,"checked",true);
          });
          this.calTotalPrice();
      },
      uncheckAll:function () {
          this.All_checked = false;
          this.productList.forEach(function (val) {
              Vue.set(val,"checked",false);
          });
          this.calTotalPrice();
      },

      calTotalPrice:function () {
          var sum=0;
          this.productList.forEach(function (item,index) {
              if(item.checked){
                  sum+= item.productPrice*item.productQuantity
              }
          }),
          this.totalMoney = sum;
      },

      changeDel:function (item) {
           this. delFlag = !this.delFlag;
           this.currentItem = item;
      },

      delItem:function () {
          var me = this;
          var index=this.productList.findIndex(function (item) {
              return item.productId ==me.currentItem.productId;
          });
          console.log(index);
          this.productList.splice(index,1);
          this.delFlag = !this.delFlag;
          this.currentItem = {};
          this.calTotalPrice();
      }
   }

});