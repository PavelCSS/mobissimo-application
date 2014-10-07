var typeAdd, callBack;
function addPhoto(type, source, callback){
    showLoading();
    type = (typeof type !== 'undefined' && type) ? 'DATA_URL' : 'FILE_URL';
    source = (typeof source !== 'undefined' && source) ? 'CAMERA' : 'PHOTOLIBRARY';
    callBack = (typeof callback == 'function') ? callback : '';
    typeAdd = type;
    navigator.camera.getPicture(onSuccessImage, onFailImage, {
        quality         : 80,
        destinationType : type == 'DATA_URL' ? Camera.DestinationType.DATA_URL : Camera.DestinationType.FILE_URL,
        sourceType      : source == 'CAMERA' ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType       : Camera.MediaType.PICTURE
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