<template>
   <div>
	    <router-view></router-view>	 
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
   
</style>
