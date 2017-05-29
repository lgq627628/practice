function createLayer($obj) {
	/* 添加浮层并获取api接口地址 */
	var layer = document.createElement('div');
	var html = '<span><em></em></span><div class="main"></div>';
	var url = $obj.attr('data-url');

	$(layer).html(html).addClass('layer');
	$obj.parent().append(layer);

	/* 鼠标移入移出效果 */
	$obj.hover(getData, function(){
		$(layer).hide();
	})

	function getData(){	
		/* 发送请求前的loading效果和浮层定位 */
		html = '<img src="../images/load.gif">';
		$('.main').html(html);
		layer.style.display = 'block';
		layer.style.left = this.offsetLeft - 45 + 'px';
		layer.style.top = this.offsetTop - layer.offsetHeight - 14 + 'px';
		this.style.cursor = 'pointer';
		
		/* 为了看到loading效果,在此延迟加载300ms */
		/* 此处也可用appedChild()往浮层内添加节点,但大部分情况下效率稍低于innerHTML*/
		setTimeout(function(){
			$.ajax({  
				type: 'GET',  
				url: url, 
				success: function(data){
					data = JSON.parse(data);
				 	if(data.success){
				 		data = data.data;
				 		html = '<div class="tittle"><i></i><h3>' + data.nickname 
				 			+ '</h3></div><div class="content"><p>个人介绍: ' + data.bio 
				 			+ '</p><span>微博:' + data.weibo 
				 			+ '</span><span>关注:' + data.following 
				 			+ '</span><span class="mr0">粉丝:' + data.followers 
				 			+ '<span></div>';
						$('.main').html(html);   
				 	}
				},
				error: function(){
					console.log('异常');
				}
	     	});  
		},300);
	}
}