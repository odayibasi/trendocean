var currentAnchorTab = null;

//On load page, init the timer which check if the there are anchor changes each 300 ms
function anchorTab_initialize(){
    setInterval("anchorTab_checkAnchor()", 300);
}

//Function which chek if there are anchor changes
function anchorTab_checkAnchor(){
    var anchor=jQuery.url.setUrl(document.location).attr("anchor");
    if(currentAnchorTab!=anchor){
        if(currentAnchorTab=="drops"){
            $("#tab_"+currentAnchorTab).removeClass("tabact-notify");
            $("#tab_"+currentAnchorTab).addClass("tabact-notify-back");
        }else{
            $("#tab_"+currentAnchorTab).removeClass("tabactfront");
            $("#tab_"+currentAnchorTab).addClass("tabactback");
        }
        currentAnchorTab=anchor;

        if(currentAnchorTab=="drops"){
            $("#tab_"+currentAnchorTab).removeClass("tabact-notify-back");
            $("#tab_"+currentAnchorTab).addClass("tabact-notify");
        }else{
            $("#tab_"+currentAnchorTab).removeClass("tabactback");
            $("#tab_"+currentAnchorTab).addClass("tabactfront");
        }
        fireAnchorTabChanged("#"+currentAnchorTab);
    }
}