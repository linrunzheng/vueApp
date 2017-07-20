<template>
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
</template>

<script>
export default {
    data () {
	    return {

	    };
    }
};
</script>

<style lang="scss" scoped>

</style>