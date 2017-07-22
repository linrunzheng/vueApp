<template>
	<div>
		<div class="iconfont icon-back back" @click="goBack"></div>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
		<p>测试路由过渡</p>
	</div>
</template>

<script>
export default {
    name: 'vip',
    data () {
    	return {

    	};
 	},
 	methods:{
 		goBack(){
 			this.$router.back();
 		}
 	}
};
</script>

<style lang="scss" scoped>
@import '../base/css/base.scss';
	.back{
		@include fz(22px);
		color: #555;
		border-bottom: 0.014rem solid #aaa;
		padding: 0.111rem;
		margin-bottom: 1.389rem;
	}
	p{
		text-align: center;
		@include fz(14px);
	}
</style>