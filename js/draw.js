// Square Brush
    $("#squarebrush").click(function(){
      context.lineCap = 'square';
    });

    // Round Brush
    $("#roundbrush").click(function(){
      context.lineCap = 'round';
    });

    $("#startup").click(function(){
      //alert("click");
      //$("#startup").hide();
    })

    // Add a blur/soft brush
    $("#spraycan").click(function(){
      context.shadowColor = context.fillStyle;
      context.shadowBlur = 20;
      context.shadowOffsetX = 15;
      context.shadowOffsetY = 15;
      //hide brush
      //context.fill();
    });

    // get the canvas element and its context
    var canvas = document.getElementById('sketchpad');
    var context = canvas.getContext('2d');
    var brushSize = 1;
    var brushColor = 'rgba(0,0,0,1)';
    var points = [];

    if($( window ).width() > 320) {
      //for large screensize
      $("#sketchpad").css("background-image","url('../images/btns/startup-image.png')")
                     .css("background-position","40% center")
                     .css("background-repeat","no-repeat")
                     .css("background-size","30%")
    } else {
      //for small screensize
      $("#sketchpad").css("background-image","url('../images/btns/startup-image.png')")
                     .css("background-position","center center")
                     .css("background-repeat","no-repeat")
                     .css("background-size","30%")
    }



    var firstTimeUse = 0;

    // create a drawer which tracks touch movements
    var drawer = {
       isDrawing: false,
       touchstart: function(coors){

          firstTimeUse ++;

          //remove div, for first time use
          if(firstTimeUse == 1){
            $("#sketchpad").css("background-image","none")
            context.fillStyle = 'rgba(0,0,0,1)'; // black
            context.strokeStyle = 'rgba(0,0,0,1)'; // black
          }

          if (context.lineWidth != brushSize) {
              context.lineWidth = brushSize;
          }
          if (context.strokeStyle != brushColor) {
              context.strokeStyle = brushColor;
          }

          context.beginPath();
          context.moveTo(coors.x, coors.y);
          points.push({
              x: coors.x,
              y: coors.y,
              size: brushSize,
              color: brushColor,
              mode: "begin"
          });
          this.isDrawing = true;
          //alert(this.isDrawing);
       },
       touchmove: function(coors){
          if (this.isDrawing) {
             context.lineTo(coors.x, coors.y);
             // command pattern stuff
             points.push({
                 x: coors.x,
                 y: coors.y,
                 size: brushSize,
                 color: brushColor,
                 mode: "draw"
             });
             context.stroke();
          }
       },
       touchend: function(coors){
          if (this.isDrawing) {
             this.touchmove(coors);
             this.isDrawing = false;
             points.push({
                 x: coors.x,
                 y: coors.y,
                 size: brushSize,
                 color: brushColor,
                 mode: "end"
             });
          }
       }
    };

    // create a function to pass touch events and coordinates to drawer
    function draw(event){
       // get the touch coordinates
       var coors = {
          x: event.targetTouches[0].pageX,
          y: event.targetTouches[0].pageY
       };
       // pass the coordinates to the appropriate handler
       drawer[event.type](coors);
    }

    // attach the touchstart, touchmove, touchend event listeners.
    canvas.addEventListener('touchstart',draw, false);
    canvas.addEventListener('touchmove',draw, false);
    canvas.addEventListener('touchend',draw, false);

    function redrawAll() {

        if (points.length == 0) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < points.length; i++) {

            var pt = points[i];

            var begin = false;

            // check to see if the brush size that was stored equals the current strokesize, if not, then set to brushsize up top
            if (context.lineWidth != pt.size) {
                context.lineWidth = pt.size;
                begin = true;
            }
            if (context.strokeStyle != pt.color) {
                context.strokeStyle = pt.color;
                begin = true;
            }
            if (pt.mode == "begin" || begin) {
                context.beginPath();
                context.moveTo(pt.x, pt.y);
            }
            context.lineTo(pt.x, pt.y);
            if (pt.mode == "end" || (i == points.length - 1)) {
                context.stroke();
            }
        }
        context.stroke();
    }

    function undoLast() {
        points.pop();
        redrawAll();
    }

    var interval;

    //for touchdown
    $("#btn-undo").bind('touchstart', function(){
        interval = setInterval(undoLast, 50);
    }).bind('touchend', function(){
        clearInterval(interval);
    });

    // prevent elastic scrolling
    document.body.addEventListener('touchmove',function(event){
      event.preventDefault();
    },false);	// end body:touchmove