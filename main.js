
var solarBodies = {
    "sun":{ wikiLink: null, videos: [], nasaText: ''},
    "mercury":{ wikiLink: null, videos: [], nasaText: ''},
    "venus":{ wikiLink: null, videos: [], nasaText: ''},
    "earth":{ wikiLink: null, videos: [], nasaText: ''},
    "mars":{ wikiLink: null, videos: [], nasaText: ''},
    "uranus":{ wikiLink: null, videos: [], nasaText: ''},
    "neptune":{ wikiLink: null, videos: [], nasaText: ''},
    "pluto":{ wikiLink: null, videos: [], nasaText: ''}
};

$(document).ready(initializeApp);

function initializeApp(){
    // $('button').click(getDataFromYoutube);
    for(let planet in solarBodies){
        $(`.${planet}Div`).click( function(){
            renderPlanetInfoInModal(planet);
        })
        $(".modalShadow").click(function(){
            $(this).hide();
        })
        $(".modalBody").click(function(){
            event.stopPropagation();
        })
    }
}

function displayPlanetInfo(){

}

function getDataFromYoutube() {
    // var solarBodies = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
    for (let eachBody in solarBodies){
    // for (solarIndex = 0; solarIndex < solarBodies.length; solarIndex++) {
        var youtubeAjaxObject = {
            'dataType': 'json',
            'url': 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            'method': 'POST',
            'timeout': 3000,
            'data': {
                'q': 'solar system ' + eachBody/*solarBodies[solarIndex]*/,
                'maxResults': 3,
                'type': 'video',
                'detailLevel': 'verbose'
            },
            'success': function (result) {
                var currentSolarBodiesArr = Object.keys(result.data);
                console.log(Object.keys(result.data));
                // solarBodies
                solarBodies[eachBody].videos = currentSolarBodiesArr;
            },
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(youtubeAjaxObject);
    }
}

function renderVideoLinksOnDom(solarBodyVideoArray, planet) {
    //for (var videoIndex = 0; videoIndex < solarBodyVideoArray.length; videoIndex++) {

        // var frameTag = $("<iframe>", {
        //     'class': planet + "Div",
        //     'width': '560',
        //     'height': '315',
        //     'src': 'https://www.youtube.com/embed/' + solarBodyVideoArray[videoIndex],
        //     'frameborder': '0',
        //     'allow': 'autoplay; encrypted-media'
        // });
        // var contDiv = $("<div>", {
        //     'id': solarBodyVideoArray[videoIndex] + "Div"
        // });
        // $("body").append(contDiv);
        // console.log(solarBodyVideoArray[videoIndex] + "Div");
        $("."+planet+ "Div").click(function(){
            loadAndPlayVideo( solarBodyVideoArray[0], planet)
        }).addClass('clickable')
    //}
}

function renderPlanetInfoInModal(planet){
    $("#modalBody").empty();
    var planetInfo = solarBodies[planet];
    var infoContainer = $("<div>",{
        'class': 'infoContainer'
    })
    var planetTitle = $("<div>",{
        'class': 'planetTitle',
        text: planet
    });
    var planetWikiLink = $("<a>",{
        target:"_blank",
        href:planetInfo.wikiLink,
        text: planet + " wiki info"
    })
    var videoList = $("<ul>").addClass('videoListContainer');
    var videoElements = [];
    for(let i=0; i<planetInfo.videos.length; i++){
        var videoLink = $("<li>", {
            text: 'video '+i,
            on: {
                click: function(){
                    loadAndPlayVideo(planetInfo.videos[i]);
                }
            }
        })
        videoElements.push( videoLink )
    }
    videoList.append(videoElements);
    infoContainer.append(planetTitle, planetWikiLink, videoList)
    $("#modalBody").append(infoContainer);
    $("#infoModal").show();
}

function loadAndPlayVideo(link, planet){
    $("#videoModal").show();
    $("#videoPlayer").attr('src','https://www.youtube.com/embed/' + link )
}

getDataFromYoutube();

//omers doing his random shit down here---------------------------------




function getDataFromYoutube() {
    // var solarBodies = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
    for (let eachBody in solarBodies){
    // for (solarIndex = 0; solarIndex < solarBodies.length; solarIndex++) {
        var youtubeAjaxObject = {
            'dataType': 'json',
            'url': 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            'method': 'POST',
            'timeout': 3000,
            'data': {
                'q': 'solar system ' + eachBody/*solarBodies[solarIndex]*/,
                'maxResults': 3,
                'type': 'video',
                'detailLevel': 'verbose'
            },
            'success': function (result) {
                var currentSolarBodiesArr = Object.keys(result.data);
                console.log(Object.keys(result.data));
                // solarBodies
                solarBodies[eachBody].videos = currentSolarBodiesArr;
            },
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(youtubeAjaxObject);
    }
}

 
function getWikiText() {
    // var solarBodies = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
    for (let eachBody in solarBodies){
    // for (solarIndex = 0; solarIndex < solarBodies.length; solarIndex++) {
        var wikiAjaxObject = {
            'dataType': 'json',
            'url': 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+eachBody+"&callback=?",
            'success': function(data){
            console.log(data) 
            // var solarBodies = {
            //     "sun":{ wikiLink: null, videos: [], nasaText: ''},
            solarBodies[eachBody].wikiLink='https://en.wikipedia.org/wiki/'+eachBody
            var markup = data.parse.text["*"];
            var infoDiv = $('<div>').html(markup);         
            infoDiv.find('a').each(function() { $(this).replaceWith($(this).html()); });
            infoDiv.find('sup').remove();
            infoDiv.find('.mw-ext-cite-error').remove();
            var findthePs=($(infoDiv).find('.mw-parser-output>p'))
            var display=$('a').html($(infoDiv).find(findthePs));
            },
        
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(wikiAjaxObject);
    }
}
getWikiText()