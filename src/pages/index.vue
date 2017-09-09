<template>
    <div id="container">      
        <swiperComponent :swiperOption="swiperOption"></swiperComponent>
    
        <filmComponent 
            :el="filmType.topFilmData.scroller" 
            :url="filmType.topFilmData.url" 
            :type="filmType.topFilmData.type">         
        </filmComponent>

        <filmComponent 
            :el="filmType.commingFilmData.scroller" 
            :url="filmType.commingFilmData.url"
            :type="filmType.commingFilmData.type">        
        </filmComponent>

        <filmComponent 
            :el="filmType.theatersFilmData.scroller" 
            :url="filmType.theatersFilmData.url"
            :type="filmType.theatersFilmData.type">      
        </filmComponent>

    </div>
</template>

<script>
import swiperComponent from 'components/swiper.vue'
import filmComponent from './film.vue'
export default {
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',          
            },     
            filmType:{
                topFilmData:{
                    scroller:"scroll-top250",
                    url:"top250",
                    type:"top250"
                },
                commingFilmData:{
                    scroller:"scroll-comming",
                    url:"coming_soon",
                    type:"即将上映"
                },
                theatersFilmData:{
                    scroller:"scroll-theaters",
                    url:"in_theaters",
                    type:"正在热播"
                }
            }
            
        }
    },
    components:{
        swiperComponent,
        filmComponent
    }
    
  }
</script>

<style lang="scss">
#container{padding-bottom: 1.111rem;}
</style>