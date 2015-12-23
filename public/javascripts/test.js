var map;
var location;
var placeID;
var global_loc;
var map_img = {};
var flag_img = 0;
var map_review = {};
var flag_review = 0;

jQuery (function ($) {
    initMap();
    openModal();
    createWaterfell();
    resizeMap();
});

var url = null;
var imgurl = null;
//var latitude = null;
//var longitude = null;
var minx = null;
var maxx = null;
var miny = null;
var maxy = null;


function createWaterfell() {
      $("#div1").waterfall({
          itemClass: ".box",
          minColCount: 2,
          spacingHeight: 10,
          resizeable: true,
          ajaxCallback: function(success, end) {
              // var data = {"data": [
              //     { "src": "http://imglf1.ph.126.net/UwrYDwgbjhb-BmfcJ_ynPw==/6630807181443134887.jpg" }
              // ]};
              //if(kw == null){}
                var latitude = (Math.random())*10;
                var longitude = (Math.random())*10;
                minx = (longitude-0.5);
                maxx = (longitude+0.5);
                miny = (latitude-0.5);
                maxy = (latitude+0.5);
                url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx="+minx+"&miny="+miny+"&maxx="+maxx+"&maxy="+maxy+"&size=medium&mapfilter=true&callback=?";
              
              /*else
              {
                var address = kw;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      latitude = parseFloat(results[0].geometry.location.lat());
                      longitude = parseFloat(results[0].geometry.location.lng());
                      minx = (longitude-0.5);
                      maxx = (longitude+0.5);
                      miny = (latitude-0.5);
                      maxy = (latitude+0.5);
                      url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx="+minx+"&miny="+miny+"&maxx="+maxx+"&maxy="+maxy+"&size=medium&mapfilter=true&callback=?";              
            }});
              }
              */
              $.getJSON(url, function(json){
               
                imgurl = "http://static.panoramio.com/photos/large/"+json.photos[0].photo_url.replace(/[^0-9]/ig,"")+".jpg";
                console.log(imgurl);  });
              
              var t = "Lujiazui";
              var s = null;
              
              //for (var j = 0;j<5; j++) { }
                if(imgurl!= null){
                  s = imgurl;} 
                else{
                  s = "http://www.voyagchina.com/uploads/4/3/1/5/43152505/9972293_orig.jpg?157";
                }
                

              var q = "https://en.wikipedia.org/wiki/Lujiazui";
              var f = "from Wikipedia";
              var i = "Lujiazui is a locality in Shanghai, a peninsula formed by a bend in the Huangpu River.";

              
              
              var temp_1 = '<div class="box">';
              var temp_2 = '<a title="{{title}}">';
              var temp_3 = '<img src="{{src}}" class="img-thumbnail" id="main-pic"></a></br>';
              var temp_4 = '<div class="divs"><div class="pic-info"><a id="pic-info" href="{{quote}}">';
              var temp_5 = '{{from-where}}</a></div><div class="like"><img class="img-circle" src="images/like.png" onclick=""></div></div>';
              var temp_6 = '<hr width=100% size=3 color=#C0C0C0 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)">';
              var temp_7 = '<div class="description"><p>{{introduction}}</p></div>';
              var temp_8 = '<hr width=100% size=3 color=#C0C0C0 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"><div class="user-info"></div></div>';
             
             
              //for(i = 0; i< 5;i++){ }
                var str = "";
                str += temp_1;
              str += temp_2.replace("{{title}}", t);
              str += temp_3.replace("{{src}}", s);
              str += temp_4.replace("{{quote}}", q);
              str += temp_5.replace("{{from-where}}", f);
              str += temp_6;
              str += temp_7.replace("{{introduction}}", i);
              str += temp_8;
              $(str).appendTo($("#div1"));
             
              

              success();
              end();
          }
      });
}

function openModal(){
    $(document).delegate('#main-pic', 'click',function(){
          

          $('.modal-body').empty();
          $('#photos').empty();
          $('#information').empty();
          $('#addr').empty();
          $('#geo').empty();
          $('#oh').empty();
          $('#website').empty();
          $('#rating').empty();
          $('#review').empty();
          
          map_img = {};
          flag_img = 0;
          map_review = {};
          map_img = 0;
          
          var title = $(this).parent('a').attr("title");
          $('.modal-title').html(title);
          var temp = ($(this).parents('div').html()).replace('id="main-pic"', ' ');
          $(temp).appendTo('#pic-modal');
          resizeMap();
          // showMap();
          findLocation(title);
          findWikipedia(title);
          $('#myModal').modal({show:true});
    });
}

