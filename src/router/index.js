import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Car from '@/components/car.vue'
import Search from '@/components/search.vue'
import Vip from '@/components/vip.vue'
import Login from '@/components/login.vue'
import Main from '@/components/main.vue'

Vue.use(Router)

export default new Router({
    routes: [	
    	{
    		path:'/',
	         redirect:"/home"
	    },
    	{
    		path:'/home',
	        component:Main,
	        children:[
	        	{
		    		path:'/',
			        redirect:"/index"
		    	},

	        	{
		    		path:'/index',
			        component:Index
		    	},
		    	{
		    		path:'/search',
			        component:Search
		    	},
		    	{
		    		path:'/car',
			        component:Car
		    	},
		    	{
		    		path:'/vip',
			        component:Vip
		    	}
	        ]
    	},
		{
    		path:'/login',
	        component:Login
	    }

	]
})
