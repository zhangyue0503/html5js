<template>
    <div>
        <div style="height:200px;background:yellow;">大轮播</div>
        二级导航
        <router-link to="/films/nowplaying">Nowplaying</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted(){
        console.log(this.$store.state.a)
        this.$store.dispatch('getA', 3)
    }
}
</script>