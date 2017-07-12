<template>
   <div>
   		<div @click="isShow=!isShow">点击啊</div>
	    <transition name="slide" >
	    	 <div id="a" v-show="isShow"></div>	  
	    </transition>   
	    
   </div>
</template>

<script>


export default {
    data(){
        return {
            isShow:false
        }
    }
}
</script>

<style scoped lang="scss">
   #a{
   		position: absolute;
   		width: 100%;
   		height: 100%;
   		background:red;
   		z-index: 99999;
   }
   .slide-enter-active{
    transition:all 0.5s;
}
.slide-enter, .slide-leave-active{
    transform:translateX(-100%);
    transition:all 0.5s;
}
</style>
