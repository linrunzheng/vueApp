<template>
	 <div class="film">
        <h3 class="film__type">
            <span>{{type}}</span>
            <router-link :to='{path:"/classify/"+url}'><span class="more"><em>更多</em><em class="iconfont icon-more"></em></span></router-link>
                          
        </h3>
        <div class="film__list" :ref="el" :data-request="url">         
            <ul class="clearfix">
                <router-link tag="li" v-for="(v,i) in array" :key="v.id" :to='{path:"/film-detail/"+v.id}'>
                    <div class="film__list__img"><img v-lazy="v.images.small" alt=""></div>
                    <div class="film__list__detail">
                        <h4 class="film__list__title">{{v.title}}</h4>
                        <p class="film__list__rank">评分：{{v.rating.average}}</p>
                        <p class="film__list__rank">
                            <span :class="{rankColor:v.rating.average>((i-0.5)*2)}" class="iconfont icon-rank" v-for="i in 5"></span>
                        </p>
                    </div>
                </router-link>    
            </ul>
             <Loading v-show="!array[0]" class="loading-center"></Loading>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getStyle} from '../base/js/util.js'
import Loading from 'components/loading.vue'
import {api} from "../base/js/api.js"
export default {
    data () {
	    return {
	    	scroller:null,
	    	array:[]
	    };
    },
    components:{
        Loading
    },
    props:["el","url","type"],
    mounted(){
    	const el = this.$refs[this.el];
    	this.scroller=this.initScroll(el);
        const {request}=el.dataset;

        this.$ajax.get(`${api}${request}?start=${Math.floor(Math.random()*10)}`)
	        .then((res)=>{
	            this.array=res.data.subjects;
	            this.$nextTick(()=>{
	                 this.freshWidth(el.children[0]); 
	                 this.scroller.refresh();                   
	            })             
	        }) 

	     window.onresize=()=>{
 			this.freshWidth(el.children[0]); 
	        this.scroller.refresh();   
	     }
    },
    methods:{
    	initScroll(el){
            return new BScroll(el,{
                click:true,
                probeType:3,
                scrollX:true,
                scrollY:false
            })
        },
        freshWidth(el){
            var width=getStyle(el.children[0],"width");
            var padding=getStyle(el.children[0],"padding-right");
            el.style.width=el.children.length*(width+padding+2)+"px";              
        },
    }
};
</script>

<style lang="scss" scoped>
@import '../base/css/base.scss';
.film{
    .film__type{
        font-weight: bold;
        @include fz(13px);
        padding:0.208rem;
        color: #666;
        display: flex;
        justify-content:space-between;
        align-items:center;
        span{

        }
        .more{
            color:#77b59c;
            em{
                vertical-align: middle;
            }
            .iconfont{
                @include fz(13px);
            }
        }
    }
    .film__list{
        width:100%;
        height:4.6rem;
        overflow: hidden;
        padding: 0.208rem;
        box-sizing:border-box;
        position: relative;
        ul{
            width: 300%;
            height: 100%;
        }
        li{
            float: left;
            padding-right: 0.208rem;
            margin-bottom: 0.7rem;
            width:2.2rem;
            .film__list__img{
                width:2.2rem;
                height: 3rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .film__list__detail{
            	margin-top: 0.042rem;
                *{
                   @include t-overflow; 
                }
                .film__list__title{
                    font-weight: bold;
                    color: #3e4637;
                }
                .film__list__rank{
                     @include fz(12px);
                    .iconfont{
                        @include fz(12px);
                        color: #999;
                        &.rankColor{
                            color:orange;
                        }
                    }
                }
            }
        }
    }
}

.loading-center{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}

</style>