var backLinks = [], currentImage;

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBack, false);
$(function(){
    onDeviceReady();
});

function onDeviceReady(){
    backLinks.push("parseTemplate(false, '_home.htm')");

    // see console output for debug info
    ImgCache.options.debug = true;
    ImgCache.options.usePersistentCache = true;
    ImgCache.options.localCacheFolder = 'mobissimoCache';
    ImgCache.init();

    parseTemplate(false, '_home.htm');

//    navigator.splashscreen.hide();
}

function onBack(){
    var length = backLinks.length;
    eval('('+backLinks[length - 2]+')');
    backLinks = backLinks.slice(0, length - 1);
}

$('body')
    .on('tap', '#back', onBack)
    .on('tap', '#gallery', _pageGallery)
    .on('tap', '#upload-photo', _pageUpload)
    .on('tap', '#gallery-list a', function(){
        currentImage = {
            'href' : $('img', this).attr('src'),
            'title' : $(this).attr('title')
        };
        _pagePreview();
    })
    .on('tap', '#take-photo', function(){
        addPhoto(1, 1, function(url){
            editPhoto(url);
        });
    })
    .on('tap', '#select-photo', function(){
        addPhoto(1, 0, function(url){
            editPhoto(url);
        });
    })
    .on('tap', '#save-photo', function(){
        uploadPhoto(currentImage.href);
    });

function editPhoto(url){
    var image = document.getElementById('preview');
    image.src = url;
    currentImage = {
        'href' : url,
        'title' : ''
    };
    _pagePreview();
}

function _pageGallery(){
    backLinks.push("_pageGallery()");
    var gallery_data = {
        'page-name' : 'gallery',
        'header'    : {
            'code' : '<button id="back" class="btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Mobbisimo gallery</button>'
        },
        'main'      : 'Loading',
        'footer'    : false
    };
    parseTemplate(gallery_data, '_page.htm', function(code){
        $('section').replaceWith(code);
        //                $.getJSON('http://192.168.1.143:3000/getjson', function(gall_list){
        var gall_list = {};
        parseTemplate(gall_list, '_gallery list.htm', function(html){
            $('main').html(html);
            caching();
        });
        //                });
    });
}

function _pageUpload(){
    backLinks.push("_pageUpload()");
    var upload_data = {
        'page-name' : 'upload',
        'header'    : {
            'code' : '<button id="back" class="btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Add new image</button>'
        },
        'main'      :{
            'class' : '',
            'code'  : '<img id="preview" src="images/upload-image.png">'
        },
        'footer'    : {
            'class' : 't-column_2 m-column_2 text-center mt30px mb30px',
            'code'  :
                '<span>' +
                    '<button id="take-photo" class="btn fs48 rounded icon icon-camera outline-bg">Gallery</button>' +
                    '<span class="block">Take photo</span>' +
                '</span>' +
                '<span>' +
                    '<button id="select-photo" class="btn fs48 rounded icon icon-pictures3 outline-bg">Select photo</button>' +
                    '<span class="block">Select photo</span>' +
                '</span>'
        }
    };
    parseTemplate(upload_data, '_page.htm');
}

function _pagePreview(){
    backLinks.push("_pagePreview()");
    console.log(currentImage.href);
    var upload_data = {
        'page-name' : 'preview',
        'header'    : {
            'code' : '<button id="back" class="btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Edit image</button>'
        },
        'main'      : {
            'code' : '<div><img src="' + currentImage.href + '" alt="' + currentImage.title + '"></div>'
        },
        'footer'    : {
            'class' : 't-column_2 m-column_2 text-center',
            'code'  : '<button id="edit-photo" class="btn icon-pencil3">Edit</button>' +
                      '<button id="save-photo" class="btn icon-cd">Save</button>'
        }
    };
    parseTemplate(upload_data, '_page.htm');
}

function caching() {
    var imgLoad = imagesLoaded('body');
    imgLoad.on('progress', function() {

        // detect which image is broken
        for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
            var image = imgLoad.images[i],
                imageTarget = $(image.img),
                imageSrc = image.img.src;

            // 1. cache images
            if (image.isLoaded) {
                ImgCache.isCached(imageSrc, function(path, success){
                    console.log(success)
                    if(success){
                        // already cached
                        ImgCache.useCachedFile(imageTarget);
                    } else {
                        console.log(imageSrc)
                        // not there, need to cache the image
                        ImgCache.cacheFile(imageSrc, function(){
                            ImgCache.useCachedFile(imageTarget);
                        });
                    }
                });
            }
            // 2. broken images get replaced
            if (!image.isLoaded) {
                ImgCache.useCachedFile(image.img.src);
            }
        }
    }).on( 'fail', function( instance ) {
        console.log('FAIL - all images loaded, at least one is broken');
    }).on( 'done', function( instance, image ) {
        console.log('DONE  - all images have been successfully loaded');
    });
}