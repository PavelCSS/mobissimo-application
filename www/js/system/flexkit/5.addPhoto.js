var typeAdd, callBack;
function addPhoto(type, source, callback){
    showLoading();
    type = (typeof type !== 'undefined' && type) ? 'DATA_URL' : 'FILE_URI';
    source = (typeof source !== 'undefined' && source) ? 'CAMERA' : 'PHOTOLIBRARY';
    callBack = (typeof callback == 'function') ? callback : '';
    typeAdd = type;
    navigator.camera.getPicture(onSuccessImage, onFailImage, {
        quality          : 80,
        encodingType     : 0,
        destinationType  : type=='DATA_URL' ? 0 : 1,
        sourceType       : source=='CAMERA' ? 1 : 0,
        mediaType        : 0
//        saveToPhotoAlbum : true
    });
}

function onSuccessImage(imageData){
    var url;
    if(typeAdd == 'DATA_URL'){
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