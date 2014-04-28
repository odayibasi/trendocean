
function profileMatch_initialize(){
    if(profileLoginUserName!=null && profileLoginUserName!=profileUsername){
        $("#tmLayoutGap").show();
        $("#tmLayout").show();
        $("#tm_Loader").hide();
        $("#tm_MyAvatar").attr("src",cookie_get(COOKIE_AVATAR_SMALL_URL));
        $("#tm_OtherAvatar").attr("src",profileSmallAvatarURL);
        $("#tm_MyAvatarLink").attr("href",profileLoginUserName);
        $("#tm_OtherAvatarLink").attr("href",profileUsername);

        $(".match-bar-in").css("width",0);
        $("#tm_Ratio").text(0);

        $('#tm_BtnMatch').click(function(event){
            event.preventDefault();
            $("#tm_Loader").show();
            $.ajax({
                url: 'api/users/checkmatch/'+profileUsername,
                type: "GET",
                success: function(data){
                    $("#tm_Loader").hide();
                    var matchObj=$.evalJSON(data);
                    var matchRatio=parseInt(parseFloat(matchObj.trend)*100);
                    var matchRatioBar=parseInt(parseFloat(matchObj.trend)*140);
                    $(".match-bar-in").css("width",matchRatioBar);
                    $("#tm_Ratio").text(matchRatio);
                },
                error:function(xhr){
                    $("#tm_Loader").hide();
                }
            });
            return false;
        });
    }else{
        $("#tmLayoutGap").hide();
        $("#tmLayout").hide();
    }
}


