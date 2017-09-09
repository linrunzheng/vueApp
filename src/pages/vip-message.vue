<template>	    
    <div class="vippage-container">      
        <div class="user-detail">        
            <div class="user-detail__img">
                <img  src="../assets/head.jpg" height="334" width="334" alt="">
            </div>
            <div class="user-detail__message">
                <p class="user-detail__message__name">昵称：<span>linrunzheng</span></p>
            
			     <p class="user-detail__message__phone">地址：<span>https://github.com/linrunzheng</span></p>
            </div>
            <span class="iconfont icon-set setting" @click="isShow=!isShow"></span>
        </div>
        <!-- 个人中心 -->
        <!-- 订单状态 -->
        <div class="order-status-container">
            <ul>
                <li classs="order-status order-status--unpay">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>{{randomCount()}}</span></div>
                        <p>待付款</p>
                    </a>
                </li>
                 <li classs="order-status order-status--unsend">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>{{randomCount()}}</span></div>
                        <p>待发货</p>
                    </a>
                </li>
                 <li classs="order-status order-status--sent">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>{{randomCount()}}</span></div>
                        <p>已发货</p>
                    </a>
                </li>
                 <li classs="order-status order-status--paid">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>{{randomCount()}}</span></div>
                        <p>已完成</p>
                    </a>
                </li>                             
            </ul>
        </div>
      
        <div class="operate">
            <div class="operate__list all-order">
                <a>
                    <span class="iconfont icon-dingdan">全部订单</span>
                    <strong class="iconfont icon-icon"></strong>
                </a>
            </div>

            <div class="operate__list my-coupon">
                <a >
                    <span class="iconfont icon-youhuiquan">我的优惠券</span>
                    <strong class="iconfont icon-icon"></strong>
                </a>
            </div>

           
            <div class="operate__list my-reward">
                <a>
                    <span class="iconfont icon-jiangli">我的奖励</span> 
                    <strong class="iconfont icon-icon"></strong>
                </a>
            </div>				
           
            <div class="operate__list shopping-help">
                 <a>
                    <span class="iconfont icon-bangzhu-copy">购物帮助</span>
                    <strong class="iconfont icon-icon"></strong>
                </a>
            </div>

             <div class="operate__list concern-us">
            	 <a>              
                    <span class="iconfont icon-guanzhu">关注我们</span>
                    <strong class="iconfont icon-icon"></strong>
                </a>
            </div>          
        </div>
       
            <transition name="slide">
                 <v-touch tag="div" v-on:swipeleft="hideSilde" class="other-set" v-show="isShow">                    
                        <img src="../assets/logo.png" alt="">
                        <ul>
                            <li class="iconfont icon-set">其他设置</li>
                            <li class="iconfont icon-set">其他设置</li>
                            <li class="iconfont icon-set">其他设置</li>
                            <li class="iconfont icon-set">其他设置</li>
                        </ul>
                 </v-touch>           
            </transition>
            <div class="shadow" v-show="isShow" @click="isShow=!isShow"></div>

    </div>
</template>

<script>


export default {
    data(){
        return {
            isShow:false           
        }
    },

    methods:{
        hideSilde(){
            this.isShow=!this.isShow
        },
        randomCount(){
            var number= Math.floor(Math.random()*150);
            return number>100?99:number
        }
    }
}
</script>

<style scoped lang="scss">
 @import '../base/css/base.scss'; 

.vippage-container{
    padding-bottom: 1.11rem;
    .user-detail {
    position: relative;
    height: 5.0rem;
    width: 100%;
    background:url(../assets/vue.jpg) no-repeat center/cover;
    color: #fff;
    @include flex-center;
    .setting{
        position: absolute;
        top:0.2rem;
        padding: 0.2344rem;
        @include fz(20px);
        &.setting{
        	right:0.2rem;
        }
       

    }
    .user-detail__img{
        width:1.7625rem;
        height: 1.7625rem;
        margin:0 0.525rem;

        img{
           width: 100%; 
           height: auto;
           border-radius:50%;
        }
    }
    .user-detail__message{
        flex:1;
        p{
            padding:0.2rem 0;
            @include fz(12px);
        }
    }
}


.order-status-container{
    border-bottom: 0.0938rem solid #eee;
    ul{
        display: flex;
        padding: 0.308rem 0 0.208rem 0;
        li{
            flex:1;
            justify-content:center;
            align-items:center;
            text-align: center;
            div{
                @include fz(20px);
                margin-bottom: 0.139rem;
                position: relative;
                span{
                    position: absolute;
                    right:0.667rem;
                    top:-0.139rem;
                    width:0.438rem;
                    height: 0.438rem;
                    line-height: 0.438rem;
                    text-align: center;
                    border-radius: 50%; 
                    background: red;
                    @include fz(9px);
                    color:#fff;
                }
            }
        }
    }
}

.operate__list{
    border-bottom: 0.0938rem solid #eee;
    &.all-order span::before{
        color:#e45f0f;
    }
    &.my-coupon span::before{
        color:#e4c41e;
    }
    &.my-reward span::before{
        color:#e61255;
    }
    &.shopping-help span::before{
        color:#48c320;
    }
    &.concern-us span::before{
        color:#207fc3;
    }

    a{
        display:flex;
        justify-content:space-between;  
        padding:0.2644rem;     
        span{
            @include fz(14px);
            color:#333;
            &::before{
                 @include fz(20px);
                 margin:0 0.3rem 0 0.23rem;
            }
        }
        strong{
            @include fz(20px);
            color:#939493;
            
        }
        &:hover{
            text-decoration: none;
        }
    }
} 

.shadow{
    position: absolute;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    top:0;
    left:0;
    z-index: 9999;
}
.other-set{
    position: absolute;
    top:0;
    left:0;
    width:70%;
    background: #fff;
    height: 100%;
    z-index: 99999;
    @include flex-center;
    flex-direction:column;
    img{
        width: 3.125rem;
        height: 3.125rem;
        margin: 1.25rem 0 0.8rem;

    }
    ul{
        flex:1;
        width:100%;
        background: #FFF;
        border-top:0.0556rem solid #d2e0db;
        li{
           @include fz(14px); 
           padding:0.4rem;
           &::before{
             @include fz(20px);
             margin-right: 0.25rem;
           }
        }
    }
}


    .slide-enter-active{
        transition:all 0.4s;
    }
    .slide-enter, .slide-leave-active{
        transform:translateX(-100%);
        transition:all 0.4s;
    }
}



</style>
