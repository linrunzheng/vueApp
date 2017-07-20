<template>
   <div>
	    <router-view id="container"></router-view>	 
		<foot-nav></foot-nav>
   </div>
</template>

<script>

import footNav from '../components/foot-nav.vue'

export default {
   components:{
        footNav
   }
}
</script>

<style scoped lang="scss">
   #container{
   	padding-bottom: 1.111rem;
   }
</style>
