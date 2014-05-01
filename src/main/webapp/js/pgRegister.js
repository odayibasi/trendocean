if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_REGISTER, PAGE_HOME,ERR_MSG_ALREADY_SIGNIN);
}else{
    redirection_toClearURL();
}

var minYear=1900;
var maxYear=2100;

function isInteger(s){
    var i;
    for (i = 0; i < s.length; i++){
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function daysInFebruary (year){
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31
        if (i==4 || i==6 || i==9 || i==11) {
            this[i] = 30
        }
        if (i==2) {
            this[i] = 29
        }
    }
    return this
}

function checkDate(day,month, strYear){
    var daysInMonth = DaysArray(12)

    if(!isInteger(strYear)){
        return false;
    }

    year=parseInt(strYear);
    if (day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
        return false
    }


    if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
        return false
    }
    return true
}

function checkUserName(str){

    var strLength=str.length;
    if(strLength < 1 || strLength > 15){
        return false;
    }

    var reg = /^([a-zA-Z0-9_])+$/;
    if(reg.test(str) == false){
        return false;
    }
    return true;
}



function fillCombosWithNormalBrowser(){

    for(i=1;i<32;i++){
        $('#day_register').append( new Option(i+TEXT_NULL,i+TEXT_NULL));
    }

    var months=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct",
        "Nov","Dec");

    $.each(months, function(index,object) {
        $('#month_register').append( new Option(object,index));
    });

    $('#gender_register').append( new Option(TEXT_SELECT,TEXT_SELECT));
    $('#gender_register').append( new Option("Male","MALE"));
    $('#gender_register').append( new Option("Female","FEMALE"));


    $('#education_register').append( new Option(TEXT_SELECT,TEXT_SELECT));
    $('#education_register').append( new Option("Bachelor","BACHELOR"));
    $('#education_register').append( new Option("High School or Lower","HIGH_SCHOOL_OR_LOWER"));
    $('#education_register').append( new Option("Master or Higher","MASTER_OR_HIGHER"));


    $('#country_register').append( new Option(TEXT_SELECT,TEXT_SELECT));
    $('#city_register').append( new Option(TEXT_SELECT,TEXT_SELECT));

    $.ajax({
        url: 'api/registration/listCountry',
        type: "GET",
        success: function(resp){
            var countries=resp.data;
            $.each(countries, function(index, country) {
                $('#country_register').append( new Option(country.name,country.code));
            });
        },
        error:function (xhr){
            var status=xhr.status;
            var responseText=xhr.responseText;

        }
    });


    $('#country_register').change(function() {
        $('#city_register').find('option').remove().end();
        if($('#country_register').val()==TEXT_SELECT){
            $('#city_register').append( new Option(TEXT_SELECT,TEXT_SELECT));
        }else{
            $.ajax({
                url: 'api/registration/listCity',
                data:{
                  "countryCode":$('#country_register').val()
                },
                type: "GET",
                success: function(resp){
                    var cities=resp.data;
                    $.each(cities, function(index, city) {
                        $('#city_register').append( new Option(city.cityName,city.cityCode));
                    });
                },
                error:function (){
                //TODO Comment Out
                //window.location.href='overload.html';
                }
            });
        }
    });
}



