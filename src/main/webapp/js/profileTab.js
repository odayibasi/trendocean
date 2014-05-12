var profileTab_RelativePath="";

function profileTab_initialize(relativePath){
    if(relativePath!=null){
        profileTab_RelativePath=relativePath;
    }

    $("#btnPromoted").click(function(event){
        event.preventDefault();
        home_getPromotedQuestions();
    });

    $("#btnFriendsLatest").click(function(event){
        event.preventDefault();
        home_getFollowedQuestions();
    });

    $("#btnMostPopular").click(function(event){
        event.preventDefault();
        home_getPopularQuestions(QUESTIONS_IN_YEAR);
    });

    $("#btnLatest").click(function(event){
        event.preventDefault();
        home_getLatestQuestions();
    });

    $("#btnTodaySpecials").click(function(event){
        event.preventDefault();
        home_getPopularQuestions(QUESTIONS_IN_TODAY);
    });

}

function profileTab_setContent(username, avatarURL){

    if(username==null){
        username=cookie_get(COOKIE_USERNAME);
    }

    if(avatarURL==null){
        avatarURL=cookie_get(COOKIE_AVATAR_SMALL_URL);
    }

    $("#userNameAndLink").text(username);
    $("#userNameAndLink").attr("href",profileTab_RelativePath+"users/"+username);
    $("#userAvatar").attr("src",avatarURL);

}
