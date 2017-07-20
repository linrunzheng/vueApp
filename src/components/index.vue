<template>
    <div>      
        <swiperComponent :swiperOption="swiperOption"></swiperComponent>
        <div class="film">
            <h3 class="film__type">
                <span>TOP250</span>
                <span class="more"><em>更多</em><em class="iconfont icon-more"></em></span>               
            </h3>
            <div class="film__list" ref="scroll-top250" data-request="top250" data-array="topList">
                <ul class="clearfix">
                    <li v-for="(v,i) in topList">
                        <div class="film__list__img"><img :src="v.images.small" alt=""></div>
                        <div class="film__list__detail">
                            <h4 class="film__list__title">{{v.title}}</h4>
                            <p class="film__list__rank">评分：{{v.rating.average}}</p>
                            <p class="film__list__rank">
                                <span :class="{rankColor:v.rating.average>((i-0.5)*2)}" class="iconfont icon-rank" v-for="i in 5"></span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="film">
            <h3 class="film__type">
                <span>即将上映</span>
                <span class="more"><em>更多</em><em class="iconfont icon-more"></em></span>               
            </h3>
            <div class="film__list" ref="scroll-comming" data-request="coming_soon" data-array="commingList">
                <ul class="clearfix">
                    <li v-for="(v,i) in commingList">
                        <div class="film__list__img"><img :src="v.images.small" alt=""></div>
                        <div class="film__list__detail">
                            <h4 class="film__list__title">{{v.title}}</h4>
                            <p class="film__list__rank">评分：{{v.rating.average}}</p>
                            <p class="film__list__rank">
                                <span :class="{rankColor:v.rating.average>((i-0.5)*2)}" class="iconfont icon-rank" v-for="i in 5"></span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="film">
            <h3 class="film__type">
                <span>正在上映</span>
                <span class="more"><em>更多</em><em class="iconfont icon-more"></em></span>               
            </h3>
            <div class="film__list" ref="scroll-theater" data-request="in_theaters" data-array="theaterList">
                <ul class="clearfix">
                    <li v-for="(v,i) in theaterList">
                        <div class="film__list__img"><img :src="v.images.small" alt=""></div>
                        <div class="film__list__detail">
                            <h4 class="film__list__title">{{v.title}}</h4>
                            <p class="film__list__rank">评分：{{v.rating.average}}</p>
                            <p class="film__list__rank">
                                <span :class="{rankColor:v.rating.average>((i-0.5)*2)}" class="iconfont icon-rank" v-for="i in 5"></span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>



      
          

    </div>
</template>

<script>
import BScroll from 'better-scroll'
import getStyle from '../base/js/util.js'
import swiperComponent from './swiper.vue'
export default {
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',          
            },
            scroller:[],        
            topList:[],
            theaterList:[],
            commingList:[]
        }
    },
    components:{
        swiperComponent
    },
    mounted(){
        const api="https://api.douban.com/v2/movie/";
/*        this.$ajax.get(`${api}in_theaters`);*/
        Object.keys(this.$refs).forEach((item,index)=>{
            if(item.match("scroll")){
                this.scroller[index]=this.initScroll(this.$refs[item]);
                const {request,array}=this.$refs[item].dataset;

                this.$ajax.get(`${api}${request}?start=${Math.floor(Math.random()*10)}`)
                .then((res)=>{
                    this[array]=res.data.subjects;
                    this.$nextTick(()=>{
                         this.freshWidth(this.$refs[item].children[0]); 
                         this.scroller[index].refresh();                   
                    })             
                })   
            }
        })
    },
    methods:{
        freshWidth(el){
            var width=getStyle(el.children[0],"width");
            var padding=getStyle(el.children[0],"padding-right");
            el.style.width=el.children.length*(width+padding)+"px";              
        },
        initScroll(el){
            return new BScroll(el,{
                click:true,
                probeType:3,
                scrollX:true,
                scrollY:false
            })
        }
    }

  }
</script>

<style lang="scss">
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



</style>