window.onload = function(){
				document.getElementById('link_str').onclick = function(){
					var address = document.getElementById('link_id').value;
					var geocoder = new google.maps.Geocoder();
					var url = null;
					geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
							var latitude = parseFloat(results[0].geometry.location.lat());
							var longitude = parseFloat(results[0].geometry.location.lng());
							var minx = (longitude-0.5);
							var maxx = (longitude+0.5);
							var miny = (latitude-0.5);
							var maxy = (latitude+0.5);
							url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx="+minx+"&miny="+miny+"&maxx="+maxx+"&maxy="+maxy+"&size=medium&mapfilter=true&callback=?"
							console.log(url);
							var temp_p = '<li><img src="{{src}}" class="img-thumbnail" id="main-pic"> <p>"{{p}}"</p></li>';


							$.getJSON(url, function(json){
								var i =0;
								for(i=0;i<json.photos.length;i++){
									var imgurl = "http://static.panoramio.com/photos/large/"+json.photos[i].photo_url.replace(/[^0-9]/ig,"")+".jpg";
									console.log(imgurl);
									console.log(json.photos[i].photo_url);
									var img = document.createElement("img")
									img.src = imgurl;
									img.className = "image";
									
									//var str = "";
									//str += temp_p.replace("{{src}}", imgurl);
									//str += temp_p.replace("{{p}}", address);
									//$(str).appendTo($("#container"));
									//<li><img src="img/image_2.jpg" width="200" height="300"><p>2</p></li>
								}	
							});
						} 
					});
				};
			}