//STATUS CODE
var HTTP_STATUS_OK=200; // Success!
var HTTP_STATUS_NOT_MODIFIED=304; //There was no new data to return.
var HTTP_STATUS_BAD_REQUEST=400; //The request was invalid. An accompanying error message will explain why. This is the status code will be returned during rate limiting.
var HTTP_STATUS_UNAUTHORIZED=401; //Authentication credentials were missing or incorrect.
var HTTP_STATUS_FORBIDDEN=403; //The request is understood, but it has been refused. An accompanying error message will explain why. This code is used when requests are being denied due to update limits.
var HTTP_STATUS_NOT_FOUND=404; //Not Found: The URI requested is invalid or the resource requested, such as a user, does not exists.
var HTTP_STATUS_NOT_ACCAtblPodcasts=406;  //Not AccetblPodcasts: Returned by the Search API when an invalid format is specified in the request.
var HTTP_STATUS_ENHANCE_YOUR_CALM=420;  //Returned by the Search and Trends API when you are being rate limited.
var HTTP_STATUS_INTERNAL_SERVER_ERROR=500; //Internal Server Error: Something is broken. Please post to the group so the Twitter team can investigate.
var HTTP_STATUS_BAD_GATEWAY=500; //Twitter is down or being upgraded.
var HTTP_STATUS_SERVICE_UNAVAILABLE=503; //The Twitter servers are up, but overloaded with requests. Try again later.


//CONTENT PROCESS
var CONTENT_PROCESS_FOR_ASKED_QUESTION_PREVIEW=0; // Only Media
var CONTENT_PROCESS_FOR_QUESTION_TABLE=1; // Media & #@ & Links
var CONTENT_PROCESS_FOR_ONE_QUESTION=2; // Media & #@ & Links
var CONTENT_PROCESS_FOR_COMMENT=2; // Media & #@ & Links




//API
var API_PROFILE_MYQUESTIONS='api/questions/byuser/';
var API_PROFILE_ANSWEREDS='api/questions/answered/';
var API_PROFILE_FAVS='api/favorites/';
var API_PROFILE_COFFEES='api/messages/public/';


//COOKIE
var COOKIE_REDIRECTION_SRC="redirection_source";
var COOKIE_REDIRECTION_PAGE="redirection_page";
var COOKIE_REDIRECTION_MSG="redirection_msg";
var COOKIE_REDIRECTION_ICON="redirection_icon";

var COOKIE_SEARCH_CONTENT="searchContent";

var COOKIE_ABOUT="about";
var COOKIE_ACOUNT_STATE="acountstate";
var COOKIE_BIRTH="birthday";
var COOKIE_BG_TILED="background_tiled";
var COOKIE_BG_URL="background_url";
var COOKIE_BG_COLOR="background_color";
var COOKIE_CITY="city";
var COOKIE_CITY_ID="city_id";
var COOKIE_COUNTRY="country";
var COOKIE_COUNTRY_CODE="country_code";
var COOKIE_EDUCATION="education";
var COOKIE_EMAIL="email";
var COOKIE_FALLOWED_COUNT="fallowed_count";
var COOKIE_FALLOWER_COUNT="fallower_count";
var COOKIE_AVATAR_SMALL_URL="avatar_small_url";
var COOKIE_AVATAR_LARGE_URL="avatar_large_url";
var COOKIE_FULLNAME="fullname";
var COOKIE_GENDER="gender";
var COOKIE_LANGUAGE="language";
var COOKIE_MARGINAL="marginal";
var COOKIE_QUESTION_ANSWERED="question_answered";
var COOKIE_QUESTION_ASKED="question_asked";
var COOKIE_QUESTION_FAVED="question_faved";
var COOKIE_USERQUESTIONS_FAVED="userquestions_faved";
var COOKIE_THEME_NAME="theme_name";

var COOKIE_ANSWER_VISB="answer_visibility";
var COOKIE_EMAIL_VISB="email_visibility";
var COOKIE_PROFILE_VISB="profile_visibility";

