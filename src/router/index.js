import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('@/components/index')), 'index')
const Car = r => require.ensure([], () => r(require('@/components/car')), 'car')
const Search = r => require.ensure([], () => r(require('@/components/search')), 'search')
const Login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const Main= r => require.ensure([], () => r(require('@/components/main')), 'main')
const vipMessage= r => require.ensure([], () => r(require('@/components/vip-message')), 'main')
const Classify = r => require.ensure([], () => r(require('@/components/classify')), 'classify')
const FilmDetail = r => require.ensure([], () => r(require('@/components/film-detail')), 'filmdetail')


Vue.use(Router)

export default new Router({
    routes: [	
    	{
    		path:'',
	        redirect:"/home"
	    },	
    	{
    		path:'/home',
	        component:Main,
	        children:[
	        	{
		    		path:'',
			        redirect:"index"
		    	},

	        	{
	        		name:"index",
		    		path:'index',
			        component:Index
		    	},
		    	{
		    		name:"search",
		    		path:'search',
			        component:Search
		    	},			     
		    	{
		    		name:"vip",
		    		path:'vip',
			        component:vipMessage		       
		    	}
	        ]
    	},
    	{
    		path:'/classify/:type',
			component:Classify,
			name:"classify"
	    },	  
		{
    		path:'/login',
	        component:Login
	    },
	    {
	    	name:"car",
    		path:'/car',
	        component:Car
    	},
    	 {
    		path:'/film-detail/:id',
	        component:FilmDetail
    	}

	]
})
