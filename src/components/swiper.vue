<template>
	<swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item"></swiper-slide>
        <swiper-slide class="swiper-item"></swiper-slide>
        <swiper-slide class="swiper-item"></swiper-slide>
        <swiper-slide class="swiper-item"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
export default {
    data(){
    	return{
    		
    	}	    
    },
    props:{
    	swiperOption:{
    		type:Object
    	}
    }
};
</script>

<style lang="scss" scoped>
	.swiper-box {
	    width: 100%;
	    height: 100%;
	    margin: 0 auto;
	    .swiper-item {
	        height: 5rem;
	        background: url() no-repeat center/cover;
	        &:nth-of-type(1){
	            background-image:url(../assets/vue.jpg);
	        }
	        &:nth-of-type(2){
	            background-image:url(../assets/swiper1.jpg);
	        }
	        &:nth-of-type(3){
	            background-image:url(../assets/swiper2.jpg);
	        }
	        &:nth-of-type(4){
	            background-image:url(../assets/swiper3.jpg);
	        }  
	    }
	}
</style>