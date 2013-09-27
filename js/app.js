//Saving image to FFOS

var count = 0; 

function addDrawing() {
  
      //based on this:
      //http://stackoverflow.com/questions/17332071/trying-to-save-canvas-png-data-url-to-disk-with-html5-filesystem-but-when-i-ret
      //https://developer.mozilla.org/en-US/docs/WebAPI/Device_Storage#Add_a_file
    
      count++;
  
      var pictures = navigator.getDeviceStorage("pictures");
      // don't test on simulator, doesnt work.   and need to unplug the device to acutally test
      var maincanvas = document.getElementById("sketchpad"); // get the canvas
      var dataURL = maincanvas.toDataURL( "image/png" );
      var data = atob( dataURL.substring( "data:image/png;base64,".length ) ),
          asArray = new Uint8Array(data.length);

      for( var i = 0, len = data.length; i < len; ++i ) {
          asArray[i] = data.charCodeAt(i);    
      }

      var photofile   = new Blob( [ asArray.buffer ], {type: "image/png"} );
      var mainphoto = pictures.addNamed(photofile, "DCIM/MISC/my-drawings" + count + ".png");
      alert(count);
      request.onsuccess = function () {
        var nameofimage = this.mainphoto;
        alert('File "' + nameofimage + '" successfully wrote on the pictures');
      }
}

$(document).ready(function(){

		$("#addDrawing").click(function(){
		    // unplug device to test
	      addDrawing();
	      $( "#done-panel" ).animate({
          bottom: "-20"
        }, 200);
		});
	   
});