var coffee_receiver=null;
var coffee_receiverAvatar="";
var coffee_relativePath="";
var coffee_sender=null;
var coffee_DlgHideTimeOut=-1;
var coffee_DlgPage="";

function coffeeDlg_sendMsg(){
    $('#dlgCoffee_loaderIcon').show();
    var coffeeMsg = new Object();
    coffeeMsg.messageText = $('#dlgCoffee_msg').val();
    coffeeMsg.receiver=coffee_receiver;
    coffeeMsg.inReplyToID=coffee_sender;

    var coffeeMsgJSON = $.toJSON(coffeeMsg);

    $.ajax({
        url: coffee_relativePath+ 'api/messages/public/',
        type: "POST",
        data: (coffeeMsgJSON),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            $('#dlgCoffee_loaderIcon').hide();
            $('#dlgCoffee_lblSucceed').show();
            $('#coffeeMsgTextCounter').hide();
            $('#dlgCoffee_msg').val("");
            coffee_DlgHideTimeOut=setTimeout('coffeeDlg_hideAfterSucceedMsg()',COFFEE_DLG_HIDE_WAIT_TIME);

        //Hide becouse of Others People Coffee Invisible
        /*
            if(coffee_DlgPage==PAGE_PROFILE){
                if(profileUsername!=profileLoginUserName && profileUsername==coffee_receiver){
                    var currentAnchor=jQuery.url.attr("anchor");
                    if(currentAnchor!="mycoffee"){
                        var path=jQuery.url.attr("source");
                        path=path.replace(currentAnchor,"mycoffee");
                        window.location.href=path;
                    }
                    tblCoffees_addCoffee(data);
                }
            }*/
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}


function coffeeDlg_hideAfterSucceedMsg(){
    $("#dlgCoffee").fadeOut('slow', function (){
        clearTimeout(coffee_DlgHideTimeOut);
    });
}

function coffeeDlg_show(pos){
    $('#dlgCoffee').css("position","absolute");
    $('#dlgCoffee').css("top",pos.top);

    var sWidth=$(window).width();
    var dWidth=$('#dlgCoffee').width();

    $('#dlgCoffee').css("left",(sWidth-dWidth)/2);

    $('#dlgCoffee_msg').val("");
    $('#dlgCoffee_lblSucceed').hide();
    $('#dlgCoffee_loaderIcon').hide();
    $('#dlgCoffee').show();
    $('#dlgCoffee_msg').focus();
    $('#coffeeMsgTextCounter').show();
}

function coffeeDlg_initialize(triggerComp, page){

    if(page!=null){
        coffee_DlgPage=page;
    }

    $('#dlgCoffee_lblSucceed').hide();
    $('#dlgCoffee_loaderIcon').hide();
    $('#dlgCoffee').hide();

    $("#dlgCoffee_msg").counter({
        dispID:"coffeeMsgTextCounter",
        goal:"120",
        dispIDColor:"#666"
    });


    if(triggerComp!=null){
        triggerComp.click(function(event){
            event.preventDefault();
            var pos= $(this).position();
            coffeeDlg_show(pos);
        });
    }

    $("#dlgCoffee_sendBtn").click(function(event){
        event.preventDefault();
        coffeeDlg_sendMsg();
    });
    

    $("#dlgCoffee_closeBtn").click(function(event){
        event.preventDefault();
        $('#dlgCoffee').hide();
    });
}


function coffeeDlg_setContent(receiverName,senderName, receiverAvatar){
    coffee_receiver=receiverName;
    coffee_receiverAvatar=receiverAvatar;
    coffee_sender=senderName;
    var infoTemplate="Send username a cup of coffee"
    var info=infoTemplate.replace('username',receiverName); //.replace(/username/g,username)
    $("#dlgCoffee_info").text(info);
    $("#avatarOfCoffeeReceiver").attr("src",coffee_receiverAvatar);
    $("#avatarOfCoffeeReceiver").attr("title",coffee_receiver);


}


function coffeeDlg_setRelativePath(relativePath){
    coffee_relativePath=relativePath;
}





