/*function shape(copy,canvas,cobj){
    this.copy = copy;
    this.canvas = canvas;
    this.cobj = cobj;
    this.bgcolor = "#000";
    this.bordercolor = "#000";
    this.lineWidth = 1;
    this.shapes = "line";
    this.type = "stroke";
    this.width = canvas.width;
    this.height = canvas.height;
}
shape.prototype = {
    init:function(){
        this.cobj.fillStyle = this.bgcolor;
        this.cobj.strokeStyle = this.bordercolor;
        this.cobj.lineWidth = this.lineWidth;
    },
    line:function(startx,starty,endx,endy){
        var that = this;
        that.init();
        that.cobj.beginPath();
        that.cobj.moveTo(startx,starty);
        that.cobj.lineTo(endx,endy);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    rect:function(startx,starty,endx,endy){
        var that = this;
        that.init();
        that.cobj.beginPath();
        that.cobj.rect(startx,starty,endx-startx,endy-starty);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    circle:function(startx,starty,endx,endy){
        var that = this;
        that.init();
        that.cobj.beginPath();
        var r = Math.sqrt((endx-startx)*(endx-startx)-(endy-starty)*(endy-starty))
        that.cobj.arc(startx,starty,r,0,Math.PI*2);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    pen:function(){
        var that = this;

    },
    draw:function(){
        var that = this;
        that.copy.onmousedown = function(e){
            var startx = e.offsetX;
            var startY = e.offsetY;
            that.copy.onmousemove = function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                var endx = e.offsetX;
                var endy = e.offsetY;
                that[that.shapes](startx,startY,endx,endy);
            }
            that.copy.onmouseup = function(){
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
            }
        }

    }

}*/

function shape(copy,canvas,cobj,xpcObj,selectAreaObj){
    this.copy = copy;
    this.canvas = canvas;
    this.cobj = cobj;
    this.shap = "line";
    this.type = "stroke";
    this.fillcolor = "#000";
    this.strokecolor = "#000";
    this.lineWidth = 1;
    this.width = canvas.width;
    this.height = canvas.height;
    this.history = [];

    this.xpcObj = xpcObj;
    this.selectAreaObj = selectAreaObj;
}
shape.prototype = {
    init:function(){
        this.xpcObj.css({
            display:"none",
        })
        this.selectAreaObj.css({
            display:"none",
        })
        if(this.temp){
            this.history.push(this.cobj.getImageData(0,0,this.width,this.height));
            this.temp = null;
        }


        this.cobj.fillStyle = this.fillcolor;
        this.cobj.strokeStyle = this.strokecolor;
        this.cobj.lineWidth = this.lineWidth;
    },
    draw:function(){
        var that = this;
        that.init();
        that.copy.onmousedown = function(e){
            that.init();
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.copy.onmousemove = function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length >0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that[that.shap](startx,starty,endx,endy);
            }
            that.copy.onmouseup = function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
            }
        }
    },
    line:function(x,y,x1,y1){
        this.init();
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.closePath();
        this.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj.closePath();
        this.cobj[this.type]();
    },
    circle:function(x,y,x1,y1){
        var r = Math.sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,Math.PI*2);
        this.cobj.closePath();
        this.cobj[this.type]();
    },
    pen:function(){
        var that = this;
        that.init();
        that.copy.onmousedown = function(e){
            var startx = e.offsetX;
            var starty = e.offsetY;

            that.init();
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);

            that.copy.onmousemove = function(e){
                var endx = e.offsetX;
                var endy = e.offsetY;

                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();
            }
            that.copy.onmouseup = function(){
                that.cobj.closePath();
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
            }
        }
    },
    five:function(x,y,x1,y1){
        var r = Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1 = r/2;
        this.cobj.beginPath();
        this.cobj.moveTo(x+r,y);
        for(var i = 1;i<10;i++){
            if(i%2==0){
               this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r);
            }else{
                this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r1,y+Math.sin(i*36*Math.PI/180)*r1);
            }
        }
        this.cobj.closePath();
        this.cobj[this.type]();
    },
    xpc:function(xpcobj,w,h){
        var that = this;
        that.init();
        that.copy.onmousemove = function(e){
            var ox = e.offsetX;
            var oy = e.offsetY;
            xpcobj.css({display:"block",width:w,height:h});
            var lefts=ox-w/2;
            var tops=oy-h/2;
            if(lefts<0){
                lefts=0;
            }
            if(lefts>that.width-w){
                lefts = that.width-w;
            }
            if(tops<0){
                tops=0;
            }
            if(tops>that.height-h){
                tops = that.height-h;
            }
            xpcobj.css({
                left:lefts,
                top:tops
            })
        }
        that.copy.onmousedown = function(e){
            that.init();
            that.copy.onmousemove = function(e){
                var ox = e.offsetX;
                var oy = e.offsetY;

                var lefts=ox-w/2;
                var tops=oy-h/2;

                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts = that.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops = that.height-h;
                }
                xpcobj.css({
                    display:"block",
                    left:lefts,
                    top:tops
                })
                that.cobj.clearRect(lefts,tops,w,h);
            }
            that.copy.onmouseup = function(){
                xpcobj.css("display","none");
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
                that.xpc(xpcobj,w,h);
            }
        }
    },
    select:function(selectAreaObj){
        var that=this;
        that.init();
        that.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            var minx,miny,w,h;
            that.init();
            that.copy.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectAreaObj.css({
                    display:"block",
                    left:minx,
                    top:miny,
                    width:w,
                    height:h
                })
            }
            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cobj.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,selectAreaObj);
            }
        }
    },
    drag:function(x,y,w,h,areaobj){
        var that=this;
        that.copy.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.copy.style.cursor="move";
            }else{
                that.copy.style.cursor="default";
            }
        }
        that.copy.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var cx=ox-x;
            var cy=oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.copy.style.cursor="move";
            }else{
                that.copy.style.cursor="default";
                return;
            }

            that.copy.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length!==0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w;
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                areaobj.css({
                    left:lefts,
                    top:tops
                });
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops);
            }

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.drag(x,y,w,h,areaobj);
            }
        }
    }

}
