cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL&&redirection_execute(PAGE_DESIGN,PAGE_INDEX,ERR_MSG_PLEASE_SIGNIN);function design_BgImageTileUpdate(){var b,c,d=$("#bgColor").val();if($("#tileBg").is(":checked")){b="true";c="repeat"}else{b="false";c="no-repeat"}$("#bgFormID").attr("action","api/users/bgimage?tiled="+b+"&bgcolor="+d);$("body").css("background-repeat",c);$("body").css("background-color","#"+$("#bgColor").val())}
$(document).ready(function(){if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){theme_processDesign();$("#icoWaiting").hide();document.title="TrendOcean / "+cookie_get(COOKIE_USERNAME)+"'s design settings";mainBar_signPageName(MAINBAR_LINK_SETTING);$(window).unload(function(){$.ajax({async:false,url:"api/users/"+cookie_get(COOKIE_USERNAME),type:"GET",success:function(a){cookie_wrap(COOKIE_BG_URL,a.design.backgroundURL);cookie_wrap(COOKIE_BG_TILED,a.design.backgroundTiled);cookie_wrap(COOKIE_BG_COLOR,
a.design.backgroundColor)},error:function(a){notifyBar_display(ERR_MSG_WEBSERVICE+":"+a.status,ICON_URL_NOTIFY_WRONG)}});mainBar_unsignPageName(MAINBAR_LINK_SETTING)});$("#btnDeleteBgImage").click(function(a){a.preventDefault();if(common_checkPOST()){a.preventDefault();$.ajax({url:"api/users/bgimage",type:"DELETE",success:function(){window.location.href=jQuery.url.attr("source")},error:function(e){notifyBar_display(ERR_MSG_WEBSERVICE+":"+e.status,ICON_URL_NOTIFY_WRONG)}});return false}});var b=cookie_get(COOKIE_BG_URL),
c=cookie_get(COOKIE_BG_TILED),d=cookie_get(COOKIE_BG_COLOR);$("#bgColor").val(d);$("#bgImageID").attr("src",b);c==TEXT_TRUE&&$("#tileBg").attr("checked","checked");$("#tileBg").click(function(){design_BgImageTileUpdate()});$("#bgColor").blur(function(){design_BgImageTileUpdate()});design_BgImageTileUpdate();mainBar_initialize();mainBar_initializeSearch();notifyBar_initialize();mainLinks_initialize(PAGE_DESIGN)}});
