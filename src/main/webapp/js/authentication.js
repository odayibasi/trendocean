function authentication_setWaitingIconVisib(visb){
    if ($("#icoWaiting") != null){
        if(visb==true)
            $("#icoWaiting").show();
        else
            $("#icoWaiting").hide();
    }
}

var authenticationPage=PAGE_INDEX;


function authentication_error(xhr){
    authentication_setWaitingIconVisib(false);
    if(xhr.status==HTTP_STATUS_UNAUTHORIZED){
        if(authenticationPage!=PAGE_LOGIN){
            redirection_execute(authenticationPage, PAGE_LOGIN, ERR_MSG_LOGIN_FAILED);
        }else{
            notifyBar_display(ERR_MSG_LOGIN_FAILED,ICON_URL_NOTIFY_WRONG);
        }
    }else if(xhr.status==HTTP_STATUS_FORBIDDEN){
        notifyBar_display(ERR_MSG_NOT_ACTIVATED_ACCOUNT,ICON_URL_NOTIFY_WRONG);
    }else{
        window.location.href=PAGE_OVERLOAD;
    }
}

function authentication_sucess(data){
    authentication_setWaitingIconVisib(false);
    var remindMe=$('#remindMe_login:checked').val();
    cookie_saveLoginUser(data,remindMe);
    window.location.href=PAGE_HOME;
}

function authentication_initialize(authInitPage) {

    if(authInitPage!=null){
        authenticationPage=authInitPage;
    }

    authentication_setWaitingIconVisib(false);
    $("#btnLogin").click(function(event){
        event.preventDefault();
        authentication_setWaitingIconVisib(true);
        var usernameVal= $('#username_login').val();
        var passwordVal=$('#password_login').val();

        var remindMe=$('#remindMe_login:checked').val();
        cookie_wrap(COOKIE_REMEMBERME,usernameVal, remindMe);

        if(usernameVal==TEXT_NULL || passwordVal==TEXT_NULL){
            notifyBar_display(ERR_MSG_LOGIN_FAILED,ICON_URL_NOTIFY_WRONG);
            authentication_setWaitingIconVisib(false)
        }else{
            $.ajax({
                url: 'api/authentication/login/',
                type: "POST",
                data: {
                    j_username:usernameVal,
                    j_password:passwordVal
                },
                dataType: "json",
                success: function(data){
                    authentication_sucess(data);
                },
                error:function (xhr){
                    authentication_error(xhr);
                }
            });
            return false;
        }
    });
}