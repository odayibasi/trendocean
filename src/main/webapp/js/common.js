var youtubeBase="http://www.youtube.com/watch?v=";
var vimeoBase="http://vimeo.com/";
var soundCloudBase="http://soundcloud.com/";
var imageBase=/http?:\/\/([/|.|\w%'-|\s])*\.(?:jpg|gif|png)/gim;
var soundBase=/http?:\/\/([/|.|\w'-|\s])*\.(?:mp3|ogg|wav)/gim;
var linkBase0= /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
var linkBase1= /(^|[^\/])(www\.[\S]+(\b|$))/gim;



var mp3Player='<object type="application/x-shockwave-flash" data="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" width="12" height="12">'+
'<param name="movie" value="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" />'+
'<param name="bgcolor" value="#e5edef" />'+
'<param name="FlashVars" value="mp3={url}&amp;width=12&amp;height=12&amp;showslider=0&amp;showloading=never&amp;buttonwidth=12&amp;sliderwidth=0&amp;sliderheight=0&amp;volumewidth=0&amp;volumeheight=0&amp;loadingcolor=ffffff&amp;bgcolor=e5edef&amp;bgcolor1=e5edef&amp;bgcolor2=e5edef&amp;slidercolor1=ffffff&amp;slidercolor2=ffffff&amp;sliderovercolor=ffffff&amp;buttoncolor=304e63&amp;buttonovercolor=505050" />'+
'</object>'
var linkPlayer='<div class="link-icon-cover"><a href={url} target="_blank">L</a></div>';


function common_checkEmail(str) {

    var at="@"
    var dot="."
    var lat=str.indexOf(at)
    var lstr=str.length
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(reg.test(str) == false){
        return false;
    }

    if (str.indexOf(at)==-1){
        return false
    }

    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
        return false
    }

    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
        return false
    }

    if (str.indexOf(at,(lat+1))!=-1){
        return false
    }

    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
        return false
    }

    if (str.indexOf(dot,(lat+2))==-1){
        return false
    }

    if (str.indexOf(" ")!=-1){
        return false
    }

    return true
}


function common_checkPassword(str){

    var strLength=str.length;
    if( strLength < 6 || strLength > 15){
        return false;
    }

    var reg = /^([a-zA-Z0-9_])+$/;
    if(reg.test(str) == false){
        return false;
    }

    return true;
}


function common_daysBetween(date1, date2){

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY);
}



function common_incrementAskQuestionCount(){
    var askQuestionCount=parseInt(cookie_get(COOKIE_QUESTION_ASKED));
    askQuestionCount++;
    $.cookie(COOKIE_QUESTION_ASKED, askQuestionCount);
}


function common_incrementLoveQuestionCount(){
    var favQuestionCount=parseInt(cookie_get(COOKIE_QUESTION_FAVED));
    favQuestionCount++;
    $.cookie(COOKIE_QUESTION_FAVED, favQuestionCount);
}


function common_decrementLoveQuestionCount(){
    var favQuestionCount=parseInt(cookie_get(COOKIE_QUESTION_FAVED));
    favQuestionCount--;
    $.cookie(COOKIE_QUESTION_FAVED, favQuestionCount);
}


function common_incrementAnswerQuestionCount(){
    var answQuestionCount=parseInt(cookie_get(COOKIE_QUESTION_ANSWERED));
    answQuestionCount++;
    $.cookie(COOKIE_QUESTION_ANSWERED, answQuestionCount);
}

function common_getRemainingTime(qDate){

    if(qDate>2000000000000){
        qDate=qDate/1000;
    }

    if(qDate < 1397458597){
        qDate=qDate*1000;
    }

    
    var deltaTime = (new Date()-qDate);

    //make sure success hasn't been reached
    if (deltaTime.valueOf() > 0) {
        //update the values
        var seconds = deltaTime.valueOf()/1000;
        var day = (Math.floor(seconds/86400))%86400;
        var hrs = (Math.floor(seconds/3600))%24;
        var min = (Math.floor(seconds/60))%60;
        var sec = (Math.floor(seconds/1))%60;

        if(day>0){
            return  day +" days ago";
        }else if(hrs>0){
            return hrs +" hours ago";
        }else if(min>0){
            return min +" minutes ago";
        }else if(sec>0){
            return sec +" seconds ago";
        }
    }else{
        return "now";
    }

}


var common_MoreFunction=null;
function common_registerMoreActionListener(moreFunction){

    common_MoreFunction=moreFunction;
    $(window).scroll(function() {
        if  ($(window).scrollTop()+100 >= $(document).height() - $(window).height() && common_MoreFunction!=null){
            common_MoreFunction();
        }
    });
}

function common_newOption(text,value){
    return "<option value="+value+">"+text+"</option>";
}


function common_getURLSegment(pos){
    return jQuery.url.segment(pos);
}


