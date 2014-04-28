var coffee_directive = {
    '@id':'"message"',
    'div.coffee_part': {
        'post <- message':{
            'div.coffee_id':'post.id',
            'a.cAvatarImgLink@href':'post.sender',
            'img.cAvatarImg@src':'post.smallAvatarURL',
            'a.cOwner': 'post.sender',
            'a.cOwner@href': 'post.sender',
            'div.statuscoffe_read':function(arg){
                return common_contentProcess(arg.item.messageText);
            },
            'a.coffeecup_replybutton@style':function(arg){
                if(arg.item.canReplyByRequester=='true'){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'a.coffeecup_deletebutton@style':function(arg){
                if(arg.item.isRemovableByRequester=='true'){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'span.coffeecup_qCreationDate':function(arg){

                var epoc=arg.item.creationDate*1;
                var datum = new Date(epoc);
                //var ds=datum.toGMTString();
                return common_getRemainingTime(datum);
            }


        }
    }
};

var coffee_template;
var display_coffees=null;
var selected_coffee=null;
var tblCoffees_data=null;

function tblCoffees_initialize(){
    $("#btnMore").hide();
    $(".coffee_def").hide();
    coffee_template = $('#coff_part').compile(coffee_directive);
    $('#coff_part').hide();
    $('#tableLoadingIcon').hide();


    //Binds Events
    $('.coffeecup_replybutton').live("click",function(event){
        event.preventDefault();
        var cID=$(this).parents('.coffee_part').children(':first-child').children(':first-child').text();
        selected_coffee=tblCoffees_getCoffee(cID);
        if(selected_coffee!=null){
            event.preventDefault();
            var pos= $(this).position();
            coffeeDlg_setContent(selected_coffee.sender,cookie_get(COOKIE_USERNAME),selected_coffee.smallAvatarURL);
            coffeeDlg_show(pos);
        }
    });

    $('.coffeecup_deletebutton').live("click",function(event){
        event.preventDefault();
        var cID=$(this).parents('.coffee_part').children(':first-child').children(':first-child').text();
        selected_coffee=tblCoffees_getCoffee(cID);
        if(selected_coffee!=null){
            $.ajax({
                url: 'api/messages/remove/'+cID,
                type: "POST",
                success: function(){
                    tblCoffees_removeCoffee(cID);
                },
                error:function (xhr){
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
        }
        return false;
    });
}

function tblCoffees_getCoffee(cID){
    for (i=0;i<display_coffees.length;i++){
        var coffee=display_coffees[i];
        if(coffee.id==cID){
            return coffee;
        }
    }
    return null;
}


function tblCoffees_addCoffee(data){
    if(tblCoffees_data==null){
        tblCoffees_data=new Object();
    }

    var temp_coffees=new Array();
    temp_coffees[0]=data;
    if(display_coffees!=null){
        tblCoffees_data.message=temp_coffees.concat(display_coffees);
    }else{
        tblCoffees_data.messaget=data;
    }
    tblCoffees_renderCoffees(tblCoffees_data);
}


function tblCoffees_removeCoffee(cID){
    for (i=0;i<display_coffees.length;i++){
        var coffee=display_coffees[i];
        if(coffee.id==cID){
            break;
        }
    }
    display_coffees.splice(i,1);
    tblCoffees_renderCoffees(tblCoffees_data);
}


function tblCoffees_renderCoffees(data){

    var scrollPosition=$(window).scrollTop();
    $('#static_que_section').html("<div id=que_section></div>");
    tblCoffees_data=data;
    if(data==null){
        data=new Object();
        display_coffees=null;
    }else if($.isArray(data.message)){
        display_coffees=data.message;
    }else{
        display_coffees=new Array(data.message);
    }

    data.message=display_coffees;
    $('#que_section').render(data, coffee_template);
    $(window).scrollTop(scrollPosition);
    $('.coffeecup_deletebutton').attr("title","delete coffee");
  
};
