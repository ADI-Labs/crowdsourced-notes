
var filesUpload = null;
var file = null;
var socket = io.connect('http://localhost:3000');
var send = false;


if (window.File && window.FileReader && window.FileList) {
    //HTML5 File API ready
    init();
} else {
    //browser has no support for HTML5 File API
    //send a error message or something like that
    //TODO
}

/**
 * Initialize the listeners and send the file if have.
 */
function init() {
	window.onload = function() {
		console.log(document.getElementById('title'));
    	filesUpload = document.getElementById('input-files');
    	filesUpload.addEventListener('change', fileHandler, false);		
	}

}

/**
 * Handle the file change event to send it content.
 * @param e
 */
function fileHandler(e) {
    var files = e.target.files || e.dataTransfer.files;

    if (files) {
        //send only the first one
        file = files[0];
    }
}

function sendFile() {
    if (file) {
        //read the file content and prepare to send it
        var reader = new FileReader();

        reader.onload = function(e) {
            console.log('Sending file...');
            //get all content
            var buffer = e.target.result;
            //send the content via socket
            socket.emit('create', {post: {title: 'Example', content: file.name, isImage: true}}, buffer);
        };
        reader.readAsBinaryString(file);
    }
}


//socket.emit('create', {post: {title: 'Something', content: 'Notes Notes Notes'}});

/*var socket = io.connect('http://localhost:3000');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

socket.emit('create', {post: {title: 'Something', content: 'Notes Notes Notes'}});*/

