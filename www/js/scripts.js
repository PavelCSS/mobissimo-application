var backLinks = [], currentImage, serverIp = 'http://50.18.116.252:5000/'; // http://54.165.42.238:5000/

$(function(){
    onDeviceReady();

    if(device.type){
        $('body').addClass('mobile')
    }
});

function onDeviceReady(){
    parseTemplate(false, '_home DESK.htm', function(code){
        $('section').replaceWith(code);
        _deskGallery();
    });
}

function onBack(index){
    var length = backLinks.length;
    index = (typeof index == 'undefined') ? index : length - 2;
    eval('('+backLinks[index]+')');
    backLinks = backLinks.slice(0, index + 1);
}

$('body')
    .on('singleTap', '#gallery-list a.image', function(e){
        showImage($(this));
    })
    .on('singleTap', '#page-preview img', function(e){
        $('#page-preview').toggleClass('imgShow');
    })
    .on('singleTap', '.btn-image.prev', swipeRight)
    .on('singleTap', '.btn-image.next', swipeLeft)
    .on('swipeLeft', '#page-preview main', swipeLeft)
    .on('swipeRight', '#page-preview main', swipeRight)
    .on('change', '.image-info input[type="checkbox"]', function(e){
        if($(this).is(':checked')){
            window.open($(this).val(), '_blank');
        }
    })
    .on('change', '.location input[type="radio"]', function(e){
        $('#gallery-list').html('<div class="mt30px text-center">Loading...</div>');
        _deskGalleryList($(this).attr('id'));
    })
    .on('change', '[name="upload"]', function(){
        var nameFile = $(this).val();
        if(nameFile.lastIndexOf('/') > 0){
            nameFile = nameFile.substr(nameFile.lastIndexOf('/')+1);
        }else if(nameFile.lastIndexOf('\\') > 0){
            nameFile = nameFile.substr(nameFile.lastIndexOf('\\')+1);
        }
        $('.name-file').text('[ ' + nameFile + ' ]');
        $('.upload-block, .choose-block').toggle();
    })
    .on('singleTap', '[type="reset"]', function(e){
        $('[name="upload"]').val('');
        $('.name-file').text('');
        $('.upload-block, .choose-block').toggle();
    });

var liActive;
function swipeLeft(e){
    if(liActive.next().length){
        liActive = liActive.next();
        showImage(liActive.find('a.image'));
    }
}
function swipeRight(e){
    if(liActive.prev().length){
        liActive = liActive.prev();
        showImage(liActive.find('a.image'));
    }
}

function showImage(element){
    var $this = (typeof element === 'undefined') ? $(this) : element;
    currentImage = {
        'href'  : $this.data('href'),
        'title' : $this.attr('title'),
        'price' : $this.parent().find('.price'),
        'info'  : $this.parent().find('.image-info.full-info').html()
    };
    liActive = $this.closest('li');
    liActive.addClass('active');
    _pagePreview();
    //        window.open($(this).data('url'), '_system');
}

function _deskGallery(code){
    code = (typeof code == 'undefined') ? '' : code;
    showLoading();

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude;

        _deskGalleryList(code, latitude, longitude)
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}

function _deskGalleryList(code, latitude, longitude){
    code = (typeof code == 'undefined') ? '' : code;
    latitude = (typeof latitude == 'undefined') ? '' : latitude;
    longitude = (typeof longitude == 'undefined') ? '' : longitude;

    $.ajax({
        dataType : 'jsonp',
        data     : {
            'code' : code,
            'lat'  : latitude,
            'lng'  : longitude
        },
        url      : serverIp + 'getbestpricelist',
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
            parseTemplate(gall_list, '_gallery list DESK.htm', function(code){
                $('#gallery-list').replaceWith(code)
            });
            hideLoading();
        },
        error    : function(data){
            hideLoading();
            console.log(data)
        }
    });
}

function _pagePreview(){
    showLoading();
//    backLinks.push("_pagePreview()");
    var image_data = {
        'page-name' : 'preview',
        'header'    : {
            'class' : 'fixed text-overflow',
            'code'  : '<button class="hide btn inherit fl-left"><i class="icon-arrow-left6 icon24"></i> '+currentImage.title+'</button>'
        },
        'main'      : {
            'class' : 'container',
            'code' : '<img src="'+currentImage.href+'" alt="'+currentImage.title+'">' +
                     '<span class="btn-image prev icon-arrow-left6"></span>' +
                     '<span class="btn-image next icon-arrow-right6"></span>'
        },
        'footer'    : {
            'class' : 'fixed info',
            'code'  : function(){
                return '<div class="image-info clearfix p20px">'+currentImage.info+'</div>'
            }
        }
    };
    parseTemplate(image_data, '_page.htm', function(html){
        if($('#page-preview').length){
            $('#page-preview').replaceWith(html);
        }else{
            $('section').append(html);
        }
    });

    $('body').on('singleTap', 'button.hide', function(e){
        $('#page-preview').remove();
    });

    hideLoading();
}