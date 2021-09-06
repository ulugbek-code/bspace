import { createRouter, createWebHistory } from 'vue-router';

import Accounts from './pages/Accounts.vue'
import BalanceUpload from './pages/BalanceUpload.vue'
import Consolidation from './pages/Consolidation.vue'
import Dashboard from './pages/Dashboard.vue'
import FinancialStats from './pages/FinancialStats.vue'
import Firms from './pages/Firms.vue'
import Corrections from './pages/Corrections.vue'
import NotFound from './components/nav/NotFound.vue'
import SignUp from './components/signing/SignUp.vue'
import SignIn from './components/signing/SignIn.vue'

const token = localStorage.getItem("mytoken")
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: token ? "/dashboard": "/signIn"},
        {path: '/dashboard', component: Dashboard},
        {path: '/financial', component: FinancialStats},
        {path: '/consolidation', component: Consolidation},
        {path: '/accounts', component: Accounts},
        {path: '/firms', component: Firms},
        {path: '/balance', component: BalanceUpload},
        {path: '/corrections', component: Corrections},
        {path: '/signUp', component: SignUp},
        {path: '/signIn', component: SignIn},
        {path: '/:notFound(.*)', component: NotFound}
    ]
})

export default router