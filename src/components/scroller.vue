<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
        <slot></slot>
        <div>
            <PullingWord v-if="!inPulling" :loadingWord="beforePullUpWord"></PullingWord>
            <Loading v-show="inPulling" :loadingWord='PullingUpWord'></Loading>
        </div>
       
    </div>  
  </div>
</template>

<script >
  import BScroll from 'better-scroll'
  import Loading from './loading.vue'
  import PullingWord from './pulling-word'

  const  PullingUpWord="正在拼命加载中...";
  const  beforePullUpWord="上拉加载";
  const  finishPullUpWord="加载完成";

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
            inPulling:false,
            beforePullUpWord,
            PullingUpWord
        }
    },
     
    mounted() {
        this.initScroll();

        this.scroll.on('pullingUp',()=> {
            this.PullingUpWord=PullingUpWord;
            this.inPulling=true;
            this.$emit("onPullUp","上拉加载");
        });

        this.scroll.on('pullingDown',()=> {
            this.disable();
            this.$emit("onPullDown","下拉加载更多");
        });


 

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
                setTimeout(()=>{
                     this.refresh(); 
                 },50)              
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



    .up-enter-active{
        transition:all 0.2s;
    }

    .up-enter, .up-leave-active{
        transform:translateY(100%);
        transition:all 0.2s;
    }

    #c{
        height:1rem;
        line-height: 1rem;
    }
</style>