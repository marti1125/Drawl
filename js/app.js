function listContents(storagename) {
	   
			//Clear up the list first
			$('#results').html("");
		  var files = navigator.getDeviceStorage(storagename);

			var cursor = files.enumerate();

			cursor.onsuccess = function () {
			  //alert("Got something");
			  var file = this.result;
			  if (file != null) {
  			   var imageElement = $('<img height="100" width="75">');
			   imageElement.attr('src', window.URL.createObjectURL(file));
			    $("<p>" + file.name + "," + file.lastModifiedDate + "," + file.type + "," + file.size  + "</p>").appendTo('#results');
				imageElement.appendTo("#results");
			    this.done = false;
			  }
			  else {
			    this.done = true;
			  }

			  if (!this.done) {
				this.continue();
			  }
			}
}

function addTextFile() {
		  var sdcard = navigator.getDeviceStorage("sdcard");
      var file   = new Blob(["This is a text file."], {type: "text/plain"});
      var request = sdcard.addNamed(file, "my-file2.txt");
      request.onsuccess = function () {
        var name = this.result;
        alert('File "' + name + '" successfully wrote on the sdcard storage area');
      }
}

function addDrawing() {
      var pictures = navigator.getDeviceStorage("pictures");
      // don't test on simulator, doesnt work.   and need to unplug the device to acutally test
      var maincanvas = document.getElementById("sketchpad"); // get the canvas
      //var dataURL = maincanvas.toDataURL();

      //var canvas = document.createElement("canvas");
      //canvas.width = canvas.height = 600;

      //canvas.getContext("2d").fillRect(20, 20, 20, 20);

      var dataURL = maincanvas.toDataURL( "image/png" );
      var data = atob( dataURL.substring( "data:image/png;base64,".length ) ),
          asArray = new Uint8Array(data.length);

      for( var i = 0, len = data.length; i < len; ++i ) {
          asArray[i] = data.charCodeAt(i);    
      }

		  //var pictures = navigator.getDeviceStorage("pictures");
      var photofile   = new Blob( [ asArray.buffer ], {type: "image/png"} );
      
      var mainphoto = pictures.addNamed(photofile, "my-drawings6.png");

      request.onsuccess = function () {
        var nameofimage = this.mainphoto;
        alert('File "' + nameofimage + '" successfully wrote on the pictures');
      }
}

$(document).ready(function(){

	  $("#browseSDCard").click(function(){
	      listContents('sdcard');
		});
	  $("#browsePictures").click(function(){
	      listContents('pictures');
		});
		$("#addTextFile").click(function(){
		    // unplug device to test
	      addTextFile();
		});
		$("#addDrawing").click(function(){
		    // unplug device to test
	      addDrawing();
		});
	   
});