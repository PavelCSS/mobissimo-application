var backLinks = [], currentImage;

//document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBack, false);
$(function(){
    onDeviceReady();
});

function onDeviceReady(){
    if(device.type){
        backLinks.push("parseTemplate(false, '_home.htm')");
        parseTemplate(false, '_home.htm');
        navigator.splashscreen.hide();
    }else{
        _pageHomeGallery();
    }
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
    .on('tap', '#gallery-list a.image', function(){
        currentImage = {
            'href'  : $(this).data('href'),
            'title' : $(this).attr('title'),
            'price' : $(this).parent().find('.best_price'),
            'info'  : $(this).parent().find('table.image-info').html()
        };
        _pagePreview();
//        window.open($(this).data('url'), '_system');
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
                url      : 'http://54.165.42.238:5000/getbestpricelist',
                success  : function(gall_list){
                    console.log(gall_list)
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

function _pageHomeGallery(){
    showLoading();

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude;

        $.ajax({
            dataType : 'jsonp',
            data     : {
                'lat' : latitude,
                'lng' : longitude
            },
            url      : 'http://54.165.42.238:5000/getbestpricelist',
            success  : function(gall_list){
                var d = new Date();
                    d.setDate(d.getDate() + 3);
                var month = d.getMonth() + 1;
                var day = d.getDate();
                var year = d.getFullYear();
                    d.setDate(d.getDate() + 7);
                var r_month = d.getMonth() + 1;
                var r_day = d.getDate();
                var r_year = d.getFullYear();
                gall_list['depart_month'] = month;
                gall_list['depart_day'] = day;
                gall_list['depart_year'] = year;
                gall_list['return_month'] = r_month;
                gall_list['return_day'] = r_day;
                gall_list['return_year'] = r_year;
                parseTemplate(gall_list, '_gallery list DESK.htm');
                hideLoading();
            },
            error    : function(data){
                hideLoading();
                console.log(data)
            }
        });

        $('body').on('change', '.image-info input[type="checkbox"]', function(){
            if($(this).is(':checked')){
                window.open($(this).val(), '_blank');
            }
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
//    backLinks.push("_pagePreview()");
    var image_data = {
        'page-name' : 'preview',
        'header'    : {
            'class' : 'fixed',
            'code'  : '<button class="hide btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> '+currentImage.title+'</button>'
        },

        'main'      : {
            'class' : 'container',
            'code' : '<img src="'+currentImage.href+'" alt="'+currentImage.title+'">'
        },
        'footer'    : {
            'class' : 'fixed info',
            'code'  : function(){
                if(currentImage.info && currentImage.price.length){
                    return '<table>'+currentImage.info+'</table>'
                }
            }
        }
    };
    parseTemplate(image_data, '_page.htm', function(html){
        $('section').append(html);
    });

    $('body').on('tap', 'button.hide', function(){
        $('#page-preview').remove();
    });

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