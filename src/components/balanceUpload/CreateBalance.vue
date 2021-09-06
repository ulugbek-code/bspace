<template>
    <div class="balance-create-box">
        <add-balance></add-balance>
        <added-balance></added-balance>
    </div>
</template>

<script>
import AddBalance from './AddBalance.vue'
import AddedBalance from './AddedBalance.vue'

export default {
    components:{
        AddBalance,
        AddedBalance
    }
}
</script>

<style scoped>
    .balance-create-box{
        display: flex;
        height: 34vh;
    }
</style>