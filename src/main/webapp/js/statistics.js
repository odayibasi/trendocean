var drawingScriptLoaded=false;
var drawingDataLoaded=false;
var drawingGeoDataLoaded=false;

var statQuestion=null
var statDist=null;
var statGeoDist=null;
var statChoiceCount=0;

var statChartWidth=270;
var statChartHeight=200;




function statistics_initialize(){

    // Load the Visualization API and the piechart package.
    google.load('visualization', '1', {
        'packages':['corechart','geomap']
    });

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(staticstics_initialized);

}

function staticstics_initialized(){
    drawingScriptLoaded=true;
    statistics_drawChart();
}


function statistics_cropChoice(index){
    var choice=statQuestion.choices[index];
    return choice;
    /*if(choice==null){
        return choice;
    }else if(choice.length<6){
        return choice;
    }else{
        return choice.substr(0,6);
    }*/
}

function statistics_drawInTurkey(){

    if(statGeoDist==null || statQuestion==null){
        return;
    }

    var answCount=parseInt(statQuestion.totalAnswerCount);

    var data = new google.visualization.DataTable();
    var geoStatVal=0;
    if($.isArray(statGeoDist)==false){
        data.addRows(1);
        data.addColumn('string', 'City');
        data.addColumn('number', 'Ratio');
        data.setValue(0, 0, statGeoDist.city.cityName);

        for(i=0;i<statChoiceCount;i++){
            geoStatVal+=parseInt(statGeoDist.distribution[i].value);
        }
        var val=parseFloat((geoStatVal*100/answCount).toFixed(1));
        data.setValue(0, 1,val);
    }

    if($.isArray(statGeoDist)){
        data.addRows(statGeoDist.length);
        data.addColumn('string', 'City');
        data.addColumn('number', 'Ratio');

        for(j=0;j<statGeoDist.length;j++){
            geoStatVal=0;
            data.setValue(j, 0, statGeoDist[j].city.cityName);
            for(i=0;i<statChoiceCount;i++){
                geoStatVal+=parseInt(statGeoDist[j].distribution[i].value);
            }

            var val=parseFloat((geoStatVal*100/answCount).toFixed(1));
            data.setValue(j, 1,val);

        }

    }

    $("#chartTurkey_div").removeClass();




    var options = {};
    options['region'] = 'TR';
    options['colors'] = [0xFF8747, 0xFFB581, 0xc06000]; //orange colors
    options['dataMode'] = 'markers';
    options['width'] = '540';

    var container = document.getElementById('chartTurkey_div');
    var geomap = new google.visualization.GeoMap(container);
    geomap.draw(data, options);

}


function statistics_drawGeoMap(){

    var data = new google.visualization.DataTable();
    data.addRows(6);
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Popularity');
    data.setValue(0, 0, 'Turkey');
    data.setValue(0, 1, 1000);
    data.setValue(1, 0, 'United States');
    data.setValue(1, 1, 300);
    data.setValue(2, 0, 'Brazil');
    data.setValue(2, 1, 400);
    data.setValue(3, 0, 'Canada');
    data.setValue(3, 1, 500);
    data.setValue(4, 0, 'France');
    data.setValue(4, 1, 600);
    data.setValue(5, 0, 'RU');
    data.setValue(5, 1, 700);

    var options = {};
    options['dataMode'] = 'regions';


    var container = document.getElementById('chartGeoMap_div');
    var geomap = new google.visualization.GeoMap(container);
    geomap.draw(data, options);

}



function statistics_drawTotal(){

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choices');
    data.addColumn('number', 'Total');
    data.addRows(statChoiceCount);
    for(i=0;i<statChoiceCount;i++){
        data.setValue(i, 0, statistics_cropChoice(i));
        data.setValue(i, 1, parseInt(statDist[0].distribution[i].value)+parseInt(statDist[1].distribution[i].value));
    }


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chartTotal_div'));
    chart.draw(data, {
        width: statChartWidth,
        height: statChartHeight,
        is3D: true,
        title: 'Choice Distribution'
    });

}


function statistics_drawFM(){

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choices');
    data.addColumn('number', 'M');
    data.addColumn('number', 'F');
    data.addRows(statChoiceCount);
    for(i=0;i<statChoiceCount;i++){
        data.setValue(i, 0, statistics_cropChoice(i));
        data.setValue(i, 1, parseInt(statDist[0].distribution[i].value));
        data.setValue(i, 2, parseInt(statDist[1].distribution[i].value));
    }


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('chartFM_div'));
    chart.draw(data, {
        width: statChartWidth,
        height: statChartHeight,
        is3D: true,
        title: 'Female/Male Statistics'
    });

}


function statistics_drawF(){

    // Create Female our data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choices');
    data.addColumn('number', 'F');
    data.addRows(statChoiceCount);
    for(i=0;i<statChoiceCount;i++){
        data.setValue(i, 0, statistics_cropChoice(i));
        data.setValue(i, 1, parseInt(statDist[1].distribution[i].value));
    }


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chartOnlyF_div'));
    chart.draw(data, {
        width: statChartWidth,
        height: statChartHeight,
        is3D: true,
        title: 'Female Statistics'
    });

}


function statistics_drawM(){

    // Create Male our data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choices');
    data.addColumn('number', 'M');
    data.addRows(statChoiceCount);
    for(i=0;i<statChoiceCount;i++){
        data.setValue(i, 0, statistics_cropChoice(i));
        data.setValue(i, 1, parseInt(statDist[0].distribution[i].value));
    }


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chartOnlyM_div'));
    chart.draw(data, {
        width: statChartWidth,
        height: statChartHeight,
        is3D: true,
        title: 'Male Statistics'
    });

}


function statistics_drawAge(){
}

function statistics_drawEducation(){
}




// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function statistics_drawChart() {

    if(drawingDataLoaded && drawingScriptLoaded){

        //statistics_drawTotal();
        //statistics_drawFM();
        statistics_drawF();
        statistics_drawM();
    }

    if(drawingGeoDataLoaded && drawingScriptLoaded){
        //statistics_drawGeoMap();
        statistics_drawInTurkey();
    }

}


function statistics_display(q, pos){
    statQuestion=q;
    statChoiceCount=q.choices.length;
    $.ajax({
        url: '../api/statistics/bygender/'+q.id,
        type: "GET",
        success: function(data){
            statDist=data.distribution;
            drawingDataLoaded=true;
            statistics_drawChart();
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });


    $.ajax({
        url: '../api/statistics/bycity/TR/'+q.id,
        type: "GET",
        success: function(data){
            statGeoDist=data.distribution;
            drawingGeoDataLoaded=true;
            statistics_drawChart();
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;

}