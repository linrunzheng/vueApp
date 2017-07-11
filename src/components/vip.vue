<template>	    
    <div class="vippage-container">      
        <div class="vip-detail">
            <a href="<%=basePath%>bindphone/selectphone.do"><span></span></a> 
            <i class="msg-points" onclick="message()"><a href="<%=basePath%>message/list.do" style="color:#fff"></a></i>
            <div>
                <div class="head-img">
                    <img  src="" alt="">
                </div>
                <div>
                    <p class="nick-name">昵称：<span>测试</span></p>
                
				 <p class="nick-phone">手机：<span>13546464646</span></p>
                </div>
            </div>
        </div>
        <!-- 个人中心 -->
        <!-- 订单状态 -->
        <div class="order-status-container">
            <ul>
                <li classs="order-status order-status--unpay">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>1</span></div>
                        <p>待付款</p>
                    </a>
                </li>
                 <li classs="order-status order-status--unsend">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>3</span></div>
                        <p>待发货</p>
                    </a>
                </li>
                 <li classs="order-status order-status--sent">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>7</span></div>
                        <p>已发货</p>
                    </a>
                </li>
                 <li classs="order-status order-status--paid">
                    <a>
                        <div class="iconfont icon-wuliu2"><span>11</span></div>
                        <p>已完成</p>
                    </a>
                </li>                             
            </ul>
        </div>
      
        <div class="vip-message-center">
 
            <div class="all-order vip-center">
                <a>
                    <em></em>
                    <i>全部订单</i>
                    <strong></strong>
                </a>
            </div>

            <div class="my-coupon vip-center">
                <a href="<%=basePath%>member/coupins/list.do">
                    <em></em>
                    <i>我的优惠券</i>
                    <span>${coupinscount }</span>
                    <strong></strong>
                </a>
            </div>

           
            <div class="my-reward vip-center">
                <a href="<%=basePath%>rewardsrecord/record.do">
                    <em></em>
                    <i>我的奖励</i>
  
                    <strong></strong>
                </a>
            </div>

				
            <div class="addr vip-center">
                <a href="<%=basePath%>index/member/address/list.do">
                    <em></em>
                    <i>管理收货地址</i>
                    <strong></strong>
                </a>
            </div>
            <div class="help vip-center">
                 <a href="<%=basePath%>wxindex/help/help.jsp">
                    <em></em>
                    <i>购物帮助</i>
                    <strong></strong>
                </a>
            </div>
             <div class="aboutus vip-center">
            	 <a href="<%=basePath%>wxindex/help/contactUs.jsp">              
                    <em></em>
                    <i>关注我们</i>
                    <strong></strong>
                </a>
            </div>
            
        </div>

    </div>
</template>

<script>


export default {
   
}
</script>

<style scoped lang="scss">
  
 @import '../base/css/base.scss'; 
body{
    background-color: #f3f8f1;
}
.vippage-container{
    background-color: #fff;
}
.vip-detail {
    position: relative;
    height: 5.0rem;
    width: 100%;
    background-color: #c0c165;
    -webkit-background-size: cover;
    background-size: cover;
    color: #fff;
}

.bg{	
	width:100%;
	height:1.4rem;
	bottom:0;
	left:0;
	position:absolute;
	line-height:2rem;
	text-align:right;
	padding-right:0.2rem;
	box-sizing:border-box;
}

.order-status-container{
	ul{
		display: flex;
		padding: 0.208rem 0;
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
					width:0.378rem;
					height: 0.378rem;
					border-radius: 50%;	
					background: red;
					@include fz(10px);
					color:#fff;
				}
			}
		}
	}
}




</style>
