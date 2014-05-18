var mainBarScoreUpdater=null;
var mainBarNotificationCountsUpdater=null;
var mainBarRP="";


function mainBar_refreshInfo(){
    var username=cookie_get(COOKIE_USERNAME);
    var fullname=cookie_get(COOKIE_FULLNAME);
    var userTrend= cookie_get(COOKIE_LOGINUSER_TREND);
    var trendyOrMarginal=TEXT_TRENDY;
    var isMarginal=cookie_get(COOKIE_MARGINAL)

    var score=0;
    if(isMarginal==TEXT_TRUE){
        trendyOrMarginal=TEXT_MARGINAL;
        score=100-parseInt(parseFloat(userTrend)*100);
    }else{
        score=parseInt(parseFloat(userTrend)*100);
    }

    $('#labelMe_MainBar').text(fullname+', '+score+ '% '+trendyOrMarginal);
    $('#username_MainBar').text(username);

    if(cookie_get(COOKIE_PROFILE_VISB)==TEXT_TRUE){
        $('#friends_MainBar').hide();

    }else{
        $('#friends_MainBar').show();
    }
}

function mainBar_initialize(relativePath){

    if(relativePath==null){
        mainBarRP=TEXT_NULL;
    }else{
        mainBarRP=relativePath;
    }

    $('#logout_MainBar').click(function(event) {
        event.preventDefault();
        window.location.href="logout.jsp";
    });

    $('#labelMe_MainBar').click(function(event) {
        event.preventDefault();
    //Do Nothing
    });

    


    var username=cookie_get(COOKIE_USERNAME);


    $('#myOcean_MainBar').attr("href", mainBarRP+PAGE_HOME);
    $('#addQuestion_MainBar').attr("href", mainBarRP+PAGE_ASKQUESTION);
    $('#trendradar_MainBar').attr("href", mainBarRP+PAGE_FINDFRIENDS);
    $('#settings_MainBar').attr("href", mainBarRP+PAGE_ACCOUNT);
    $('#randomText_MainBar').attr("href", mainBarRP+PAGE_ABOUT);

    $('#profile_MainBar').attr("href", mainBarRP+'users/'+username);
    $('#following_MainBar').attr("href", mainBarRP+'follow/'+cookie_get(COOKIE_USERNAME)+ANCHOR_FOLLOWEDS);
    $('#followers_MainBar').attr("href", mainBarRP+'follow/'+cookie_get(COOKIE_USERNAME)+ANCHOR_FOLLOWERS);


    $('#msgs_MainBar').hide();
    $('#msgs_MainBar_Count').hide();
    $('#nondropMsgs_MainBar').hide();

    //Coffees
    $('#coffees_MainBar').attr("title","my coffees");
    $('#coffees_MainBar').attr("href",mainBarRP+username+ANCHOR_MYCOFFEE);

    $('#coffees_MainBar_Count').removeClass();
    $('#coffees_MainBar_Count').addClass("redreal");
    $('#coffees_MainBar_Count').attr("href",mainBarRP+username+ANCHOR_MYCOFFEE);
        

    $('#nondropCoffee_MainBar').attr("title","my coffees");
    $('#nondropCoffee_MainBar').attr("href",mainBarRP+username+ANCHOR_MYCOFFEE);
        

    //Drops
    $('#drops_mainBar').attr("title","my drops");
    $('#drops_MainBar').attr("href",mainBarRP+username+ANCHOR_DROPS);


    $('#drops_MainBar_Count').removeClass();
    $('#drops_MainBar_Count').addClass("redreal");
    $('#drops_MainBar_Count').attr("href",mainBarRP+username+ANCHOR_DROPS);

    $('#nondropDrops_MainBar').attr("title","my drops");
    $('#nondropDrops_MainBar').attr("href",mainBarRP+username+ANCHOR_DROPS);


    //Friends
    $('#friends_MainBar').attr("title","new follower requests");
    $('#friends_MainBar').attr("href",mainBarRP+PAGE_NEWFOLLOWERS);


    $('#friends_MainBar_Count').removeClass();
    $('#friends_MainBar_Count').addClass("redreal");
    $('#friends_MainBar_Count').attr("href",mainBarRP+PAGE_NEWFOLLOWERS);


    $('#nondropFriends_MainBar').attr("title","new follower requests");
    $('#nondropFriends_MainBar').attr("href",mainBarRP+PAGE_NEWFOLLOWERS);


    $('#coffees_MainBar_Count').hide();
    $('#drops_MainBar_Count').hide();
    $('#friends_MainBar_Count').hide();

    mainBar_refreshInfo();
    mainBar_updateScore();
    mainBar_updateNotificationCounts();
    mainBar_startTimer();

}


