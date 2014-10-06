var typeAdd;
function addPhoto(type, source){
    type = (typeof type !== 'undefined' && type) ? 'DATA_URL' : 'FILE_URL';
    source = (typeof source !== 'undefined' && source) ? 'CAMERA' : 'PHOTOLIBRARY';
    typeAdd = type;
    $('html').addClass('loading');
    navigator.camera.getPicture(onSuccessImage, onFailImage, {
        quality         : 80,
        destinationType : type == 'DATA_URL' ? Camera.DestinationType.DATA_URL : Camera.DestinationType.FILE_URL,
        sourceType      : source == 'CAMERA' ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType       : Camera.MediaType.PICTURE
    });
}

function onSuccessImage(imageData){
    var image = document.getElementById('preview');
    if(typeAdd == 'DATA_URL'){
        image.src = "data:image/jpeg;base64,"+imageData;
    }else{
        image.src = imageData;
    }
    $('html').removeClass('loading');
}

function onFailImage(message){
    $('html').removeClass('loading');
    console.log('Failed because: '+message);
}