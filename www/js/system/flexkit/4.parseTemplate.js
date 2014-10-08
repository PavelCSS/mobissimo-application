var parseCallBack;
function parseTemplate(json, tmpl, callback){
    callback = (typeof callback == 'function') ? callback : function(html){$('section').replaceWith(html);};
    $.get(tmpl, function(response){
        if(json){
            var html = Mustache.to_html(response, json);
            callback(html);
        }else{
            callback(response);
        }
    });
}