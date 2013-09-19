    // Pencil button
    $("#btn-pencil").click(function(){
      //highlight this button   
      context.fillStyle = '#000'; // i
      context.strokeStyle = '#000'; // i
      context.lineWidth = 1;
    })

    // toggle the color picker
    var i = 0;
    $("#btn-colorpicker").on('click', function(){
      if(i == 0 && n == 1) {
        //alert(i);
        i = 0;
        n = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-40"
          }, 500);
      }
      if(i == 1 && n == 1) {
        i = 0;
        n = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-40"
          }, 500);
      }
      if(i == 0 || n == 1) {
        i = 1;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "64"
          }, 500);
        $( "#brushsize.toolbar" ).animate({
            bottom: "0"
          }, 500);
      } else {
        //alert(i);
        i = 0;
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-40"
          }, 500);
      }
    });

    //Eraser button
    $("#btn-eraser").click(function(){
      context.fillStyle = '#fff'; // i
      context.strokeStyle = '#fff'; // i
      context.lineWidth = 10;
    })

    // toggle the brushsize
    var n = 0;
    $("#btn-brushsize").on('click', function(){
      if(i == 1 && n == 0) {
        //alert(i);
        i = 0;
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "0"
          }, 500);
      }
      if(i == 1 && n == 1) {
        //alert(i);
        i = 0;
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "0"
          }, 500);
      }
      if(n == 0 || i == 1) {
        n = 1;
        $( "#brushsize.toolbar" ).animate({
            bottom: "64"
          }, 500);
        $( "#colorpicker.toolbar" ).animate({
            bottom: "-40"
          }, 500);
      } else {
        n = 0;
        $( "#brushsize.toolbar" ).animate({
            bottom: "0"
          }, 500);
      }
    });

    // Done button
    $("#btn-done").click(function(){
      alert("save");
    })