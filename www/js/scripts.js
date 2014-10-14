var backLinks = [], currentImage;

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBack, false);
$(function(){
    onDeviceReady();
});

function onDeviceReady(){
    backLinks.push("parseTemplate(false, '_home.htm')");
    parseTemplate(false, '_home.htm');
    navigator.splashscreen.hide();
}

function onBack(index){
    var length = backLinks.length;
    index = (typeof index == 'undefined') ? index : length - 2;
    eval('('+backLinks[index]+')');
    backLinks = backLinks.slice(0, index + 1);
}

$('body')
    .on('tap', '.back', onBack)
    .on('tap', '#gallery', _pageGallery)
    .on('tap', '#upload-photo', _pageUpload)
    .on('tap', '#gallery-list a', function(){
//        currentImage = {
//            'href'  : $(this).data('href'),
//            'title' : $(this).attr('title'),
//            'info'  : $(this).parent().find('table.image-info').html()
//        };
//        _pagePreview();
        window.open($(this).data('url'), '_system');
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
        var title = $('input.title').val();
        uploadPhoto(currentImage.href, title);
    })
    .on('tap', '#page-preview', function(){
        $(this).toggleClass('imgShow');
    });

function editPhoto(url){
    var image = document.getElementById('preview');
    image.src = url;

    currentImage = {
        'href'  : url,
        'title' : '',
        'info'  : ''
    };

    $('footer').html(
        '<input type="text" class="title" placeholder="Please enter name photo">' +
        '<div class="column_2 t-column_2 m-column_2 mt10px">' +
            '<button id="edit-photo" class="back btn outline-bg"><i class="icon-cancel icon24"></i> Cancel</button>'+
            '<button id="save-photo" class="btn outline"><i class="icon-cd icon24"></i> Save</button>' +
        '</div>'
    );
}

function _pageGallery(){
    showLoading();
    backLinks.push("_pageGallery()");
    var gallery_data = {
        'page-name' : 'gallery',
        'header'    : {
            'class' : 'fixed',
            'code' : '<button class="back btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Mobbisimo gallery</button>'
        },
        'main'      : {
            'class' : 'mh'
        },
        'footer'    : false
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude;

        parseTemplate(gallery_data, '_page.htm', function(code){
            $('section').replaceWith(code);
            $.ajax({
                dataType : 'jsonp',
                data     : {
                    'lat' : latitude,
                    'lng' : longitude
                },
                url      : 'http://192.168.1.143:3000/getbestpricelist',
                success  : function(gall_list){
                    showLoading();
                    parseTemplate(gall_list, '_gallery list.htm', function(html){
                        $('main').html(html);
                        hideLoading();
                    });
                },
                error    : function(data){
                    console.log(data)
                }
            });
        });
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}

function _pageUpload(){
    backLinks.push("_pageUpload()");
    var upload_data = {
        'page-name' : 'upload',
        'header'    : {
            'class' : 'fixed',
            'code'  : '<button class="back btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> Add new image</button>'
        },
        'main'      :{
            'class' : 'text-center mh',
            'code'  : '<img id="preview" src="images/upload-image.png">'
        },
        'footer'    : {
//            'class' : 'fixed text-center',
            'class' : 'fixed text-center',
            'code'  : '<div class="column_2 t-column_2 m-column_2">' +
                          '<button id="take-photo" class="btn"><i class="icon-camera icon24"></i> Take photo</button>' +
                          '<button id="select-photo" class="btn"><i class="icon-pictures3 icon24"></i> Select photo</button>' +
                      '</div>'
//            'code'  : '<form id="upload-form" action="http://54.165.42.238:5000/upload" class="column_2 t-column_2 m-column_2" enctype="multipart/form-data" method="post"><input name="title" type="hidden"><label class="btn"><input class="hide" multiple="multiple" name="upload" type="file">Select photo</label><input class="btn" type="submit" value="Upload photo"></form>'
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
            'code'  : '<button class="back btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> '+currentImage.title+'</button>'
        },

        'main'      : {
            'code' : '<img src="'+currentImage.href+'" alt="'+currentImage.title+'">'
        },
        'footer'    : {
            'class' : 'fixed info',
            'code'  : '<table>'+currentImage.info+'</table>'

        }
    };
    parseTemplate(upload_data, '_page.htm');
    hideLoading();
//    var oldDistance = 0;
//    $('body').on('pinching', 'img', function(o) {
//        var distance = oldDistance - (o.distance < 0 ? (o.distance * -1) : o.distance);
//        oldDistance = distance;
//        var width = o.currentTarget.clientWidth + o.distance;
//        $(this).css({
//            'width'  : width
//        });
//        console.log(o);
//        console.log(o.currentTarget.clientWidth +',' +o.distance);
//    }).on('pinch', 'img', function(o) {
//        oldDistance = 0;
//    });
}