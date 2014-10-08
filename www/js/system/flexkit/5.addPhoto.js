var typeAdd, callBack;
function addPhoto(type, source, callback){
    showLoading();
    callBack = (typeof callback == 'function') ? callback : '';
    typeAdd = type;
    navigator.camera.getPicture(onSuccessImage, onFailImage, {
        quality          : 80,
        encodingType     : 0,
        destinationType  : type,
        sourceType       : source,
        mediaType        : 0
//        saveToPhotoAlbum : true
    });
}

function onSuccessImage(imageData){
    var url;
    if(!typeAdd){
        url = "data:image/jpeg;base64,"+imageData;
    }else{
        url = imageData;
    }
    hideLoading();
    callBack(url);
}

function onFailImage(message){
    hideLoading();
    console.log('Failed because: '+message);
}