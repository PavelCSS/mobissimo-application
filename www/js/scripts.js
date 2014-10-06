var backLinks = [];

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBack, false);

function onDeviceReady(){
    parseTemplate(false, '_home.htm');
}

function onBack(){
    parseTemplate(false, '_home.htm');
}

$('body')
    .on('tap', '#gallery', _pageGallery)
    .on('tap', '#upload-photo', _pageUpload)
    .on('tap', '#take-photo', function(){
        addPhoto(true, true, function(url){
            var image = document.getElementById('preview');
            image.src = url;
        });
    }).on('tap', '#select-photo', function(){
        addPhoto(false, false, function(url){
            var image = document.getElementById('preview');
            image.src = url;
            window.resolveLocalFileSystemURL(url,
                function(entry) {
                    alert(entry);
                    entry.file(function(file) {
                        alert(file);
                        EXIF.getData(file, function() {
                            var datetime = EXIF.getTag(this, "DateTimeOriginal");
                            alert(datetime);
                        });

                        // do something useful....

                    }, standardErrorHandler);
                },
                function(e) {
                    alert('Unexpected error obtaining image file.');
                    standardErrorHandler(e);
                });
        });
    });

function _pageGallery() {
    var gallery_data = {
        'page-name' : 'gallery',
        'header': {
            'code': 'Mobbisimo gallery'
        },
        'main' :{
            'code': function(){
                var gall_list = {
                    'images' : [
                        {
                            title : 'dfdfds',
                            lan : '42',
                            lng : '85',
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        },
                        {
                            url : 'images/siq-2986_1280.jpg'
                        }
                    ]
                };
                parseTemplate(gall_list, '_gallery list.htm', 'main', false);
            }
        },
        'footer   ': false
    };
    parseTemplate(gallery_data, '_page.htm');
}

function _pageUpload(){
    var upload_data = {
        'page-name' : 'upload',
        'header': false,
        'main' :{
            'class' : '',
            'code': '<img id="preview" class="img-polaroid" src="images/upload-image.png">'
        },
        'footer': {
            'class' : 't-column_2 m-column_2 text-center mt30px mb30px',
            'code':
                '<span>' +
                    '<button id="take-photo" class="btn fs48 rounded icon icon-camera outline-bg">Gallery</button>' +
                    '<span class="block">Take photo</span>' +
                    '</span>' +
                    '<span>' +
                    '<button id="select-photo" class="btn fs48 rounded icon icon-pictures3 outline-bg">Upload</button>' +
                    '<span class="block">Select photo</span>' +
                    '</span>'
        }
    };
    parseTemplate(upload_data, '_page.htm');
}