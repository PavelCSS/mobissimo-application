var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBack, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        parseTemplate(false, '_home.htm');
    },

    onBack: function() {
        parseTemplate(false, '_home.htm');
    }
};
$('body').on('tap', '#gallery', function () {
    var gallery_data = {
        'page-name' : 'gallery',
        'header': {
            'code': 'Header title'
        },
        'main' :{
            'code': 'Content page'
        },
        'footer   ': false
    };
    parseTemplate(gallery_data, '_page.htm');
}).on('click', '#upload-photo', function(){
    var upload_data = {
            'page-name' : 'upload',
            'header': false,
            'main' :{
                'class' : 'gray-lighter-bg',
                'code': '<img id="preview" class="polaroid-images" src="images/upload-image.png">'
            },
            'footer': {
                'class' : 't-column_2 m-column_2 text-center mt30px mb30px',
                'code':
                    '<span>' +
                        '<button id="take-photo" class="btn fs48 rounded icon icon-pictures3 outline-bg">Gallery</button>' +
                        '<span class="block">Take photo</span>' +
                    '</span>' +
                    '<span>' +
                        '<button id="select-photo" class="btn fs48 rounded icon icon-folder-upload2 outline-bg">Upload</button>' +
                        '<span class="block">Select photo</span>' +
                    '</span>'
            }
        };
    parseTemplate(upload_data, '_page.htm');
}).on('click', '#take-photo', function(){
    navigator.camera.getPicture(onSuccess, onFail, {
        quality         : 50,
        destinationType : Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('preview');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
});

function parseTemplate(json, tmpl){
    $.get(tmpl, function(response){
        if(json){
            var html = Mustache.to_html(response, json);
            $('section').replaceWith(html);
        }else{
            $('section').replaceWith(response);
        }
    });
}