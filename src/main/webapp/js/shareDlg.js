var shareDlgQuestionID="";
var shareDlgRelativePath="";

function shareDlg_initialize(relativePath){

    if(relativePath!=null){
        shareDlgRelativePath=relativePath;
    }

    $('#dlgShare').hide();
    $("#dlgShare_closeBtn").click(function(event){
        event.preventDefault();
        $('#dlgShare').hide();
    });

    $("#dlgShareEmail_sendBtn").click(function(event){
        event.preventDefault();
        if(common_checkPOST()){
            $('#dlgShareEmail_waitingIcon').show();
            var emailAdressee=$('#dlgShareEmail_txt').val();
            if(common_checkEmail(emailAdressee)){

                $.ajax({
                    url: shareDlgRelativePath+'api/questions/share/'+emailAdressee+'/'+shareDlgQuestionID,
                    type: "GET",
                    success: function(data){
                        $('#dlgShareEmail_waitingIcon').hide();
                        $('#dlgShareEmail_txt').val("");
                        $('#dlgShare').hide();
                    },
                    error:function (xhr){
                        notifyBar_display(ERR_MSG_QUESTION_CANT_SENDED+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                        $('#dlgShareEmail_waitingIcon').hide();
                    }
                });
            }else{
                $('#dlgShareEmail_waitingIcon').hide();
                notifyBar_display(ERR_MSG_EMAIL_INVALID_FORMAT, ICON_URL_NOTIFY_WRONG);
            }
        }
        return false;

    });
}


function shareDlg_display(triggerComp, dX, dY){
    var pos= triggerComp.position();
    $('#dlgShare').css("position","absolute");
    $('#dlgShare').css("left",pos.left+dX);
    $('#dlgShare').css("top",pos.top+dY);
    
    $('#dlgShareEmail').hide();
    $('#dlgShareEmail_txt').val("");
    $('#dlgShareEmail_succeedLabel').hide();
    $('#dlgShareEmail_waitingIcon').hide();

    $('#dlgShare').show();
}


var facebookShareURL="";
var twitterShareURL="";

function shareDlg_setContent(question){
    shareDlgQuestionID=question.id;
    var qID=question.id;
    var qBody=question.body;
    var qBodySum="";
    if(qBody.length>93){
        qBodySum=qBody.substr(0, 93)+"...? ";
    }else{
        qBodySum=qBody+" ";
    }

    getBitlyURL('http://trendocean.com/question/'+qID, function(tinyurl){
        facebookShareURL="http://www.facebook.com/sharer.php?u="+tinyurl;
        twitterShareURL="http://twitter.com/intent/tweet?status="+qBodySum +tinyurl+ " via @trendocean";


        $('#dlgShare_facebookBtn').attr("href",facebookShareURL);
        $('#dlgShare_twitterBtn').attr("href",twitterShareURL);
        
        
        $('#dlgShare_facebookBtn').click(function(){
            $('#dlgShare').hide();
        });
        
        $('#dlgShare_twitterBtn').click(function(){
            $('#dlgShare').hide();
        });

        $("#dlgShare_emailBtn").click(function(event){
            event.preventDefault();
            $('#dlgShareEmail').show();
        });
   
    });
   
}



function getTinyURL(longURL, success) {

    var API = 'http://json-tinyurl.appspot.com/?url=',
    URL = API + encodeURIComponent(longURL) + '&callback=?';

    $.getJSON(URL, function(data){
        success && success(data.tinyurl);
    });

}


function getBitlyURL(longURL, success) {

    var opts = {
        login: "trendocean",
        key: "R_053c164d6d7148a5a82dd5fa56969b25"
    };

    var bitly = new $.Bitly(opts);

    bitly.shorten(longURL, {
        onSuccess: function(short_url) {
            success && success(short_url);
        },
        onError: function(data) {
        //Do Nothing
        }
    });

}


