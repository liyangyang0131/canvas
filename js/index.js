$(function(){

    var index,count;
    //$(".parent").click(function(){
    //    $(".son").finish();
    //    count = $(this).index(".parent");
    //    $($(".son")[count]).slideToggle(300);
        $(".parent").hover(function(){
            $(".son").finish();
            $(".son").hide();
            index = $(this).index(".parent");
            $($(".son")[index]).slideDown(300);
        },function(){
            $(".son").finish();
            $($(".son")[index]).slideUp(300);
        })
    //})


    var copy = $(".copy");
    var canvas = $("canvas");
    var cobj = canvas[0].getContext("2d");

    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })

    var obj = new shape(copy[0],canvas[0],cobj,$(".clear"),$(".selectArea"));

    $(".parent:eq(1)").find(".son li").click(function(){
        if($(this).attr("attr")!="pen"){
            obj.shap = $(this).attr("attr");
            obj.draw();
        }
        else{
            obj.pen();
        }
    })

    $(document).click(function(){
        $(".selsecArea").css({
            display:"none",
        })


    })




    //填充的类型
    $(".filltype").find(".son li").click(function(){
        obj.type = $(this).attr("attr");
    })
    //填充的背景颜色
    $(".bgcolor input").change(function(){
        obj.fillcolor = $(this).val();
    })
    //填充的线条颜色
    $(".linecolor input").change(function(){
        obj.strokecolor = $(this).val();
    })

    //线条的粗细
    $(".linecx").find(".son li").click(function(){
        obj.lineWidth = $(this).attr("attr");
    })


    //橡皮擦
    $(".xpc li").click(function(){
        var xpcW = $(this).attr("attr");
        var xpcH =  $(this).attr("attr");

        var xpcobj = $(".clear");

        obj.xpc(xpcobj,xpcW,xpcH);
    })

    //文件
    var count;
    $(".file li").click(function(){
        count = $(this).index(".file li");
        if(count == 0){
            if(obj.history.length>0){
                var yes = window.confirm("是否要保存");
                if(yes){
                    location.href = canvas[0].toDataURL().replace("data:image/png","data:stream/octet");
                }
            }
            obj.history = [];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }else if(count == 1){
            location.href = canvas[0].toDataURL().replace("data:image/png","data:stream/octet");
        }else if(count == 2){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length == 0){
                alert("不能后退");
                return;
            }
            var data = obj.history.pop();
            cobj.putImageData(data,0,0);
        }
    })

    //选择
    $(".select").click(function(){
        obj.select($(".selectArea"));
    })
})