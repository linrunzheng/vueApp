import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store= new Vuex.Store({
	state:{
		goodsList:localStorage["goodsList"]?JSON.parse(localStorage["goodsList"]): []  
	},
	getters:{
		sum:state=>{
			var total=0;
            state.goodsList.forEach((item)=>{
                if(item.select){
                    total+=item.price*item.number
                }             
            })
            return total
		},
		goddsNumber:state=>{
			return state.goodsList.length
		}
	},
	mutations:{
		addGoods:(state,data)=>{
			state.goodsList.push(data);
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));						
		},
		deleteGoods(state,index){
			state.goodsList.splice(index,1);		
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
		},
		updateGoods(state,data){
			const {index,key,value}=data;
			state.goodsList[index][key]=value;	
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
		}
	}
})