function redirection_execute(currentPage,redirectPage,msg,icon){
    cookie_wrap(COOKIE_REDIRECTION_SRC, currentPage);
    cookie_wrap(COOKIE_REDIRECTION_PAGE, redirectPage);
    cookie_wrap(COOKIE_REDIRECTION_MSG,  msg);
    cookie_wrap(COOKIE_REDIRECTION_ICON,  icon);

    window.location.href=redirectPage;
}

function redirection_executeOrderAfterNewPageLoad(){

    var notifyIconClassName=cookie_get(COOKIE_REDIRECTION_ICON);
    if(notifyIconClassName==undefined){
        notifyIconClassName=ICON_URL_NOTIFY_WRONG;
    }
    
    if(cookie_get(COOKIE_REDIRECTION_SRC)!=undefined){
        notifyBar_display(cookie_get(COOKIE_REDIRECTION_MSG),notifyIconClassName);
        cookie_wrap(COOKIE_REDIRECTION_SRC, null);
        cookie_wrap(COOKIE_REDIRECTION_PAGE, null);
        cookie_wrap(COOKIE_REDIRECTION_MSG, null);
        cookie_wrap(COOKIE_REDIRECTION_ICON, null);
    }
}


function redirection_isBrowserSupport(){
    if($.browser.msie && parseInt($.browser.version)<8){
        return false;
    }
    return true;
}


function redirection_toClearURL(rPath){

    if(rPath==null){
        rPath="";
    }

    if(redirection_isBrowserSupport()==false) {
        window.location.href=rPath+"unsupported.html";
        return true;
    }else if(redirection_isURLContainsSSLOrWWW()){
        var path=jQuery.url.attr("source");
        path=path.replace("https","http");
        path=path.replace("8181","8080");
        path=path.replace("443","80");
        path=path.replace("www.","");
        window.location.href=path;
        return true;
    }else{
        return false;
    }


}

function redirection_isURLContainsSSLOrWWW(){
    if(jQuery.url.attr("protocol")=="https"){
        return true;
    }

    if(jQuery.url.attr("source").indexOf("www.")!=-1){
        return true;
    }

    return false;
}



