function notifyBar_initialize(){

    $('#fixerID').hide();
    $('#closenotifyID').click(function(event) {
        event.preventDefault();
        $('#fixerID').slideUp();
    });
}

function notifyBar_display(notifyMsg, className, relativePath){

    var index404=notifyMsg.indexOf("HTTP Status 404");

    if(notifyMsg=="Web Service Error:500" || index404!=-1){

        if(relativePath==null){
            relativePath="";
        }

        cookie_clearLoginUser();
        window.location.href=relativePath+PAGE_INDEX;
    }else if(notifyMsg=="Web Service Error:0"){
        return false;
    }

    if(className!=null){
        $('#notifyImgID').removeClass();
        $('#notifyImgID').addClass(className);
    }


    if( $('#fixerID').is(':visible') ){
        $('#fixerID').slideUp(400, function() {
            $('#notifyInfoID').html(notifyMsg);
            $('#fixerID').slideDown();
        });
    }else{
        $('#notifyInfoID').html(notifyMsg);
        $('#fixerID').slideDown();
    }
}


function notifyBar_hide(){
    $('#fixerID').slideUp(400, function() {
        $('#notifyInfoID').html(TEXT_NULL);
    });
}


$(document).keydown(function(event) {
    if (event.keyCode == KEY_ESCAPE) {
        event.preventDefault();
        notifyBar_hide();
    }
});