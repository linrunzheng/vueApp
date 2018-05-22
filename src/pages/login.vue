<template>
   <div id="login">
  	    <div class="login-title">
	  	 	<span class="iconfont icon-arrow-left back" @click="$router.back"></span>
	  	 	<span>账号登录</span>
	  	</div>	
	  	<div class="login-content">
	  		<div class="login-content__account">
		  		<span class="iconfont icon-zhanghao"></span>
		  		<input type="text" placeholder="随便输入账号">
		  	</div>  
	  		<div class="login-content__account">
		  		<span class="iconfont icon-zhanghao"></span>
		  		<input type="text" placeholder="随便输入密码">
		  	</div>  
	  		<div class="login-content__button">
		  		<button @click="login">登录</button>
		  	</div>  
	  	</div>    	
   </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        login() {
            this.$ajax.post('http://localhost:8088/login').then(res => {
                if (res.data.code == 's') {
                    console.log('登录成功')
                    sessionStorage.setItem('token', new Date().getTime())
                    this.$router.replace(this.backPath)
                }
			})
			.catch(eror=>{
				alert("写死请求端口为8088，请检查")
			})
        }
    },
    computed: {
        backPath() {
            return this.$route.query.redirect
        }
    }
}
</script>

<style scoped lang="scss">
@import '../base/css/base.scss';
#login {
    height: 100%;
    background: #f9f9f9;
    input {
        border: none;
    }
    .login-title {
        height: 1rem;
        line-height: 1rem;
        position: relative;
        text-align: center;
        border-bottom: 0.028rem solid #999;
        background: #fff;
        letter-spacing: 0.028rem;
        @include fz(15px);
        .back {
            color: #444;
            padding: 0.111rem;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            z-index: 1000;
            @include fz(25px);
        }
    }

    .login-content {
        padding: 0.5rem 0.208rem;
        &__account {
            height: 0.8rem;
            margin-bottom: 0.2rem;
            background: #fff;
            .iconfont {
                @include fz(20px);
                margin-right: 0.25rem;
            }
        }
        &__button {
            text-align: center;
            button {
                width: 5rem;
                height: 1.2rem;
                margin-top: 1rem;
            }
        }
    }
}
</style>
