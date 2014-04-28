var mainLinksPage=PAGE_HOME;
var mainLinksRP="";


function mainLinks_initialize(page){
    mainLinksPage=page;
    if(page==PAGE_ONEQUESTION ||page ==PAGE_FALLOWS){
        mainLinksRP="../";
    }

    if(mainLinksPage==PAGE_PROFILE  ||mainLinksPage==PAGE_ACCOUNT ||mainLinksPage==PAGE_ASKQUESTION ||
        mainLinksPage==PAGE_PASSWD || mainLinksPage==PAGE_DESIGN || mainLinksPage==PAGE_NOTIFICATIONS ||
        mainLinksPage==PAGE_MSGBOX || mainLinksPage==PAGE_NEWFOLLOWERS || mainLinksPage==PAGE_SEARCH ||
        mainLinksPage==PAGE_FALLOWS ||mainLinksPage==PAGE_FINDFRIENDS){
        $('#logoToHome').attr("href", mainLinksRP+PAGE_HOME);
    }else if(mainLinksPage==PAGE_COMMINGSOON ||mainLinksPage==PAGE_ONEQUESTION || mainLinksPage==PAGE_TERMS ||
        mainLinksPage==PAGE_OVERLOAD || mainLinksPage==PAGE_ERROR || mainLinksPage==PAGE_OPPS ||
        mainLinksPage==PAGE_CHANGEPASSWD || mainLinksPage==PAGE_ABOUT || mainLinksPage==PAGE_HELP){
        if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
            $('#logoToHome').attr("href", mainLinksRP+PAGE_HOME);
        }else{
            $('#logoToHome').attr("href", mainLinksRP+PAGE_INDEX);
        }
    }else if(mainLinksPage==PAGE_LOGIN || mainLinksPage==PAGE_RESEND_PASSWD || mainLinksPage==PAGE_REGISTER){
        $('#logoToHome').attr("href", mainLinksRP+PAGE_INDEX);
    }

    $('#aboutLink').attr("href", mainLinksRP+PAGE_ABOUT);
    $('#blogLink').attr("href","http://blog.trendocean.com/");
    $('#teamLink').attr("href", mainLinksRP+PAGE_COMMINGSOON);
    $('#teamLink').attr("title","comingsoon");
    $('#businessLink').attr("href", mainLinksRP+PAGE_COMMINGSOON);
    $('#businessLink').attr("title","comingsoon");
    $('#helpLink').attr("href", mainLinksRP+PAGE_HELP);
    $('#termsLink').attr("href", mainLinksRP+PAGE_TERMS);



    if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
        $('#errorToHome').attr("href",mainLinksRP+PAGE_HOME);
    }else{
        $('#errorToHome').attr("href",mainLinksRP+PAGE_INDEX);
    }

    if(mainLinksPage==PAGE_COMMINGSOON ||mainLinksPage==PAGE_TERMS
        ||mainLinksPage==PAGE_ERROR ||mainLinksPage==PAGE_OPPS
        ||mainLinksPage==PAGE_OVERLOAD || mainLinksPage==PAGE_REGISTER
        ||mainLinksPage==PAGE_LOGIN ||mainLinksPage==PAGE_RESEND_PASSWD){
        $('#randomText_MainBar').attr("href",mainLinksRP+PAGE_ABOUT);
    }

    if(mainLinksPage==PAGE_ABOUT){
        $('#randomText_MainBar').click(function(event){
            event.preventDefault();
        //Do Nothing
        });
    }

}




