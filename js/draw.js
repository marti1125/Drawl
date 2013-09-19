    // get the canvas element and its context
    var canvas = document.getElementById('sketchpad');
    var context = canvas.getContext('2d');

    
    // Colors
    $("#color-zero").click(function(){
      context.fillStyle = '#000000'; // black
      context.strokeStyle = '#000000'; // black
    });
    
    $("#color-one").click(function(){
      context.fillStyle = '#eb3524'; // red
      context.strokeStyle = '#eb3524'; // red
    });
    
    $("#color-two").click(function(){
      context.fillStyle = '#df4e32'; // o
      context.strokeStyle = '#df4e32'; // o
    });
    
    $("#color-three").click(function(){
      context.fillStyle = '#dfab30'; // y
      context.strokeStyle = '#dfab30'; // y
    });
    
    $("#color-four").click(function(){
      context.fillStyle = '#4abb86'; // g
      context.strokeStyle = '#4abb86'; // g
    });
    
    $("#color-five").click(function(){
      context.fillStyle = '#3498db'; // b
      context.strokeStyle = '#3498db'; // b
    });
    
    $("#color-six").click(function(){
      context.fillStyle = '#35489d'; // i
      context.strokeStyle = '#35489d'; // i
    });
    
    $("#color-seven").click(function(){
      context.fillStyle = '#852472'; // v
      context.strokeStyle = '#852472'; // v
    });

    
    // create a drawer which tracks touch movements
    var drawer = {
       isDrawing: false,
       touchstart: function(coors){
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