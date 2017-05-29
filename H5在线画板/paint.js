var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');
var flag=0;
var eraserFlag=0;
var startX;
var endX;
var startY;
var endY;

var Save=document.getElementById('saveImg');
var Clear=document.getElementById('clearImg');

//获取工具标签
var Brush=document.getElementById('brush');
var Eraser=document.getElementById('eraser');
var Paint=document.getElementById('paint');
var Straw=document.getElementById('straw');
var Text=document.getElementById('text');
var Magnifier=document.getElementById('magnifier');
//获取形状标签
var Line=document.getElementById('line');
var Arc=document.getElementById('arc');
var Rect=document.getElementById('rect');
var Poly=document.getElementById('poly');
var ArcFill=document.getElementById('arcFill');
var RectFill=document.getElementById('rectFill');
//把工具和形状放到一个数组中
var actions=[Save,Clear,Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,ArcFill,RectFill];


//获取线宽数组
var Width_1=document.getElementById('width_1');
var Width_3=document.getElementById('width_3');
var Width_5=document.getElementById('width_5');
var Width_8=document.getElementById('width_8');
var lineWidths=[0,0,Width_1,Width_3,Width_5,Width_8];


//设置颜色数组
var red=document.getElementById('red');
var green=document.getElementById('green');
var blue=document.getElementById('blue');
var yellow=document.getElementById('yellow');
var white=document.getElementById('white');
var black=document.getElementById('black');
var pink=document.getElementById('pink');
var purple=document.getElementById('purple');
var cyan=document.getElementById('cyan');
var orange=document.getElementById('orange');
var colors=[0,0,red,green,blue,yellow,white,black,pink,purple,cyan,orange];

//初始化
brush(2);
setWidth(2);
setColor(red,0);

var all = document.getElementById("allcolor");
all.onchange = function(){
	console.log(this.value);
	cxt.strokeStyle=this.value;
	cxt.fillStyle=this.value;
}

function save(num){
	var data=canvas.toDataURL();
	var b64 = data.substring( 22 );  
	console.log(b64);
	var imgdata=document.getElementById('imgdata');
	imgdata.value=b64;
	var form=document.getElementById('myform');
	form.submit(); 
}
function clr(num){
	setStatus(actions,num,1);
	cxt.clearRect(0,0,880,400);
	canvas.onmousedown=null;
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}


function setStatus(arr,num,type){
	for (var i = 2; i < arr.length; i++) {
		if(i === num){
			if(type == 1){
				arr[i].style.background = "yellow";
			}else{
				arr[i].style.border = "1px solid #fff";
			}
		}else{
			if(type == 1){
				arr[i].style.background = "#ccc";
			}else{
				arr[i].style.border = "1px solid #000";
			}
		}
	};
}
function setWidth(num){
	setStatus(lineWidths,num,1);
	switch(num){
		case 2:
			cxt.lineWidth=1;
			break;
		case 3:
			cxt.lineWidth=3;
			break;
		case 4:
			cxt.lineWidth=5;
			break;
		case 5:
			cxt.lineWidth=8;
			break;
		default:
			cxt.lineWidth=1;
	}
	//alert(cxt.lineWidth);
}
function setColor(obj,num){
	setStatus(colors,num+2,0);
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
}


