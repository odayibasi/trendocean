if(redirection_toClearURL()){

}else if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_SEARCH, PAGE_INDEX, ERR_MSG_PLEASE_SIGNIN);
}else{
    var anchor=jQuery.url.attr("anchor");
    if(anchor==null){
        window.location.href=PAGE_SEARCH+ANCHOR_PEOPLE;
    }else if(anchor.indexOf("quendies=")!=-1){
        var qTag=anchor.replace("quendies=","");
        $.cookie("searchContent", qTag);
        window.location.href=PAGE_SEARCH+ANCHOR_QUENDIES;
    }
}

var searchPageIndex=1;


function fireAnchorTabChanged(currentAnchor){

    if(currentAnchor==ANCHOR_PEOPLE){
        search_searchInPeople();
    }else if(currentAnchor==ANCHOR_QUENDIES){
        search_searchInQuestions();
    }
}


function search_searchInQuestionsOrPeople(){
    var selectedAnchor="#"+currentAnchorTab;
    if(selectedAnchor==ANCHOR_PEOPLE){
        search_searchInPeople();
    }else if(selectedAnchor==ANCHOR_QUENDIES){
        search_searchInQuestions();
    }
}


function search_displayMoreQuestions(){

    $('#tableLoadingIcon').show();
    var searchText=$('#searchField_MainBar').val()+'*';
    $.ajax({
        url: 'api/questions/search?searchTerm='+searchText+'&pageIndex='+searchPageIndex,
        type: "GET",
        success: function(data){
            if(data!=null){
                searchPageIndex++;
                data.question=display_questions.concat(data.question);
                tblQuestions_renderQuestions(data);
            }
            $('#tableLoadingIcon').hide();
        },
        error:function (xhr){
            $('#tableLoadingIcon').hide();
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}


function search_displayMorePeople(){
    $('#tableLoadingIcon').show();
    var searchText=$('#searchField_MainBar').val()+'*';
    $.ajax({
        url: 'api/users/search?searchTerm='+searchText+'&pageIndex='+searchPageIndex,
        type: "GET",
        success: function(data){
            if(data!=null){
                searchPageIndex++;
                data.user=display_follows.concat(data.user);
                tblFollows_renderFollows(data);
            }
            $('#tableLoadingIcon').hide();
        },
        error:function (xhr){
            $('#tableLoadingIcon').hide();
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}


function search_searchInQuestions(){
    var searchText=$('#searchField_MainBar').val();
    $.ajax({
        url: 'api/questions/search?searchTerm='+searchText,
        type: "GET",
        success: function(data){
            tblQuestions_renderQuestions(data);
        },
        error:function (){
            tblQuestions_renderQuestions();
        }
    });
    return false;
}


function search_searchInPeople(){
    var searchText=$('#searchField_MainBar').val();
    $.ajax({
        url: 'api/users/search?searchTerm='+searchText,
        type: "GET",
        success: function(data){
            tblFollows_renderFollows(data);
        },
        error:function (xhr){
            tblFollows_renderFollows();
        }
    });
    return false;
}





$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }

    theme_processDesign();
    mainBar_initialize();
    mainBar_initializeSearch(true);
    notifyBar_initialize();
    mainLinks_initialize(PAGE_SEARCH);
    redirection_executeOrderAfterNewPageLoad();

    coffeeDlg_initialize($("#btnCoffee"));
    shareDlg_initialize();

    profileTab_initialize();
    profileTab_setContent();

    tblQuestions_initialize();
    tblFollows_initialize();

    anchorTab_initialize();
    common_preventScreenFlash();
    common_registerMoreActionListener(function(){

        if ( $('#tableLoadingIcon').is(':visible')==false){
            var selectedAnchor="#"+currentAnchorTab;
            if(selectedAnchor==ANCHOR_PEOPLE){
                search_displayMorePeople();
            }else if(selectedAnchor==ANCHOR_QUENDIES){
                search_displayMoreQuestions();
            }
        }
    });
});