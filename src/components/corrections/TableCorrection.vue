<template>
    <div id="table-correction">
        <div class="table-wrapper">
            <table>
                <tr>
                    <th>CODE <fa class="arrows" :icon="['fas', 'arrows-alt-v']" /></th>
                    <th>NAME</th>
                    <th>
                        <small>OPENING STOCK</small>
                        CORRECTION
                    </th>
                    <th>
                        <small>OPENING STOCK</small>
                        IFRS AMOUNT
                    </th>
                    <th>
                        <small>PERIOD</small>
                        CORRECTION
                    </th>
                    <th>
                        <small>PERIOD</small>
                        IFRS AMOUNT
                    </th>
                    <th>
                        <small>CLOSING STOCK</small>
                        CORRECTION
                    </th>
                    <th>
                        <small>CLOSING STOCK</small>
                        IFRS AMOUNT
                    </th>
                    <th>
                        <small>IFRS</small>
                        CODE <fa class="arrows" :icon="['fas', 'arrows-alt-v']" />
                        </th>
                    <th>IFRS <fa class="arrows" :icon="['fas', 'arrows-alt-v']" /></th>
                </tr>
                <tr v-for="table in tables" :key="table">
                    <td>{{table.code}}</td>
                    <td>{{table.name}}</td>
                    <td>{{numberWithCommas(table.openCorr)}}</td>
                    <td>{{numberWithCommas(table.openIFRS)}}</td>
                    <td>{{numberWithCommas(table.periodCorr)}}</td>
                    <td>{{numberWithCommas(table.periodIFRS)}}</td>
                    <td>{{numberWithCommas(table.closingCorr)}}</td>
                    <td>{{numberWithCommas(table.closingIFRS)}}</td>
                    <td>{{table.endCode}}</td>
                    <td>{{table.endIFRS}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tables:[
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 1313.1,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'Осн. Ср-ва'
                },
                {
                code: 12,
                name: 'Благоустройство Земл',
                openCorr: 13131,
                openIFRS: -13,
                periodCorr:11313133133,
                periodIFRS:131333,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'Осн. Ср-ва'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                },
                {
                code: 12,
                name: 'Законсервированные осн. ср-ва',
                openCorr: 13131,
                openIFRS: 1313133133,
                periodCorr:11313133133,
                periodIFRS:1313331313,
                closingCorr:1313113313,
                closingIFRS:1323232132,
                endCode: 12,
                endIFRS: 'asas assaad'
                }
            ]
        }
    },
    methods:{
        numberWithCommas(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
}
</script>

<style scoped>
#table-correction{
    width: 100%;
    height: 60vh;
    overflow-y: scroll;
}
table{
    width: 98%;
    margin: 0 auto;
    border-collapse: collapse; 
    text-align: left;
}

tr:not(:nth-child(1)){
    border-bottom: 1px solid rgba(170, 170, 170, 0.2);
}
table tr:nth-child(1){
    height: 40px;
    position: sticky;
    top: 0;
    z-index: 1;
    background: #fff;
}
table th::after{
    content: '';
    height: 0.5px;
    width: 100%;
    position: absolute;
    bottom: 2%;
    left:0;
    z-index: 10;
    background: rgba(170, 170, 170, 1);
}
th{
    position: relative;
    font-size: 1rem;
    color: rgba(170, 170, 170, 1);
    padding:  2px 6px;
}
td{
    font-size: 12px;
    padding: 16px 12px;
}
td:nth-child(3),
td:nth-child(4),
td:nth-child(5),
td:nth-child(6),
td:nth-child(7),
td:nth-child(8){
    text-align: end;
}
th small{
    font-size: 11px;
    position: absolute;
    bottom: 65%;
    color: rgba(76, 175, 80, 1);
}
.arrows{
    font-size: 13px;
    padding-bottom: 2px;
}
tr:hover:not(:nth-child(1)){
    border-radius: 15px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
tr:active:not(:nth-child(1)){
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);

}
</style>