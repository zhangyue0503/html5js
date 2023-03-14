<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import stroe from '@/store'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  mounted(){
    console.log(this.$store.state.a)
    // this.$store.state.a = 2
    this.$store.commit('changeA', 2)
  }
}
</script>