function common_contentProcessing(content,requester){

    var youtubeIndex=content.indexOf(youtubeBase);
    var vimeoIndex=content.indexOf(vimeoBase);
    var soundCloudIndex=content.indexOf(soundCloudBase);
    var images=content.match(imageBase);
    var onlyEmbed=requester!=CONTENT_PROCESS_FOR_ONE_QUESTION;
    var modifiedContent="";

    content=common_htmlStrip(content);
    if(youtubeIndex!=-1){
        modifiedContent=common_embedYouTubeVideo(content, youtubeIndex,onlyEmbed);
    }else if(vimeoIndex!=-1){
        modifiedContent=common_embedVimeoVideo(content, vimeoIndex,onlyEmbed);
    }else if(soundCloudIndex!=-1){
        modifiedContent=common_embedSoundCloudAudio(content, soundCloudIndex, onlyEmbed);
    }else if(images!=null){
        modifiedContent=common_embedImage(content,images[0],onlyEmbed);
    }else{
        modifiedContent="";
    }


    if(requester==CONTENT_PROCESS_FOR_ONE_QUESTION){
        if(modifiedContent==""){
            modifiedContent=common_linkify(content);
        }else{
            modifiedContent=common_linkify2(modifiedContent);
        }
    }

    return modifiedContent;
}


function common_contentProcess(content){
    var htmlStrip=common_htmlStrip(content);
    var htmlLinkify=common_linkify(htmlStrip);
    return htmlLinkify;

}


function common_isContainsMedia(content){
    return common_isContainsVimeoVideo(content) ||
    common_isContainsYouTubeVideo(content) ||
    common_isContainsImage(content) || common_isContainsSoundCloud(content);
}

function common_isContainsImage(content){
    var images=content.match(imageBase);
    return images!=null;
}

function common_isContainsSound(content){
    var sounds=content.match(soundBase);
    return sounds!=null;
}

function common_isContainsYouTubeVideo(content){
    var youtubeIndex=content.indexOf(youtubeBase);
    return youtubeIndex!=-1;
}

function common_isContainsVimeoVideo(content){
    var vimeoIndex=content.indexOf(vimeoBase);
    return vimeoIndex!=-1;
}


function common_isContainsSoundCloud(content){
    var soundCloudIndex=content.indexOf(soundCloudBase);
    return soundCloudIndex!=-1;
}

function common_isContainsLink0(content){
    var links0=content.match(linkBase0);
    return links0!=null;
}

function common_isContainsLink1(content){
    var links1=content.match(linkBase1);
    return links1!=null;
}




var common_stripHTMLDIV=$('<div class="stripHTMLClass">text</div>');
function common_htmlStrip(inputText){
    return common_stripHTMLDIV.text(inputText).html();
}

//Call After CSS Loading finished. Becouse When divBody.show
//called previous then css load. After css load display:none will be active
//and screen not display
function common_preventScreenFlash(){
    $('#divBody').show();
}

function common_linkify(inputText) {
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var replacedText2 = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change @username
    var replacePattern3 =/@(\w+)/gim;
    var replacedText3 = replacedText2.replace(replacePattern3, '@<a href="http://trendocean.com/$1" target="_blank">$1</a>');

    //Change #word to search
    var replacePattern4 =/#(\w+)/gim;
    var replacedText4 = replacedText3.replace(replacePattern4, '#<a href="http://trendocean.com/search.html#quendies=$1" target="_blank">$1</a>');

    //return replacedText4;
    return replacedText4;
}


function common_linkify2(inputText) {

    //Change @username
    var replacePattern3 =/@(\w+)/gim;
    var replacedText3 = inputText.replace(replacePattern3, '@<a href="http://trendocean.com/$1" target="_blank">$1</a>');

    //Change #word to search
    var replacePattern4 =/#(\w+)/gim;
    var replacedText4 = replacedText3.replace(replacePattern4, '#<a href="http://trendocean.com/search.html#quendies=$1" target="_blank">$1</a>');

    return replacedText4;
}


function common_linkifyNotification(inputText, questionText) {

    //Change @username
    var replacePattern3 =/@(\w+)/gim;
    var replacedText3 = inputText.replace(replacePattern3, '@<a href="http://trendocean.com/$1">$1</a>');

    //Change #word to question link
    var replacePattern4 =/é(\w+)/gim;
    var replacedText4 = replacedText3.replace(replacePattern4, '<a href="http://trendocean.com/question/$1">$qText</a>');

    replacedText4=replacedText4.replace("$qText",questionText);
    return replacedText4
}





function common_embedYouTubeVideo(content, youtubeIndex,onlyEmbed){
    start=youtubeIndex+youtubeBase.length;
    end=content.length;

    if(content.indexOf("&", start)!=-1){
        end0=content.indexOf("&",start);
        if(end0<end){
            end=end0;
        }
    }

    if(content.indexOf("#", start)!=-1){
        end1=content.indexOf("#",start);
        if(end1<end){
            end=end1;
        }
    }

    if(content.indexOf(" ", start)!=-1){
        end2=content.indexOf(" ",start);
        if(end2<end){
            end=end2;
        }
    }
    
    endReal=content.length;
    if(content.indexOf(" ", start)!=-1){
        endReal=content.indexOf(" ",start);
    }


    allyoutube=content.substring(youtubeIndex, endReal);
    code=content.substring(start, end);
    var embedYouTubeURL=youtube.replace("$youtubecode$",code);
    if(onlyEmbed){
        return embedYouTubeURL;
    }
    return content.replace(allyoutube,embedYouTubeURL);
}