//画笔
function brush(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=evt || window.event;
		startX = evt.pageX - this.offsetLeft;
		startY = evt.pageY - this.offsetTop; 
		flag=1;
		cxt.beginPath();
		//获取起始点
		cxt.moveTo(startX,startY); 
	}
		
	canvas.onmousemove=function(evt){
		evt=evt || window.event;
		endX = evt.pageX - this.offsetLeft;
		endY = evt.pageY - this.offsetTop; 
		if(flag){
			cxt.lineTo(endX,endY);
			//绘制路径
			cxt.stroke();	
		}
	}
		
	canvas.onmouseup=function(evt){
		cxt.closePath();
		flag=0;
	}
	canvas.onmouseout=function(evt){
		flag=0;
	}
}
//橡皮
function eraser(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt || window.event;
			var eraserX = evt.pageX - this.offsetLeft;
			var eraserY = evt.pageY - this.offsetTop; 
			eraserFlag=1;
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);	
	}
	canvas.onmousemove=function(evt){
			evt=evt || window.event;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop; 
			if(eraserFlag){
				cxt.clearRect(endX-cxt.lineWidth,endY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);	
			}
	}	
	canvas.onmouseup=function(evt){
			eraserFlag=0;
	}
	canvas.onmouseout=function(evt){
			eraserFlag=0;
	}
}
//填充
function paint(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(){
		cxt.fillRect(0,0,880,400);
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}
//吸管
function straw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=evt || window.event;
		var strawX = evt.pageX - this.offsetLeft;
		var strawY = evt.pageY - this.offsetTop; 
		var imageData=cxt.getImageData(strawX,strawY,1,1);
		console.log(imageData);
		var pxData=imageData.data;
		var color='rgba('+pxData[0]+','+pxData[1]+','+pxData[2]+','+pxData[3]+')';
		console.log(color);
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
		brush(2);
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
//文本
function text(num){
	setStatus(actions,num,1);
	
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
	canvas.onmousedown=function(evt){
		evt=evt || window.event;
		var textX = evt.pageX - this.offsetLeft;
		var textY = evt.pageY - this.offsetTop; 
		var val = window.prompt('请输入文字','');
		if(val){
			cxt.fillText(val,textX,textY);
		}	
	}
}
//放大
function magnifier(num){
	setStatus(actions,num,1);
	var scale=window.prompt('请输入缩放倍数0-100','100');
	var scaleX=880*scale/100;
	var scaleY=400*scale/100;
	canvas.style.width=parseInt(scaleX)+'px';
	canvas.style.height=parseInt(scaleY)+'px';
}


//画线
function line(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt || window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			cxt.beginPath();
			//直线起始点
			cxt.moveTo(startX,startY); 
	}
	canvas.onmouseup=function(evt){
			evt=evt || window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.lineTo(endX,endY);
			cxt.stroke();
			cxt.closePath();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//画圆
function arc(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt || window.event;
			arcX = evt.pageX - this.offsetLeft;
			arcY = evt.pageY - this.offsetTop; 
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt || window.event;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop; 
			cxt.arc(arcX,arcY,Math.sqrt((endX-arcX)*(endX-arcX)+(endY-arcY)*(endY-arcY)),0,360,false);
			cxt.stroke();
			cxt.closePath();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//画方
function rect(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt || window.event;
			rectX = evt.pageX - this.offsetLeft;
			rectY = evt.pageY - this.offsetTop; 
	}
	canvas.onmouseup=function(evt){
			evt=evt || window.event;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop; 
			cxt.strokeRect(rectX,rectY,endX-rectX,endY-rectY);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//三角形
function poly(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt || window.event;
			polyX = evt.pageX - this.offsetLeft;
			polyY = evt.pageY - this.offsetTop; 
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt || window.event;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop; 
			cxt.moveTo(endX,endY);
			cxt.lineTo(polyX-(endX-polyX),endY);
			cxt.lineTo(polyX,polyY-Math.sqrt(Math.sqrt(endX-polyX,2)+Math.sqrt(endY-polyY,2)));
			cxt.closePath();
			cxt.stroke();		
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//填充圆
function arcFill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt || window.event;
			arcX = evt.pageX - this.offsetLeft;
			arcY = evt.pageY - this.offsetTop; 
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt || window.event;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop; 
			cxt.arc(arcX,arcY,Math.sqrt((endX-arcX)*(endX-arcX)+(endY-arcY)*(endY-arcY)),0,360,false);
			cxt.fill();
			cxt.closePath();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//填充矩形
function rectFill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt || window.event;
			rectX = evt.pageX - this.offsetLeft;
			rectY = evt.pageY - this.offsetTop; 
	}
	canvas.onmouseup=function(evt){
			evt=evt || window.event;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop; 
			cxt.fillRect(rectX,rectY,endX-rectX,endY-rectY);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
