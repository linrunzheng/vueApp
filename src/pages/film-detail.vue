<template>
	<transition name="slide" mode="out-in"> 
	<div id="detail-container">
		<div class="film-detail" v-show="!loading">		
			<div class="iconfont icon-back back" @click="goBack"></div>
			<div class="film-detail__baseInfo" :style="{backgroundImage:'url('+bgPic+')'}">
				<div id="shadow">
					<div class="film-detail__baseInfo__img">
						<img :src="smallPic" alt="">
					</div>
					<div class="film-detail__baseInfo__message">
						<h5 class="film-detail__baseInfo__message__title">{{title}}</h5>
						<p class="film-detail__baseInfo__message__rank">
							<span class="rating">{{averageRating}}</span>
							<span class="iconfont icon-rank" v-for="i in 5" :class="{rankColor:averageRating>((i-0.5)*2)}"></span>	
						</p>
						<p class="rating-number"><span>{{ratingCount}}人评价</span></p>
					</div>
				</div>			
			</div>
			<div class="film-detail__filmInfo">
				<p>导演：{{filterData(directors)}}</p>
				<p>类型：{{genres.join(" / ")}}</p>
				<p>年份：{{year}}</p>
				<p>地区：{{countries.join(" / ")}}</p>
			</div>
			<div class="film-detail__breif">
				<h6>{{title}}的剧情简介</h6>
				<p>{{brief}}</p>
			</div>
			<div class="add-to-car">
				<button @click="addToCar(id)">Vuex添加测试数据到购物车</button>
				<span class="add-to-car__tip show" v-if="addSuccess">+1</span>
			</div>	
		</div>
		<div id="loading" v-show="loading"><img src="../assets/transition.gif" alt=""></div>
	</div>
	</transition> 
</template>

<script>
import {api} from "../base/js/api.js"
import Loading from 'components/loading.vue'
export default {
    name: 'detail',
    data () {
    	return {
    		loading:false,
    		addSuccess:false,
    		id:this.$route.params.id,
    		filmDetail:{

    		},
    		smallPic:"",
    		bgPic:"",
    		averageRating:0,
    		title:"",
    		ratingCount:0,
    		year:0,
    		directors:[],
    		genres:[],
    		countries:[],
    		brief:""
    	}
 	},
 	components:{
 		Loading
 	},
    activated(){
    	console.log("in router-activate");
    	this.id=this.$route.params.id;
    	this.addSuccess=false;	
    	this.fetchData();
    },

 	methods: {
 		goBack(){
 			this.$router.back();
 		},
 		addToCar(id){
 			var carList=this.$store.state.goodsList;
 			var idExist=carList.find((item)=>{
 				return item.id==id
 			})

 			if(!idExist){
 				var data={
 					url:this.smallPic,
                    title:this.title,
                    price:Math.floor(Math.random()*100),
                    stock:"盒",
                    number:1,
                    select:false,
                    id:this.id
 				}
 				this.$store.commit("addGoods",data);
 				this.addSuccess=true;			
				
 			}else{
 				return alert("已加入購物車")
 			}
 		},
 		 filterData(arr){
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
	    fetchData () {
	        this.loading = true;
	        this.$ajax.get(`${api}subject/${this.$route.params.id}`)
	        	.then((res)=>{
	        		this.smallPic=res.data.images.small;
	        		this.bgPic=res.data.images.large;
	        		this.title=res.data.title;
	        		this.title=res.data.title;
	        		this.ratingCount=res.data.ratings_count;
	        		this.averageRating=res.data.rating.average;
	        		this.directors=res.data.directors;
	        		this.genres=res.data.genres;
	        		this.year=res.data.year;
	        		this.countries=res.data.countries;
	        		this.brief=res.data.summary;
					this.loading =false;
	        	})
	       
	    }
	}
};
</script>

<style lang="scss" scoped>
@import '../base/css/base.scss';
#detail-container{
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 99999;
	background:#fff;
}

	.film-detail{
		&__baseInfo{
			height: 4rem;
			position: relative;		
			background:no-repeat top left/cover;	
			#shadow{position: absolute;
				top:0;left:0;
				width:100%;height:100%;
				background:rgba(0,0,0,0.6);
				padding-left: 3rem;
				box-sizing: border-box;
			}
			&__img{
				position: absolute;
				left:0.417rem;
				width: 2.16rem;
				height: 3rem;
				bottom: -0.4rem;
				img{
					width: 100%;
					height:100%;
				}
			}
			&__message{
				position: absolute;
				bottom:0.4rem;
				&__title{
					color: #fff;
					@include fz(15px);
				}
				&__rank{
					color: #fff;
					padding: 0.139rem 0;
					.rating{
						@include fz(24px);
					}
					.icon-rank{
						@include fz(10px);
						&.rankColor{
							color:orange;
						}
					}
				}
				.rating-number{
					color: #aaa;
				}
			}
		}
		&__filmInfo{
			padding: 0.417rem;
			margin-top: 0.45rem;
			p{
				padding: 0.01rem;
				@include fz(13px);
			}
		}
		&__breif{
			padding:0 0.417rem;
			h6{
				color: #888;
				@include fz(13px);
			}
			p{
				line-height: 1.7;
				@include fz(12px);
				margin: 0.3rem 0;

			}
		}
	}

	.add-to-car {
		text-align: center;
		margin-top: 1.5rem;
		position: relative;
		button{
			@include fz(13px);
			background:#fff;
			border: 0.014rem solid $mainColor;
			padding:0.3rem 0.8rem;
			color:$mainColor;
			margin: 0 auto;
		}	
		&__tip{
			background:red;
			color:#fff;
			border-radius: 50%;
			width:0.5rem;
			height: 0.5rem;
			line-height:0.5rem;
			text-align: center;
			position: absolute;
			top:50%;
			left:50%;
			margin-left: -0.25rem;
			margin-top: -0.25rem;
			@include fz(12px);
			&.show{
				animation:move 1.6s forwards;
			}
		}	
	}
	#loading{
		position: absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		img{
			width: 100%;
			height: auto;	
		}
	}
	.back{
		@include fz(25px);
		color: #fff;		
		padding: 0.111rem;
		position: absolute;
		top:0;
		left:0;
		z-index: 1000;
	}

	.slide-enter-active{
        transition:all 0.4s;
    }
    .slide-enter, .slide-leave-active{
        transform:translate3d(-100%,0,0);
        transition:all 0.4s;
    }

    @keyframes move{
    	from{
			opacity: 1;
			transform:translateY(0);

    	}

    	to{
			opacity: 0;
			transform:translateY(-100%);
    	}
    }
	
</style>