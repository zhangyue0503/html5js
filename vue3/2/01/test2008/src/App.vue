<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
    <ul>
      <li v-for="item in datalist" :key="item">
        {{ item }}
      </li>
    </ul>
    <navbar :myname="myname"></navbar>
  </div>
</template>

<script>
import navbar from '@/components/NavBar'
import axios from 'axios'

export default {
  data () {
    return {
      datalist: [111, 222, 333],
      myname:'home'
    }
  },
  methods: {
    handleClick() {

    }
  },
  components: {
    navbar
  },
  mounted() {
    axios.get('/zy/api/mmdb/movie/v3/list/hot.json?ct=%E9%95%BF%E6%B2%99&ci=70&channelId=4')
      .then(res=>res.data)
      .then(res=>{console.log(res)})
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
