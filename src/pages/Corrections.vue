<template>
    <div :class="[isNavOpened ? 'nav' : '']" class="box">
        <create-correction></create-correction>
        <div class="header">
            <h2>Correction</h2>
        </div>
        <table-correction></table-correction>
    </div>
</template>

<script>
import CreateCorrection from '../components/corrections/CreateCorrection.vue'
import TableCorrection from '../components/corrections/TableCorrection.vue'

export default {
    components:{
        CreateCorrection,
        TableCorrection
    },
    data(){
        return{}
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
.header{
    margin-left: 1%;
    margin-bottom: 4px;
}
</style>