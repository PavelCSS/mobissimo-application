function uploadPhoto(imageURI, name) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.title = name;
//    params.hashTags = hashTags;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://54.165.42.238:5000/upload", successUpload, failUpload, options);
}

function successUpload(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    console.log(r.response);
    onBack(0);
    hideLoading();
}

function failUpload(error) {
    console.log("An error has occurred: Code = " + error.code);
}