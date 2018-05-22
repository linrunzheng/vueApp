<template>
    <div id="app">
    	<keep-alive exclude="classify,detail">
    		 <router-view></router-view>
    	</keep-alive>    
    </div>
</template>

<script>

</script>


<style lang="scss">

@import './base/css/normalize.scss';
@import url('//at.alicdn.com/t/font_342152_sf25eoela9f9lik9.css');
body{
	background: #f1f8f7;
	#app{
		background: #fff;
		height:100%;
		font-family: Microsoft YaHei;
	}	

	.swiper-pagination-bullet{
		width:8px;
		height:8px;
		[data-dpr="2"] & {
	    	width:16px;
			height:16px;
	    }
	    [data-dpr="3"] & {
         	width:24px;
     		height:24px;
	    }
	}
}


</style>
