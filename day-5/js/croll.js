//上拉刷新，下拉加载
var myScroll,
    pullDownEl,
    pullDownOffset,
    pullUpEl,
    pullUpOffset,
    generatedCount=0;
function loaded(){
    setTimeout(function(){
        pullDownEl=document.getElementById("pullDown");
        pullUpEl=document.getElementById("pullUp");
        pullDownOffset=pullDownEl.offsetHeight;
        pullUpOffset=pullUpEl.offsetHeight;
        myScroll=new iScroll('wrapper',{
            topOffset:pullDownOffset,
            onScrollMove:function(){
                if(this.y>5&&!pullDownEl.className.match("flip")){
                    pullDownEl.className="flip";
                    // 获取pullDownEl下面的第一个类名为pullDownLabel的元素
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="松手加载";
                    this.minScrollY=0;
                }else if(this.y<5&&pullDownEl.className.match("flip")){
                    pullDownEl.className="";
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="下拉刷新";
                }else if(this.y<(this.maxScrollY-5)&&!pullUpEl.className.match("flip")){
                    pullUpEl.className="flip";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="松手刷新";
                    this.maxScrollY=this.maxScrollY;
                }else if(this.y>(this.maxScrollY+5)&&pullUpEl.className.match("flip")){
                    pullUpEl.className="";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="上拉加载更多";
                    this.maxScrollY=pullUpOffset;
                }
            },
            onScrollEnd:function(){
                if(pullDownEl.className.match("flip")){
                    pullDownEl.className="loading";
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="正在加载...";
                    pullDownAction();
                }else if(pullUpEl.className.match("flip")){
                    pullUpEl.className="loading";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="正在加载...";
                    pullUpAction();
                }
            },
            onRefresh:function(){
                if(pullDownEl.className.match("loading")){
                    pullDownEl.className="";
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="下拉刷新";
                }else if(pullUpEl.className.match("loading")){
                    pullUpEl.className="";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="加载更多";
                }
            },
        });
        loadAction();
        //console.log(myScroll);
    },100)
}
// 下拉刷新当前数据
function pullDownAction(){
    setTimeout(function(){
        // 这里执行刷新操作
        //alert("与服务器同步成功！");
        myScroll.refresh();
    },400)
}
// 上拉加载贡多数据
function pullUpAction(){
    setTimeout(function(){
        $.ajax({
            url: "js/data.json",
            type: 'get',
            success: function(data){
                console.log(data)
                var str=''
                for(var i=0;i<data.length;i++){
                    str+=" <li><div class='max'><div class='list'><dl><dt><img src='" + data[i].img+ "'></dt><dd><p>"+ data[i].title+"</p><span>"+ data[i].type+ "</span><div class='foot'><p><span>"+ data[i].host + "</span><span>" + data[i].time + "</span></p><p>"+ data[i].time + "</p></div></dd></dl></div></div></li>"
                }
                $('#thelist').append(str)
            }
        })

        myScroll.refresh();// 初始化数据
    },400)
}
function loadAction(){
    $.ajax({
        url:"js/data.json",
        type:'get',
        success:function(data){
            console.log(data[0].title)
            var str=''
            for(var i=0;i<data.length;i++){
                str+=" <li><div class='max'><div class='list'><dl><dt><img src='" + data[i].img+ "'></dt><dd><p>"+ data[i].title+"</p><span>"+ data[i].type+ "</span><div class='foot'><p><span>"+ data[i].host + "</span><span>" + data[i].time + "</span></p><p>"+ data[i].nu + "</p></div></dd></dl></div></div></li>"
            }
            $('#thelist').append(str)
        }
    })
    myScroll.refresh();// 初始化数据
}
window.addEventListener("load",loaded,false);