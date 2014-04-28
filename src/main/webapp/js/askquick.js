function askquick_initialize(){

    $("#askquick_Btn").click(function(event){
        event.preventDefault();
        var qBodyText= $('#askquick_textArea').val();
        cookie_wrap(COOKIE_ASKQUICK_QBODY, qBodyText, false);
        window.location.href=PAGE_ASKQUESTION;
    });
    
}


function askquick_checkAndPaste(){
       var qBodyText=cookie_get(COOKIE_ASKQUICK_QBODY);
       cookie_wrap(COOKIE_ASKQUICK_QBODY, null, false);
       $('#qBody').val(qBodyText);
}