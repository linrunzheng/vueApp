<template>
   <div id="login">
  	    <div class="login-title">
	  	 	<span class="iconfont icon-arrow-left back" @click="goBack"></span>
	  	 	<span>账号登录</span>
	  	</div>	
	  	<div class="login-content">
	  		<div class="login-content__account">
		  		<span class="iconfont icon-zhanghao"></span>
		  		<input type="text">
		  	</div>  
		  	<div class="login-content__password">
		  		<span class="iconfont icon-zhanghaomima-"></span>
		  		<input type="text">
		  	</div>  

	  	</div>  
	  	
   </div>
</template>

<script>


export default {
   data(){
   		return {

   		}
   },
   methods:{
   		goBack(){
   			this.$router.back();
   		}
   },
   mounted(){
   		localStorage.setItem("token",new Date().getTime());
   		setTimeout(()=>{
   			this.$router.replace("/car")
   		},3000)
   		
   },
   computed:{
   		backPath(){
   			return this.$route.query.redirect
   		}
   }
}
</script>

<style scoped lang="scss">
@import '../base/css/base.scss';
#login{
	height: 100%;
	background:#f9f9f9;
	input{border:none;}
	.login-title{
		height:1rem;
		line-height: 1rem;
		position: relative;
		text-align: center;
		border-bottom: 0.028rem solid #999;
		background:#fff;
		letter-spacing: 0.028rem;
		@include fz(15px);
		.back{		
			color: #444;		
			padding: 0.111rem;
			position: absolute;
			top:50%;
			left:0;
			transform:translateY(-50%);
			z-index: 1000;
			@include fz(25px);
		}
	}

	.login-content{
		padding:0.5rem 0.208rem;
		&__account{
			height:0.8rem;
			background: #fff;

		}
	}
}
   
</style>
