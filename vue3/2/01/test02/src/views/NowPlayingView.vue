<template>
    <div>nowplaying

        <ul>
            <li v-for="item in datalist" :key="item" @click="handleClick(item)">
                {{ item }}
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    data(){
        return {
            datalist:['111','222','333']
        }
    },
    methods:{
        handleClick(item){
            // this.$router.push('/detail/'+item)
            this.$router.push({
                name:'zydetail',
                params:{
                    myid:item
                }
            })
        }

    }
}
</script>