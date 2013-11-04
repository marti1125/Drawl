    // Square Brush
    $("#squarebrush").click(function(){
      context.lineCap = 'square';
	  $("#roundbrush").removeClass('brushSelected');
	  $(this).addClass('brushSelected');
    });

    // Round Brush
    $("#roundbrush").click(function(){
      context.lineCap = 'round';
	  $("#squarebrush").removeClass('brushSelected');
	  $(this).addClass('brushSelected');
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

    //large screensize
    if ($( window ).width() > 320) {
      //alert("large");
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight - document.getElementById('maintoolbar').offsetHeight;
      canvas.style.width  = '100%';
      canvas.style.height = '100%';
    }
    //small screen size
    //alert("small");
    canvas.width  = window.innerWidth;    
    canvas.height = window.innerHeight - document.getElementById('maintoolbar').offsetHeight;
    canvas.style.width  = '100%';
    canvas.style.height = '100%';

    //$('#brushSizeNew').change( function() {
        //brushSize = this.value;
    //});

    $("#handler").bind('touchstart', function(){
        //alert("start");
    }).bind('touchend', function(){
        var progressBarValue = Math.round($('progress:first').prop('value') * 10);
        if (progressBarValue == 0) {
          progressBarValue = 1;
        }
        brushSize = progressBarValue;
    });

    var brushSize = 1;
    var brushColor = '#000000';
    var points = [];

    //for small screensize
    $("#sketchpad").css("background-image","url('../images/btns/startup-image.png')")
                   .css("background-position","center center")
                   .css("background-repeat","no-repeat")
                   .css("background-size","30%")



    var firstTimeUse = 0;

    // create a drawer which tracks touch movements
    var drawer = {
       isDrawing: false,
       touchstart: function(coors){

          firstTimeUse ++;

          //remove div, for first time use
          if(firstTimeUse == 1){
            $("#sketchpad").css("background-image","none")
            //context.fillStyle = 'rgba(0,0,0,1)'; // black
            //context.strokeStyle = 'rgba(0,0,0,1)'; // black
          }

          if (context.lineWidth != brushSize) {
              context.lineWidth = brushSize;
          }
          // causes the eraser to get messed up, if the current brush color doesnt equal the brush color set, then reset it
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
    function draw(event) {
        var type = null;
        // map mouse events to touch events
        switch(event.type){
            case "mousedown":
                    event.touches = [];
                    event.touches[0] = {
                        pageX: event.pageX,
                        pageY: event.pageY
                    };
                    type = "touchstart";
            break;
            case "mousemove":
                    event.touches = [];
                    event.touches[0] = {
                        pageX: event.pageX,
                        pageY: event.pageY
                    };
                    type = "touchmove";
            break;
            case "mouseup":
                    event.touches = [];
                    event.touches[0] = {
                        pageX: event.pageX,
                        pageY: event.pageY
                    };
                    type = "touchend";
            break;
        }

        // touchend clear the touches[0], so we need to use changedTouches[0]
        var coors;
        if(event.type === "touchend") {
            coors = {
                x: event.changedTouches[0].pageX,
                y: event.changedTouches[0].pageY
            };
        }
        else {
            // get the touch coordinates
            coors = {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            };
        }
        type = type || event.type
        // pass the coordinates to the appropriate handler
        drawer[type](coors);
    }

    // detect touch capabilities
    var touchAvailable = ('createTouch' in document) || ('ontouchstart' in window);

    // attach the touchstart, touchmove, touchend event listeners.
    if(touchAvailable){
        canvas.addEventListener('touchstart', draw, false);
        canvas.addEventListener('touchmove', draw, false);
        canvas.addEventListener('touchend', draw, false);
    }
    // attach the mousedown, mousemove, mouseup event listeners.
    else {
        canvas.addEventListener('mousedown', draw, false);
        canvas.addEventListener('mousemove', draw, false);
        canvas.addEventListener('mouseup', draw, false);
    }

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
            if (context.strokeStyle != pt.color && context.strokeStyle) {
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
        $("#btn-eraser").removeClass('toolSelected');
        interval = setInterval(undoLast, 50);
    }).bind('touchend', function(){
        clearInterval(interval);
    });

    //for mouse
    $("#btn-undo").mousedown(function () {
        $("#btn-eraser").removeClass('toolSelected');
        interval = setInterval(undoLast, 50);
    }).mouseup(function () {
        clearInterval(interval);
    });


    // prevent elastic scrolling
    document.body.addEventListener('touchmove',function(event){
      event.preventDefault();
    },false);	// end body:touchmove