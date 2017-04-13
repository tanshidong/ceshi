;(function(){
	$.rili=function(opt){
		var arr={
			num:null,
			last:null
		},
settings=$.extend({},arr,opt)
	//根据两个select中的选中内容做日历的生成

//当前的时间
var day=new Date(),
	year=day.getFullYear(),
	month=day.getMonth()+1;
	//console.log(year)
	//console.log(month)
//年
for(var i=settings.num;i<=settings.last;i++){
	$('<option>'+i+'</option>').appendTo('#selectone')
}
//月
for(var i=1;i<=12;i++){
	$('<option>'+i+'</option>').appendTo('#selecttwo')
}
for(var i=0;i<42;i++){
	$('<td></td>').appendTo($('tr'))
}
//生成select中对应日期的日历
function fn(){
var months=[31,28,31,30,31,30,31,31,30,31,30,31];
//获取	
var newy=$('#selectone').val(),
	newm=$('#selecttwo').val(),
	newday=new Date(newy,newm-1,1),
	//根据第一天获取位置
	day=newday.getDay();
	//判断闰年，平年
	if(newy%100!=0 && newy%4==0 || newy%400==0){
	months[1]=29
}
//赋值
for(var i=0;i<months[newm-1];i++){
	$('td').eq(i+day).html(i+1)
}
}

fn()
//改变第一个select时
$('#selectone').on('change',function(){
	//先清空所有td标签中的值
	$("td").html("")
	fn()
});
//改变第二个select时
$('#selecttwo').on('change',function(){
	//先清空所有td标签中的值
	$("td").html("")
	fn()
});

//单击改变背景色，其他背景色变为白色
$("td").on("click",function(){
	//alert(1)
	$(this).addClass("bg").siblings().removeClass()
})
	}
}())
//select中的年

//根据两个select中的信息获取对应的月份信息

