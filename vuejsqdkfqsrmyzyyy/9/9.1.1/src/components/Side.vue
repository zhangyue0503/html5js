<template>
    <ul class="side list-unstyled">
        <li>增加</li>
        <li>删除</li>
    </ul>
</template>

<script>
import {addItem} from '../vuex/actions'
export default{
    data(){
        return {
        }
    },
    vuex:{
        actions:{
            addItem,
            deleteItem
        }
    }
}
</script>