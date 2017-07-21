import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Car from '@/components/car.vue'
import Search from '@/components/search.vue'
import Vip from '@/components/vip.vue'
import Login from '@/components/login.vue'
import Main from '@/components/main.vue'
import vipMessage from '@/components/vip-message.vue'
import vipSetting from '@/components/vip-setting.vue'
import Classify from '@/components/classify.vue'


Vue.use(Router)

export default new Router({
	mode:"history",
	scrollBehavior (to, from, savedPosition) {
	  return { x: 0, y: 0 }
	},
    routes: [	
    	{
    		path:'/',
	         redirect:"/home"
	    },
	    {
    		path:'/classify/:type',
			component:Classify,
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
		    		path:'/vip',
			        component:Vip,
			        children:[
			        	{
				    		path:'',
					        redirect:"message"
				    	},
			        	{
				    		path:'message',
					        component:vipMessage,
				    	},

				    	{
				    		path:'set',
					        component:vipSetting,
				    	},
			        ]
		    	}
	        ]
    	},
		{
    		path:'/login',
	        component:Login
	    },
	    {
    		path:'/car',
	        component:Car
    	}

	]
})
