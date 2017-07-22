<template>
    <div id="app">
    	<keep-alive exclude="detail">
    		 <router-view></router-view>
    	</keep-alive>    
    </div>
</template>

<script>

</script>


<style lang="scss">

@import './base/css/normalize.scss';
@import url('//at.alicdn.com/t/font_nfzwlroyg2vuz0k9.css');
body{
	background: #f1f8f7;
	#app{
		background: #fff;
		height:100%;
		font-family: Microsoft YaHei;
	}	
}


</style>
