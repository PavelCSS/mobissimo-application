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
                            url : 'http://img0.joyreactor.com/pics/post/full/girl-beer-alcohol-nsfw-1501747.jpeg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://i.huffpost.com/gen/1412462/thumbs/o-KID-BEER-CLEVELAND-FOOTBALL-facebook.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://www.libertynews.com/wp-content/uploads/2013/06/beer-1.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://www.freakingnews.com/pictures/54000/Volcanic-Glass-of-Beer--54060.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://s3.amazonaws.com/bbpa-prod/attachments/target/hero_image/21735/original/Beer%20Pouring.jpg?1350980553'
                        },
                        {
                            title : 'Image first',
                            url : 'http://cdn.trendhunterstatic.com/thumbs/buckler-beer-print-ads.jpeg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://www.mnn.com/sites/default/files/editorial/beer_10.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://www.bottomsupbeer.com/img/beer.png'
                        },
                        {
                            title : 'Image first',
                            url : 'http://www.hdwallpaperscool.com/wp-content/uploads/2014/05/beer-awesome-hd-wallpaper.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://saxerbeer.com/wp-content/uploads/2014/08/beer-been-poured-into-glass-studio-shot-ultraf.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://discovermagazine.com/~/media/Images/Issues/2013/June/beer.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://cbw.ge/wp-content/uploads/2014/09/bus-11.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://bikebusbeer.files.wordpress.com/2011/07/beer-display-credit-mike-beningo.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://www.outsidethebeltway.com/wp-content/uploads/2012/04/toast-beer.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://snowbrains.com/wp-content/uploads/2013/09/Why-Beer-Is-Good-For-You.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://i.telegraph.co.uk/multimedia/archive/01793/ginger-beer_1793863b.jpg'
                        },
                        {
                            title : 'Image first',
                            url : 'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/rich_media_quiz/topic/rmq_beer_calories/getty_rf_photo_of_group_beer_toast.jpg'
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