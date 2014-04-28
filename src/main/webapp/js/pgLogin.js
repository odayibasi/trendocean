if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_LOGIN, PAGE_HOME,ERR_MSG_ALREADY_SIGNIN);
}else{
    redirection_toClearURL();
}

$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }
    
    notifyBar_initialize();
    mainLinks_initialize(PAGE_LOGIN);
    redirection_executeOrderAfterNewPageLoad();
    authentication_initialize(PAGE_LOGIN);
    $("#username_login").focus();
});

$(document).keydown(function(event) {
    if (event.keyCode == KEY_ENTER) {
        event.preventDefault();
        $("#btnLogin").click();
    }
});




