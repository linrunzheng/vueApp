<template>
    <div>
        <div id="search">
            <div>
                <input type="text" v-model="searchText" placeholder="请输入搜索的内容">
                <span class="iconfont icon-shanchu" @click="clearSearchText"></span>
            </div>
            <button @click="goSearch">搜索</button>
        </div>
        <Loading id="saerchingLoading" v-show="inSearching"></Loading>
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
	           <router-link class="film-list" v-for="(v,i) in filmList" :key="v.id" tag="li" :to='{path:"/film-detail/"+v.id}'>
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
    	</Scroller>
    </div>
</template>

<script>
import Scroller from 'components/scroller.vue'
import Loading from 'components/loading.vue'
import {api} from "../base/js/api.js"
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
            searchText:"",
            inSearching:false,
            page:0,
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
  	    Scroller,
        Loading
    },
    mounted(){
                          	
    },
    methods:{
    	pullUpHandle(val){      
           this.fetchData((res)=>{
               this.scrollElement.PullingUpWord="加载完成";
               setTimeout(()=>{                        
                   this.scrollElement.finish("PullUp");
                   this.filmList=this.filmList.concat(res.subjects);  
               },1000)       
            })   	
    	},
    	pullDownHandle(val){         
    		setTimeout(()=>{
    			this.scrollElement.finish("PullDown");
                var l=this.filmList.length;
                var random=Math.floor(Math.random()*l);
                this.filmList.unshift(this.filmList[random]);
    		},2000)   		
    	},
        clearSearchText(){
            this.searchText="";
        },
        goSearch(){
            if(!this.searchText){return}
            this.inSearching=true;
            this.filmList=[];
            this.page=0;
            this.fetchData((res)=>{
               this.filmList=res.subjects;
            })         
        },
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
        fetchData(callback){
            this.$ajax.get(`${api}search?q=${this.searchText}&count=10&start=${10*this.page}`)
            .then((res)=>{
                res=res.data;
                if(res.subjects.length>0){
                    callback&&callback(res);                             
                }else{                      
                    alert("没有数据");
                }
                this.inSearching=false;
                this.page++;
            })
            .catch(()=>{
                 this.inSearching=false; 
                 alert("error");
            })
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../base/css/base.scss';
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

	#scroll{
        top:1.11rem;
        bottom:1.11rem;
    }

    #search{
        background: $mainColor;      
        padding:0.2rem 1.8rem 0.2rem 0.5rem;
        position: relative;
        div{
            position: relative;
            span{
                position: absolute;
                right:0;top:50%;
                @include fz(16px);
                transform:translateY(-50%);
                color: #888;
            }
        }
        input{
            width:100%;
            background:#fff;
            border: none;
            height: 0.7rem;
            padding-left: 0.4rem;
            vertical-align: middle;
        }
        button{
            position: absolute;
            right:0;
            top:50%;
            margin-top: -0.35rem;
            width:1.5rem;
            height: 0.7rem;
            line-height: 0.7rem;
            text-align: center; 
            background:none;
            border: none;
            color: #fff;
            vertical-align: middle;
            @include fz(14px);
        }
    }

    #saerchingLoading{
        position: fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
</style>