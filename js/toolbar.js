
    var newBrushOpacity = 1; // change this value on the slider

    // Pencil button
    $("#btn-pencil").click(function(){
      //highlight this button
      context.fillStyle = 'rgba(0,0,0,' + newBrushOpacity + ')'; // i
      context.strokeStyle = 'rgba(0,0,0,' + newBrushOpacity + ')'; // i
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

      // for 640x960 screensize
      if ($( window ).width() > 320 ) {
        if(i == 0 && n == 1) {
          //alert(i);
          i = 0;
          n = 0;
          $( "#colorpicker.toolbar" ).animate({
              bottom: "-340"
            }, 200);
        }
        if(i == 1 && n == 1) {
          i = 0;
          n = 0;
          $( "#colorpicker.toolbar" ).animate({
              bottom: "-340"
            }, 200);
        }
        if(i == 0 || n == 1) {
          i = 1;
          $( "#colorpicker.toolbar" ).animate({
              bottom: "95"
            }, 200);
          $( "#brushsize.toolbar" ).animate({
              bottom: "-300"
            }, 200);
        } else {
          //alert(i);
          i = 0;
          $( "#colorpicker.toolbar" ).animate({
              bottom: "-340"
            }, 200);
        }
      } else {
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

      }
    });

    // toggle the brushsize btn
    var n = 0;
    $("#btn-brushsize").on('click', function(){

      // for 640x960 screensize
      if ($( window ).width() > 320 ) {
        if(i == 1 && n == 0) {
          //alert(i);
          i = 0;
          n = 0;
          $( "#brushsize.toolbar" ).animate({
              bottom: "-300"
            }, 200);
        }
        if(i == 1 && n == 1) {
          //alert(i);
          i = 0;
          n = 0;
          $( "#brushsize.toolbar" ).animate({
              bottom: "-300"
            }, 200);
        }
        if(n == 0 || i == 1) {
          n = 1;
          //alert("test");
          $( "#brushsize.toolbar" ).animate({
              bottom: "95"
            }, 200);
          $( "#colorpicker.toolbar" ).animate({
              bottom: "-340"
            }, 200);
        } else {
          n = 0;
          $( "#brushsize.toolbar" ).animate({
              bottom: "-300"
            }, 200);
        }
      } else {
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
      }
    });

    // Done button
    $("#btn-done").click(function(){

      $("#container").append('<div class="overlay" style="position: absolute; top: 0; left: 0; background: rgba(0,0,0,0.5); width: 100%; height: 100%"></div');

      if (isMobile.iOS()) {
        var canvas = document.getElementById("sketchpad"); // get the canvas
        var image = canvas.toDataURL("image/png"); // convert canvas to an image, .png
        var ajax = new XMLHttpRequest();

        var PageToSendTo = "script.php?";
  			var VariablePlaceholder = "variableName=";
  			var randomVariable = Math.ceil(Math.random() * 100);
  			var UrlToSend = PageToSendTo + VariablePlaceholder + randomVariable;

        ajax.open("POST",UrlToSend,true);
        ajax.setRequestHeader('Content-Type', 'application/upload');
        ajax.onreadystatechange=function() {
          if (ajax.readyState == 4) {
          			$("#btn-save").attr("href","images/"+ randomVariable + "-image.png");
          		}
        }
        ajax.send(image);
      }

      $( "#done-panel" ).animate({
          bottom: "-20"
        }, 200);
    })
    // Cancel button
    $("#btn-cancel").click(function(){
      $(".overlay").remove();

      if ($( window ).width() > 320 ) {
        $( "#done-panel" ).animate({
            bottom: "-340"
        }, 200);
      } else {
        $( "#done-panel" ).animate({
            bottom: "-240"
        }, 200);
      }
    })
    // Clear drawing
    $('#btn-new').click(function(){
      navigator.vibrate(100);
      canvas.width = canvas.width;
      $(".overlay").remove();
      if ($( window ).width() > 320 ) {
        $( "#done-panel" ).animate({
            bottom: "-340"
        }, 200);
      } else {
        $( "#done-panel" ).animate({
            bottom: "-240"
        }, 200);
      }
    });

		$("#addDrawing").click(function(){
		    navigator.vibrate(200);
		    // unplug device to test
	      //addDrawing();
	      $(".overlay").remove();
        if ($( window ).width() > 320 ) {
          $( "#done-panel" ).animate({
              bottom: "-340"
          }, 200);
        } else {
          $( "#done-panel" ).animate({
              bottom: "-240"
          }, 200);
        }
		});

		// undo button


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
