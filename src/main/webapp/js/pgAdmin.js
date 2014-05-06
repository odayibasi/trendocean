$(document).ready(function() {


    $('#btnSendNews').click(function(event){
        event.preventDefault();
        $.ajax({
            url: 'api/admin/sendnews/'+$('#txtNews').val(),
            async:false,
            type: "POST",
            success: function(){
                alert("News Sended Succeed")
            },
            error:function (xhr){
                alert("News Failed")
            }
        });
        return false;
    });


    $('#btnUpdateODTU').click(function(event){
        event.preventDefault();
        var liveplayercapability = new Object();
        liveplayercapability.source= "http://ideas.ceit.metu.edu.tr/asx/RadioODTU.asx";
        liveplayercapability.slogan= "Hayatın sesini aç!"
        var liveplayercapabilityJSON = $.toJSON(liveplayercapability);

        $.ajax({
            url: 'api/users/capabilityofliveplayer',
            type: "PUT",
            data: (liveplayercapabilityJSON),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                cookie_saveLoginUser(data,false); //TODO change false
            },
            error:function (xhr){
                xhr=xhr;
            }
        });
        return false;
    });

    $('#btnSubmit').click(function(event){
        event.preventDefault();
        $('#usernames').html("");
        var thDays=$('#txtLastLogin').val();
        var askedCount=$('#txtAskedCount').val();
        var answeredCount=$('#txtAnswerCount').val();

        var ONE_DAY = 1000 * 60 * 60 * 24;
        var lstLogin=new Date().getTime()-ONE_DAY*parseInt(thDays);


        $.ajax({
            url: 'api/admin/userprofiles?thLogin='+lstLogin+'&thAsked='+askedCount+'&thAnswered='+answeredCount,
            type: "GET",
            success: function(data){

                var profiles=null;

                if(data==null){
                    data=new Object();
                    profiles=null;
                }else if($.isArray(data.profile)){
                    profiles=data.profile;
                }else{
                    profiles=new Array(data.profile);
                }


                $.each(profiles, function(index, object) {

                    //username
                    var username="@"+object.username;
                    var replacePattern =/@(\w+)/gim;
                    var usernameLink = username.replace(replacePattern, '@<a href="http://trendocean.com/$1">$1</a>');
                    $('#usernames').append(usernameLink);

                    //lastlogin
                    var epoc=object.latestLoginTime*1;
                    var datum = new Date(epoc);
                    $('#usernames').append(' <b>lastlogin:</b>'+common_getRemainingTime(datum));
                    $('#usernames').append(' <b>asked:</b>'+object.questionsAsked);
                    $('#usernames').append(' <b>answered:</b>'+object.questionsAnswered);
                    $('#usernames').append(' <b>loved:</b>'+object.questionsFavedCount);
                    $('#usernames').append(' <b>followed:</b>'+object.followedCount);
                    $('#usernames').append(' <b>follower:</b>'+object.followerCount);
                    $('#usernames').append("<br>");
                });
            },
            error:function (xhr){
                alert(xhr.status);
            }
        });

    });




});





