function uploadPhoto(imageURI, title, hashTags) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.title = title;
    params.hashTags = hashTags;

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://192.168.1.143:3000/upload", successUpload, failUpload, options);
}

function successUpload(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    console.log(r.response);
}

function failUpload(error) {
    console.log("An error has occurred: Code = " + error.code);
}