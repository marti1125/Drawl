    // Pencil button
    $("#btn-pencil").click(function(){
      //highlight this button   
      context.fillStyle = '#000'; // i
      context.strokeStyle = '#000'; // i
      context.lineWidth = 1;
    })
    
    //Eraser button
    $("#btn-eraser").click(function(){
      context.fillStyle = '#fff'; // i
      context.strokeStyle = '#fff'; // i
      context.lineWidth = 10;
    })

    // toggle the color picker btn
    var i = 0;
    $("#btn-colorpicker").on('click', function(){
      if(i == 0 && n == 1) {
        //alert(i);
        i = 0;
        n = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-240"
          }, 200);
      }
      if(i == 1 && n == 1) {
        i = 0;
        n = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-240"
          }, 200);
      }
      if(i == 0 || n == 1) {
        i = 1;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "64"
          }, 200);
        $( "#brushsize.toolbar" ).animate({
            bottom: "-200"
          }, 200);
      } else {
        //alert(i);
        i = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-240"
          }, 200);
      }
    });

    // toggle the brushsize btn
    var n = 0;
    $("#btn-brushsize").on('click', function(){
      if(i == 1 && n == 0) {
        //alert(i);
        i = 0;
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "-200"
          }, 200);
      }
      if(i == 1 && n == 1) {
        //alert(i);
        i = 0;
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "-200"
          }, 200);
      }
      if(n == 0 || i == 1) {
        n = 1;
        //alert("test");
        $( "#brushsize.toolbar" ).animate({
            bottom: "64"
          }, 200);
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-240"
          }, 200);
      } else {
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "-200"
          }, 200);
      }
    });

    // Done button
    $("#btn-done").click(function(){
      $( "#done-panel" ).animate({
          bottom: "-20"
        }, 200);
    })
    // Cancel button
    $("#btn-cancel").click(function(){
      $( "#done-panel" ).animate({
          bottom: "-240"
        }, 200);
      navigator.vibrate(1000);
    })
    // Clear drawing
    $('#btn-new').click(function(){
      canvas.width = canvas.width;
      $( "#done-panel" ).animate({
          bottom: "-240"
        }, 200);
    });

    
    // Save drawing
    //$('#btn-save').click(function(){
      //alert("save");
      //var canvas = document.getElementById("sketchpad"); // get the canvas
      //var image = canvas.toDataURL("image/png"); // convert canvas to an image, .png
      //window.open(image);
      
      //if(isMobile.iOS()) {
        //send the image to a server
        //window.open(image); // open the png in a new window with a hash
      //} else {
        //window.open(image); // open the png in a new window with a hash
      //}
      //window.open('url', 'window name', 'window settings')
      //window.open('http://www.google.com');
      //document.getElementById("btn-save").href = canvas.toDataURL("image/png");
      //document.getElementById("btn-save").href = canvas.toDataURL("image/png");
      
      //open up modal with the canvas on it
      //window.open(canvas.toDataURL("image/png"));
      //$(w.document.body).html(canvas.toDataURL("image/png"));
      //$( "#done-panel" ).animate({
          //bottom: "-240"
        //}, 200);
    //});
    