//获取非行内元素样式值
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
//碰撞检测
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj2.offsetHeight;		
	
	if( R1 < L2  ||  L1>R2 ||  B1<T2 || T1 >B2 ){ //　碰不上
		return false;	
	}else{
		return true;
	}
}
//获取任意区间值函数
function getRand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}
//获取颜色
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i = 0; i < 6 ; i++ ){
		color +=  str.charAt(getRand(0,15));
	}
	return color;
}
//获取日期时间格式函数  封装  
function dateToString(now,sign){
	sign = sign || "-";
	var y = now.getFullYear();
	var m =toTow( now.getMonth()+1 );
	var d =toTow( now.getDate() );
	var h =toTow( now.getHours() );
	var mint =toTow( now.getMinutes() );
	var s =toTow( now.getSeconds() );
	return  y + sign + m + sign + d + " " + h + ":" + mint + ":" +s;
}
function toTow(num){
	return num < 10 ? "0"+num : num;
}

//字符串转日期时间格式
function stringToDate(str){
     return new Date(str);
}

//时间差
function diff(start,end){ 
	return Math.abs( start.getTime() - end.getTime() )/1000;
}

//根据id找元素
function $id(id){
	return document.getElementById(id);
}
//判断鼠标操作的是 左键？滚轮？右键？
function getButton(evt){
     var e = evt || event;
     if( evt ){    // 高版本浏览器
         return e.button;
     }else if( window.event ){ //  ie
         switch( e.button ){
               case 1 : return 0;
               case 4 : return 1;
               case 2 : return 2;
          }
     }
}

//dom操作创建元素
function create(ele){
	return document.createElement(ele);
}


 
    //我写的验证码  
    //验证码  
//  var code;  
    function createCode(){  
        code = '';//首先默认code为空字符串  
        var codeLength = 4;//设置长度，这里看需求，我这里设置了4  
        
        //设置随机字符  
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');  
        for(var i = 0; i < codeLength; i++){ //循环codeLength 我设置的4就是循环4次     
            var index = Math.floor(Math.random()*36); //设置随机数范围,这设置为0 ~ 36    
            code += random[index];  //字符串拼接 将每次随机的字符 进行拼接  
   		}  
        return code;//将拼接好的字符串赋值给展示的Value  
    }

    