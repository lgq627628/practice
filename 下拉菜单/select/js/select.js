var MySelect = function(obj){
	this.obj = obj;
};

MySelect.prototype = {
	constructor: MySelect,

	init: function(){
		var self = this;
		self.getSlectParams();
	},

	/* 获取原选框的属性值和文本值 */
	getSlectParams: function(){
		var self = this;
		var selectId = $(self.obj).attr('id');
		var flag = $(self.obj).find('optgroup').length;
		var $options = $(self.obj).find('option');
		var nowVal = $(self.obj).find('option:selected').val();
		var nowTxt = $(self.obj).find('option:selected').html();
		var str = '';
		if(flag){
			/* 获取有optgroup的所有值 */
			var $groups = $(self.obj).find('optgroup');
			
			for (var i = 0, len = $groups.length; i < len; i++) {
				$group = $groups.eq(i);
				str += $group.attr('label');
				for (var j = 0; j < $group.find('option').length; j++) {
					str += ',' + $group.find('option').eq(j).attr('value') + ',' +$group.find('option').eq(j).html();
				}
				str += ';';
			}
			console.log(str);
		}else{
			/* 获取无optgroup的所有值 */
			for (var i = 0, len = $options.length; i < len; i++) {
				str += $options.eq(i).attr('value') + ',' + $options.eq(i).html() + ',';
			}
			console.log(str);
		}
		self.replaceSelect(selectId,flag,str,nowVal,nowTxt);
	},

	/* 新建自定义选框并替换原选框 */
	replaceSelect: function(selectId,flag,str,nowVal,nowTxt){
		var self = this;
		var html = '';
		var div = document.createElement('div');
		var divTop = $(self.obj).offset().top;
		var divLeft =  $(self.obj).offset().left;

		div.id = selectId;
		$(div).addClass('drop-wrapper');
		$('#'+selectId).offset({top: divTop, left: divLeft});
		$(self.obj).replaceWith($(div));
	
		/* 向自定义选框里添加选项内容 */
		html = '<a href="javascript:;" class="drop-select"><span class="drop-input">'+ nowTxt
			+'</span><span class="drop-icon"></span></a><div class="drop-list"><ul class="drop-option"></ul></div>';
		$(div).html(html);
		html = '';

		if(flag){
			/* 有optgroup的赋值方式 */
			var groups = str.split(';');
			for (var i = 0; i < groups.length-1; i++) {
				var group = groups[i].split(',');
				console.log(group);
				for (var j = 0; j < group.length-1; j++) {
					if(j==0){
						html += '<li class="bold"><a href="javascript:;">'+ group[j] +'</a></li>';
					}else{
						if(group[j] === nowVal){
							html += '<li class="drop-tick"><a data-value="'+ group[j] +'" href="javascript:;" style="padding-left: 20px;">'+ group[++j] +'</a></li>';
						}else{
							html += '<li><a data-value="'+ group[j] +'" href="javascript:;" style="padding-left: 20px;">'+ group[++j] +'</a></li>';
						}
						
					}
				}
			}
		}else{
			/* 无optgroup的赋值方式 */
			var options = str.split(',');
			for (var i = 0, len = options.length -1; i < len; i++) {
				if(options[i] === nowVal){
					html += '<li class="drop-tick"><a data-value="'+ options[i] +'" href="javascript:;">'+ options[++i] +'</a></li>';
				}else{
					html += '<li><a data-value="'+ options[i] +'" href="javascript:;">'+ options[++i] +'</a></li>';
				}
			}
		}	
		$('#'+selectId).find('.drop-option').html(html);
		self.clickSelect(selectId);
	},

	/* 鼠标点击选框事件 */
	clickSelect: function(selectId){
		var self = this;
		var $id = $('#'+selectId);
		var obj = { $id: $id};
		$id.find('.drop-select').click(obj, self.clickStyle);

		self.leaveSelect();

		/* 鼠标点击下拉选项事件,采用事件委托 */
		$id.find('.drop-option').on('click', 'li', function(ev){
			var $oA = $(ev.target);
			var selectTxt = $oA.html();
			
			$id.find('.drop-input').html(selectTxt);
			$oA.css('color','rgb(72,144,255)');
			$oA.parent().addClass('drop-tick').siblings().removeClass('drop-tick').find('a').css('color','rgb(0,0,0)');

			self.initStyle();
		})

		/* 鼠标点击和悬浮optgroup之上,取消默认事件 */
		$('.bold').click(function(){
			this.style.backgroundColor = '#fff';
			return false;
		}).hover(function(){
			this.style.backgroundColor = '#fff';
			return false;
		})
	},

	/* 鼠标移出选框 */
	leaveSelect: function(){
		var self = this;
		$('.drop-wrapper').mouseleave(self.initStyle);
	},

	/* 默认样式 */
	initStyle: function(){
		$('.drop-list').hide();
		$('.drop-icon').css({
			'transition': '200ms',
			'transform': 'rotate(0deg)',
			'border-top': '6px solid rgb(0,0,0)'
		});
		$('.drop-select').css({
			'color': 'rgb(0,0,0)',
			'background-color': 'rgb(255,255,255)'
		});
	},

	/* 点击样式 */
	clickStyle: function(ev){
		ev.data.$id.find('.drop-list').show();
		ev.data.$id.find('.drop-icon').css({
			'transform': 'rotate(-180deg)',
			'border-top': '6px solid rgb(72,144,255)'
		});
		ev.data.$id.find('.drop-select').css({
			'color': 'rgb(72,144,255)',
			'background-color': 'rgb(245,245,245)'
		});
	}
};