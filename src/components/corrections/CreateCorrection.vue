<template>
    <div class="correction-create-box">
        <added-correction></added-correction>
        <add-correction></add-correction>
    </div>
</template>

<script>
import AddCorrection from './AddCorrection.vue'
import AddedCorrection from './AddedCorrection.vue'

export default {
    components:{
        AddCorrection,
        AddedCorrection
    }
}
</script>

<style scoped>
    .correction-create-box{
        display: flex;
        height: 34vh;
    }
</style>