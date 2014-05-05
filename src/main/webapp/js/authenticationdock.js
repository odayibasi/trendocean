function authenticationdock_sucess(data){
    cookie_saveLoginUser(data,false);
    notifyBar_hide();
    $('#icoWaiting').hide();
    $('.answers').unbind('click');
    onequestion_defineComponentVisibilityAccordingAuthentication();
    onequestion_updateQuestion();
}


function authentication_error(xhr){
    $('#icoWaiting').hide();
    if(xhr.status==HTTP_STATUS_UNAUTHORIZED){
        redirection_execute(PAGE_ONEQUESTION, "../"+PAGE_LOGIN, ERR_MSG_LOGIN_FAILED);

    }else if(xhr.status==HTTP_STATUS_FORBIDDEN){
        notifyBar_display(ERR_MSG_NOT_ACTIVATED_ACCOUNT,ICON_URL_NOTIFY_WRONG);
    }else{
        window.location.href="../"+PAGE_OVERLOAD;
    }
}



function authenticationdock_initialize() {

    $('#icoWaiting').hide();

    $($('#username_login')).keydown(function(event) {
        if (event.keyCode == KEY_ENTER) {
            event.preventDefault();
            $("#btnLogin").click();
        }
    });

    $($('#password_login')).keydown(function(event) {
        if (event.keyCode == KEY_ENTER) {
            event.preventDefault();
            $("#btnLogin").click();
        }
    });


    $("#btnLogin").click(function(){

        $('#icoWaiting').show();

        var usernameVal= $('#username_login').val();
        var passwordVal=$('#password_login').val();

        if(usernameVal==TEXT_NULL || passwordVal==TEXT_NULL){
            $('#icoWaiting').hide();
            notifyBar_display(ERR_MSG_LOGIN_FAILED,ICON_URL_NOTIFY_WRONG);
            return false;
        } else {
            $.ajax({
                url: '../login',
                type: "POST",
                data: {
                   'username':usernameVal,
                   'password':passwordVal
                },
                success: function(resp){
                    authentication_sucess(resp.data);
                },
                error:function (xhr){
                    authentication_error(xhr);
                }
            });
            });
            return false;
        }
    });
    return false;

}
