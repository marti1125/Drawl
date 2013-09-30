    // Square Brush
    $("#squarebrush").click(function(){
      context.lineCap = 'square';
    });

    // Round Brush
    $("#roundbrush").click(function(){
      context.lineCap = 'round';
    });

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

    var firstTimeUse = 0;

    // create a drawer which tracks touch movements
    var drawer = {
       isDrawing: false,
       touchstart: function(coors){

          firstTimeUse ++;

          //remove div, for first time use
          if(firstTimeUse == 1){
            $("#startup").remove();
            context.fillStyle = 'rgba(0,0,0,0.1)'; // black
            context.strokeStyle = 'rgba(0,0,0,0.1)'; // black
          }

          context.beginPath();
          context.moveTo(coors.x, coors.y);
          this.isDrawing = true;
       },
       touchmove: function(coors){
          if (this.isDrawing) {
             context.lineTo(coors.x, coors.y);
             context.stroke();
          }
       },
       touchend: function(coors){
          if (this.isDrawing) {
             this.touchmove(coors);
             this.isDrawing = false;
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

    // prevent elastic scrolling
    document.body.addEventListener('touchmove',function(event){
      event.preventDefault();
    },false);	// end body:touchmove