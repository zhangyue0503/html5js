<template>
    <div id="app">
        <side></side>
        <content></content>
    </div>
</template>

<script>
    import Side from './components/Side.vue'
    import Content from './components/Content.vue'
    export default{
        components:{
            Side,
            Content
        }
    }
</script>
