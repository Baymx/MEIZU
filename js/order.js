
$(function(){
	var cookie = getCookie("order");
	var str="";
	for(var i in cookie){
		str+=`<tr class="trHead">
							<td class="trHead-title" colspan="4">
								<div class="f1">
									下单时间：<span class="time">${cookie[i].time}</span>
									订单号：<span class="Number">21091041381718650131</span>
								</div>
							</td>
						</tr>
						<tr class="list-content">
							<td class="goods-content">
								<img src="${cookie[i].img}"/>
								<div class="describe">
									<a href="goods-details.html?json=${cookie[i].path}&name=${cookie[i].JsonName}&id=${cookie[i].id}" class="content">${cookie[i].name} ${cookie[i].netType} ${cookie[i].color} ${cookie[i].memory}</a><br />
									<span>￥${cookie[i].price} ×${cookie[i].goodsCount}</span>
								</div>
							</td>
							<td class="w128 color">
									￥ ${cookie[i].totalPrice}
							</td>
							<td class="w128">
								待付款
							</td>
							<td class="w128">
								<ul>
									<li><a href="#" class="pay">立即付款</a></li>
									<li>取消订单</li>
									<li ><a href="goods-details.html?json=${cookie[i].path}&name=${cookie[i].JsonName}&id=${cookie[i].id}" class="more">查看详情</a></li>
								</ul>
							</td>
						</tr>
						<tr class="empty"> </tr>`;
						console.log(cookie[i].JsonName)
	}
	$("table").html(str);
})
