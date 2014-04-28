var flag=false;
var prevListenDOM='<a class="listentag-pod" href=""></a>';

var podcast_directive = {
    '@id':'"items"',
    'div.podcast-part': {
        'post <- items':{
            'div.podcast-id':'post.id',
            'div.podcast-Name':'post.title',
            'div.podcast-Date':function(arg){
                var time=arg.item.updated.substring(5, 16);
                return time;
            }
        }
    }
};

var podcast_template;
var display_podcasts=null;
var selected_podcast=null;
var tblPodcasts_data=null;
var selected_EmbedDIV=null;

var podcastPlayer='<div class="listentag-pod-player" href=""><object type="application/x-shockwave-flash" data="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" width="11" height="11">'+
    '<param name="movie" value="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" />'+
    '<param name="bgcolor" value="#a58c8b" />'+
    '<param name="FlashVars" value="mp3={url}&amp;width=11&amp;height=11&amp;showslider=0&amp;showloading=never&amp;buttonwidth=11&amp;sliderwidth=0&amp;sliderheight=0&amp;volumewidth=0&amp;volumeheight=0&amp;bgcolor=a58c8b&amp;bgcolor1=a58c8b&amp;bgcolor2=a58c8b&amp" />'+
'</object></div>'


function tblPodcasts_initialize(){
    $("#btnMore").hide();
    $(".podcast-def").hide();
    podcast_template = $('#podc_part').compile(podcast_directive);
    $('#podc_part').hide();
    $('#tableLoadingIcon').hide();


    $('.podcast_main_body').live("click",function(event){
        event.preventDefault();
        var pID=$(this).parents('.podcast-part').children(':first-child').children(':first-child').text();
        selected_podcast=tblPodcasts_getPodcast(pID);
        if(selected_podcast!=null){
            if(selected_EmbedDIV!=null){
                selected_EmbedDIV.html(prevListenDOM);
            }
            selected_EmbedDIV=$(this).parents('.podcast-part').find('.podcast-EmbedPlayer');
            var embedCode=podcastPlayer.replace('{url}',$.URLEncode(selected_podcast.id));
            selected_EmbedDIV.html(embedCode);
        }
    });

}


function tblPodcasts_getPodcast(pID){
    for (i=0;i<display_podcasts.length;i++){
        var podcast=display_podcasts[i];
        if(podcast.id==pID){
            return podcast;
        }
    }
    return null;
}


function tblPodcasts_renderPodcasts(data){

    var scrollPosition=$(window).scrollTop();
    $('#static_que_section').html("<div id=que_section></div>");
    tblPodcasts_data=data;
    if(data==null){
        data=new Object();
        display_podcasts=null;
    }else if($.isArray(data.items)){
        display_podcasts=data.items;
    }else{
        display_podcasts=new Array(data.items);
    }

    data.items=display_podcasts;
    $('#que_section').render(data, podcast_template);
    $(window).scrollTop(scrollPosition);
    
};
