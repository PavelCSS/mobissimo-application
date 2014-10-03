// Call functions for touch devices
$('body').on('touchstart', function(e){
        $(e.target).addClass('touch')
    }).on('touchend touchmove', function(e){
        $('*').removeClass('touch')
    });
tableResponsive();    // Responsive table

// Function calls
//======================================================

///////// Responsive table /////////
function tableResponsive(){
    $('table.responsive').each(function(){
        var $tableTr = $('tr', this);
        var $tableTh = $('th', this);
        var allHeadersSaved = new Array();

        $tableTh.each(function(){
            var headerContent = $(this).text();
            allHeadersSaved.push(headerContent);
        });

        $.each(allHeadersSaved, function(i, v){
            $tableTr.find('td:eq('+i+')').prepend('<span class="table-head">'+v+'</span>');
        });
    });
}

if(document.getElementsByClassName('menu-btn').length){
    var menuOverlay = document.createElement("div");
    menuOverlay.className = "mobile-overlay menu-overlay";
    document.body.appendChild(menuOverlay);
}
if(document.getElementsByClassName('dropdown-btn').length){
    var dropdownOverlay = document.createElement("div");
    dropdownOverlay.className = "mobile-overlay dropdown-overlay";
    document.body.appendChild(dropdownOverlay);
}

var $mobileButton = $('.menu-btn, .dropdown-btn');
$mobileButton.each(function(){
    var menu = $(this).data('menu'),
        position = $(this).data('menu-position'),
        height = $(this).data('menu-height');
    if($(this).hasClass('menu-btn')){
        $(menu).addClass('mobile-menu '+position);
    }else if($(this).hasClass('dropdown-btn')){
        $(menu).addClass('dropdown-menu '+position).height(height);
    }
});

$('.mobile-overlay').on('touchstart', function(){
    $('.menu-btn, .dropdown-btn').removeClass('active');
    $('.mobile-menu, .dropdown-menu, .mobile-overlay').removeClass('open');
});

$mobileButton.on('tap', function(){
    event.preventDefault();
    showHideMenu($(this))
});
$('.sub-menu-btn').on('tap', function(){
    event.preventDefault();
    $(this).toggleClass('active').nextAll('ul').toggleClass('open');
});

function showHideMenu($this){
    var menu = $this.data('menu');
    $('.mobile-overlay').removeClass('open');
    if(!$this.hasClass('active')){
        $('.menu-btn, .dropdown-btn').removeClass('active');
        $('.mobile-menu, .dropdown-menu, .menu-overlay').removeClass('open');
        if($this.hasClass('menu-btn')){
            $('.menu-overlay').addClass('open');
        }else if($this.hasClass('dropdown-btn')){
            $('.dropdown-overlay').addClass('open');
        }
    }
    $this.toggleClass('active');
    $(menu).toggleClass('open');
}