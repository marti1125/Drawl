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
            bottom: "-40"
          }, 300);
      }
      if(i == 1 && n == 1) {
        i = 0;
        n = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-40"
          }, 300);
      }
      if(i == 0 || n == 1) {
        i = 1;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "64"
          }, 300);
        $( "#brushsize.toolbar" ).animate({
            bottom: "0"
          }, 300);
      } else {
        //alert(i);
        i = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-40"
          }, 300);
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
            bottom: "0"
          }, 300);
      }
      if(i == 1 && n == 1) {
        //alert(i);
        i = 0;
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "0"
          }, 300);
      }
      if(n == 0 || i == 1) {
        n = 1;
        $( "#brushsize.toolbar" ).animate({
            bottom: "64"
          }, 300);
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-40"
          }, 300);
      } else {
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "0"
          }, 300);
      }
    });

    // Done button
    $("#btn-done").click(function(){
      $( "#done-panel" ).animate({
          bottom: "-20"
        }, 300);
    })
    // Cancel button
    $("#btn-cancel").click(function(){
      $( "#done-panel" ).animate({
          bottom: "-240"
        }, 300);
    })
    // Clear drawing
    $('#btn-new').click(function(){
      canvas.width = canvas.width;
      $( "#done-panel" ).animate({
          bottom: "-240"
        }, 300);
    });
    // Save drawing
    $('#btn-save').click(function(){
      var canvas = document.getElementById("sketchpad");
      window.open(canvas.toDataURL("image/png"));
      $( "#done-panel" ).animate({
          bottom: "-240"
        }, 300);
    });
    