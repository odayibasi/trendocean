if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_RESEND_PASSWD, PAGE_HOME,ERR_MSG_ALREADY_SIGNIN);
}else{
    redirection_toClearURL();
}

$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }

    $("#icoWaiting").hide();
    notifyBar_initialize();
    mainLinks_initialize(PAGE_RESEND_PASSWD);

    $("#btnResetPassword").click(function(){
        $("#icoWaiting").show();
        var usernameOrEmail=$('#username_resendPassword').val();
        $.ajax({
            url:'api/registration/resetPassword',
            data:{
                'email':usernameOrEmail
            },
            type: "GET",
            success: function(){
                $("#icoWaiting").hide();
                notifyBar_display(INFO_MSG_RESEND_PASSWD_OK,ICON_URL_NOTIFY_TRUE);
                $('#username_resendPassword').val("");
            },
            error:function (){
                $("#icoWaiting").hide();
                notifyBar_display(ERR_MSG_RESEND_PASSWD_FAILED,ICON_URL_NOTIFY_WRONG);
                $('#username_resendPassword').val("");
            }
        });
        return false;
    });

});






