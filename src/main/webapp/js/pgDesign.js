//Redirections For Not Login User
if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_DESIGN, PAGE_INDEX, ERR_MSG_PLEASE_SIGNIN);
}

function design_BgImageTileUpdate(){

    var tiledVal;
    var repeatVal;
    var bgColorVal=$('#bgColor').val();
    if($('#tileBg').is(':checked')){
        tiledVal='true';
        repeatVal='repeat';
    }else{
        tiledVal='false';
        repeatVal="no-repeat";
    }

    $('#bgFormID').attr("action", "api/users/bgimage?tiled="+tiledVal+"&bgcolor="+bgColorVal);
    $('body').css('background-repeat',repeatVal);
    $('body').css('background-color',"#"+$('#bgColor').val());

}

$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
        return;
    }

    theme_processDesign();
    $("#icoWaiting").hide();
    document.title="TrendOcean / "+cookie_get(COOKIE_USERNAME)+"'s design settings";
    mainBar_signPageName(MAINBAR_LINK_SETTING);
    $(window).unload(function() {
        $.ajax({
            async:false,
            url:'api/users/'+cookie_get(COOKIE_USERNAME),
            type: "GET",
            success: function(data){
                cookie_wrap(COOKIE_BG_URL, data.design.backgroundURL);
                cookie_wrap(COOKIE_BG_TILED, data.design.backgroundTiled);
                cookie_wrap(COOKIE_BG_COLOR, data.design.backgroundColor);
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
        mainBar_unsignPageName(MAINBAR_LINK_SETTING);
    });


    $("#btnDeleteBgImage").click(function(event){
        event.preventDefault();
        if(common_checkPOST()){
            event.preventDefault();
            $.ajax({
                url: 'api/users/bgimage',
                type: "DELETE",
                success: function(){
                    window.location.href=jQuery.url.attr("source");
                },
                error:function (xhr){
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
            return false;
        }
    });

    var bgImageURL=cookie_get(COOKIE_BG_URL);
    var bgImageTiled=cookie_get(COOKIE_BG_TILED);
    var bgColor=cookie_get(COOKIE_BG_COLOR);

    $('#bgColor').val(bgColor);
    $('#bgImageID').attr("src",bgImageURL);
    if(bgImageTiled==TEXT_TRUE){
        $('#tileBg').attr('checked','checked');
    }

    $('#tileBg').click(function() {
        design_BgImageTileUpdate();
    });

    // OPEN AFTER BGCOLOR UPDATE
    $('#bgColor').blur(function() {
        design_BgImageTileUpdate();
    });

    design_BgImageTileUpdate();


    mainBar_initialize();
    mainBar_initializeSearch();
    notifyBar_initialize();
    mainLinks_initialize(PAGE_DESIGN);


});





