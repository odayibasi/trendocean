var urlUserName=common_getURLSegment(1),peopleCurrentAnchor=null,peopleApiURL="";if(!redirection_toClearURL())if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL)redirection_execute(PAGE_FALLOWS,PAGE_INDEX,ERR_MSG_PLEASE_SIGNIN);else{var anchor=jQuery.url.attr("anchor");if(anchor==null)window.location.href+=ANCHOR_FOLLOWEDS}
function fireAnchorTabChanged(a){peopleCurrentAnchor=a;if(a==ANCHOR_FOLLOWEDS){document.title="TrendOcean / "+urlUserName+"'s followeds";people_getFollows("../api/users/followed/"+urlUserName)}else if(a==ANCHOR_FOLLOWERS){document.title="TrendOcean / "+urlUserName+"'s followers";people_getFollows("../api/users/follower/"+urlUserName)}}
function people_updateProfile(){if(cookie_get(COOKIE_USERNAME)==urlUserName)profileTab_setContent();else{$.ajax({url:"../api/users/"+urlUserName,type:"GET",success:function(a){profileTab_setContent(urlUserName,a.smallAvatarURL)},error:function(){window.location.href=PAGE_OPPS}});return false}return false}
function people_getFollows(a){peopleApiURL=a;$.ajax({url:peopleApiURL,type:"GET",success:function(b){tblFollows_renderFollows(b)},error:function(b){notifyBar_display(ERR_MSG_WEBSERVICE+":"+b.status,ICON_URL_NOTIFY_WRONG,"../");return false}});return false}
function people_displayMoreFollows(a){peopleApiURL=a;a=display_follows.length;if(a>0){a=display_follows[a-1].username;$("#tableLoadingIcon").show();$.ajax({url:peopleApiURL+"?startUserName="+a+"&size=10",type:"GET",success:function(b){if(b!=null){b.user=display_follows.concat(b.user);tblFollows_renderFollows(b)}$("#tableLoadingIcon").hide()},error:function(b){$("#tableLoadingIcon").hide();notifyBar_display(ERR_MSG_WEBSERVICE+":"+b.status,ICON_URL_NOTIFY_WRONG,"../")}})}return false}
$(document).ready(function(){if(!(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL||redirection_isURLContainsSSLOrWWW())){theme_processDesign();mainBar_initialize("../");mainBar_initializeSearch();notifyBar_initialize();mainLinks_initialize(PAGE_FALLOWS);redirection_executeOrderAfterNewPageLoad();coffeeDlg_initialize();coffeeDlg_setRelativePath("../");profileTab_initialize("../");people_updateProfile();tblFollows_initialize("../");anchorTab_initialize();common_preventScreenFlash();common_registerMoreActionListener(function(){if($("#tableLoadingIcon").is(":visible")==
false)if(peopleCurrentAnchor==ANCHOR_FOLLOWEDS)people_displayMoreFollows("../api/users/followed/"+urlUserName);else peopleCurrentAnchor==ANCHOR_FOLLOWERS&&people_displayMoreFollows("../api/users/follower/"+urlUserName)})}});
