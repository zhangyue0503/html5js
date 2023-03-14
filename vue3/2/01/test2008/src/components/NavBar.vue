<template>
    <div>
        {{myname}}
    </div>
</template>

<script>

export default {
    props:{
        'myname':{
            type:String,
            default:''
        }
    },
    mounted() {
        console.log("mounted")
    },
}
</script>

<style lang="scss" scoped>
div{
    background-color:yellow;
}
</style>
