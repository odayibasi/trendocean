$(document).ready(function() {

    theme_processDesign();
    document.title="TrendOcean / "+cookie_get(COOKIE_USERNAME)+"'s account";
    mainBar_signPageName(MAINBAR_LINK_SETTING);
    $(window).unload(function() {
        $.ajax({
            async:false,
            url:'api/users/'+cookie_get(COOKIE_USERNAME),
            type: "GET",
            success: function(data){
                cookie_wrap(COOKIE_AVATAR_SMALL_URL, data.smallAvatarURL);
                cookie_wrap(COOKIE_AVATAR_LARGE_URL, data.largeAvatarURL);
                $('#avatarID').attr("src",data.smallAvatarURL);
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
        mainBar_unsignPageName(MAINBAR_LINK_SETTING);
    });

    $("#icoWaiting").hide();
    mainBar_initialize();
    mainBar_initializeSearch(false);
    notifyBar_initialize();
    mainLinks_initialize(PAGE_ACCOUNT);
    
    //Load From Cookies
    var username=cookie_get(COOKIE_USERNAME);
    var email=cookie_get(COOKIE_EMAIL);
    var countryCode=cookie_get(COOKIE_COUNTRY_CODE);


    var about=cookie_get(COOKIE_ABOUT);
    var gender=cookie_get(COOKIE_GENDER);
    var language=cookie_get(COOKIE_LANGUAGE);
    var education=cookie_get(COOKIE_EDUCATION);
    var cityID=cookie_get(COOKIE_CITY_ID)
    var marginal=cookie_get(COOKIE_MARGINAL);
    var fullName=cookie_get(COOKIE_FULLNAME);
    var birthday=cookie_get(COOKIE_BIRTH);
    var smallAvatarURL=cookie_get(COOKIE_AVATAR_SMALL_URL);

    var answerVisibility=cookie_get(COOKIE_ANSWER_VISB);
    var emailVisibility=cookie_get(COOKIE_EMAIL_VISB);
    var profileVisibility=cookie_get(COOKIE_PROFILE_VISB);


    if ($.browser.msie) {

        if(about==null){ //For IE
            about="";
        }


        $('#gender_register').append( common_newOption(TEXT_SELECT,TEXT_SELECT));
        $('#gender_register').append( common_newOption(TEXT_MALE,TEXT_MALE_BIG));
        $('#gender_register').append( common_newOption(TEXT_FEMALE,TEXT_FEMALE_BIG));

        $('#education_account').append( common_newOption("Bachelor","BACHELOR"));
        $('#education_account').append( common_newOption("High School or Lower","HIGH_SCHOOL_OR_LOWER"));
        $('#education_account').append( common_newOption("Master or Higher","MASTER_OR_HIGHER"));

        $('#answerprivacy_account').append( common_newOption("Only Me","ONLY_ME"));
        $('#answerprivacy_account').append( common_newOption("Only Friends","ONLY_FRIENDS"));
        $('#answerprivacy_account').append( common_newOption("Everyone","EVERYONE"));

        $('#language_account').append( common_newOption("English","EN"));
        //$('#language_account').append( new Option("Türkçe","TR"));

        $('#gender_account').append( common_newOption("Male","MALE"));
        $('#gender_account').append( common_newOption("Female","FEMALE"));


        for(i=1;i<32;i++){
            $('#day_account').append( common_newOption(i+TEXT_NULL,i+TEXT_NULL));
        }

        var months=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct",
            "Nov","Dec");

        $.each(months, function(index,object) {
            $('#month_account').append( common_newOption(object,index));
        });

        $.ajax({
            url: 'api/country/',
            type: "GET",
            success: function(countries){

                $.each(countries.country, function(index, object) {
                    $('#country_account').append( common_newOption(object.name,object.code)); //object.name=Country Name
                });
                $('select#country_account').val(countryCode);
                $('select#country_account').change();


            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });


        $('#country_account').change(function() {
            $('#city_account').find('option').remove().end();

            $.ajax({
                url: 'api/country/'+$('#country_account').val()+'/cities/',
                type: "GET",
                success: function(cities){
                    if($.isArray(cities.city_or_state)){
                        $.each(cities.city_or_state, function(index, object) {
                            $('#city_account').append( common_newOption(object.cityName,object.id));
                        });
                    }else{
                        $('#city_account').append( common_newOption(cities.city_or_state.cityName,cities.city_or_state.id));
                    }
                    $('select#city_account').val(cityID);

                },
                error:function (xhr){
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
        });
    }else{
        $('#gender_register').append( new Option(TEXT_SELECT,TEXT_SELECT));
        $('#gender_register').append( new Option(TEXT_MALE,TEXT_MALE_BIG));
        $('#gender_register').append( new Option(TEXT_FEMALE,TEXT_FEMALE_BIG));

        $('#education_account').append( new Option("Bachelor","BACHELOR"));
        $('#education_account').append( new Option("High School or Lower","HIGH_SCHOOL_OR_LOWER"));
        $('#education_account').append( new Option("Master or Higher","MASTER_OR_HIGHER"));
    
        $('#answerprivacy_account').append( new Option("Only Me","ONLY_ME"));
        $('#answerprivacy_account').append( new Option("Only Friends","ONLY_FRIENDS"));
        $('#answerprivacy_account').append( new Option("Everyone","EVERYONE"));
  
        $('#language_account').append( new Option("English","EN"));
        //$('#language_account').append( new Option("Türkçe","TR"));
    
        $('#gender_account').append( new Option("Male","MALE"));
        $('#gender_account').append( new Option("Female","FEMALE"));


        for(i=1;i<32;i++){
            $('#day_account').append( new Option(i+TEXT_NULL,i+TEXT_NULL));
        }

        var months2=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct",
            "Nov","Dec");

        $.each(months2, function(index,object) {
            $('#month_account').append( new Option(object,index));
        });

        $.ajax({
            url: 'api/country/',
            type: "GET",
            success: function(countries){

                $.each(countries.country, function(index, object) {
                    $('#country_account').append( new Option(object.name,object.code)); //object.name=Country Name
                });
                $('select#country_account').val(countryCode);
                $('select#country_account').change();


            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });


        $('#country_account').change(function() {
            $('#city_account').find('option').remove().end();

            $.ajax({
                url: 'api/country/'+$('#country_account').val()+'/cities/',
                type: "GET",
                success: function(cities){
                    if($.isArray(cities.city_or_state)){
                        $.each(cities.city_or_state, function(index, object) {
                            $('#city_account').append( new Option(object.cityName,object.id));
                        });
                    }else{
                        $('#city_account').append( new Option(cities.city_or_state.cityName,cities.city_or_state.id));
                    }
                    $('select#city_account').val(cityID);

                },
                error:function (xhr){
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
        });
    } //end of else


    $('#avatarID').attr("src",smallAvatarURL);
    $('#acountUserName').val(username);
    $('#fullname_account').val(fullName);
    $('select#education_account').val(education);
    $('#email_account').val(email);
    $('#about_account').val(about);
    $('#fullName_account').val(fullName);
    $('#answerprivacy_account').val(answerVisibility);

    if(emailVisibility==TEXT_FALSE){
        $('#emailprivacy_account').attr('checked','checked');
    }

    if(profileVisibility==TEXT_FALSE){
        $('#privacy_account').attr('checked','checked');
    }

    if(marginal==TEXT_TRUE){
        $('#marginal').attr('checked','checked');
    }else{
        $('#trend').attr('checked','checked');
    }

    $("#btnSaveAvatar").click(function(event){
            event.preventDefault();
    });

    $("#btnDeleteAvatar").click(function(event){
        event.preventDefault();
        $.ajax({
            url: 'api/users/avatar',
            type: "DELETE",
            success: function(){
                window.location.href=jQuery.url.attr("source");
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
        return false;
    });

    $("#saveAccount").click(function(event){
        event.preventDefault();

        if($('#fullname_account').val().length==0){
            notifyBar_display("fullname is empty",ICON_URL_NOTIFY_WRONG);
        }else if(common_checkPOST()){
            $("#icoWaiting").show();
            var profile = new Object();
            profile.username=username;
            profile.fullName = $('#fullname_account').val();
            profile.gender = gender;
            profile.birthday = birthday;
            profile.about=$('#about_account').val();
            profile.language=language;//$('#language_account').val();
            profile.education=$('#education_account').val();
            profile.countryCode= $('#countr_account').val();
            profile.cityID= $('#city_account').val();
            profile.answerVisibility = $('#answerprivacy_account').val();
            profile.emailPublic=!$('#emailprivacy_account').is(':checked');
            profile.profilePublic=!$('#privacy_account').is(':checked');
            profile.marginal=$('#marginal').is(':checked');
            profile.email = $('#email_account').val();
      
            var profileJSON = $.toJSON(profile);

            $.ajax({
                url: 'api/users/profile',
                type: "PUT",
                data: (profileJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    $("#icoWaiting").hide();
                    cookie_saveLoginUser(data,false);
                    mainBar_refreshInfo();
                    notifyBar_display(INFO_MSG_ACCOUNT_CHANGED,ICON_URL_NOTIFY_TRUE);
                },
                error:function (xhr){
                    $("#icoWaiting").hide();
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
        }
        return false;
    });
});





