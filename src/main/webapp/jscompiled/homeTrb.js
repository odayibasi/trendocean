var homeTrb_userName0=null,homeTrb_userName1=null,homeTrb_trendTitle='<div id="trend_topics" class="setter-label">trend topics</div>',homeTrb_trendTopic='<a class="setter-list" href="trendstopics#TOPIC" target="_blank">TOPIC</a>';function homeTrb_calculateTrends(a,b){$.ajax({url:"api/trends/"+a,type:"GET",success:function(c){profileTrend=$.evalJSON(c).trend;b.text(parseInt(parseFloat(profileTrend)*100));homeTrb_Show()}});return false}
function homeTrb_follow(a){var b;if(a==0){$("#trb0_loader").show();b=homeTrb_userName0}else if(a==1){$("#trb1_loader").show();b=homeTrb_userName1}common_checkPOST()&&$.ajax({url:"api/users/follow/"+b,type:"POST",success:function(){if(a==0)homeTrb_userName0=null;else if(a==1)homeTrb_userName1=null;homeTrb_Random();$("#trb0_loader").hide();$("#trb1_loader").hide()},error:function(c){$("#trb0_loader").hide();$("#trb1_loader").hide();notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG)}});
return false}function homeTrb_close(a){var b;if(a==0)b=homeTrb_userName0;else if(a==1)b=homeTrb_userName1;common_checkPOST()&&$.ajax({url:"api/users/recommendation/"+b,type:"DELETE",success:function(){if(a==0)homeTrb_userName0=null;else if(a==1)homeTrb_userName1=null;homeTrb_Random()},error:function(c){notifyBar_display(ERR_MSG_WEBSERVICE+":"+c.status,ICON_URL_NOTIFY_WRONG);return false}});return false}
function homeTrb_setContent(a,b){$(b+"box").show();$(b+"avatarLink").attr("href",a.username);$(b+"avatar").attr("src",a.smallAvatarURL);$(b+"username").attr("href",a.username);$(b+"username").text(a.username);$(b+"fullname").text(a.fullName);$(b+"friendsCount").text(a.count);homeTrb_calculateTrends(a.username,$(b+"trend"))}function homeTrb_Hide(){$("#homeTrbLayout").hide()}function homeTrb_Show(){$("#homeTrbLayout").show()}
function homeTrb_Random(){$.ajax({url:"api/users/recommendation/random",type:"GET",success:function(a){if(a==null)homeTrb_Hide();else if($.isArray(a.user)){if(homeTrb_userName0==null){homeTrb_userName0=a.user[0].username;homeTrb_setContent(a.user[0],"#trb0_")}if(homeTrb_userName1==null){homeTrb_userName1=a.user[1].username;homeTrb_setContent(a.user[1],"#trb1_")}}else if(homeTrb_userName0==null){homeTrb_userName0=a.user.username;homeTrb_setContent(a.user,"#trb0_");homeTrb_userName1==null&&$("#trb1_box").hide()}else if(homeTrb_userName1==
null){homeTrb_userName1=a.user.username;homeTrb_setContent(a.user,"#trb1_")}},error:function(){homeTrb_Hide()}});return false}function homeTrb_updateTrendTopics(){$("#trend_topics").append(homeTrb_trendTitle);$.ajax({url:"api/questions/tags",type:"GET",success:function(a){if(a!=null&&$.isArray(a.item))for(i=0;i<a.item.length;i++){if(i==6)break;var b=homeTrb_trendTopic.replace(/TOPIC/g,a.item[i]);$("#trend_topics").append(b)}}});return false}
function homeTrb_initialize(){$("#trb0_loader").hide();$("#trb1_loader").hide();$("#trb0_close").click(function(a){a.preventDefault();homeTrb_close(0)});$("#trb1_close").click(function(a){a.preventDefault();homeTrb_close(1)});$("#trb0_follow").click(function(a){a.preventDefault();homeTrb_follow(0)});$("#trb1_follow").click(function(a){a.preventDefault();homeTrb_follow(1)});homeTrb_Hide();homeTrb_Random();homeTrb_updateTrendTopics();$(".setter-list").live("click",function(a){a.preventDefault();home_searchInQuestions($(this).text())})}
;
