<template>
    <div :class="[isNavOpened ? 'nav' : '']" class="box">
        <create-balance></create-balance>
        <table-balance></table-balance>
    </div>
</template>

<script>
import CreateBalance from '../components/balanceUpload/CreateBalance.vue'
import TableBalance from '../components/balanceUpload/TableBalance.vue'

export default {
    components:{
        CreateBalance,
        TableBalance
    },
    computed:{
        isNavOpened(){
            return this.$store.getters.isNav
        }
    },
}
</script>

<style scoped>
.box{
    margin-left: 270px;
}
.box.nav{
    margin-left: 110px;
}
</style>