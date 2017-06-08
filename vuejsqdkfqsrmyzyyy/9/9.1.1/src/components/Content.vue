<template>
    <div class="content">
        <div class="item" v-for="item in items">
            {{item.content}}
        </div>
    </div>
</template>

<script>
import {getItmes} from '../vuex/getters';
export default{
    vuex:{
        getters:{
            items:getItems
        }
    }
}
</script>
