/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    var urljson = window.location.origin+"/assets/json/infomap.json";

    fetch(urljson)
        .then((response) => response.json())
        .then((data) => {
            var map = L.map('map').setView([data["map-lat"], data["map-lon"]], data["map-zoom"]);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: data["map-maxzoom"],
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);


            data["flowers"].forEach(flower => {
                if(flower["visible"]){
                    var marker = L.marker([flower["lat"], flower["lon"]]).addTo(map);
                    marker.bindPopup(flower["name"]);
                }
            });
        });

        // Obtenir un flux vidéo à partir de la webcam
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
        // Afficher le flux vidéo dans la balise vidéo
        document.querySelector('#webcam').srcObject = stream;
        // Attendre que la vidéo soit prête
        document.querySelector('#webcam').onloadedmetadata = () => {
        // Lire les codes QR à partir du flux vidéo
        setInterval(() => {
        const video = document.getElementById("webcam");
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        const imageData = canvas.getContext("2d").getImageData(
        0,
        0,
        canvas.width,
        canvas.height
        );
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCode) {
        document.querySelector('#result').textContent = qrCode.data;
            let res = document.querySelector('#result').textContent;
            let tab = res.split("/");
            tab.splice(0, 1);
            res = tab.join("/");
            console.log(res);
            if (res.value !== "" || res !== null || res !== undefined) {
                try {
                    fetch(res)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            let nomfr = data["Nom Français"];
                            let nomlat = data["Nom Latin"];
                            let floraisonColor = data["Floraison Couleur"];
                            let nectar = data["Nectar"];

                            document.querySelector('#nomfr').textContent = nomfr;
                            document.querySelector('#nomlat').textContent = nomlat;
                            document.querySelector('#floraisonColor').textContent = floraisonColor;
                            document.querySelector('#nectar').textContent = nectar;
                            let score = document.querySelector('#score').value;
                            score = parseInt(score);
                            score = score + parseInt(nectar);
                            document.querySelector('#score').textContent = score;

                            let url = "/assets/img/"+nomlat+".jpg";
                            document.querySelector('#plantimg').src = url;
                        });
                } catch (error) {
                    console.log(error)
                }
            }
    }
    }, 200);
    };
    })
        .catch(err => {
        console.error(err);
    });



});
