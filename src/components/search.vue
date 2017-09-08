<template>
	<Scroller 
		id="scroll"
		ref="scroll" 
		:dataList="filmList"
		:pullDownRefresh="DOWN_CONFIG"
		:pullUpLoad="UP_CONFIG"
		@onPullUp="pullUpHandle"
		@onPullDown="pullDownHandle"
	>

		<ul>
  			<li v-for="i in filmList">
	    		<div class="film-list__img">
   			   		 <img src='../assets/head.jpg' alt="" />                
	    		</div>
	    		<div class="film-list__detail">
	    			<p class="film-list__detail__title">{{1111}}</p>
              		<p class="film-list__detail__director">导演：{{222}}</p>
	    			<p class="film-list__detail__year">年份：{{22322}}<span>{{11}}</span></p>
	    			<p class="film-list__detail__type">类别：{{111}}<span></span></p>
	    			<p class="film-list__detail__rank">评分：<span>{{1111}}分</span></p>
	    		</div>    			    		
  			</li>
  		</ul>					
	</Scroller>
</template>

<script>
import Scroller from './scroller.vue'
import{
	DEVICE_RATIO,
	DOWN_CONFIG,
	UP_CONFIG
} from '../base/js/api.js'

export default {
    name: 'search',
    data () {
        return {
	    	filmList:[],
	    	DEVICE_RATIO,
			DOWN_CONFIG,
			UP_CONFIG
	    };
	},
    computed:{
        scrollElement(){
            return this.$refs.scroll
        }
    },
    components:{
  	    Scroller
    },
    mounted(){
    	this.filmList=[1,2,3,4,5]	
    },
    methods:{
    	pullUpHandle(val){
            setTimeout(()=>{ 
                this.scrollElement.PullingUpWord="加载完成"
            },2000)
    		setTimeout(()=>{  			
    			this.filmList.push(1);   			
    			this.scrollElement.finishPullUp();
    			this.scrollElement.refresh();
    			this.scrollElement.inPulling=false;   		
    		},3000)   		
    	},
    	pullDownHandle(val){
    		setTimeout(()=>{
    			this.scrollElement.finishPullDown();
    			this.scrollElement.refresh();
    			this.scrollElement.enable();
    		},2000)   		
    	}
    }
};
</script>

<style lang="scss" scoped>
	#scroll{bottom:1.11rem;}
	p{
		height:0.8rem;
	}
</style>