<template>
   <transition name="slide">
	   	<div id="wrapper" ref="scrollWrap">
	       <div class="scroller" ref="scroller">
	      		<ul ref="scrollList">
		  			<router-link class="film-list" v-for="(v,i) in goodsList" :key="v.id" tag="li" :to='{path:"/film-detail/"+v.id}'>
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
		  			</router-link>
	      		</ul>
	        </div>
	        <Loading id="loading" 
	        		 v-show="showLoading"
	         		 :class='{top:topLoading,bottom:botLoading,center:centerLoading}'
	       ></Loading>	     
	    </div>
   </transition>
</template>

<script>

import BScroll from 'better-scroll'
import {getStyle,getDeviceRatio} from '../base/js/util.js'
import api from "../base/js/api.js"
import Loading from './loading.vue'
const DEVICE_RATIO=getDeviceRatio();

export default {
	name:"classify",
    data(){
   		return{
   			type:this.$route.params.type,
   			goodsList:[],
   			scroller:null,
   			topLoading:false,
   			botLoading:false,
   			showLoading:false,					  			
   			pullDownPage:0, 		
   		}
   },
   components:{
   		Loading
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
	    },
	    enable(){
	    	this.scroller&&this.scroller.enable()
	    },
	    disable(){
	    	this.scroller&&this.scroller.disable()
	    },
	    finishPullDown(){
			this.scroller&&this.scroller.finishPullDown()
	    },
	    finishPullUp(){
			this.scroller&&this.scroller.finishPullUp()
	    },
	    getData(){	    	
	    	this.showLoading=true;
	    	this.$ajax.get(`${api}${this.type}?count=10&start=0`)
	   	    	.then((res)=>{ 	  
	   	    		res=res.data;
	   	    		if(res.subjects.length>0){
		   	    		this.goodsList=res.subjects		   	    		
	   	    		}else{   	    			
	   	    			alert("没有数据");
	   	    		}
	   	    		this.showLoading=false;	   	    				   	    			   	    			    		
	   	    	})
	   	    	.catch((error)=>{
	   	    		this.showLoading=false;	   	    		
	   	    		alert(error)
	   	    	})
	    },
	    pullDown(){   
	    	this.disable();
	    	this.topLoading=true;
	    	this.showLoading=true;
	    	this.$ajax.get(`${api}${this.type}?count=10&start=${Math.floor(Math.random()*100)}`)
		    	.then((res)=>{
			    	res=res.data;
			    	if(res.subjects.length>0){
			    		this.goodsList=res.subjects.concat(this.goodsList);	    		
			    	}else{   	 
			    		this.showLoading=false;	   			
			    		alert("已经到底了")
			    	}
			    	this.enable();
			    	this.finishPullDown();
			    	this.topLoading=false;	 
			    	this.showLoading=false; 		   	    	
		   	    })
		   	    .catch((error)=>{
		   	    	this.showLoading=false;	
		   	    	this.enable();
		   	    	this.finishPullDown();	
		   	    	this.topLoading=false;	
		   	    	this.showLoading=false; 	
	   	    		alert(error);
	   	    	})
	    },
	    pullUp(){
	    	this.disable();
	    	this.$ajax.get(`${api}${this.type}?count=10&start=${(++this.pullDownPage)*10}`)
		    	.then((res)=>{ 	  
	   	    		res=res.data;
	   	    		if(res.subjects.length>0){
	   	    			this.goodsList=this.goodsList.concat(res.subjects);	  	    		
	   	    		}else{   	 
	   	    			this.showLoading=false;	   			
	   	    			alert("已经到底了")
	   	    		}
	   	    		this.enable();
	   	    		this.finishPullUp();	   	    				   	    			   	    			    	
	   	    	})
	   	    	.catch((error)=>{
	   	    		this.showLoading=false;	
	   	    		this.enable();
	   	    		this.finishPullUp();	   	    
	   	    		alert(error)
	   	    	})
	    }         
   },
   watch:{
   		goodsList(){
   			this.$nextTick(()=>{
   				this.scroller.refresh(); 
   			}) 	
   		}
   },
    mounted(){   
		const {scroller,scrollWrap,scrollList}=this.$refs;
		/*初始化scroll*/
    	this.scroller = new BScroll(scrollWrap,{
    		click:true,
    		probeType:3,
    		pullDownRefresh:{
    			threshold:70*DEVICE_RATIO,
				stop:40*DEVICE_RATIO
    		},
    		pullUpLoad:{
    			threshold:-70*DEVICE_RATIO
    		}
    	});
    	/*获取数据*/
    	this.getData();
	
		/*下拉刷新*/
		this.scroller.on('pullingDown',()=> this.pullDown());

		/*上拉加载更多*/
		this.scroller.on('pullingUp',()=> this.pullUp());





    	/*this.scroller.on("scroll",(pos)=>{				
			var height=getStyle(scroller,"height");
			var pageHeight=getStyle(scrollWrap,"height");
			var distance=getStyle(scrollList.children[0],"height")/2;
			if(pos.y>distance){	
				console.log("上拉")					
			}else if(pos.y-pageHeight<-height-distance){
				console.log("下拉")	
			}
    	})    */



   }  
}
</script>

<style scoped lang="scss">
   	@import '../base/css/base.scss';
    #wrapper{
    	position: fixed;
    	top:0;
    	bottom:0;	
    	width: 100%;
    	overflow: hidden;
    	background:#fff;
    	z-index: 99999;
		.scroller{
			position: absolute;
			width: 100%;
			&.topPadding{
				top:1rem;
			}	
				
		}
		#loading{
			text-align: center;
			position: absolute;
			z-index: 100;
			width: 100%;
			&.center{			
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
			}
			&.top{
				position: absolute;
				top:0;left:0;
			}
			&.bottom{
				position: absolute;
				bottom:0;left:0;
			}

			
			img{
				margin: 0 auto;
				width: 0.889rem;
				height: 0.889rem;
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
					width: 100%;
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
   
   .slide-enter-active{
        transition:all 0.4s;
    }
    .slide-enter, .slide-leave-active{
        transform:translate3d(100%,0,0);
        transition:all 0.4s;
    }
</style>
