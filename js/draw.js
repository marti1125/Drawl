    // Square Brush
    $("#squarebrush").click(function(){
      tmp_ctx.lineCap = 'square';
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

    var sketch = document.querySelector('#top');
    var sketch_style = getComputedStyle(sketch);

    // temporal canvas
    var tmp_canvas = document.createElement('canvas');
    var tmp_ctx = tmp_canvas.getContext('2d');
    tmp_canvas.id = 'tmp_canvas';
    tmp_canvas.width = canvas.width;
    tmp_canvas.height = canvas.height;
    
    sketch.appendChild(tmp_canvas);

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
    var coors;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.brushColor = '#000000'
    tmp_ctx.brushSize = 1;
    //for small screensize
    $("#sketchpad").css("background-image","url('../images/btns/startup-image.png')")
                   .css("background-position","center center")
                   .css("background-repeat","no-repeat")
                   .css("background-size","30%")

    var firstTimeUse = 0;

    // create a drawer which tracks touch movements
    var drawer = {
       //isDrawing: false,
       touchstart: function(e){
          tmp_canvas.addEventListener('touchmove', onPaint, false);
          firstTimeUse ++;
          if(firstTimeUse == 1){
            $("#sketchpad").css("background-image","none")
            //context.fillStyle = 'rgba(0,0,0,1)'; // black
            //context.strokeStyle = 'rgba(0,0,0,1)'; // black
          }

          if (tmp_ctx.lineWidth != brushSize) {
              tmp_ctx.lineWidth = brushSize;
          }
          // causes the eraser to get messed up, if the current brush color doesnt equal the brush color set, then reset it
          if (tmp_ctx.strokeStyle != brushColor) {
              tmp_ctx.strokeStyle = brushColor;
          }
          /*

          //remove div, for first time use
          
*/
          //tmp_ctx.beginPath();
          //tmp_ctx.moveTo(coors.x, coors.y);
          /*points.push({
              x: coors.x,
              y: coors.y
              //size: brushSize,
              //color: brushColor
              //mode: "begin"
          });*/
          //startDraw = true;
         // onPaint();
          //this.isDrawing = true;

          coors.x = typeof e.touches[0].offsetX !== 'undefined' ? e.touches[0].offsetX : e.touches[0].pageX;
          coors.y = typeof e.touches[0].offsetY !== 'undefined' ? e.touches[0].offsetY : e.touches[0].pageY;

          points.push({x: coors.x, y: coors.y});

          onPaint();

         
       },
       touchmove: function(e){
          //if (this.isDrawing) {
             //tmp_ctx.lineTo(coors.x, coors.y);
             // command pattern stuff
             /*points.push({
                 x: coors.x,
                 y: coors.y
                 //size: brushSize,
                 //color: brushColor
                 //mode: "draw"
             });
             tmp_ctx.stroke();
             startDraw = true;
             onPaint();*/

          //}
          coors.x = typeof e.touches[0].offsetX !== 'undefined' ? e.touches[0].offsetX : e.touches[0].pageX;
          coors.y = typeof e.touches[0].offsetY !== 'undefined' ? e.touches[0].offsetY : e.touches[0].pageY;

       },
       touchend: function(coors){       
         // if (this.isDrawing) { 
         tmp_canvas.removeEventListener('touchmove', onPaint, false);
    //console.log('start!! 33333')
    // Writing down to real canvas now
    context.drawImage(tmp_canvas, 0, 0);
    // Clearing tmp canvas
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    // Emptying up Pencil Points
    points = [];    
        // tmp_canvas.removeEventListener('mousemove', onPaint, false);       
             /*startDraw = false;
              onPaint();
              console.log(coors.x)
             points.push({
                 x: coors.x,
                 y: coors.y
                 //size: brushSize,
                 //color: brushColor
                 //mode: "end"
             });*/
           
             //this.touchmove(coors);
             //this.isDrawing = false;             
             
             
             //onPaint();       
         // }
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
        tmp_canvas.addEventListener('touchstart', draw, false);
        tmp_canvas.addEventListener('touchmove', draw, false);
        tmp_canvas.addEventListener('touchend', draw, false);
    }
    // attach the mousedown, mousemove, mouseup event listeners.
    else {
        tmp_canvas.addEventListener('mousedown', draw, false);
        tmp_canvas.addEventListener('mousemove', draw, false);
        tmp_canvas.addEventListener('mouseup', draw, false);
    }

    function redrawAll() {
        
        if (points.length == 0) {
            return;
        }

        context.drawImage(tmp_canvas, 0, 0);

        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

        for (var i = 0; i < points.length; i++) {
            console.log('fff222')
            var pt = points[i];

            var begin = false;

            // check to see if the brush size that was stored equals the current strokesize, if not, then set to brushsize up top
            if (tmp_ctx.lineWidth != pt.size) {
                tmp_ctx.lineWidth = pt.size;
                begin = true;
            }
            if (tmp_ctx.strokeStyle != pt.color && tmp_ctx.strokeStyle) {
                tmp_ctx.strokeStyle = pt.color;
                begin = true;
            }
            if (pt.mode == "begin" || begin) {
                tmp_ctx.beginPath();
                tmp_ctx.moveTo(pt.x, pt.y);
            }
            tmp_ctx.lineTo(pt.x, pt.y);
            if (pt.mode == "end" || (i == points.length - 1)) {
                tmp_ctx.stroke();
            }
        }
        tmp_ctx.stroke();
    }

    
    function undoLast() {
        
        points.pop();
        //redrawAll();
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

    var onPaint = function() {
      
      //if(startDraw){
        // Saving all the points in an array
      points.push({x: coors.x, y: coors.y});
      //alert(coors.x)

      if (points.length < 3) {
        var b = points[0];
        tmp_ctx.beginPath();
        //ctx.moveTo(b.x, b.y);
        //ctx.lineTo(b.x+50, b.y+50);
        tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
        tmp_ctx.fill();
        tmp_ctx.closePath();
        
        return;
      }
      
      // Tmp canvas is always cleared up before drawing.
      tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
      
      tmp_ctx.beginPath();
      tmp_ctx.moveTo(points[0].x, points[0].y);
      
      for (var i = 1; i < points.length - 2; i++) {
        var c = (points[i].x + points[i + 1].x) / 2;
        var d = (points[i].y + points[i + 1].y) / 2;
        
        tmp_ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
      }
      
      // For the last 2 points
      tmp_ctx.quadraticCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
      );
      tmp_ctx.stroke();  
      
      
    };