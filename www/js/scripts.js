var backLinks = [], currentImage;

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBack, false);

function onDeviceReady(){
    backLinks.push("parseTemplate(false, '_home.htm')");
    parseTemplate(false, '_home.htm');
}

function onBack(){
    var length = backLinks.length;
    eval('('+backLinks[length - 2]+')');
    backLinks = backLinks.slice(0, length - 1);
}

$('body')
    .on('tap', '#gallery', _pageGallery)
    .on('tap', '#upload-photo', _pageUpload)
    .on('tap', '#gallery-list a', function(){
        currentImage = {
            'href' : $(this).data('href'),
            'title' : $(this).attr('title')
        };
        _pagePreview();
    })
    .on('tap', '#take-photo', function(){
        addPhoto(true, true, function(url){
            var image = document.getElementById('preview');
            image.src = url;
            uploadPhoto(url);
        });
    })
    .on('tap', '#select-photo', function(){
        addPhoto(false, false, function(url){
            var image = document.getElementById('preview');
            image.src = url;
            uploadPhoto(url);
        });
    });

function _pageGallery() {
    backLinks.push("_pageGallery()");
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
                            title : 'Image first',
                            lan : '42',
                            lng : '85',
                            url : 'images/siq.jpg',
                            tags : 'image, tag, travel'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/carpathian.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'images/siq.jpg'
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
    backLinks.push("_pageUpload()");
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

function _pagePreview(){
    backLinks.push("_pagePreview()");
    var upload_data = {
        'page-name' : 'preview',
        'header'    : {
            'code' : currentImage.title
        },
        'main'      : {
            'code' : '<div><img src="' + currentImage.href + '" alt="' + currentImage.title + '"></div>'
        },
        'footer'    : {
            'class' : 't-column_2 m-column_2 text-center',
            'code' : '<button id="edit-photo" class="btn icon-pencil3">Edit</button>' +
                     '<button id="save-photo" class="btn icon-cd">Save</button>'
        }
    };
    parseTemplate(upload_data, '_page.htm');
}