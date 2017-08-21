<template>
    <div class="foot-nav-containner">
        <ul class="bottom-nav">
            <router-link tag="li" :to='{name:"index"}' class="bottom-nav__li iconfont icon-shouye bottom-nav__li--home"></router-link>
            <router-link tag="li" :to='{name:"search"}' class="bottom-nav__li iconfont icon-ss bottom-nav__li--search"></router-link>
            <router-link tag="li" :to='{name:"car"}' class="bottom-nav__li iconfont icon-shoppingcart bottom-nav__li--car"><span class="goodsNumber" v-show="goddsNumber&&goddsNumber>0">{{goddsNumber}}</span></router-link>
            <router-link tag="li" :to='{name:"vip"}' class="bottom-nav__li iconfont icon-gerenzhongxinxia bottom-nav__li--vip"></router-link>
        </ul>
     </div>
</template>

<script>
export default {
    name: 'foot-nav',
    data () {
        return {
         
        }
    },
    computed:{
        goddsNumber(){
            return this.$store.getters.goddsNumber
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../base/css/base.scss';
    .router-link-active{
        color:#fd0909;
    }
    .foot-nav-containner{
        position: fixed;
        bottom:0;
        width: 100%;
        z-index: 1001;
        border-top: 0.014rem solid #ddd;
        background: #fff;
        .bottom-nav{
            display: flex;
            .bottom-nav__li{
                flex:1;
                align-items:center;
                justify-content:center;
                text-align: center;
                height:1.111rem;
                line-height:1.111rem;
                @include fz(20px);
                position: relative;
                 .goodsNumber{
                    position: absolute;
                    top:0.1rem;left:0.5rem;
                    width:0.38rem;
                    height: 0.38rem;
                    background: red;
                    color: #fff;
                    border-radius: 50%;
                    line-height:0.38rem;
                    text-align: center;
                     @include fz(13px);
                }
                
            }
        }
    }


    
    


</style>
