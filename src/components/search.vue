<template>
   <div id="wrapper" ref="scroll" @scroll="alert(2)">
       <div class="scroller" @scroll="alert(3)">
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
        <div id="loading" :class="{upload,download,center}" v-show="showLoading"><img src="../assets/loading.gif" height="32" width="32" alt=""></div>
    </div>
</template>

<script>

import BScroll from 'better-scroll'
export default {
   data(){
   		return{
   			goodsList:[],
   			scroller:null,
   			showLoading:true,	
   			upload:false,		
   			download:false,		
   			center:true,		
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
    	this.scroller = new BScroll(this.$refs.scroll,{
    		click:true,
    		probeType:1
    	});
    	this.scroller.on("scroll",function(a){
    		console.log(a)
    	})
    	
   	    this.$ajax.get("https://api.douban.com/v2/movie/in_theaters")
   	    	.then((res)=>{ 	    		
   	    		this.goodsList=res.data.subjects;   
   	    		this.showLoading=false;  
   	    		this.center=false;          
   	    	})
   	    	.catch((error)=>{
   	    		alert(error)
   	    	})
   },
   watch:{
   	   goodsList(){
   	   	    setTimeout(()=>{
   	   		    this.scroller.refresh();   	   	
   	   	    },500)	   		
   	   }
   }
}
</script>

<style scoped lang="scss">
   	@import '../base/css/base.scss';
    #wrapper{
    	position: fixed;
    	top:0;
    	bottom:1.111rem;	
    	width: 100%;
    	overflow: hidden;
		.scroller{
			position: absolute;
			width: 100%;			
		}
		#loading{
			text-align: center;
			&.center{
				position: absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
			}
			img{
				margin: 0 auto;
			}
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
    }
   
</style>
