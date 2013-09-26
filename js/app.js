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
      
      // don't test on simulator, doesnt work.   and need to unplug the device to acutally test
      var maincanvas = document.getElementById("sketchpad"); // get the canvas
      var canvasurl = maincanvas.toDataURL();
      
		  var pictures = navigator.getDeviceStorage("pictures");
      var photofile   = new Blob(canvasurl, {type: "image/png"});
      var mainphoto = pictures.addNamed(photofile, "my-drawing.png");

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