function initMap() {
    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var mapOptions = {
      zoom: 11,
      center: myLatlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

};



function resizeMap() {
   if(typeof map =="undefined") return;
   setTimeout( function(){resizingMap();} , 400);
}

function resizingMap() {
   if(typeof map =="undefined") return;
   var center = map.getCenter();
   google.maps.event.trigger(map, "resize");
   map.setCenter(center); 
}

function findLocation(location) {
    var myLatlng = new google.maps.LatLng(40.7970239,-73.96536);
    var mapOptions = {
        zoom: 11,
        center: myLatlng
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(location, geocoder, map);

    var request = {
      location: map.getCenter(),
      radius: 50000,
      query: location
    };
    
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {

      if (results[0].formatted_address != undefined) {
        $('#addr').html('<span style="font-weight:bold">Address: </span><span>' + results[0].formatted_address + '</span>');  
      }
      if (results[0].geometry != undefined) {
        $('#geo').html('<span style="font-weight:bold">Location: </span><span>' + results[0].geometry.location + '</span>');  
      }
      if (results[0].opening_hours != undefined) {
        if (results[0].opening_hours.open_now) {
          $('#oh').html('<span style="font-weight:bold">Open Now: </span><span>open</span>'); 
        }
      }
      if (results[0].rating != undefined) {
        var str = '</br><span style="font-weight:bold; font-size: 130%;">Rating: </span><span style="font-weight:bold; font-size: 130%; color: #FF6600">' + results[0].rating + '</span></br>';
        // var star = '<div class="rateit" data-rateit-value="' + results[0].rating + '" data-rateit-ispreset="true" data-rateit-readonly="true"></div>';
        if (0 < results[0].rating && 1 >= results[0].rating) {
            var star = '<span class="starRating"><input id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label><input id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label><input id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label><input id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label><input id="rating1" type="radio" name="rating" value="1"><label for="rating1">1</label></span>';
        } else if (1 < results[0].rating && 2 >= results[0].rating) {
            var star = '<span class="starRating"><input id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label><input id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label><input id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label><input id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label><input id="rating1" type="radio" name="rating" value="1" checked><label for="rating1">1</label></span>';
        } else if (2 < results[0].rating && 3 >= results[0].rating) {
            var star = '<span class="starRating"><input id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label><input id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label><input id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label><input id="rating2" type="radio" name="rating" value="2" checked><label for="rating2">2</label><input id="rating1" type="radio" name="rating" value="1"><label for="rating1">1</label></span>';
        } else if (3 < results[0].rating && 4 >= results[0].rating) {
            var star = '<span class="starRating"><input id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label><input id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label><input id="rating3" type="radio" name="rating" value="3" checked><label for="rating3">3</label><input id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label><input id="rating1" type="radio" name="rating" value="1"><label for="rating1">1</label></span>';
        } else if (4 < results[0].rating && 5 >= results[0].rating) {
            var star = '<span class="starRating"><input id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label><input id="rating4" type="radio" name="rating" value="4" checked><label for="rating4">4</label><input id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label><input id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label><input id="rating1" type="radio" name="rating" value="1"><label for="rating1">1</label></span>';
        } else {
            var star = '<span class="starRating"><input id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label><input id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label><input id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label><input id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label><input id="rating1" type="radio" name="rating" value="1"><label for="rating1">1</label></span>';
        }
        // var star = '<span class="starRating"><input id="rating5" type="radio" name="rating" value="5" checked><label for="rating5">5</label><input id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label><input id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label><input id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label><input id="rating1" type="radio" name="rating" value="1"><label for="rating1">1</label></span>';
        // $('#rating').html(str);
        $(str).appendTo($("#rating"));
        $(star).appendTo($("#rating"));   
      } 
      if (results[0].website != undefined) {
        $('#website').html('<span style="font-weight:bold">Website: </span><span>' + results[0].website + '</span>');   
      } 

      placeID = results[0].place_id;
      var request = {
        placeId: placeID
      };
      serv = new google.maps.places.PlacesService(map);
      serv.getDetails(request, callback_details);    
  }
}

function callback_details(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          if (place.photos != undefined) {
            var str = "";
            for(var i = 0; i < place.photos.length; i++) {
                if (!map_img.hasOwnProperty(place.photos[i].getUrl({'maxWidth':200, 'maxHeight':200}))) {
                    str += '<img src="' + place.photos[i].getUrl({'maxWidth':200, 'maxHeight':200}) +'" id="ref-pic" class="img-thumbnail">';
                    map_img[place.photos[i].getUrl({'maxWidth':200, 'maxHeight':200})] = flag_img;
                    flag_img++;
                }
            }
            $('#photos').html(str);
            
          }

          if (place.reviews != undefined) {
            var review_header = '</br><scan style="font-weight: bold; font-size: 130%">Reviews<scan></br>';
            if (!map_review.hasOwnProperty(review_header)) {
                $(review_header).appendTo($('#review'));  
                map_review[review_header] = flag_review;
                flag_review++;
            }

            var str = "";
             for (var i = 0; i < place.reviews.length; i++) {
                if (!map_review.hasOwnProperty(place.reviews[i].text)) {
                    str = '<scan style="font-weight: bold">' + place.reviews[i].author_name + ': </scan><scan class="review_content">"' + place.reviews[i].text + '"</scan></br>';
                    $(str).appendTo($('#review'));
                    str = "";
                    map_review[place.reviews[i].text] = flag_review;
                    flag_review++;
                }
             }
             // $(str).appendTo($('#review'));
             
          }
      }
}    


function geocodeAddress(location, geocoder, resultsMap) { 
  var address = location;
  geocoder.geocode({'address': address}, function(results, status) {  
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      global_loc = results[0].geometry.location;

      var request = {
        location: global_loc,
        radius: 50000,
        keyword: location
      };
      
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback_details);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}



function findWikipedia(keyword) {
  $(document).ready(function(){
 
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + keyword + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
 
            var markup = data.parse.text["*"];
            var blurb = $('<div id="information"></div>').html(markup);
 
            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
 
            // remove any references
            blurb.find('sup').remove();
 
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();

            var intro = blurb.find('p');
            var newIntro = intro.slice(0,20);
            if (newIntro == "Redirect to:") {
              $('#information').html("heiheihei");  
            } 
            else {
              $('#information').html(newIntro);  
            }
      
        },
        error: function (errorMessage) {
        }
    });
  });
}