function common_embedVimeoVideo(content, vimeoIndex,onlyEmbed){
    start=vimeoIndex+vimeoBase.length;
    end=content.length;
    if(content.indexOf(" ", start)!=-1){
        end=content.indexOf(" ",start);
    }

    endReal=content.length;
    if(content.indexOf(" ", start)!=-1){
        endReal=content.indexOf(" ",start);
    }


    allvimeo=content.substring(vimeoIndex, endReal);
    code=content.substring(start, end);
    var embedVimeoURL=vimeo.replace("$vimeocode$",code);
    if(onlyEmbed){
        return embedVimeoURL;
    }else{
        return content.replace(allvimeo,embedVimeoURL);
    }

}


function common_embedSoundCloudAudio(content, soundCloudIndex,onlyEmbed){
    
    start=soundCloudIndex+soundCloudBase.length;
    endReal=content.length;
    if(content.indexOf(" ", start)!=-1){
        endReal=content.indexOf(" ",start);
    }


    allsoundCloud=content.substring(soundCloudIndex, endReal);
    jQuery.url.setUrl(allsoundCloud);
    code1=jQuery.url.segment(0);
    code2=jQuery.url.segment(1);
    var embedSoundURL=soundCloud.replace("$soundcloudCode1$",code1);
    embedSoundURL=embedSoundURL.replace("$soundcloudCode2$",code2);
    embedSoundURL=embedSoundURL.replace("$soundcloudCode3$",code1);
    embedSoundURL=embedSoundURL.replace("$soundcloudCode4$",code2);
    if(onlyEmbed){
        return embedSoundURL;
    }else{
        return content.replace(allsoundCloud,embedSoundURL);
    }

}

function common_embedImage(content, imageURL, onlyEmbed){
    var embedImgURL= htmlImgURL.replace('{url}', imageURL);
    if(onlyEmbed){
        return embedImgURL;
    }else{
        return content.replace(imageURL,embedImgURL);
    }
}



function common_choiceProcess(choice){
    var content=choice.text;
    var sounds=content.match(soundBase);
    var links0=content.match(linkBase0);
    var links1=content.match(linkBase1);

    if(sounds!=null){
        var soundURL=sounds[0];
        return content.replace(soundURL,"");
    }else if(links0!=null){
        var link0URL=links0[0];
        return content.replace(link0URL,"");
    }else if(links1!=null){
        var link1URL=links1[0];
        return content.replace(link1URL,"");
    }else{
        return content;
    }
}

function common_choiceBoxProcess(choice){
    var content=choice.text;
    var sounds=content.match(soundBase);
    var links0=content.match(linkBase0);
    var links1=content.match(linkBase1);
    if(sounds!=null){
        var soundURL=sounds[0];
        var embedSoundURL= mp3Player.replace('{url}', soundURL);
        return embedSoundURL;
    }else if(links0!=null){
        var link0URL=links0[0];
        var embedLink0URL= linkPlayer.replace('{url}', link0URL);
        return embedLink0URL;
    }else if(links1!=null){
        var link1URL=links1[0];
        var embedLink1URL= linkPlayer.replace('{url}', link1URL);
        return embedLink1URL;
    }else{
        return "";
    }
}


function common_choiceBoxProcessOneQuestion(choice, oMp3Player){
    var content=choice.text;
    var sounds=content.match(soundBase);
    var links0=content.match(linkBase0);
    var links1=content.match(linkBase1);
    if(sounds!=null){
        var soundURL=sounds[0];
        var embedSoundURL= oMp3Player.replace('{url}', soundURL);
        return embedSoundURL;
    }else if(links0!=null){
        var link0URL=links0[0];
        var embedLink0URL= linkPlayer.replace('{url}', link0URL);
        return embedLink0URL;
    }else if(links1!=null){
        var link1URL=links1[0];
        var embedLink1URL= linkPlayer.replace('{url}', link1URL);
        return embedLink1URL;
    }else{
        return "";
    }
}


function common_contentCounterProcess(choice){
    var content=choice.text;
    var sounds=content.match(soundBase);
    var links0=content.match(linkBase0);
    var links1=content.match(linkBase1);
    if(sounds!=null){ 
        var soundURL=sounds[0];
        return content.replace(soundURL,"");
    }else if(links0!=null){
        var link0URL=links0[0];
        return content.replace(link0URL,"");
    }else if(links1!=null){
        var link1URL=links1[0];
        return content.replace(link1URL,"");
    }else{
        return content;
    }
}

