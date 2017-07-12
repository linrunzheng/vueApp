<template>
   <div>
   		<ul>
   			<li class="car-list" v-for="(v,i) in goodsList">
	    		<div class="car-list__img">
	    			<img :src="v.url">
	    		</div>
	    		<div class="car-list__detail">
	    			<p class="car-list__detail__title">{{v.title}}</p>
	    			<p class="car-list__detail__type">规格：<span>{{v.stock}}</span></p>
	    			<p class="car-list__detail__price">单价：<span>￥{{v.price}}</span></p>
	    			<p class="car-list__detail__sum">小计：<span>￥{{v.price*v.number}}</span></p>
	    		</div>    			    		
	    	</li>
   		</ul>
   </div>
</template>

<script>


export default {
   data(){
   		return{
   			goodsList:[]
   		}
   },
   mounted(){
   	    this.$ajax.get("https://api.douban.com/v2/movie/in_theaters")
   	    	.then((res)=>{
   	    		this.goodsList=res.data.subjects
   	    	})
   	    	.catch((error)=>{
   	    		alert(error)
   	    	})
   }
}
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
   			}
   		}
   			
   }
</style>
