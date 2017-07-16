<template>
    <div>
        <swiper :options="swiperOption" class="swiper-box">
            <swiper-slide class="swiper-item"></swiper-slide>
            <swiper-slide class="swiper-item"></swiper-slide>
            <swiper-slide class="swiper-item"></swiper-slide>
            <swiper-slide class="swiper-item"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="film">
            <h3 class="film__type">
                <span>TOP250</span>
                <span class="more"><em>更多</em><em class="iconfont icon-more"></em></span>
                
            </h3>
            <div class="film__list" ref="scroll">
                <ul class="clearfix" ref="scroll-list">
                    <li v-for="(v,i) in topList">
                        <div class="film__list__img"><img src="../assets/head.jpg" alt=""></div>
                        <div class="film__list__detail">
                            <h4 class="film__list__title">{{v.name}}</h4>
                            <p class="film__list__rank">{{v.rank}}</p>
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
export default {
    data() {
        return {
            scroller:null,
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',          
            },
            topList:[
                {name:"12313",rank:4.5},
                {name:"12313",rank:4.5},
                {name:"12313",rank:4.5},
                {name:"12313",rank:4.5},
                {name:"12313",rank:4.5},
                {name:"12313",rank:4.5},
            ]
        }
    },
    mounted(){
        this.scroller = new BScroll(this.$refs.scroll,{
            click:true,
            probeType:3,
            scrollX:true,
            scrollY:false
        });
        this.freshWidth()
    },
    methods:{
        freshWidth(){
            var list=this.$refs["scroll-list"].children;
            var l=list.number;
            var width=getStyle(list[0],"width");
            console.log(width)

            
        }
    }

  }
</script>

<style lang="scss">
@import '../base/css/base.scss';
.swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .swiper-item {
        height: 5rem;
        background: url() no-repeat center/cover;
        &:nth-of-type(1){
            background-image:url(../assets/vue.jpg);
        }
        &:nth-of-type(2){
            background-image:url(../assets/swiper1.jpg);
        }
        &:nth-of-type(3){
            background-image:url(../assets/swiper2.jpg);
        }
        &:nth-of-type(4){
            background-image:url(../assets/swiper3.jpg);
        }  
    }
}

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
        overflow: hidden;
        ul{
            padding: 0.208rem;
            width: 200%;
        }
        li{
            float: left;
            padding-right: 0.208rem;
            .film__list__img{
                width: 2.2rem;
                height: 3rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .film__list__detail{
                .film__list__title{
                    font-weight: bold;

                }
            }
        }
    }
}



</style>