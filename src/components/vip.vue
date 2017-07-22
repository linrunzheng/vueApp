<template>
	<!-- <transition name="slide" mode="out-in"> -->
		<router-view></router-view>
	<!-- </transition> -->
</template>

<script>
export default {
    name: 'vip',
    data () {
    	return {

    	};
 	}
};
</script>

<style lang="scss" scoped>
	.slide-enter-active{
        transition:all 0.4s;
    }
    .slide-enter, .slide-leave-active{
        transform:translateX(-100%);
        transition:all 0.4s;
    }
</style>