function mainBar_stopTimer(){
    clearInterval(mainBarNotificationCountsUpdater);
}


function mainBar_startTimer(){
    mainBarNotificationCountsUpdater=setInterval("mainBar_updateNotificationCounts()", UPDATE_MAINBAR_NOTIFICATIONCOUNTS);
}


function mainBar_updateScore(){
    var trend=cookie_get(COOKIE_LOGINUSER_TREND);
    if(trend==null || trend=="0.0"){
        $.ajax({
            url: mainBarRP+'api/trends/'+cookie_get(COOKIE_USERNAME),
            type: "GET",
            success: function(data){
                var scoreObj=$.evalJSON(data);
                $.cookie(COOKIE_LOGINUSER_TREND,scoreObj.trend);
                mainBar_refreshInfo();
            }
        });
    }
    return false;
}

function mainBar_updateNotificationCounts(){

    $('#msgs_MainBar_Count').hide();

    $.ajax({
        url: mainBarRP+'api/messages/public/numberOfNotRead/',
        type: "GET",
        success: function(data){
            var obj=$.evalJSON(data);
            if(obj.notReadPublicMessages=="0"){
                $('#coffees_MainBar_Count').hide();
                $('#coffees_MainBar_Count').text("");
            }else{
                $('#coffees_MainBar_Count').show();
                $('#coffees_MainBar_Count').text(obj.notReadPublicMessages);
            }
        }
    });


    $.ajax({
        url: mainBarRP+'api/users/follow/numberOfFollowRequests/',
        type: "GET",
        success: function(data){
            var obj=$.evalJSON(data);
            if(obj.numberOfFollowRequests=="0"){
                $('#friends_MainBar_Count').hide();
            }else{
                $('#friends_MainBar_Count').show();
                $('#friends_MainBar_Count').text(obj.numberOfFollowRequests);
            }
        }
    });

    
    $.ajax({
        url: mainBarRP+'api/notification/count/',
        type: "GET",
        success: function(data){
            var obj=$.evalJSON(data);
            if(obj.notificationCount=="0"){
                $('#drops_MainBar_Count').hide();
            }else{
                $('#drops_MainBar_Count').show();
                $('#drops_MainBar_Count').text(obj.notificationCount);
            }
        }
    });

    return false;




}


function mainBar_initializeSearch(isSearchPage){

    $('#searchField_MainBar').blur(); //To Display Search Text

    if(isSearchPage){

        $(window).unload(function() {
            $('#searchField_MainBar').val(TEXT_NULL);
            $.cookie("searchContent", null);
        });


        $("#searchButton_MainBar").click(function(event){
            event.preventDefault();
            search_searchInQuestionsOrPeople();
        });

        $('#searchField_MainBar').keydown(function(event) {
            if (event.keyCode == KEY_ENTER) {
                event.preventDefault();
                search_searchInQuestionsOrPeople();
            }
        });

        var searchContent= cookie_get(COOKIE_SEARCH_CONTENT);
        if(searchContent!=null){
            $('#searchField_MainBar').val(searchContent);
            $("#searchButton_MainBar").click();
        }

    }else{

        $("#searchButton_MainBar").click(function(event){
            event.preventDefault();
            var searchContent=$('#searchField_MainBar').val();
            if(searchContent!=null && searchContent!=TEXT_NULL){
                cookie_wrap(COOKIE_SEARCH_CONTENT, searchContent,false);
                window.location.href=mainBarRP+PAGE_SEARCH;
            }
        });

        $('#searchField_MainBar').keydown(function(event) {
            if (event.keyCode == KEY_ENTER) {
                var searchContent=$('#searchField_MainBar').val();
                if(searchContent!=null && searchContent!=TEXT_NULL && searchContent!="Search"){
                    $.cookie("searchContent", searchContent);
                    event.preventDefault();
                    window.location.href=mainBarRP+PAGE_SEARCH;
                }
            }
        });

    }
}


function mainBar_signPageName(pageName){

    if(pageName==MAINBAR_LINK_MYOCEAN){
        $('#myOcean_MainBar').removeClass('nondrop');
        $('#myOcean_MainBar').addClass('nondrop_1');
    }else if(pageName==MAINBAR_LINK_PROFILE){
        if(profileUsername==profileLoginUserName){
            $('#profile_MainBar').removeClass('nondrop');
            $('#profile_MainBar').addClass('nondrop_1');
        }
    }
} 

function mainBar_unsignPageName(pageName){
//Nothing todo
}