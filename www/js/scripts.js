var backLinks = [], currentImage;

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBack, false);

function onDeviceReady(){
    backLinks.push("parseTemplate(false, '_home.htm')");
    parseTemplate(false, '_home.htm');
    navigator.splashscreen.hide();

    $$('body').on('pinch', 'img', function(o) {
        console.log(o);
    });
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
            'href' : $(this).data('href'),
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
            'class' : 'fixed',
            'code' : '<button id="back" class="btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Mobbisimo gallery</button>'
        },
        'main'      : 'Loading',
        'footer'    : false
    };
    parseTemplate(gallery_data, '_page.htm', function(code){
        $('section').replaceWith(code);
        $.getJSON('http://192.168.1.143:3000/getjson', function(gall_list){
            showLoading();
            parseTemplate(gall_list, '_gallery list.htm', function(html){
                $('main').html(html);
                hideLoading();
            });
        });
    });
}

function _pageUpload(){
    backLinks.push("_pageUpload()");
    var upload_data = {
        'page-name' : 'upload',
        'header'    : {
            'class' : 'fixed',
            'code'  : '<button id="back" class="btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Add new image</button>'
        },
        'main'      :{
            'class' : '',
            'code'  : '<img id="preview" src="images/upload-image.png">'
        },
        'footer'    : {
            'class' : 'fixed t-column_2 m-column_2 text-center',
            'code'  : '<button id="take-photo" class="btn"><i class="icon-camera icon24"></i> Take photo</button>' +
                      '<button id="select-photo" class="btn"><i class="icon-pictures3 icon24"></i> Select photo</button>'
        }
    };
    parseTemplate(upload_data, '_page.htm');
}

function _pagePreview(){
    showLoading();
    backLinks.push("_pagePreview()");
    var upload_data = {
        'page-name' : 'preview',
        'header'    : {
            'class' : 'fixed',
            'code'  : '<button id="back" class="btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Edit image</button>'
        },

        'main'      : {
            'code' : '<img src="'+currentImage.href+'" alt="'+currentImage.title+'">'
        },
        'footer'    : {
            'class' : 'fixed t-column_2 m-column_2 text-center',
            'code'  : '<button id="edit-photo" class="btn icon-pencil3 outline-bg">Edit</button>'+
                      '<button id="save-photo" class="btn icon-cd outline-bg">Save</button>'
        }
    };
    parseTemplate(upload_data, '_page.htm');
    hideLoading();
}