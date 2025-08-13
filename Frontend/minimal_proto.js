<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Unicamp Map Game</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
  <style>
    #map { height: 100vh; }
    .joystick {
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 100px;
      height: 100px;
      background: rgba(0,0,0,0.2);
      border-radius: 50%;
      touch-action: none;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <div class="joystick"></div>

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    // Center on Unicamp
    const map = L.map('map').setView([-22.817, -47.068], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Player marker
    let playerPos = [-22.817, -47.068];
    const playerMarker = L.marker(playerPos).addTo(map);

    // Movement simulation
    document.querySelector('.joystick').addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const rect = e.target.getBoundingClientRect();
      const dx = touch.clientX - (rect.left + rect.width/2);
      const dy = touch.clientY - (rect.top + rect.height/2);

      // Convert joystick direction to lat/lng change
      playerPos[0] += -dy * 0.00001;
      playerPos[1] += dx * 0.00001;

      playerMarker.setLatLng(playerPos);
      map.setView(playerPos);
    });
  </script>
</body>
</html>
