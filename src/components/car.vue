<template>
   <div class="car-list-container">
	    <ul>
	    	<li class="car-list" v-for="(v,i) in goodsList">
	    		<div class="car-list__img">
	    			<img :src="v.url">
	    		</div>
	    		<div class="car-list__detail">
	    			<p class="car-list__detail__title">{{v.title}}</p>
	    			<p class="car-list__detail__number">数量：<button class="number--decrease iconfont icon-jianhao" @click="handleGoodsNumber(i,-1)"></button><input type="text" readonly="" v-model="v.number"><button class="number--increase iconfont icon-iconfont7" @click="handleGoodsNumber(i,1)"></button></p>
	    			<p class="car-list__detail__type">规格：<span>{{v.stock}}</span></p>
	    			<p class="car-list__detail__price">单价：<span>￥{{v.price}}</span></p>
	    			<p class="car-list__detail__sum">小计：<span>￥{{v.price*v.number}}</span></p>
	    		</div>
	    		<div class="car-list__operate">
	    			<span class="iconfont icon-shanchu delete-goods" @click="deleteGoods(i)"></span>
	    			<label >
	    				<input type="checkbox" name="goods" :checked="v.select==true" @change="toggleSelect(i)">
	    				<span></span>
	    			</label>
	    		</div>	   	    		
	    	</li>
	    </ul>
	    <div class="car-foot-nav">
	    	<button class="sum-price">总额：￥{{sum}}</button>
	    	<router-link :to='{name:"index"}' class="continue-shopping" tag="button">继续购物</router-link>
	    	<button class="to-pay">去结算</button>
	    </div>
   </div>
</template>

<script>
export default {
    name: 'car',
    data () {
        return {
            goodsList:[
                {
                    url:"http://localhost:8088/static/img/head.1f55be9.jpg",
                    title:"测试时 啊啊啊啊1111",
                    price:10,
                    stock:"盒",
                    number:33,
                    select:true
                },
                {
                    url:"http://localhost:8088/static/img/head.1f55be9.jpg",
                    title:"测试时 啊啊啊啊2222",
                    price:2000,
                    stock:"盒",
                    number:44,
                    select:false
                },
                {
                    url:"http://localhost:8088/static/img/head.1f55be9.jpg",
                    title:"测试时 啊啊啊啊3333",
                    price:77,
                    stock:"盒",
                    number:55,
                    select:true
                },
                {
                    url:"http://localhost:8088/static/img/head.1f55be9.jpg",
                    title:"测试时 啊啊啊啊3333",
                    price:10,
                    stock:"盒",
                    number:5,
                    select:false
                },

            ]  
        };
    },
    methods:{
        handleGoodsNumber(i,val){
            var number=this.goodsList[i].number;
            this.goodsList[i].number=number+val<=0?1:number+val;
        },
        deleteGoods(i){
            this.goodsList.splice(i,1);
        },
        toggleSelect(i){
             this.goodsList[i].select=!this.goodsList[i].select; 
        }
    },
    computed:{
        sum(){
            var total=0;
            this.goodsList.forEach((item)=>{
                if(item.select){
                    total+=item.price*item.number
                }             
            })
            return total
        }
    }
};
</script>

<style scoped lang="scss">
	@import '../base/css/base.scss';
   .car-list{
   		padding: 0.3125rem;
   		position: relative;
   		border-bottom: 0.0312rem solid #ddd;;
   		@include flex-center;
   		.car-list__img{
   			width:2rem;
	   		height: 2rem;
	   		img{
				width: 100%;
				height: auto;
	   		}
   		}
   		.car-list__detail{
   			flex:1;
   			padding:0 0.35rem;
   			p{
   				@include fz(12px);
   				padding:0.0312rem 0;
   				color: #888;
   				@include t-overflow(2);
   				span{
   					color:#77b59c;
   				}
   				&.car-list__detail__title{
					padding-bottom: 0.08rem;
   				}

   				&.car-list__detail__number{
   					button{
   						width: 0.6344rem;
   						height: 0.6344rem;
   						@include fz(14px);	
   					    border: 1px solid #aaa;
   					    background: #fff;
   						color: #666;
   						text-align: center;
   						vertical-align: middle;
   						&.number--decrease{

   						}
   					}
   					input{
   						border: 1px solid #aaa;
   						border-left: none;
   						border-right: none;
   						box-sizing: border-box;
   						width:1rem;
   						height: 0.6344rem;
   						text-align: center;
   						vertical-align: middle;
   						color: #666;

   					}
   				}
   			}
   		}
   		.car-list__operate{
   			width:0.5rem;
   			.delete-goods{
	   			@include fz(20px);
	   			color:#bbb;
	   			position: absolute;
	   			top:0.3125rem;
	   			right:0.3125rem;
	   		}
	   		label{
	   			position: absolute;
	   			bottom:0.3125rem;
	   			right:0.3125rem;
	   			input{
	   				display: none;
	   				&:checked+span{
	   					background: url(../assets/select.png) no-repeat center/cover;	
	   				}
	   			}
	   			span{
	   				display: inline-block;
	   				width: 0.525rem;
	   				height: 0.525rem;	
	   				border: 1px solid #aaa;	
	   			}
	   		}
   		}		
   }
   
   .car-foot-nav{
   	    position: fixed;
   	    bottom:0;
   	    width: 100%;
   	    border-top: 0.0156rem;
   	    @include flex-center;
   	    button{
   	    	flex:1;
   	    	height: 1.11rem;
   	    	border: none;
   	    	@include fz(15px);
   	    	&.sum-price{
				background: #fff;
				@include fz(14px);
				width:40%;
				flex:none;
				color:#77b59c;
   	    	}
   	    	&.continue-shopping{
				background: orange;
				color: #fff;
   	    	}
   	    	&.to-pay{
				background: red;
				color: #fff;
   	    	}

   	    }
   }
</style>
