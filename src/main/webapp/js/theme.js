var theme_relativepath="";
var themePath="default"

function theme_setRelativePath(rPath){
    theme_relativepath=rPath;
}


function theme_addCSSLink(cssFile){

    var theme_relativepath="";

    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = theme_relativepath+'css/'+themePath+'/'+cssFile;
    cssNode.media = 'screen';
    headID.appendChild(cssNode);
}


function theme_addLink(rel, href){

    var theme_relativepath="";
    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.rel = rel;
    cssNode.href = theme_relativepath+'css/'+themePath+'/'+href;
    headID.appendChild(cssNode);
}


function theme_processDesign(){
    //design
    var themeBgImage=cookie_get(COOKIE_BG_URL);
    var themeBgImageTiled=cookie_get(COOKIE_BG_TILED);
    if(themeBgImage!=TEXT_NULL){
        $('body').css('background-position', '0px 0px');
        $('body').css('background-image',"url("+themeBgImage+")");
        if(themeBgImageTiled==TEXT_TRUE){
            $('body').css('background-repeat',"repeat");
        }else{
            $('body').css('background-repeat',"no-repeat");
        }
    }
}