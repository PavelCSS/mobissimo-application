document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBack, false);

function onDeviceReady(){
    parseTemplate(false, '_home.htm');
}

function onBack(){
    parseTemplate(false, '_home.htm');
}

$('body').on('tap', '#gallery', function () {
    var gallery_data = {
        'page-name' : 'gallery',
        'header': {
            'code': 'Mobbisimo gallery'
        },
        'main' :{
            'code': function(){
                var gall_list = {
                    'items' : [
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
}).on('tap', '#upload-photo', function(){
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
}).on('tap', '#take-photo', function(){
    navigator.camera.getPicture(onSuccess, onFail, {
        quality         : 80,
        destinationType : Camera.DestinationType.FILE_URI
    });

//    function onSuccess(imageData) {
//        var image = document.getElementById('preview');
//        image.src = "data:image/jpeg;base64," + imageData;
//    }

    function onSuccess(imageURI) {
        alert(imageURI)
        var image = document.getElementById('preview');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}).on('tap', '#select-photo', function(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
});
function onFileSystemSuccess(fileSystem) {
//    alert(fileSystem);
//    alert(fileSystem.name);
//    alert(fileSystem.root);
    listDir(fileSystem.root);
}

function fail(evt) {
    alert(evt.target.error.code);
}
/* show the content of a directory */
function listDir(directoryEntry){
    alert(directoryEntry);
    if( !directoryEntry.isDirectory ) alert('listDir incorrect type');
    $.mobile.showPageLoadingMsg(); // show loading message

    currentDir = directoryEntry; // set current directory
    alert('currentDir = ' + currentDir);
    directoryEntry.getParent(function(par){ // success get parent
        parentDir = par; // set parent directory
        alert('parentDir = ' + parentDir);
        if( (parentDir.name == 'sdcard' && currentDir.name != 'sdcard') || parentDir.name != 'sdcard' ) $('#backBtn').show();
    }, function(error){ // error get parent
        alert('Get parent error: '+error.code);
    });

    var directoryReader = directoryEntry.createReader();
    alert('directoryReader = ' + directoryReader);
    directoryReader.readEntries(function(entries){
        var dirContent = $('#dirContent');
        dirContent.empty();

        var dirArr = new Array();
        var fileArr = new Array();
        for(var i=0; i<entries.length; ++i){ // sort entries
            var entry = entries[i];
            if( entry.isDirectory && entry.name[0] != '.' ) dirArr.push(entry);
            else if( entry.isFile && entry.name[0] != '.' ) fileArr.push(entry);
        }

        var sortedArr = dirArr.concat(fileArr); // sorted entries
        var uiBlock = ['a','b','c','d'];

        for(var i=0; i<sortedArr.length; ++i){ // show directories
            var entry = sortedArr[i];
            var blockLetter = uiBlock[i%4];
            //console.log(entry.name);
            if( entry.isDirectory )
                dirContent.append('<div class="ui-block-'+blockLetter+'"><div class="folder"><p>'+entry.name+'</p></div></div>');
            else if( entry.isFile )
                dirContent.append('<div class="ui-block-'+blockLetter+'"><div class="file"><p>'+entry.name+'</p></div></div>');
        }
        $.mobile.hidePageLoadingMsg(); // hide loading message
    }, function(error){
        alert('listDir readEntries error: '+error.code);
    });
}