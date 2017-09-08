<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
        <slot></slot>
        <Loading></Loading>
    </div>  
  </div>
</template>

<script >
  import BScroll from 'better-scroll'
  import Loading from './loading.vue'

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
            scroll:null
        }
    },
     
    mounted() {
        this.initScroll();

        this.scroll.on('pullingUp',()=> {
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
                 },20)              
            })  
        }
    },
    components: {
        Loading,
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

  /* .loading{
    position: absolute;
    bottom:0;
    left:0;
  } */
    
</style>