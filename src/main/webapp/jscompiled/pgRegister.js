cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL?redirection_execute(PAGE_REGISTER,PAGE_HOME,ERR_MSG_ALREADY_SIGNIN):redirection_toClearURL();var minYear=1900,maxYear=2100;function isInteger(a){var b;for(b=0;b<a.length;b++){var c=a.charAt(b);if(c<"0"||c>"9")return false}return true}function daysInFebruary(a){return a%4==0&&(a%100!=0||a%400==0)?29:28}function DaysArray(a){for(var b=1;b<=a;b++){this[b]=31;if(b==4||b==6||b==9||b==11)this[b]=30;if(b==2)this[b]=29}return this}
function checkDate(a,b,c){var d=DaysArray(12);if(!isInteger(c))return false;year=parseInt(c);if(a<1||a>31||b==2&&a>daysInFebruary(year)||a>d[b])return false;if(c.length!=4||year==0||year<minYear||year>maxYear)return false;return true}function checkUserName(a){var b=a.length;if(b<1||b>15)return false;if(/^([a-zA-Z0-9_])+$/.test(a)==false)return false;return true}
function checkCaptcha(){if($("#captcha_register").val()!=TEXT_NULL)$.ajax({async:false,url:"api/captcha/"+$("#captcha_register").val(),type:"POST",success:function(){$("#randomTextResultMsg").text(INFO_MSG_OK);$("#randomTextResultIcon").attr("src",ICON_URL_OK);$("#randomTextResultIcon").show()},error:function(){$("#randomTextResultMsg").text(ERR_MSG_CAPTCHA_INVALID);$("#randomTextResultIcon").attr("src",ICON_URL_ERR);$("#randomTextResultIcon").show()}});else{$("#randomTextResultMsg").text(TEXT_NULL);
$("#randomTextResultIcon").hide()}return false}
function fillCombosWithNormalBrowser(){for(i=1;i<32;i++)$("#day_register").append(new Option(i+TEXT_NULL,i+TEXT_NULL));$.each(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],function(a,b){$("#month_register").append(new Option(b,a))});$("#gender_register").append(new Option(TEXT_SELECT,TEXT_SELECT));$("#gender_register").append(new Option("Male","MALE"));$("#gender_register").append(new Option("Female","FEMALE"));$("#education_register").append(new Option(TEXT_SELECT,TEXT_SELECT));
$("#education_register").append(new Option("Bachelor","BACHELOR"));$("#education_register").append(new Option("High School or Lower","HIGH_SCHOOL_OR_LOWER"));$("#education_register").append(new Option("Master or Higher","MASTER_OR_HIGHER"));$("#country_register").append(new Option(TEXT_SELECT,TEXT_SELECT));$("#city_register").append(new Option(TEXT_SELECT,TEXT_SELECT));$.ajax({url:"api/country/",type:"GET",success:function(a){$.each(a.country,function(b,c){$("#country_register").append(new Option(c.name,
c.code))})},error:function(){}});$("#country_register").change(function(){$("#city_register").find("option").remove().end();$("#country_register").val()==TEXT_SELECT?$("#city_register").append(new Option(TEXT_SELECT,TEXT_SELECT)):$.ajax({url:"api/country/"+$("#country_register").val()+"/cities/",type:"GET",success:function(a){$.isArray(a.city_or_state)?$.each(a.city_or_state,function(b,c){$("#city_register").append(new Option(c.cityName,c.id))}):$("#city_register").append(new Option(a.city_or_state.cityName,
a.city_or_state.id))},error:function(){}})})}
function fillCombosWithIE(){for(i=1;i<32;i++)$("#day_register").append(common_newOption(i+TEXT_NULL,i+TEXT_NULL));$.each(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],function(a,b){$("#month_register").append(common_newOption(b,a))});$("#gender_register").append(common_newOption(TEXT_SELECT,TEXT_SELECT));$("#gender_register").append(common_newOption("Male","MALE"));$("#gender_register").append(common_newOption("Female","FEMALE"));$("#education_register").append(common_newOption(TEXT_SELECT,
TEXT_SELECT));$("#education_register").append(common_newOption("Bachelor","BACHELOR"));$("#education_register").append(common_newOption("High School or Lower","HIGH_SCHOOL_OR_LOWER"));$("#education_register").append(common_newOption("Master or Higher","MASTER_OR_HIGHER"));$("#country_register").append(common_newOption(TEXT_SELECT,TEXT_SELECT));$("#city_register").append(common_newOption(TEXT_SELECT,TEXT_SELECT));$.ajax({url:"api/country/",type:"GET",success:function(a){$.each(a.country,function(b,
c){$("#country_register").append(common_newOption(c.name,c.code))})},error:function(){}});$("#country_register").change(function(){$("#city_register").find("option").remove().end();$("#country_register").val()==TEXT_SELECT?$("#city_register").append(common_newOption(TEXT_SELECT,TEXT_SELECT)):$.ajax({url:"api/country/"+$("#country_register").val()+"/cities/",type:"GET",success:function(a){$.isArray(a.city_or_state)?$.each(a.city_or_state,function(b,c){$("#city_register").append(common_newOption(c.cityName,
c.id))}):$("#city_register").append(common_newOption(a.city_or_state.cityName,a.city_or_state.id))},error:function(){}})})}
$(document).ready(function(){if(!(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL||redirection_isURLContainsSSLOrWWW())){$("#waitingIcon").hide();mainLinks_initialize(PAGE_REGISTER);$("#userNameResultMsg").text(TEXT_NULL);$("#userNameResultIcon").hide();$("#fullNameResultMsg").text(TEXT_NULL);$("#fullNameResultIcon").hide();$("#eMailResultMsg").text(TEXT_NULL);$("#eMailResultIcon").hide();$("#passwordResultMsg").text(TEXT_NULL);$("#passwordResultIcon").hide();$("#genderResultMsg").text(TEXT_NULL);$("#genderResultIcon").hide();
$("#birthdayResultMsg").text(TEXT_NULL);$("#birthdayResultIcon").hide();$("#countryCityResultMsg").text(TEXT_NULL);$("#countryCityResultIcon").hide();$("#educationResultMsg").text(TEXT_NULL);$("#educationResultIcon").hide();$("#iAgreeWithResultMsg").text(TEXT_NULL);$("#iAgreeWithResultIcon").hide();$("#randomTextResultMsg").text(TEXT_NULL);$("#randomTextResultIcon").hide();$.browser.msie?fillCombosWithIE():fillCombosWithNormalBrowser();$("#username_register").change(function(){if($("#username_register").val()!=
TEXT_NULL)if(checkUserName($("#username_register").val()))$.ajax({url:"api/registration/checkusername/"+$("#username_register").val(),type:"GET",success:function(){$("#userNameResultMsg").text(INFO_MSG_OK);$("#userNameResultIcon").show();$("#userNameResultIcon").attr("src",ICON_URL_OK)},error:function(){$("#userNameResultMsg").text(ERR_MSG_USERNAME_EXIST);$("#userNameResultIcon").show();$("#userNameResultIcon").attr("src",ICON_URL_ERR)}});else{$("#userNameResultMsg").text(ERR_MSG_USERNAME_INVALID_FORMAT);
$("#userNameResultIcon").show();$("#userNameResultIcon").attr("src",ICON_URL_ERR)}else{$("#userNameResultMsg").text(TEXT_NULL);$("#userNameResultIcon").hide()}});$("#fullname_register").change(function(){if($("#fullname_register").val()!=TEXT_NULL){$("#fullNameResultMsg").text(INFO_MSG_OK);$("#fullNameResultIcon").show();$("#fullNameResultIcon").attr("src",ICON_URL_OK)}else{$("#fullNameResultMsg").text(TEXT_NULL);$("#fullNameResultIcon").hide()}});$("#email_register").change(function(){if($("#email_register").val()!=
TEXT_NULL)if(common_checkEmail($("#email_register").val()))$.ajax({url:"api/registration/checkemail/"+$("#email_register").val(),type:"GET",success:function(){$("#eMailResultMsg").text(INFO_MSG_OK);$("#eMailResultIcon").attr("src",ICON_URL_OK);$("#eMailResultIcon").show()},error:function(){$("#eMailResultMsg").text(ERR_MSG_EMAIL_EXIST);$("#eMailResultIcon").attr("src",ICON_URL_ERR);$("#eMailResultIcon").show()}});else{$("#eMailResultMsg").text(ERR_MSG_EMAIL_INVALID_FORMAT);$("#eMailResultIcon").attr("src",
ICON_URL_ERR);$("#eMailResultIcon").show()}else{$("#eMailResultMsg").text(TEXT_NULL);$("#eMailResultIcon").hide()}});$("#password_register").change(function(){if($("#password_register").val()!=TEXT_NULL)if(common_checkPassword($("#password_register").val())){$("#passwordResultMsg").text(INFO_MSG_OK);$("#passwordResultIcon").show();$("#passwordResultIcon").attr("src",ICON_URL_OK)}else{$("#passwordResultMsg").text(ERR_MSG_PASSWD_INVALID_FORMAT);$("#passwordResultIcon").show();$("#passwordResultIcon").attr("src",
ICON_URL_ERR)}else{$("#passwordResultMsg").text(TEXT_NULL);$("#passwordResultIcon").hide()}});$("#gender_register").change(function(){if($("#gender_register").val()!=TEXT_SELECT){$("#genderResultMsg").text(INFO_MSG_OK);$("#genderResultIcon").show();$("#genderResultIcon").attr("src",ICON_URL_OK)}else{$("#genderResultMsg").text(TEXT_NULL);$("#genderResultIcon").hide()}});$("#country_register").change(function(){if($("#country_register").val()!=TEXT_SELECT){$("#countryCityResultMsg").text(INFO_MSG_OK);
$("#countryCityResultIcon").show();$("#countryCityResultIcon").attr("src",ICON_URL_OK)}else{$("#countryCityResultMsg").text(TEXT_NULL);$("#countryCityResultIcon").hide()}});$("#education_register").change(function(){if($("#education_register").val()!=TEXT_SELECT){$("#educationResultMsg").text(INFO_MSG_OK);$("#educationResultIcon").show();$("#educationResultIcon").attr("src",ICON_URL_OK)}else{$("#educationResultMsg").text(TEXT_NULL);$("#educationResultIcon").hide()}});$("#submit_register").click(function(){var a=
true;if($("#username_register").val()==TEXT_NULL){$("#userNameResultMsg").text(ERR_MSG_USERNAME_EMPTY);$("#userNameResultIcon").show();$("#userNameResultIcon").attr("src",ICON_URL_ERR);a=false}else if($("#userNameResultMsg").text()!=INFO_MSG_OK)a=false;if($("#fullname_register").val()==TEXT_NULL){$("#fullNameResultMsg").text(ERR_MSG_FULLNAME_EMPTY);$("#fullNameResultIcon").show();$("#fullNameResultIcon").attr("src",ICON_URL_ERR);a=false}if($("#email_register").val()==TEXT_NULL){$("#eMailResultMsg").text(ERR_MSG_EMAIL_EMPTY);
$("#eMailResultIcon").show();$("#eMailResultIcon").attr("src",ICON_URL_ERR);a=false}else if($("#eMailResultMsg").text()!="ok")a=false;if($("#password_register").val()==TEXT_NULL){$("#passwordResultMsg").text(ERR_MSG_PASSWD_EMPTY);$("#passwordResultIcon").show();$("#passwordResultIcon").attr("src",ICON_URL_ERR);a=false}if($("#gender_register").val()==TEXT_SELECT){$("#genderResultMsg").text(ERR_MSG_GENDER_EMPTY);$("#genderResultIcon").show();$("#genderResultIcon").attr("src",ICON_URL_ERR);a=false}var b=
parseInt($("#day_register").val()),c=parseInt($("#month_register").val())+1,d=$("#year_register").val(),e=0;if(checkDate(b,c,d)){$("#birthdayResultMsg").text(TEXT_NULL);$("#birthdayResultIcon").hide();e=Date.parse(c+"/"+b+"/"+d)}else{$("#birthdayResultMsg").text(ERR_MSG_BIRTH_INVALID);$("#birthdayResultIcon").show();$("#birthdayResultIcon").attr("src",ICON_URL_ERR);a=false}b=$("#city_register").val();if(b==TEXT_SELECT){$("#countryCityResultMsg").text(ERR_MSG_COUNTRYANDCITY_EMPTY);$("#countryCityResultIcon").show();
$("#countryCityResultIcon").attr("src",ICON_URL_ERR);a=false}if($("#education_register").val()==TEXT_SELECT){$("#educationResultMsg").text(ERR_MSG_EDUCATION_EMPTY);$("#educationResultIcon").show();$("#educationResultIcon").attr("src",ICON_URL_ERR);a=false}if($("#iAggre_terms:checked").val()==undefined){$("#iAgreeWithResultMsg").text(ERR_MSG_UNCHECK_IAGREE_TERMS);$("#iAgreeWithResultIcon").attr("src",ICON_URL_ERR);$("#iAgreeWithResultIcon").show();return false}else{$("#iAgreeWithResultMsg").text(TEXT_NULL);
$("#iAgreeWithResultIcon").hide()}if($("#captcha_register").val()==TEXT_NULL){$("#randomTextResultMsg").text(ERR_MSG_CAPTCHA_EMPTY);$("#randomTextResultIcon").show();$("#randomTextResultIcon").attr("src",ICON_URL_ERR);a=false}else{checkCaptcha();if($("#randomTextResultMsg").text()!=INFO_MSG_OK)a=false}if(a){$("#waitingIcon").show();a={};a.username=$("#username_register").val();a.fullName=$("#fullname_register").val();a.password=$("#password_register").val();a.gender=$("#gender_register").val();a.email=
$("#email_register").val();a.education=$("#education_register").val();a.birthday=e;a.cityID=b;e=$.toJSON(a);$.ajax({url:"api/registration",type:"POST",data:e,dataType:"json",contentType:"application/json; charset=utf-8",success:function(f){cookie_saveLoginUser(f);window.location.href="home.html"},error:function(){}})}return false});common_preventScreenFlash()}});
