<template>
   <div id="wrapper" ref="scrollWrap">
       <div class="scroller" ref="scroller" :class="{topPadding,bottomPadding}">
      		<ul ref="scrollList">
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
        <Loading id="loading" 
        		 v-show="showLoading"
         		 :class="{pullUp:loadingPosition.pullUp,pullDown:loadingPosition.pullDown,center:loadingPosition.center}"
       ></Loading>
       
    </div>
</template>

<script>

import BScroll from 'better-scroll'
import getStyle from '../base/js/util.js'
import api from "../base/js/api.js"
import Loading from './loading.vue'
export default {
	name:"classify",
    data(){
   		return{
   			type:this.$route.params.type,
   			goodsList:[],
   			scroller:null,
   			showLoading:true,					
   			loadingPosition:{
   				pullDown:false,		
	   			pullUp:false,		
	   			center:true
   			},
   			pullDownPage:0,
   			pullUpflag:true,
   			pullDownflag:true,

   			topPadding:false,
   			bottomPadding:false
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
	    getData(){	    	
	    	this.$ajax.get(`${api}${this.type}?count=10&start=0`)
	   	    	.then((res)=>{ 	  
	   	    		res=res.data;
	   	    		if(res.subjects[0]){
		   	    		this.goodsList=res.subjects		   	    		
	   	    		}else{   	    			
	   	    			alert("没有数据");
	   	    		}
	   	    		this.showLoading=false;	
	   	    		this.loadingPosition.center=false;	   	    				   	    			   	    			    		
	   	    	})
	   	    	.catch((error)=>{
	   	    		alert(error)
	   	    	})
	    },
	    pullUp(callback){   
	    	this.$ajax.get(`${api}${this.type}?count=10&start=${Math.floor(Math.random()*250)}`)
		    	.then((res)=>{ 	  
		   	    	this.goodsList=res.data.subjects.concat(this.goodsList);
		   	    	callback();
		   	    })
		   	    .catch((error)=>{
	   	    		alert(error)
	   	    	})
	    },
	    pullDown(callback){
	    	this.$ajax.get(`${api}${this.type}?count=10&start=${(++this.pullDownPage)*10}`)
		    	.then((res)=>{ 	  
	   	    		res=res.data;
	   	    		if(res.subjects[0]){
	   	    			this.goodsList=this.goodsList.concat(res.subjects);	
	   	    			callback();	   	    		
	   	    		}else{   	    			
	   	    			alert("已经到底了")
	   	    		}	   	    				   	    			   	    			    		
	   	    	})
	   	    	.catch((error)=>{
	   	    		alert(error)
	   	    	})
	    },
	    closeEntry(type){
	    	this[type+"flag"]=false;
			this.showLoading=true;
			this.loadingPosition[type]=true;
	    },
	    openEntry(type){
	    	this.showLoading=false;
	    	this[type+"flag"]=true;
	    	this.loadingPosition[type]=false;
	    },
	    getMoreData(type){
	    	this.closeEntry(type);
			this[type](()=>{												
				setTimeout(()=>{
					this.openEntry(type);
				},500)
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
    	this.scroller = new BScroll(scrollWrap,{
    		click:true,
    		probeType:3
    	});
    	this.getData(this.page);
	
    	this.scroller.on("scroll",(pos)=>{				
			var height=getStyle(scroller,"height");
			var pageHeight=getStyle(scrollWrap,"height");
			var distance=getStyle(scrollList.children[0],"height")/3;
			if(pos.y>distance){	
				if(this.pullUpflag){
					this.getMoreData("pullUp");
				}			
				
			}else if(pos.y-pageHeight<-height-distance){
				if(this.pullDownflag){
					this.getMoreData("pullDown");
				}			
			}
    	})    

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
			&.pullUp{
				top:0;
			}
			&.pullDown{
				bottom:0;
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
   
</style>