var COOKIE_NOTFY_WHENFRIENDASKEDQUESTION="notify_whenfriendaskedquestion";
var COOKIE_NOTFY_WHENMYQUESTIONARELOVED="notify_whenmyquestionareloved";
var COOKIE_NOTFY_WHENMYQUESTIONARECOMMENTED="notify_whenmyquestionarecommented";
var COOKIE_NOTFY_WHENMYQUESTIONAREFLAGGED="notify_whenmyquestionareflagged";
var COOKIE_NOTFY_WHENSOMEBODYFOLLOWSME="notify_whensomebodyfollowsme";
var COOKIE_NOTFY_WHENSOMEBODYSENDCOFFEE="notifyWhenSomebodySendACoffe";


var COOKIE_CAPABILITY_OF_HASLIVEPLAYER="capability_of_hasliveplayer";
var COOKIE_CAPABILITY_OF_LIVEPLAYERSOURCE="capability_of_liveplayersource";
var COOKIE_CAPABILITY_OF_LIVEPLAYERSLOGAN="capability_of_liveplayerslogan";


var COOKIE_CAPABILITY_OF_HASPODCASTTAB="capability_of_haspodcasttab";
var COOKIE_CAPABILITY_OF_PODCAST0_TITLE="capability_of_podcast0_title";
var COOKIE_CAPABILITY_OF_PODCAST0_URL="capability_of_podcast0_url";
var COOKIE_CAPABILITY_OF_PODCAST1_TITLE="capability_of_podcast1_title";
var COOKIE_CAPABILITY_OF_PODCAST1_URL="capability_of_podcast1_url";
var COOKIE_CAPABILITY_OF_PODCAST2_TITLE="capability_of_podcast2_title";
var COOKIE_CAPABILITY_OF_PODCAST2_URL="capability_of_podcast2_url";
var COOKIE_CAPABILITY_OF_PODCAST3_TITLE="capability_of_podcast3_title";
var COOKIE_CAPABILITY_OF_PODCAST3_URL="capability_of_podcast3_url";
var COOKIE_CAPABILITY_OF_PODCAST4_TITLE="capability_of_podcast4_title";
var COOKIE_CAPABILITY_OF_PODCAST4_URL="capability_of_podcast4_url";
var COOKIE_CAPABILITY_OF_PODCAST5_TITLE="capability_of_podcast5_title";
var COOKIE_CAPABILITY_OF_PODCAST5_URL="capability_of_podcast5_url";
var COOKIE_CAPABILITY_OF_PODCAST6_TITLE="capability_of_podcast6_title";
var COOKIE_CAPABILITY_OF_PODCAST6_URL="capability_of_podcast6_url";
var COOKIE_CAPABILITY_OF_PODCAST7_TITLE="capability_of_podcast7_title";
var COOKIE_CAPABILITY_OF_PODCAST7_URL="capability_of_podcast7_url";

var COOKIE_CAPABILITY_OF_TABVISB="capability_of_tabvisb";
var COOKIE_CAPABILITY_OF_ASKED_TAB_VISB="capability_of_askedtabvisb";
var COOKIE_CAPABILITY_OF_ANSWERED_TAB_VISB="capability_of_answredtabvisb";
var COOKIE_CAPABILITY_OF_LOVED_TAB_VISB="capability_of_lovedtabvisb";
var COOKIE_CAPABILITY_OF_DROPS_TAB_VISB="capability_of_dropstabvisb";
var COOKIE_CAPABILITY_OF_COFFEES_TAB_VISB="capability_of_coffeestabvisb";
var COOKIE_CAPABILITY_OF_PODCAST_TAB_VISB="capability_of_podcasttabvisb";




var COOKIE_SCORE="score";
var COOKIE_SIGNIN="signin";
var COOKIE_ACTIVATED="accountState";
var COOKIE_REMEMBERME="rememberMe";

var COOKIE_USERNAME="username";
var COOKIE_LOGINUSER_TREND="loginUser_Trend";
var COOKIE_SIGNIN_VAL="OK";
var COOKIE_ASKQUICK_QBODY="askquick_qbody";


//DATA
var DATA_CHOICE_INDEX="index";

//UPDATE_DELAY
var UPDATE_CLIENT_LASTTIME=5000;
var UPDATE_DELAY_MYCOFFEE=60000;
var UPDATE_DELAY_INBOX=60000;
var UPDATE_DELAY_OUTBOX=60000;
var UPDATE_MAINBAR_SCORE=180000;
var UPDATE_MAINBAR_NOTIFICATIONCOUNTS=60000;

