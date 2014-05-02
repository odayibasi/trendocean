
var homeTrb_userName0=null;
var homeTrb_userName1=null;

var homeTrb_trendTitle='<div id="trend_topics" class="setter-label">trend topics</div>'
var homeTrb_trendTopic='<a class="setter-list" href="trendstopics#TOPIC" target="_blank">TOPIC</a>';


function homeTrb_calculateTrends(username, trendComp){

    $.ajax({
        url: 'api/trends/'+username,
        type: "GET",
        success: function(data){
            var scoreObj=$.evalJSON(data);
            profileTrend=scoreObj.trend;
            trendComp.text(parseInt(parseFloat(profileTrend)*100));
            homeTrb_Show();
        }
    });
    return false;
}


function homeTrb_follow(index){

    var username;
    if(index==0){
        $("#trb0_loader").show();
        username=homeTrb_userName0;
    }else if(index==1){
        $("#trb1_loader").show();
        username=homeTrb_userName1;
    }

    if(common_checkPOST()){
        $.ajax({
            url: 'api/users/follow/'+username,
            type: "POST",
            success: function(){
                if(index==0){
                    homeTrb_userName0=null;
                }else if(index==1){
                    homeTrb_userName1=null;
                }
                homeTrb_Random();
                $("#trb0_loader").hide();
                $("#trb1_loader").hide();
            },
            error:function (xhr){
                $("#trb0_loader").hide();
                $("#trb1_loader").hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
    }
    return false;
}

function homeTrb_close(index){

    var username;
    if(index==0){
        username=homeTrb_userName0;
    }else if(index==1){
        username=homeTrb_userName1;
    }

    if(common_checkPOST()){
        $.ajax({
            url: 'api/users/recommendation/'+username,
            type: "DELETE",
            success: function(){
                if(index==0){
                    homeTrb_userName0=null;
                }else if(index==1){
                    homeTrb_userName1=null;
                }
                homeTrb_Random();
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                return false;
            }
        });
    }
    return false;
}




function homeTrb_setContent(data, prefix){
    $(prefix+"box").show();
    $(prefix+"avatarLink").attr("href",data.username);
    $(prefix+"avatar").attr("src",data.smallAvatarURL);
    $(prefix+"username").attr("href",data.username);
    $(prefix+"username").text(data.username);
    $(prefix+"fullname").text(data.fullName);
    $(prefix+"friendsCount").text(data.count);
    homeTrb_calculateTrends(data.username,$(prefix+"trend"));
}


function homeTrb_Hide(){
    $("#homeTrbLayout").hide();
}

function homeTrb_Show(){
    $("#homeTrbLayout").show();
}

function homeTrb_Random(){
    $.ajax({
        url: 'api/users/recommendation/random',
        type: "GET",
        success: function(data){
            if(data==null){
                homeTrb_Hide();
            }else{
                if($.isArray(data.user)){
                    if(homeTrb_userName0==null){
                        homeTrb_userName0=data.user[0].username;
                        homeTrb_setContent(data.user[0], "#trb0_");
                    }

                    if(homeTrb_userName1==null){
                        homeTrb_userName1=data.user[1].username;
                        homeTrb_setContent(data.user[1], "#trb1_");
                    }

                }else{ //Not Array
                    if(homeTrb_userName0==null){
                        homeTrb_userName0=data.user.username;
                        homeTrb_setContent(data.user, "#trb0_");
                        if(homeTrb_userName1==null){
                            $("#trb1_box").hide();
                        }
                    }else if(homeTrb_userName1==null){
                        homeTrb_userName1=data.user.username;
                        homeTrb_setContent(data.user, "#trb1_");
                    }

                }//End of array

            } // data not null

        },
        error:function (xhr){
            homeTrb_Hide();
        }
    });
    return false;
}


function homeTrb_updateTrendTopics(){

    
    $("#trend_topics").append(homeTrb_trendTitle);

    $.ajax({
        url: 'api/qstream/listTag',
        type: "GET",
        success: function(resp){
            var data=resp.data;
            if(data!=null && $.isArray(data)){
                for(i=0;i<data.length;i++){
                    if(i==6) break;
                    var temp=homeTrb_trendTopic;
                    var contentTopic=temp.replace(/TOPIC/g,data[i]);
                    $("#trend_topics").append(contentTopic);
                }
            }
        }
    });
    return false;

}


function homeTrb_initialize(){
    $("#trb0_loader").hide();
    $("#trb1_loader").hide();

    
    $('#trb0_close').click(function(event){
        event.preventDefault();
        homeTrb_close(0);
    });

    $('#trb1_close').click(function(event){
        event.preventDefault();
        homeTrb_close(1);
    });

    $('#trb0_follow').click(function(event){
        event.preventDefault();
        homeTrb_follow(0);
    });

    $('#trb1_follow').click(function(event){
        event.preventDefault();
        homeTrb_follow(1);
    });

    homeTrb_Hide();
    homeTrb_Random();
    homeTrb_updateTrendTopics();

    
    $('.setter-list').live("click",function(event){
        event.preventDefault();
        home_searchInQuestions($(this).text());
    });

}


