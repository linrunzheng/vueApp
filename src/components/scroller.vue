<template>
    <div ref="wrapper" class="list-wrapper">  
        <div class="scroll-content">       
            <slot></slot>
            <div>
                <PullingWord v-show="!inPullUp&&dataList.length>0" :loadingWord="beforePullUpWord"></PullingWord>
                <Loading v-show="inPullUp" :loadingWord='PullingUpWord'></Loading>
            </div>       
        </div>  

        <transition name="pullDown">
           <Loading class="pullDown" v-show="inPullDown" :loadingWord='PullingDownWord'></Loading>
        </transition> 
    </div>
</template>

<script >
  import BScroll from 'better-scroll'
  import Loading from './loading.vue'
  import PullingWord from './pulling-word'

  const  PullingUpWord="正在拼命加载中...";
  const  beforePullUpWord="上拉加载更多";
  const  finishPullUpWord="加载完成";

  const  PullingDownWord="加载中...";

  export default {
    props: {
      dataList:{
        type: Array,
        default: []
      },
      probeType: {
        type: Number,
        default: 3
      },
      click: {
        type: Boolean,
        default: true
      },   
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },    
    },
    data() {
        return {  
            scroll:null,
            inPullUp:false,
            inPullDown:false,
            beforePullUpWord,
            PullingUpWord,
            PullingDownWord,
            continuePullUp:true
        }
    },
     
    mounted() {
        setTimeout(()=>{
            this.initScroll();

            this.scroll.on('pullingUp',()=> {
                if(this.continuePullUp){
                    this.beforePullUp();
                    this.$emit("onPullUp","当前状态：上拉加载");
                }
            });

            this.scroll.on('pullingDown',()=> {
                this.beforePullDown();
                this.$emit("onPullDown","当前状态：下拉加载更多");
            });

        },20)
       
    },
    methods: {
        initScroll() {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,       
                pullDownRefresh: this.pullDownRefresh,
                pullUpLoad: this.pullUpLoad,
            })
        },
        beforePullUp(){
            this.PullingUpWord=PullingUpWord;
            this.inPullUp=true;
        }, 
        beforePullDown(){
            this.disable();
            this.inPullDown=true;
        },
        finish(type){
            this["finish"+type]();
            this.enable();
            this["in"+type]=false;  
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        }, 
        finishPullDown(){
            this.scroll&&this.scroll.finishPullDown()
        },
        finishPullUp(){
            this.scroll&&this.scroll.finishPullUp()
        },      
    },
         
    watch: {
        dataList() {                
            this.$nextTick(()=>{
                this.refresh();                       
            })  
        }
    },
    components: {
        Loading,
        PullingWord
    }
  }

</script>

<style lang="scss" scoped>

  .list-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    bottom:0;
    right:0;
    overflow: hidden;
    background: #fff;
  }
    
    .list-content{
        position: relative;
      z-index: 10;
      background: #fff ;
    }


     
      .list-item{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
        
  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content :center;
    align-items: center;
    transition: all;
  }
    
   
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }


.pullDown{
    position: absolute;
    top:0;
    left:0;
}

    .pullDown-enter-active{
        transition:all 0.2s;
    }

    .pullDown-enter, .pullDown-leave-active{
        transform:translateY(-100%);
        transition:all 0.2s;
    }

 
</style>