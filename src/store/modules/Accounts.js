import axios from 'axios'
import router from '../../router.js'

export default {
    namespaced: true,
    state(){
        return{
            isLoading: false,
            error: null,
            accounts: [],
            parentAccounts: [],
            categories: [],
            ifrsCategories: [],
            ifrsTypes: []
        }
    },
    getters:{
        getAccountList(state){
            return state.accounts
        },
        getParentAccountsList(state){
            return state.parentAccounts
        },
        getCategories(state){
            return state.categories
        },
        getIfrs(state){
            return state.ifrsCategories
        },
        getifrsTypes(state){
            return state.ifrsTypes
        },
        getLoader(state){
            return state.isLoading
        },
        getError(state){
            return state.error
        }
    },
    mutations:{
        getAccountsTable(state,payload){
            state.isLoading = true;
            state.accounts = payload.data.data
            // console.log(state.accounts)
        },
        getParentAccountsTable(state,payload){
            state.isLoading = true;
            state.parentAccounts = payload.data.data
        },
        getCategoriesList(state,payload){
            state.categories = payload.data.data
            // console.log(state.categories)
        },
        getIfrsList(state,payload){
            state.ifrsCategories = payload.data.data
            // console.log(state.ifrsCategories)
        },
        getifrsTypesList(state,payload){
            state.ifrsTypes = payload.data.data
            // console.log(payload.data.data)
        }
    },
    actions:{
        async getAccounts(context,payload){
            context.state.isLoading = true;
            await axios.get(
                "https://bspacedev.azurewebsites.net/api/Accounts/GetAll/" + payload.isSubAcc + "/" + payload.firmId
                ,{
                    headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("mytoken")}`
                    }
                }
            )
            .then((response) => {
                if(payload.isSubAcc){
                    context.commit('getAccountsTable',response)                   
                }else{
                    context.commit('getParentAccountsTable',response)
                }
                context.state.isLoading = false
                },
                (e) => {
                    if(e.response.status === 401 ){ // ||e.response.status === 404
                        context.rootState.isActive = false
                        // localStorage.removeItem('mytoken')
                        // localStorage.removeItem('firmId')
                        localStorage.clear();
                        context.state.isLoading = false
                        router.push('/signIn')
                        return
                    }
                    context.state.error = "Failed to fetch data"
                }   
            )
        },
        async getCategories(context){
            await axios.get("https://bspacedev.azurewebsites.net/api/Categories/GetAll",
                {
                    headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("mytoken")}`
                    }
                }
            ).then((res)=>{
            context.commit('getCategoriesList',res)
            },
            (error)=>{
                console.log(error)
            })
        },
        async getIfrs(context){
            await axios.get('https://bspacedev.azurewebsites.net/api/IfrsCategories/GetAll',
            {
                headers: {
                "Authorization" : `Bearer ${localStorage.getItem("mytoken")}`
                }
            }
            ).then((res)=>{
                context.commit('getIfrsList',res)
                },
                (error)=>{
                    console.log(error)
                })
        },
        async getifrsTypes(context){
            await axios.get('https://bspacedev.azurewebsites.net/api/IfrsTypes/GetAll',
            {
                headers: {
                "Authorization" : `Bearer ${localStorage.getItem("mytoken")}`
                }
            }).then((res)=>{
                context.commit('getifrsTypesList',res)
            },
            (error)=>{
                console.log(error)
            })
            
        }
    }
}