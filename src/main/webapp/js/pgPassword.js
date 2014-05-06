$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL ||redirection_isURLContainsSSLOrWWW()){
        return;
    }

    theme_processDesign();
    document.title="TrendOcean / "+cookie_get(COOKIE_USERNAME)+"'s password settings";
    mainBar_signPageName(MAINBAR_LINK_SETTING);
    $(window).unload(function() {
        mainBar_unsignPageName(MAINBAR_LINK_SETTING);
    });

    $("#icoWaiting").hide();
    mainBar_initialize();
    mainBar_initializeSearch();
    notifyBar_initialize();
    mainLinks_initialize(PAGE_PASSWD);

    $("#btnSavePassword").click(function(event){
        event.preventDefault();
        if(common_checkPOST()){

            var username=cookie_get(COOKIE_USERNAME);
            var passwd=$('#current_password').val();

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
                url: 'api/authentication/password/change/'+username,
                type: "POST",
                data: {
                    newPassword:newPasswd,
                    currentPassword:passwd
                },
                success: function(){
                    $("#icoWaiting").hide();
                    $('#current_password').val("");
                    $('#firstPassword_password').val("");
                    $('#secondPassword_password').val("");
                    notifyBar_display("Password Change Succeed",ICON_URL_NOTIFY_TRUE);

                },
                error:function(xhr){
                    notifyBar_display(ERR_MSG_WEBSERVICE+ ":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
        }
        return false;
    });
});





