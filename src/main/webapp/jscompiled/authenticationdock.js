function authenticationdock_sucess(a){cookie_saveLoginUser(a,false);notifyBar_hide();$("#icoWaiting").hide();$(".answers").unbind("click");onequestion_defineComponentVisibilityAccordingAuthentication();onequestion_updateQuestion()}
function authentication_error(a){$("#icoWaiting").hide();if(a.status==HTTP_STATUS_UNAUTHORIZED)redirection_execute(PAGE_ONEQUESTION,"../"+PAGE_LOGIN,ERR_MSG_LOGIN_FAILED);else if(a.status==HTTP_STATUS_FORBIDDEN)notifyBar_display(ERR_MSG_NOT_ACTIVATED_ACCOUNT,ICON_URL_NOTIFY_WRONG);else window.location.href="../"+PAGE_OVERLOAD}
function authenticationdock_initialize(){$("#icoWaiting").hide();$($("#username_login")).keydown(function(a){if(a.keyCode==KEY_ENTER){a.preventDefault();$("#btnLogin").click()}});$($("#password_login")).keydown(function(a){if(a.keyCode==KEY_ENTER){a.preventDefault();$("#btnLogin").click()}});$("#btnLogin").click(function(){$("#icoWaiting").show();var a=$("#username_login").val(),c=$("#password_login").val();if(a==TEXT_NULL||c==TEXT_NULL){$("#icoWaiting").hide();notifyBar_display(ERR_MSG_LOGIN_FAILED,
ICON_URL_NOTIFY_WRONG)}else $.ajax({url:"../api/authentication/login/",type:"POST",data:{j_username:a,j_password:c},dataType:"json",success:function(b){authenticationdock_sucess(b)},error:function(b){authentication_error(b)}});return false});return false};
