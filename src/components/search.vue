<template>
   <div id="wrapper" ref="scrollWrap">
       <div class="scroller" ref="scroller" :class="{topPadding,bottomPadding}">
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
import getStyle from '../base/js/util.js'
export default {
   data(){
   		return{
   			goodsList:[],
   			scroller:null,
   			showLoading:true,	
   			upload:false,		
   			download:false,		
   			center:true,	
   			page:0,
   			flag:true,
   			topPadding:false,
   			bottomPadding:false
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
	    },
	    getData(i,way){
	    	this.flag=false;
			this.showLoading=true;  
			if(way=="upload"){
				this.upload=true;
			}else if(way=="download"){
				this.download=true;
			}
	    	this.$ajax.get("https://api.douban.com/v2/movie/top250?start="+20*i)
	   	    	.then((res)=>{ 	  
	   	    		res=res.data;
	   	    		this.reset();
	   	    		this.page+=1;   
	   	    		if(res.subjects[0]){
	   	    			if(way=="upload"){
	   	    				this.goodsList=res.subjects.concat(this.goodsList);
		   	    		} else{
		   	    			this.goodsList=this.goodsList.concat(res.subjects);
		   	    		}
		   	    		this.$nextTick(()=>{
		   	    			this.scroller.refresh(); 
		   	    		}) 	
	   	    		}else{
	   	    			this.flag=false;
	   	    			this.scroller.refresh(); 
	   	    			alert("到底了")
	   	    		}	   	    				   	    			   	    			    		
	   	    	})
	   	    	.catch((error)=>{
	   	    		alert(error)
	   	    	})
	    },
	    reset(){
	    	this.showLoading=false;  
    		this.center=false; 
    		this.upload=false; 
    		this.download=false;
    		this.topPadding=false;
    		this.bottomPadding=false;
    		this.flag=true;     
	    }
   },
    mounted(){
    	var self=this;
    	self.scroller = new BScroll(self.$refs.scrollWrap,{
    		click:true,
    		probeType:3
    	});
    	self.getData(self.page);

    	self.scroller.on("scroll",function(pos){

    		if(self.flag==true){
    			var el=self.$refs.scroller;
	    		var wrap=self.$refs.scrollWrap;
	    		var height=getStyle(el,"height");
	    		var pageHeight=getStyle(wrap,"height");
	   	
				if(pos.y>50){
					self.getData(self.page,"upload");
				}else if(pos.y-pageHeight<-height-50){
					self.getData(self.page,"download");
				}

    		}
    		
    	})    	  	    
   },
   watch:{
   	   goodsList(){
   	   	    /*setTimeout(()=>{
   	   		    this.scroller.refresh();   	   	
   	   	    },50)	*/   		
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
			&.topPadding{
				top:1rem;
			}	
			&.bottomPadding{
				bottom:2rem;
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
			&.upload{
				top:0;
			}
			&.download{
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