function fillCombosWithIE(){

    for(i=1;i<32;i++){
        $('#day_register').append( common_newOption(i+TEXT_NULL,i+TEXT_NULL));
    }

    var months=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct",
        "Nov","Dec");

    $.each(months, function(index,object) {
        $('#month_register').append( common_newOption(object,index));
    });

    $('#gender_register').append( common_newOption(TEXT_SELECT,TEXT_SELECT));
    $('#gender_register').append( common_newOption("Male","MALE"));
    $('#gender_register').append( common_newOption("Female","FEMALE"));


    $('#education_register').append( common_newOption(TEXT_SELECT,TEXT_SELECT));
    $('#education_register').append( common_newOption("Bachelor","BACHELOR"));
    $('#education_register').append( common_newOption("High School or Lower","HIGH_SCHOOL_OR_LOWER"));
    $('#education_register').append( common_newOption("Master or Higher","MASTER_OR_HIGHER"));


    $('#country_register').append( common_newOption(TEXT_SELECT,TEXT_SELECT));
    $('#city_register').append( common_newOption(TEXT_SELECT,TEXT_SELECT));

    $.ajax({
        url: 'api/country/',
        type: "GET",
        success: function(countries){
            var countries=resp.data;
            $.each(countries, function(index, country) {
                $('#country_register').append( common_newOption(country.name,country.code));
            });
        },
        error:function (xhr){
            //window.location.href=PAGE_OVERLOAD;
            var status=xhr.status;
            var responseText=xhr.responseText;

        }
    });


    $('#country_register').change(function() {
        $('#city_register').find('option').remove().end();
        if($('#country_register').val()==TEXT_SELECT){
            $('#city_register').append( common_newOption(TEXT_SELECT,TEXT_SELECT));
        }else{
            $.ajax({
                url: 'api/country/city/',
                data:{
                  "countryCode":$('#country_register').val()
                },
                success: function(cities){
                    var cities=resp.data;
                    $.each(cities, function(index, city) {
                        $('#city_register').append( common_newOption(city.cityName,city.cityCode));
                    });
                },
                error:function (){
                //TODO Comment Out
                //window.location.href='overload.html';
                }
            });
        }
    });
    
}