//WAIT_TIME
var COFFEE_DLG_HIDE_WAIT_TIME=1000;
var MSG_DLG_HIDE_WAIT_TIME=1000;



//PAGE
var PAGE_INDEX="index.html";
var PAGE_CHANGEPASSWD="changePassword.html";

var PAGE_ACCOUNT="account.html";
var PAGE_PASSWD='password.html';
var PAGE_DESIGN="design.html";
var PAGE_NOTIFICATIONS="notifications.html"


var PAGE_ASKQUESTION="askquestion.html";

var PAGE_REGISTER="register.html";
var PAGE_HOME="home.html";
var PAGE_PROFILE="profile.html";
var PAGE_LOGIN="login.html";
var PAGE_RESEND_PASSWD="resend_password";
var PAGE_ONEQUESTION="onequestion.xhtml";
var PAGE_MSGBOX="messages.html";
var PAGE_FALLOWS="people.html";
var PAGE_SEARCH="search.html";
var PAGE_RECOMMEND="recommend.html";
var PAGE_INVITE="invite.html";
var PAGE_FINDFRIENDS="trendradar.html";
var PAGE_NEWFOLLOWERS="newfollowers.html";

var PAGE_ABOUT="about.html";
var PAGE_BLOG="blog.html";
var PAGE_TEAM="team.html";
var PAGE_HELP="help.html";
var PAGE_TERMS="terms.html";

var PAGE_COMMINGSOON="comingsoon.html"
var PAGE_OVERLOAD="overload.html";
var PAGE_ERROR="error.html";
var PAGE_OPPS="opss.html";


//ANCHOR
var ANCHOR_ANSWERED="#answered";
var ANCHOR_LOVED="#loved";
var ANCHOR_MYQUESTIONS="#myquestions";
var ANCHOR_MYCOFFEE="#mycoffee";
var ANCHOR_PODCAST="#podcast";
var ANCHOR_DROPS="#drops";

var ANCHOR_FOLLOWERS="#followers";
var ANCHOR_FOLLOWEDS="#following";

var ANCHOR_PEOPLE="#people";
var ANCHOR_QUENDIES="#quendies";

var ANCHOR_INBOX="#inbox";
var ANCHOR_SENT="#sent";

var ANCHOR_INVITE="#invite";
var ANCHOR_RECOMMEND="#recommend";



//QNODE_BTN_STATUS
var QNODE_BTN_INVALID="invalid";
var QNODE_BTN_ANSWER="answer";
var QNODE_BTN_CLOSE="close";
var QNODE_BTN_OPENSTATS="open stats";


var QUESTION_TOTAL_ANSWERED_INDEX=116;

var THEME_NAME_DEFAULT="default";
var THEME_NAME_MARGINAL="marginal";
var THEME_NAME_BEACH="beach";
var THEME_NAME_WHALE="whale";
var THEME_NAME_RADIOODTU="radioodtu";


//VISB
var VISB_EVERYONE="EVERYONE";
var VISB_ONLY_FRIENDS="ONLY_FRIENDS";
var VISB_ONLY_ME="ONLY_ME";

//QUESTION_ACTIONS
var QACTIONS_FAVED="Question Faved";
var QACTIONS_UNFAVED="Question UnFaved";
var QACTIONS_ANSWERED="Question Answered";

//POPULAR QUESTION TYPE
var QUESTIONS_IN_PROMOTED="QuestionsPromoted";
var QUESTIONS_IN_FOLLOW="QuestionsInFollow";
var QUESTIONS_IN_LATEST="QuestionsInLatest";
var QUESTIONS_IN_TRENDS="QuestionsInTrends";
var QUESTIONS_IN_TRENDS_TYPE="trends";
var QUESTIONS_IN_TODAY="today";
var QUESTIONS_IN_WEEK="week";
var QUESTIONS_IN_MONTH="month";
var QUESTIONS_IN_YEAR="year";


//MAINBAR LINKS
var MAINBAR_LINK_SETTING="settings";
var MAINBAR_LINK_MYOCEAN="myocean";
var MAINBAR_LINK_PROFILE="profile";


