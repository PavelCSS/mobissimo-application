$('body').on('touchstart', function(e){
        $(e.target).addClass('touch')
    }).on('touchend touchmove', function(e){
        $('*').removeClass('touch')
    });