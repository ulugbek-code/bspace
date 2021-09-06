<template>
    <div id="added-balance">
        <h3>Balance List</h3>
        <div class="table-container">
            <table>
                <tr>
                    <th v-for="title in titles" :key="title">
                        <h4>{{title}} <fa class="arrows" :icon="['fas', 'arrows-alt-v']" /></h4>
                    </th>
                </tr>
                <tr @click="testTr" v-for="balance in balances" :key="balance">
                    <td>
                        {{balance.year}}
                    </td>
                    <td>
                        {{balance.period}}
                    </td>
                    <td>
                        {{substringedDesc(balance.desc)}}
                        <small class="tooltiptext">{{balance.desc}}</small>
                    </td>
                    <td :class="[balance.status === 'Accepted' ? 'greeny' : 'redish']">
                        <p>{{balance.status}}</p>
                    </td>
                    <td @click.stop="testTrash" id="trash">
                        <fa :icon="['fas', 'trash']" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            titles:['Year','Period','Description','Status'],
            balances:[
                {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsad',
                    status: 'In Progress'
                },
                {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsad',
                    status: 'Accepted'
                },
                {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsad adadad dadada  addadd',
                    status: 'In Progress'
                },
                {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsadasdd sdad',
                    status: 'Accepted'
                },
                {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsad',
                    status: 'In Progress'
                },
                 {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsad',
                    status: 'In Progress'
                },
                 {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsad',
                    status: 'In Progress'
                },
                 {
                    year: 1199,
                    period: 'March',
                    desc: 'lalda adakj da sda adsd dsad',
                    status: 'In Progress'
                }
            ]
        }
    },
    methods:{
        testTr(){
            console.log('hello row')
        },
        testTrash(){
            console.log('hello trash')
        },
        substringedDesc(val){
            if(val.length > 45){
                return (val.substring(0, 45) + '...')
            }else{
                return val
            }
        }
    }
}
</script>

<style scoped>
#added-balance{
    width: 60%;
    background: rgba(221, 221, 221, 0.4);
    padding: 20px 0 30px 20px;
    /* margin-bottom: 20px; */
    
}
#added-balance .table-container{
    width: 98%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
table{
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}
table tr:nth-child(1){
    position: sticky;
    top: 0;
    z-index: 10;
    background: #f1f1f1;
}
table tr:nth-child(1)::after{
    content: '';
    height: 0.5px;
    width: 100%;
    position: absolute;
    bottom: 2%;
    left:0;
    z-index: 10;
    background: rgba(170, 170, 170, 1);
}
th h4{
    font-size: 16px;
    padding-left: 10px;
    color: rgb(133, 127, 127);
}
.arrows{
    font-size: 13px;
    padding-bottom: 2px;
}
th:nth-child(3) .arrows{
    display: none;
}
tr:hover:not(:nth-child(1)){
    border-radius: 15px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
    background: #fff;
    cursor: pointer;
}
td{
    position: relative;
    padding: 8px 12px;
    font-size: 13px;
}
td:nth-child(1){
    border-top-left-radius:15px;
    border-bottom-left-radius:15px
}
td:last-child{
    border-top-right-radius:15px;
    border-bottom-right-radius:15px
}
.greeny p{
    text-align: center;
    padding: 3px;
    border-radius: 25px;
    background: rgba(155, 222, 157, 0.3);
    color: rgba(76, 175, 80, 1);
}
.redish p{
    text-align: center;
    padding: 3px;
    border-radius: 25px;
    background: rgba(255, 178, 125, 0.3);
    color: rgba(237, 125, 43, 1);
}
.tooltiptext {
    visibility: hidden;
    background-color: rgb(39, 43, 61);
    color: #fff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
    border-radius: 6px;
    padding: 5px; 
    width: fit-content;
    position: absolute;
    top: 70%;
    left: 4%;
    z-index: 1;
}
td:nth-child(3):hover .tooltiptext {
  visibility: visible;
}
#trash{
    font-size: 16px;
    color: rgba(170, 170, 170, 1);
    padding: 4px;
    cursor:pointer;
}
#trash:hover{
    color: rgba(204, 24, 24, 0.75);
}
</style>