//TEXT
var TEXT_NULL="";
var TEXT_TRUE="true";
var TEXT_FALSE="false";
var TEXT_SELECT="Select";
var TEXT_TRENDY="trendy";
var TEXT_MARGINAL="eccentric";
var TEXT_MALE="Male";
var TEXT_MALE_BIG="MALE";
var TEXT_FEMALE="Female"
var TEXT_FEMALE_BIG="FEMALE"

var TEXT_FOLLOWERS="followers ";
var TEXT_FOLLOWEDS="following ";


//CONST
var MAX_CHOICE_COUNT=10;
var INDEX_OF_NOT_ANSWERED="-1";




//ICON URL
var ICON_URL_ERR="css/default/images/error.png";
var ICON_URL_OK="css/default/images/ok.png";

var ICON_URL_LOVE_UNSELECTED="css/default/images/lovee_unselected.png";
var ICON_URL_LOVE_SELECTED="css/default/images/lovee_selected.png";


var ICON_URL_NOTIFY_TRUE="notifyimage-true";
var ICON_URL_NOTIFY_WRONG="notifyimage-wrong";

  
//KEYS
var KEY_ENTER='13';
var KEY_ESCAPE='27';



//ERROR MSG
var ERR_MSG_WEBSERVICE="Web Service Error";

var ERR_MSG_NOT_ACTIVATED_ACCOUNT="Please Activate Acount At First";
var ERR_MSG_LOGIN_FAILED="Login Failed. Please Try Again";
var ERR_MSG_PLEASE_SIGNIN="Please signin";

var ERR_MSG_RESEND_PASSWD_FAILED="Wrong username/email";
var ERR_MSG_ALREADY_SIGNIN="You are already signin an account";


var ERR_MSG_QUESTION_CANT_SENDED="question sharing fails";

var ERR_MSG_USERNAME_INVALID_FORMAT="username is invalid";
var ERR_MSG_USERNAME_EXIST="username exist";
var ERR_MSG_EMAIL_INVALID_FORMAT="e-mail is invalid";
var ERR_MSG_EMAIL_EXIST="e-mail exist";
var ERR_MSG_PASSWD_INVALID_FORMAT="password is invalid";
var ERR_MSG_CAPTCHA_INVALID="captcha is invalid";
var ERR_MSG_BIRTH_INVALID="birth is invalid";
var ERR_MSG_UNCHECK_IAGREE_TERMS="uncheck i agree terms";

var ERR_MSG_USERNAME_EMPTY="username is empty";
var ERR_MSG_FULLNAME_EMPTY="fullname is empty";
var ERR_MSG_EMAIL_EMPTY="email is empty";
var ERR_MSG_PASSWD_EMPTY="passwd is empty";
var ERR_MSG_GENDER_EMPTY="gender is empty";
var ERR_MSG_COUNTRYANDCITY_EMPTY="country/city is empty";
var ERR_MSG_EDUCATION_EMPTY="education is empty";
var ERR_MSG_CAPTCHA_EMPTY="captcha is empty";

var ERR_MSG_QUESTION_NOT_ADDED="question not added";
var ERR_MSG_QUESTION_CHOICE_COUNT_INVALID="please enter two choices";
var ERR_MSG_QUESTION_BODY_MIN_LENGTH="question must be minimum 5 characters";
var ERR_MSG_QUESTION_BODY_MAX_LENGTH="question was over 140 characters";
var ERR_MSG_QUESTION_CHOICES_MAX_LENGTH="choice was over 40 characters";
var ERR_MSG_COMMENT_MAX_LENGTH="comment was over 300 characters";


var ERR_MSG_ACCOUNT_NOT_CHANGED="account not changed";


var ERR_MSG_NOT_IMPLEMENTED="Not Implemented Yet";

//INFO MSG
var INFO_MSG_OK="ok";
var INFO_MSG_QUESTION_ADDED="question added";
var INFO_MSG_QUESTION_SENDED="question shared with email";
var INFO_MSG_REGISTRATION_OK="check your e-mail and activate account";
var INFO_MSG_RESEND_PASSWD_OK="Password Send To Email";
var INFO_MSG_ACCOUNT_CHANGED="account changed";
var INFO_MSG_NOTIFICATIONS_CHANGED="notifications changed";
var INFO_COMING_NEXT_VERSION="Coming Next Version";
