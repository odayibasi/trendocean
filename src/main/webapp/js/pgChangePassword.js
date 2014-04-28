redirection_toClearURL();


$(document).ready(function() {

    if(redirection_isURLContainsSSLOrWWW()){
        return;
    }

    $("#icoWaiting").hide();
    notifyBar_initialize();
    mainLinks_initialize(PAGE_CHANGEPASSWD);
    var usernameVal = cookie_get("TrendOcean.Username");
    
    $("#btnSavePassword").click(function(event){
        event.preventDefault();
        var newPasswd=$('#firstPassword_password').val();
        var newPasswd2=$('#secondPassword_password').val();

        if(newPasswd!=newPasswd2){
            notifyBar_display("Password not same",ICON_URL_NOTIFY_WRONG);
            return false;
        }

        if(!common_checkPassword(newPasswd)){
            notifyBar_display("Invalid Password Format",ICON_URL_NOTIFY_WRONG);
            return false;
        }

        $("#icoWaiting").show();
        $.ajax({
            url: 'api/authentication/password/change/'+usernameVal,
            type: "POST",
            data: {
                newPassword:newPasswd
            },
            success: function(){
                $("#icoWaiting").hide();
                $('#firstPassword_password').val("");
                $('#secondPassword_password').val("");
                redirection_execute(PAGE_CHANGEPASSWD, PAGE_LOGIN, "Password Change Succeed",ICON_URL_NOTIFY_TRUE);
            },
            error:function(xhr){
                $("#icoWaiting").hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
        return false;
    
    });

});