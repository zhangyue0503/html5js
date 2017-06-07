<template>
  <div class="login">
    <div class="input-wrap">
      <input type="text" v-model="name"/>
      <span v-if="error.name" class="err-msg">{{error.name}}</span>
    </div>
    <div class="input-wrap">
      <input type="password" v-model="pwd"/>
      <span v-if="error.pwd" class="err-msg">{{error.pwd}}</span>
    </div>
    <div class="input-wrap">
      <button @click="login">提交</button>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      name:'',
      pwd:'',
      error:{
        name:'',
        pwd:''
      }
    }
  },
  methods:{
    check(name,pwd){
      if(!name){
        this.error.name = '请输入姓名';
        return false;
      }
      if(!pwd){
        this.error.pwd = '请输入密码';
        return false;
      }
      return true;
    },
    login(){
      const{name,pwd,$router} = this;
      if(!this.check(name,pwd)) return;

      if(name=='admin' && pwd==123){
        $router.go({name:'main'});
      }else{
        alert('用户名密码错误');
      }
    }
  }
};

</script>

<style scoped lang="scss">
.login{
width:300px;margin:10% auto;
}
</style>