$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }

    $('#waitingIcon').hide();
    mainLinks_initialize(PAGE_REGISTER);

    /* ===========================================================
     *   CLEAR VALIDATION RESULT DISPLAYERS
     ============================================================*/

    $('#userNameResultMsg').text(TEXT_NULL);
    $('#userNameResultIcon').hide();

    $('#fullNameResultMsg').text(TEXT_NULL);
    $('#fullNameResultIcon').hide();

    $('#eMailResultMsg').text(TEXT_NULL);
    $('#eMailResultIcon').hide();

    $('#passwordResultMsg').text(TEXT_NULL);
    $('#passwordResultIcon').hide();

    $('#genderResultMsg').text(TEXT_NULL);
    $('#genderResultIcon').hide();

    $('#birthdayResultMsg').text(TEXT_NULL);
    $('#birthdayResultIcon').hide();

    $('#countryCityResultMsg').text(TEXT_NULL);
    $('#countryCityResultIcon').hide();

    $('#educationResultMsg').text(TEXT_NULL);
    $('#educationResultIcon').hide();

    $('#iAgreeWithResultMsg').text(TEXT_NULL);
    $('#iAgreeWithResultIcon').hide();

    $('#randomTextResultMsg').text(TEXT_NULL);
    $('#randomTextResultIcon').hide();

    /* ===========================================================
     *   CLEAR VALIDATION RESULT DISPLAYERS
     ============================================================*/

    if ($.browser.msie) {
        fillCombosWithIE();
    }else{
        fillCombosWithNormalBrowser();
    }
    
    /* ===========================================================
     *   CHECK FIELDS VALIDATION
     ============================================================*/

    $('#username_register').change(function(){

        if($('#username_register').val()!=TEXT_NULL){
        
            if(!checkUserName($('#username_register').val())){
                $('#userNameResultMsg').text(ERR_MSG_USERNAME_INVALID_FORMAT);
                $('#userNameResultIcon').show();
                $('#userNameResultIcon').attr("src",ICON_URL_ERR);
            }else{
                $.ajax({
                    url: 'api/registration/checkUsername/',
                    data:{
                      'username':$('#username_register').val()
                    },
                    type: "GET",
                    success: function(resp){
                        if(resp.success){
                            $('#userNameResultMsg').text(INFO_MSG_OK);
                            $('#userNameResultIcon').show();
                            $('#userNameResultIcon').attr("src",ICON_URL_OK);
                        }else{
                            $('#userNameResultMsg').text(ERR_MSG_USERNAME_EXIST);
                            $('#userNameResultIcon').show();
                            $('#userNameResultIcon').attr("src",ICON_URL_ERR);
                        }
                    },
                    error:function (){
                         //TODO Error about servicedown or exception
                    }
                });
            }
        }else{
            $('#userNameResultMsg').text(TEXT_NULL);
            $('#userNameResultIcon').hide();

        }
    });

    $('#fullname_register').change(function(){
        if($('#fullname_register').val()!=TEXT_NULL){
            $('#fullNameResultMsg').text(INFO_MSG_OK);
            $('#fullNameResultIcon').show();
            $('#fullNameResultIcon').attr("src",ICON_URL_OK);
        }else{
            $('#fullNameResultMsg').text(TEXT_NULL);
            $('#fullNameResultIcon').hide();

        }
    });

    $('#email_register').change(function(){
        if($('#email_register').val()!=TEXT_NULL){

            if(!common_checkEmail($('#email_register').val())){
                $('#eMailResultMsg').text(ERR_MSG_EMAIL_INVALID_FORMAT);
                $('#eMailResultIcon').attr("src",ICON_URL_ERR);
                $('#eMailResultIcon').show();
            }else{
                $.ajax({
                    url: 'api/registration/checkEmail/',
                    data:{
                      'email':$('#email_register').val()
                    },
                    type: "GET",
                    success: function(resp){
                        if(resp.success){
                            $('#eMailResultMsg').text(INFO_MSG_OK);
                            $('#eMailResultIcon').attr("src",ICON_URL_OK);
                            $('#eMailResultIcon').show();
                        }else{
                            $('#eMailResultMsg').text(ERR_MSG_EMAIL_EXIST);
                            $('#eMailResultIcon').attr("src",ICON_URL_ERR);
                            $('#eMailResultIcon').show();
                        }
                    },
                    error:function (){
                            //TODO Error about servicedown or exception
                    }
                });
            }
        }else{
            $('#eMailResultMsg').text(TEXT_NULL);
            $('#eMailResultIcon').hide();
        }
    });


    $('#password_register').change(function(){
        if($('#password_register').val()!=TEXT_NULL){
            if(!common_checkPassword($('#password_register').val())){
                $('#passwordResultMsg').text(ERR_MSG_PASSWD_INVALID_FORMAT);
                $('#passwordResultIcon').show();
                $('#passwordResultIcon').attr("src",ICON_URL_ERR)
            }else{
                $('#passwordResultMsg').text(INFO_MSG_OK);
                $('#passwordResultIcon').show();
                $('#passwordResultIcon').attr("src",ICON_URL_OK);
            }
        }else{
            $('#passwordResultMsg').text(TEXT_NULL);
            $('#passwordResultIcon').hide();

        }
    });

    $('#gender_register').change(function(){
        if($('#gender_register').val()!=TEXT_SELECT){
            $('#genderResultMsg').text(INFO_MSG_OK);
            $('#genderResultIcon').show();
            $('#genderResultIcon').attr("src",ICON_URL_OK);
        }else{
            $('#genderResultMsg').text(TEXT_NULL);
            $('#genderResultIcon').hide();
        }
    });


    $('#country_register').change(function(){
        if($('#country_register').val()!=TEXT_SELECT){
            $('#countryCityResultMsg').text(INFO_MSG_OK);
            $('#countryCityResultIcon').show();
            $('#countryCityResultIcon').attr("src",ICON_URL_OK);
        }else{
            $('#countryCityResultMsg').text(TEXT_NULL);
            $('#countryCityResultIcon').hide();
        }
    });


    $('#education_register').change(function(){
        if($('#education_register').val()!=TEXT_SELECT){
            $('#educationResultMsg').text(INFO_MSG_OK);
            $('#educationResultIcon').show();
            $('#educationResultIcon').attr("src",ICON_URL_OK);
        }else{
            $('#educationResultMsg').text(TEXT_NULL);
            $('#educationResultIcon').hide();
        }
    });

    $("#submit_register").click(function(){

        //Validation of Form
        var result=true;

        //Check UserName
        var userName=$('#username_register').val();
        if(userName==TEXT_NULL){
            $('#userNameResultMsg').text(ERR_MSG_USERNAME_EMPTY);
            $('#userNameResultIcon').show();
            $('#userNameResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }else{
            if($('#userNameResultMsg').text()!=INFO_MSG_OK){
                result=false;
            }
        }

        //Check FullName
        var fullName=$('#fullname_register').val();
        if(fullName==TEXT_NULL){
            $('#fullNameResultMsg').text(ERR_MSG_FULLNAME_EMPTY);
            $('#fullNameResultIcon').show();
            $('#fullNameResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }

        //Check Email
        var email=$('#email_register').val();
        if(email==TEXT_NULL){
            $('#eMailResultMsg').text(ERR_MSG_EMAIL_EMPTY);
            $('#eMailResultIcon').show();
            $('#eMailResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }else{
            if($('#eMailResultMsg').text()!="ok"){
                result=false;
            }
        }

        //Check Password
        var password=$('#password_register').val();
        if(password==TEXT_NULL){
            $('#passwordResultMsg').text(ERR_MSG_PASSWD_EMPTY);
            $('#passwordResultIcon').show();
            $('#passwordResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }

        //Check Gender
        var gender=$('#gender_register').val();
        if(gender==TEXT_SELECT){
            $('#genderResultMsg').text(ERR_MSG_GENDER_EMPTY);
            $('#genderResultIcon').show();
            $('#genderResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }

        //Check Birth
        var day=parseInt($('#day_register').val());
        var month=parseInt($('#month_register').val())+1;
        var strYear=$('#year_register').val();
        var birthDate=0;
        var resultDate=checkDate(day,month,strYear);
        if(!resultDate){
            $('#birthdayResultMsg').text(ERR_MSG_BIRTH_INVALID);
            $('#birthdayResultIcon').show();
            $('#birthdayResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }else{
            $('#birthdayResultMsg').text(TEXT_NULL);
            $('#birthdayResultIcon').hide();
            birthDate=Date.parse(month+"/"+day+"/"+strYear)
        }



        //Check Country And City
        var cityCode=$('#city_register').val();
        var cityName=$("#city_register option:selected").text();
        var countryCode=$('#country_register').val();
        var countryName=$("#country_register option:selected").text();


        if(cityCode==TEXT_SELECT){
            $('#countryCityResultMsg').text(ERR_MSG_COUNTRYANDCITY_EMPTY);
            $('#countryCityResultIcon').show();
            $('#countryCityResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }


        //Education
        var education=$('#education_register').val();
        if(education==TEXT_SELECT){
            $('#educationResultMsg').text(ERR_MSG_EDUCATION_EMPTY);
            $('#educationResultIcon').show();
            $('#educationResultIcon').attr("src",ICON_URL_ERR);
            result=false;
        }


        //I agree With Terms
        var agreeTerms=$('#iAggre_terms:checked').val();
        if(agreeTerms==undefined){
            $('#iAgreeWithResultMsg').text(ERR_MSG_UNCHECK_IAGREE_TERMS);
            $('#iAgreeWithResultIcon').attr("src",ICON_URL_ERR);
            $('#iAgreeWithResultIcon').show();
            return false;
        }else{
            $('#iAgreeWithResultMsg').text(TEXT_NULL);
            $('#iAgreeWithResultIcon').hide();
        }

        if(result){
            $('#waitingIcon').show();
            var user = new Object();

            var userJSON = $.toJSON(user);
            $.ajax({
                url: 'api/registration/addUser',
                type: "POST",
                data: {
                    'username': userName,
                    'fullName': fullName,
                    'password': password,
                    'gender': gender,
                    'email': email,
                    'education': education,
                    'birthday':birthDate,
                    'cityCode':cityCode,
                    'cityName':cityName,
                    'countryCode': countryCode,
                    'countryName': countryName,
                },
                success: function(resp){
                    cookie_saveLoginUser(resp.data);
                    window.location.href="home.html";
                },
                error:function (xhr){
                    //window.location.href=PAGE_OVERLOAD;
                    var status=xhr.status;
                    var responseText=xhr.responseText;
                }
            });
        }
        return false;
    });

    common_preventScreenFlash();
});





 