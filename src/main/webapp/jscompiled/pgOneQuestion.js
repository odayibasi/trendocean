redirection_toClearURL("../");statistics_initialize();
var onequestion_selectedQuestion=null,onequestion_selectedChoice=null,onequestion_commentCount=0,youtube="<iframe title='YouTube video player' class='youtube-player' type='text/html' width='495' height='295' src='http://www.youtube.com/embed/$youtubecode$?wmode=transparent' frameborder='0'></iframe>",vimeo="<iframe src='http://player.vimeo.com/video/$vimeocode$' width='495' height='295' frameborder='0'></iframe>",htmlImgURL="<img src='{url}' width='495'  height='295'/>",soundCloud='<object id="toPlayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name=movie" value="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode1$%2F$soundcloudCode2$&enable_api=true&object_id=toPlayer"></param><param name="allowscriptaccess" value="always"></param><embed allowscriptaccess="always" height="81" src="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode3$%2F$soundcloudCode4$&enable_api=true&object_id=toPlayer" type="application/x-shockwave-flash" width="495" name="toPlayer"></embed></object>',
whoAvatarTemp='<div class="who-avatar"><a href="$avatarLink$"  title="$usernameTooltip$"><img class="tinypicture" src="$avatarImgURL$" /></a> </div>',whoAvatarMoreTemp='<a class="who-avatar-more" title="more" href="">...</a>',whoAvatarDispStat='<a id="btnDisplayStat" class="display-stat" href="#" ></a>',oMp3Player='<object type="application/x-shockwave-flash" data="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" width="12" height="12"><param name="movie" value="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" /><param name="bgcolor" value="#f5ebec" /><param name="FlashVars" value="mp3={url}&amp;width=12&amp;height=12&amp;showslider=0&amp;showloading=never&amp;buttonwidth=12&amp;sliderwidth=0&amp;sliderheight=0&amp;volumewidth=0&amp;volumeheight=0&amp;loadingcolor=ffffff&amp;bgcolor=f5ebec&amp;bgcolor1=f5ebec&amp;bgcolor2=f5ebec&amp;slidercolor1=ffffff&amp;slidercolor2=ffffff&amp;sliderovercolor=ffffff&amp;buttoncolor=304e63&amp;buttonovercolor=505050" /></object>',
statsDisplayFlag=false;
function onequestion_prepareQuestionChoices(a){var b=0;a=a.choices;for(i=0;i<a.length;i++){var c=a[i];if(c==TEXT_NULL){$("#answers_cho"+i).hide();$("#embed_cho"+i).hide()}else{if(common_isContainsSound(c)){$("#embed_cho"+i).show();$("#embed_cho"+i).html(common_choiceBoxProcessOneQuestion(c,oMp3Player));$("#embed_cho"+i).removeClass();$("#embed_cho"+i).addClass("playericon")}else if(common_isContainsLink0(c)||common_isContainsLink1(c)){$("#embed_cho"+i).show();$("#embed_cho"+i).html(common_choiceBoxProcessOneQuestion(c));
$("#embed_cho"+i).removeClass();$("#embed_cho"+i).addClass("linkicon")}else $("#embed_cho"+i).hide();$("#answers_cho"+i).show();$("#answers_cho"+i).html(common_choiceProcess(c));b++}}for(i=a.length;i<10;i++){$("#answers_cho"+i).hide();$("#ansright"+i).hide();$("#embed_cho"+i).hide()}}
function onequestion_prepareStatisticsIcon(a,b){var c=0,d=a.choices,e=0,f=0;for(i=0;i<b.map.length;i++){f=b.map[i].index;if(f<d.length)e+=parseInt(b.map[i].value)}for(i=0;i<b.map.length;i++){f=b.map[i].index;if(f<d.length){var g=parseInt(b.map[i].value);g=parseFloat(g*100/e).toFixed(1);if(g*10%10==0)g=parseFloat(g).toFixed();$("#anscounter"+f).text(g+"%")}}for(i=0;i<d.length;i++){e=d[i];if(e==TEXT_NULL){$("#answers_cho"+i).hide();$("#ansright"+i).hide()}else{$("#answers_cho"+i).show();$("#answers_cho"+
i).html(common_choiceProcess(e));$("#ansright"+i).show();c++}}for(i=d.length;i<10;i++){$("#answers_cho"+i).hide();$("#ansright"+i).hide()}}function onequestion_signSelectedChoice(){for(i=0;i<MAX_CHOICE_COUNT;i++){var a=$("#answers_cho"+i);a.removeClass();a.addClass("answers_notselected")}onequestion_selectedChoice.addClass("answers_selected")}
function onequestion_prepareOwnerInfo(){var a=onequestion_selectedQuestion.ownerFullName;$("#fullname_onequestion").html(a);a=onequestion_selectedQuestion.owner;$("#avatarLink_onequestion").attr("href","../"+a);$("#avatarImg_onequestion").attr("src",onequestion_selectedQuestion.ownerSmallAvatarURL);$("#usernameLink_onequestion").attr("href","../"+a);$("#usernameLink_onequestion").text(a)}
function onequestion_prepareChoiceDistribution(a){$.ajax({url:"../api/answers/distribution/"+a.id,type:"GET",contentType:"application/json; charset=utf-8",success:function(b){onequestion_prepareStatisticsIcon(a,b)},error:function(b){notifyBar_display(ERR_MSG_WEBSERVICE+":"+b.status,ICON_URL_NOTIFY_WRONG,"../")}});return false}function onequestion_bindEventForNonLoginUser(){$(".answers").click(function(a){a.preventDefault();notifyBar_display(ERR_MSG_PLEASE_SIGNIN,ICON_URL_NOTIFY_WRONG)})}
function onequestion_bindEventToNonAnsweredQuestion(){$(".answers").click(function(a){a.preventDefault();if(onequestion_selectedQuestion.answer==INDEX_OF_NOT_ANSWERED){for(i=0;i<MAX_CHOICE_COUNT;i++){a=$("#answers_cho"+i);a.removeClass();a.addClass("answers_notselected")}onequestion_selectedChoice=$(this);onequestion_selectedChoice.addClass("answers_selected");$("#ichoosethis_onequestion").show()}})}
function onequestion_bindEventToAnsweredQuestion(){$(".answers").click(function(a){a.preventDefault()})}function onequestion_unbindEvents(){$(".answers").unbind()}function onequestion_defineLoveBtnStatus(){$("#btnLove").removeClass();if(onequestion_selectedQuestion.isQuestionFaved=="true"){$("#btnLove").addClass("loveactselected");$("#btnLove").attr("title","remove love")}else{$("#btnLove").addClass("loveact");$("#btnLove").attr("title","add love")}}
function onequestion_bindEventToLove(){$("#btnLove").click(function(a){a.preventDefault();if(common_checkPOST()){var b=TEXT_TRUE;a="../api/favorites/"+onequestion_selectedQuestion.id;if(onequestion_selectedQuestion.isQuestionFaved==TEXT_TRUE){b=TEXT_FALSE;a="../api/favorites/remove/"+onequestion_selectedQuestion.id}$.ajax({url:a,type:"POST",async:false,success:function(){onequestion_selectedQuestion.isQuestionFaved=b;onequestion_defineLoveBtnStatus();if(b==TEXT_TRUE)onequestion_selectedQuestion.likedCount++;
else onequestion_selectedQuestion.likedCount--;onequestion_updateLovedAndAnsweredCount()},error:function(c){c.status==HTTP_STATUS_NOT_FOUND?redirection_execute(PAGE_ONEQUESTION,"../"+PAGE_HOME,c.responseText):notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG,"../")}})}return false})}
function onequestion_defineComponentVisibilityAccordingAuthentication(){if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){$("#userAvatar").attr("src",cookie_get(COOKIE_AVATAR_SMALL_URL));mainBar_initialize("../");mainBar_initializeSearch();$("#logindock").hide();$("#docka").show();$(".right-person-navi").show();$("#btnCoffee").show();$("#btnReask").show();$("#btnLove").show();$("#commentSendLayout").show();$("#trendbottom").hide();mainBar_startTimer()}else{$("#docka").hide();$(".right-person-navi").hide();
$("#btnCoffee").hide();$("#btnReask").hide();$("#btnLove").hide();$("#commentSendLayout").hide();$("#trendbottom").show();mainBar_stopTimer()}}
function onequestion_defineStatus(){onequestion_bindEventToLove();onequestion_prepareQuestionChoices(onequestion_selectedQuestion);if(onequestion_selectedQuestion.answer==INDEX_OF_NOT_ANSWERED)onequestion_bindEventToNonAnsweredQuestion();else{onequestion_bindEventToAnsweredQuestion();onequestion_selectedChoice=$("#answers_cho"+onequestion_selectedQuestion.answer);onequestion_signSelectedChoice();onequestion_prepareChoiceDistribution(onequestion_selectedQuestion)}}
function onequestion_defineDeletionStatus(){if(cookie_get(COOKIE_USERNAME)=="trendocean")$("#btnDeleteQuestion").show();else onequestion_selectedQuestion.totalAnswerCount==0&&onequestion_selectedQuestion.owner==cookie_get(COOKIE_USERNAME)?$("#btnDeleteQuestion").show():$("#btnDeleteQuestion").hide()}
function onequestion_themeProcessDesign(){$.ajax({async:false,url:"../api/users/"+onequestion_selectedQuestion.owner,type:"GET",success:function(a){var b=a.design.backgroundURL;a=a.design.backgroundTiled;if(b!=TEXT_NULL){$("body").css("background-position","0px 0px");$("body").css("background-image","url("+b+")");a==TEXT_TRUE?$("body").css("background-repeat","repeat"):$("body").css("background-repeat","no-repeat")}},error:function(a){notifyBar_display(ERR_MSG_WEBSERVICE+":"+a.status,ICON_URL_NOTIFY_WRONG)}})}
function onequestion_updateQuestion(){var a=common_getURLSegment(1);$.ajax({url:"../api/questions/"+a,type:"GET",success:function(b){onequestion_selectedQuestion=b;coffeeDlg_setContent(b.owner,cookie_get(COOKIE_USERNAME),b.ownerSmallAvatarURL);if(b.owner==cookie_get(COOKIE_USERNAME)){$("#btnCoffee").hide();$("#btnReask").hide()}b=common_contentProcessing(b.body,CONTENT_PROCESS_FOR_ONE_QUESTION);$("#body_onequestion").html(b);onequestion_prepareOwnerInfo();onequestion_updateCreationDate();onequestion_defineStatus();
onequestion_defineDeletionStatus();onequestion_defineLoveBtnStatus();onequestion_updateLovedAndAnsweredCount();onequestion_updateCommentCount();onequestion_updateWhoIsAnsweredAvatar();onequestion_themeProcessDesign();onequestion_displayComments();common_preventScreenFlash();jQuery.url.setUrl(document.location).attr("anchor")=="stat"&&$("#btnDisplayStat").click()},error:function(){window.location.href="../"+PAGE_OPPS}})}
function onequestion_updateCreationDate(){var a=new Date(onequestion_selectedQuestion.creationDate*1);$("#questionaddedDate").html("question added "+common_getRemainingTime(a))}function onequestion_displayCommentCount(){$("#btnDiplayComments").text("see more comments ("+onequestion_commentCount+")")}function onequestion_updateCommentCount(){onequestion_commentCount=onequestion_selectedQuestion.numberOfComments;onequestion_displayCommentCount()}
function onequestion_updateLovedAndAnsweredCount(){$("#qLoved").text(onequestion_selectedQuestion.likedCount+" loved, ");$("#qAnswered").text(onequestion_selectedQuestion.totalAnswerCount+" answered")}
function onequestion_displayComments(){$.ajax({url:"../api/comments/"+onequestion_selectedQuestion.id,type:"GET",success:function(a){tblComments_renderComments(a);$("#trendbottom").css("bottom","-135px");return false},error:function(a){notifyBar_display(ERR_MSG_WEBSERVICE+":"+a.status,ICON_URL_NOTIFY_WRONG,"../")}});return false}
function onequestion_displayMoreComments(){var a=display_comments.length;if(a>0){$("#tableLoadingIcon").show();$.ajax({url:"../api/comments/"+onequestion_selectedQuestion.id+"?startComment="+display_comments[a-1].commentID+"&size=5",type:"GET",success:function(b){if(b!=null){b.comment=display_comments.concat(b.comment);tblComments_renderComments(b);$("#tableLoadingIcon").hide()}},error:function(b){$("#tableLoadingIcon").hide();notifyBar_display(ERR_MSG_WEBSERVICE+":"+b.status,ICON_URL_NOTIFY_WRONG,
"../")}})}return false}function onequestion_getAnswerOrderStatus(a,b,c){var d=[],e=0;for(i=0;i<a.map.length;i++){var f=a.map[i].index;if(f==b)e=parseInt(a.map[i].value);else f!=QUESTION_TOTAL_ANSWERED_INDEX&&f!=84&&d.push(parseInt(a.map[i].value))}a=1;if(c==TEXT_TRUE)for(i=0;i<d.length;i++)d[i]<e&&a++;else for(i=0;i<d.length;i++)d[i]>e&&a++;return a}
function onequestion_updateWhoIsAnsweredAvatar(){$("#whoansweredDiv").empty();onequestion_selectedQuestion.totalAnswerCount==0?$("#whoansweredDiv").hide():$("#whoansweredDiv").show();var a=null,b=onequestion_selectedQuestion.id;onequestion_selectedQuestion!=null&&$.ajax({url:"../api/answers/all/"+b,type:"GET",success:function(c){if(c==null)a=null;else{a=$.isArray(c.answerOfUser)?c.answerOfUser:Array(c.answerOfUser);for(i=0;i<a.length;i++)if(i<17){c=whoAvatarTemp.replace("$avatarLink$","../"+a[i].username);
c=a[i].choiceIndex!=-1?c.replace("$usernameTooltip$",common_choiceProcess(common_htmlStrip(onequestion_selectedQuestion.choices[a[i].choiceIndex]))):c.replace("$usernameTooltip$",common_choiceProcess(common_htmlStrip("locked")));c=c.replace("$avatarImgURL$",a[i].smallAvatar);$("#whoansweredDiv").append(c)}a.length==20&&$("#whoansweredDiv").append(whoAvatarMoreTemp);$(".who-avatar-more").click(function(d){d.preventDefault();$("#qAnswered").click()})}},error:function(c){c.status==HTTP_STATUS_NOT_FOUND?
redirection_execute(PAGE_ONEQUESTION,"../"+PAGE_HOME,c.responseText):notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG,"../")}});$("#whoansweredDiv").append(whoAvatarDispStat);onequestion_selectedQuestion.answer!=INDEX_OF_NOT_ANSWERED||onequestion_selectedQuestion.owner==cookie_get(COOKIE_USERNAME)?$("#btnDisplayStat").show():$("#btnDisplayStat").hide();return false}
function onequestion_answerSucceeded(a,b,c){$("#waitingIcon").hide();$("#ichoosethis_onequestion").hide();$("#statistic_onequestion").show();onequestion_selectedQuestion.answer=""+b;onequestion_prepareStatisticsIcon(onequestion_selectedQuestion,c);onequestion_unbindEvents();onequestion_bindEventToAnsweredQuestion();onequestion_signSelectedChoice();onequestion_selectedQuestion.totalAnswerCount++;onequestion_updateLovedAndAnsweredCount();a=onequestion_getAnswerOrderStatus(c,b,cookie_get(COOKIE_MARGINAL));
a=a==1?"1ST":a==2?"2ND":a==3?"3RD":a+"TH";$("#answerOrder").text("");cookie_get(COOKIE_MARGINAL)==TEXT_TRUE?$("#deltaTrend").text(a+" MOST ECCENTRIC ANSWER"):$("#deltaTrend").text(a+" MOST TRENDY ANSWER");a=common_contentProcessing(onequestion_selectedQuestion.body,CONTENT_PROCESS_FOR_ONE_QUESTION);$("#body_onequestion").html(a);onequestion_updateWhoIsAnsweredAvatar()}
$(document).ready(function(){if(!redirection_isURLContainsSSLOrWWW()){authenticationdock_initialize();mainLinks_initialize(PAGE_ONEQUESTION);onequestion_defineComponentVisibilityAccordingAuthentication();$(".shareact").click(function(b){b.preventDefault();shareDlg_setContent(onequestion_selectedQuestion);shareDlg_display($(this),100,0)});$("#txtboxComment").counter({dispID:"commentpart_counter",goal:"300",dispIDColor:"#666"});$("#btnRandomQuestion").click(function(b){b.preventDefault();$.ajax({url:"../api/questions/random?startIndex="+
onequestion_selectedQuestion.id,type:"GET",success:function(c){if(c!=null&&c!=TEXT_NULL)window.location.href=c.id},error:function(c){notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG,"../")}});return false});$("#chart_div").hide();$("#btnDisplayStat").live("click",function(b){b.preventDefault();if(onequestion_selectedQuestion.answer!=INDEX_OF_NOT_ANSWERED||onequestion_selectedQuestion.owner==cookie_get(COOKIE_USERNAME))if(statsDisplayFlag){$("#chart_div").hide();statsDisplayFlag=
false}else{statsDisplayFlag=true;$("#chart_div").show();statistics_display(onequestion_selectedQuestion)}});$("#deleteQuestionConfirmDialog").hide();$("#btnDeleteQuestion").hide();$("#btnDeleteQuestion").click(function(b){b.preventDefault();$("#deleteQuestionConfirmDialog").show();$("#deleteQuestionConfirmDialog").css("position","absolute");b=$(window).width();var c=$("#deleteQuestionConfirmDialog").width();$("#deleteQuestionConfirmDialog").css("left",(b-c)/2);$("#deleteQuestionConfirmDialog").css("top",
300)});$("#btnDeleteQuestionNo").click(function(b){b.preventDefault();$("#deleteQuestionConfirmDialog").hide()});$("#btnDeleteQuestionYes").click(function(b){b.preventDefault();$.ajax({url:"../api/questions/"+onequestion_selectedQuestion.id,type:"DELETE",success:function(){window.location.href="../"+PAGE_HOME},error:function(c){if(c.status==HTTP_STATUS_FORBIDDEN){$("#btnDeleteQuestion").hide();$("#deleteQuestionConfirmDialog").hide();notifyBar_display(c.responseText,ICON_URL_NOTIFY_WRONG);onequestion_selectedQuestion.totalAnswerCount=
1;onequestion_updateLovedAndAnsweredCount()}else if(c.status==HTTP_STATUS_NOT_FOUND)window.location.href="../"+PAGE_HOME}});return false});tblQuestionRelatedUsers_initialize("../");$("#questionRelatedUsers").hide();$("#questionRelatedUsersClose").click(function(b){b.preventDefault();$("#questionRelatedUsers").hide()});$("#qAnswered").click(function(b){b.preventDefault();b=onequestion_selectedQuestion.id;onequestion_selectedQuestion!=null&&$.ajax({url:"../api/answers/all/"+b,type:"GET",success:function(c){var d=
$(window).width(),e=$("#questionRelatedUsers").width();$("#questionRelatedUsers").css("position","absolute");$("#questionRelatedUsers").css("top",200);$("#questionRelatedUsers").css("left",(d-e)/2);$("#questionRelatedUsersTitle").text("Answered");$("#questionRelatedUsers").show();tblQuestionRelatedUsers_render(c,"answers",onequestion_selectedQuestion)},error:function(c){c.status==HTTP_STATUS_NOT_FOUND?redirection_execute(PAGE_ONEQUESTION,"../"+PAGE_HOME,c.responseText):notifyBar_display(ERR_MSG_WEBSERVICE+
":"+c.status,ICON_URL_NOTIFY_WRONG,"../")}});return false});$("#qLoved").click(function(b){b.preventDefault();b=onequestion_selectedQuestion.id;onequestion_selectedQuestion!=null&&$.ajax({url:"../api/favorites/favoritedUsers/"+b,type:"GET",success:function(c){var d=$(window).width(),e=$("#questionRelatedUsers").width();$("#questionRelatedUsers").css("position","absolute");$("#questionRelatedUsers").css("top",200);$("#questionRelatedUsers").css("left",(d-e)/2);$("#questionRelatedUsersTitle").text("Loved");
$("#questionRelatedUsers").show();tblQuestionRelatedUsers_render(c,"loved",onequestion_selectedQuestion)},error:function(c){c.status==HTTP_STATUS_NOT_FOUND?redirection_execute(PAGE_ONEQUESTION,"../"+PAGE_HOME,c.responseText):notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG,"../")}});return false});shareDlg_initialize("../");coffeeDlg_initialize($("#btnCoffee"));coffeeDlg_setRelativePath("../");$("#btnCoffee").attr("title","send a cup of coffee");$("#btnReask").attr("title",
"Reask");for(i=0;i<10;i++){var a=$("#answers_cho"+i);a.hide();a.data(DATA_CHOICE_INDEX,i);$("#answers_cho"+i).data(DATA_CHOICE_INDEX,i);$("#ansright"+i).hide();$("#anscounter"+i).text("%0")}$("#waitingIcon").hide();$("#btnAnswer").hide();$("#ichoosethis_onequestion").hide();$("#statistic_onequestion").hide();$("#ichooseact_onequestion").click(function(b){b.preventDefault();if(common_checkAnswerPOST()){var c=cookie_get(COOKIE_LOGINUSER_TREND);$("#waitingIcon").show();var d={};d.questionID=onequestion_selectedQuestion.id;
d.choiceIndex=onequestion_selectedChoice.data(DATA_CHOICE_INDEX);b=$.toJSON(d);$.ajax({url:"../api/answers",type:"POST",data:b,dataType:"json",contentType:"application/json; charset=utf-8",success:function(e){onequestion_answerSucceeded(c,d.choiceIndex,e)},error:function(e){$("#waitingIcon").hide();$("#ichoosethis_onequestion").hide();if(e.status==HTTP_STATUS_BAD_REQUEST)window.location.href=jQuery.url.attr("source");else e.status==HTTP_STATUS_NOT_FOUND?redirection_execute(PAGE_ONEQUESTION,"../"+
PAGE_HOME,e.responseText):notifyBar_display(ERR_MSG_WEBSERVICE+":"+e.status,ICON_URL_NOTIFY_WRONG,"../")}})}return false});onequestion_updateQuestion();notifyBar_initialize();tblComments_initialize();$("#btnAddComment").click(function(b){b.preventDefault();if(common_checkPOST()){if($("#txtboxComment").val().length>300){notifyBar_display(ERR_MSG_COMMENT_MAX_LENGTH,ICON_URL_NOTIFY_WRONG);return false}b={};b.questionID=onequestion_selectedQuestion.id;b.commentText=$("#txtboxComment").val();b=$.toJSON(b);
$.ajax({url:"../api/comments/",type:"POST",data:b,dataType:"json",contentType:"application/json; charset=utf-8",success:function(c){$("#txtboxComment").val("");$("#txtboxComment").focus();tblComments_addComment(c)},error:function(c){if(c.status==HTTP_STATUS_BAD_REQUEST)notifyBar_display(c.responseText,ICON_URL_NOTIFY_WRONG);else c.status==HTTP_STATUS_NOT_FOUND?redirection_execute(PAGE_ONEQUESTION,"../"+PAGE_HOME,c.responseText):notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG,
"../")}})}return false});$("#btnReask").click(function(b){b.preventDefault();$.ajax({url:"../api/questions/reask/"+onequestion_selectedQuestion.id,async:false,type:"POST",success:function(){notifyBar_display("reask succeed",ICON_URL_NOTIFY_TRUE)},error:function(c){c.status==HTTP_STATUS_NOT_FOUND?notifyBar_display(c.responseText,ICON_URL_NOTIFY_WRONG):notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG)}});return false});$("#btnDiplayComments").click(function(b){b.preventDefault();
onequestion_displayMoreComments()});common_registerMoreActionListener(function(){if($("#tableLoadingIcon").is(":visible")==false&&onequestion_commentCount>display_comments.length)onequestion_displayMoreComments();else $("#tableLoadingIcon").is(":visible")==true&&onequestion_commentCount==display_comments.length&&$("#tableLoadingIcon").hide()});$("#dlgShare_Title").text("Share");$("#dlgShare_Info").text("Share one question via:");$("#dlgMsg_info").text("Share this question with your friend:");$("#dlgShareEmail_Label").text("e-mail:");
$("#dlgShareEmail_succeedLabel").text("shared via e-mail");$("#dlgShareEmail_sendBtn").text("share");$("#questionRelatedUsersTitle").text("Answered");$("#dlgCoffee_Title").text("Coffee");$("#dlgCoffee_lblSucceed").text("your coffee was sent.");$("#dlgCoffee_sendBtn").text("send");$("#deleteQuestionConfirmDialog_Info").text("Are you sure you want to delete this question?");$("#btnDeleteQuestionYes").text("yes");$("#btnDeleteQuestionNo").text("no");$("#locked_text").html('When oceaner hide her/his answers from settings, the answer is not visible to everyone and you see locked image. for more information: <a href="http://trendocean.com/privacy.html">answer visibility</a>');
$("#qRelated_More").text("more");$("#ichoosethis_onequestion_info").text("i choose! Show me statistics");$("#ichooseact_onequestion").text("i choose");$("#share_actLink").text("share");$("#btnAddComment").text("add comment");$("#btnAnswer").text("answer");$("#btnDeleteQuestion").text("delete question");$("#sepLabel0").text(".");$("#sepLabel1").text(".");$("#sepLabel2").text(".");$("#sepLabel3").text(".");$("#toMark").text("\u00a9 2011 TrendOcean");$("#aboutLink").text("About Us");$("#blogLink").text("Blog");
$("#teamLink").text("Team");$("#businessLink").text("Business");$("#helpLink").text("Help");$("#termsLink").text("Terms");$("#logindock_label").text("Sign in to answer");$("#logindock_label2").text("username:");$("#logindock_label3").text("password:");$("#logindock_label4").text("remember me:");$("#btnLogin").text("sign in");$("#settings_MainBar").text("Settings");$("#following_MainBar").text("Following");$("#followers_MainBar").text("Followers");$("#logout_MainBar").text("Sign Out");$("#myOcean_MainBar").text("My Ocean");
$("#profile_MainBar").text("Profile");$("#trendradar_MainBar").text("trendradar");$("#addQuestion_MainBar").text("add question")}});
