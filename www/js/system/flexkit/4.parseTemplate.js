function parseTemplate(json, tmpl, selector, replace){
    $('html').addClass('loading');
    selector = (typeof selector == 'undefined') ? 'section' : selector;
    replace = (typeof replace == 'undefined') ? true : replace;
    $.get(tmpl, function(response){
        if(json){
            var html = Mustache.to_html(response, json);
            insertTemplate(html, selector, replace);
        }else{
            insertTemplate(response, selector, replace);
        }
    });
}

function insertTemplate(html, selector, replace){
    if(replace){
        $(selector).replaceWith(html);
    }else{
        $(selector).html(html);
    }
    $('html').removeClass('loading');
}