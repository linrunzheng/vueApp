<template>
   <div id="wrapper" ref="scroll">
   		<ul>
   			<li class="film-list" v-for="(v,i) in goodsList">
	    		<div class="film-list__img">
    			    <img v-lazy="v.images.small" alt="" />                
	    		</div>
	    		<div class="film-list__detail">
	    			<p class="film-list__detail__title">{{v.title}}</p>
               <p class="film-list__detail__director">导演：{{filterDirectors(v.directors)}}</p>
	    			<p class="film-list__detail__year">年份：{{v.year}}<span>{{v.stock}}</span></p>
	    			<p class="film-list__detail__type">类别：{{v.genres.join(" / ")}}<span></span></p>
	    			<p class="film-list__detail__rank">评分：<span>{{v.rating.average}}分</span></p>
	    		</div>    			    		
	    	</li>
   		</ul>
   </div>
</template>

<script>

/*下拉滚动*/
import Vue from 'vue'
import BScroll from 'better-scroll'
export default {
   data(){
   		return{
   			goodsList:[]
   		}
   },
   methods:{
      filterDirectors(arr){
         var name="";         
         arr.forEach((item,i)=>{
            if(i==arr.length-1){
               name+=item.name
            }else{
               name+=item.name+" / "
            }
            
         })
         return name
                          
      }
   },
    mounted(){
        let scroll = new BScroll(this.$refs.scroll);


   	    this.$ajax.get("https://api.douban.com/v2/movie/in_theaters")
   	    	.then((res)=>{
   	    		this.goodsList=res.data.subjects;
                Vue.nextTick(()=>{
                    scroll.refresh(); 
                })
   	    	})
   	    	.catch((error)=>{
   	    		alert(error)
   	    	})
   }
}
</script>

<style scoped lang="scss">
   	@import '../base/css/base.scss';
    #wrapper{
        overflow:hidden;
    }
   .film-list{
   		padding: 0.3125rem;
   		position: relative;
   		border-bottom: 0.0312rem solid #ddd;;
   		@include flex-center;
   		.film-list__img{
   			width:1.7rem;
	   		height: 2.7rem;
	   		img{
				max-width: 100%;
				height:auto;
	   		}
   		}
   		.film-list__detail{
   			flex:1;
   			padding:0 0.35rem 0 0.45rem;
   			p{
   				@include fz(12px);
   				padding:0.0312rem 0;
   				color: #888;
   				@include t-overflow(2);
   				span{
   					color:#77b59c;
   				}
   				&.film-list__detail__title{
					padding-bottom: 0.08rem;
   				}   		
   			}
   		}
   			
   }
</style>
