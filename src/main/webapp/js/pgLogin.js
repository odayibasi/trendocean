$(document).ready(function() {
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




