var pageTmpl =
    '{{#header}}' +
        '<header>' +
            '<button id="back" class="btn fl-left icon-arrow-left">Back</button>{{{header.code}}}' +
        '</header>' +
    '{{/header}}' +
    '{{#main}}' +
        '<main>{{{main.code}}}</main>' +
    '{{/main}}' +
    '{{#footer}}' +
        '<footer>{{{footer.code}}}</footer>' +
    '{{/footer}}';

var homeTmpl;

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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        homeTmpl = $('section').html();
    }
};
$('body').on('tap', '#gallery', function () {
    var page_data, rendered;
    page_data = {
        'header': {
            'code': 'Header title'
        },
        'main' :{
            'code': 'Content page'
        },
        'footer   ': false
    };
    rendered = Mustache.to_html(pageTmpl, page_data);
    $('section').html(rendered);
})
.on('tap', '#back', function () {
    console.log(homeTmpl);
    $('section').html(homeTmpl);
});