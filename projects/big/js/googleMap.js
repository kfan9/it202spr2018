        function myMap() {
            var latTemp, lngTemp;
            infoWindow = new google.maps.InfoWindow;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    latTemp = pos.lat;
                    lngTemp = pos.lng;
                    infoWindow.setPosition(pos);

                    infoWindow.setContent('Location found.' + latTemp + ', ' + lngTemp);
                    infoWindow.open(map);
                    map.setCenter(pos);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }




            var myCenter = new google.maps.LatLng(latTemp, lngTemp);
            var mapProp = {
                center: myCenter,
                zoom: 12,
                scrollwheel: false,
                draggable: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var marker = new google.maps.Marker({
                position: myCenter
            });
            marker.setMap(map);
        }

        function listCurList() {
            clearBox('three');
            db = request.result;
            var dataSet = [];
            var db = request.result;
            var objectStore = db.transaction("cityName").objectStore("cityName");

            objectStore.openCursor().onsuccess = function(e) {
                var cursor = e.target.result;

                if (cursor) {
                    var temp = [cursor.key,
                        cursor.value.stateCountryName,
                        cursor.value.temp,
                        cursor.value.date,
                        cursor.value.desc
                    ];
                    dataSet.push(temp);
                    cursor.continue();

                } else {
                    //console.log("end of db");
                }
            }
            setTimeout(function() {
                $('#three').append('<ul class="mdc-list mdc-list--two-line">');
                for (i = 0; i < dataSet.length; i++) {
                    $('#three').append(
                        '<li class="mdc-list-item">' +
                        '<span class="mdc-list-item__text">' +
                        dataSet[i][0] + ', ' + dataSet[i][1] + ' ' + dataSet[i][3] +
                        '<span class="mdc-list-item__secondary-text">' +
                        dataSet[i][2] + ascii(176) + 'C  ' + dataSet[i][4] +
                        '</span>' +
                        '</span>' +
                        '</li>'
                    );
                }
                $('#three').append('</ul>');
            }, 100);


        }