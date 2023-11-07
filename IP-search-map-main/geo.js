
// mensaje de salida
const ip = document.getElementById('ip');
const locationIP = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

// mensaje de entrada
const inputIP = document.getElementById ('inputIP');
const btnIP = document.getElementById ('btnIP');

// clave de API
const apiKey = 'at_GEWUVveP8Xcl1SMUo0xolUwCCQmlL';

// mapa vista previa

let map = L.map('map').setView([5.967, -62.537], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  let marker = L.marker([5.967, -62.537]);
  marker.addTo(map);
  //popup Salto Angel
  let popup = L.popup().setContent("The angel jump is the world's highest uninterrupted waterfall.");
  marker.bindPopup(popup);


// geoAPI
const searchIP = async (event) => {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${inputIP.value}`;
  try {
    const res = await geoAPI(url);
    ip.innerText = res.ip;
    locationIP.innerText = res.location.city;
    timezone.innerText = res.location.timezone;
    isp.innerText = res.isp;
    updateMap(res);
  } catch (err) {
    console.log(err);
  }
}

const geoAPI = async (url) => {
  try {
    const dataGEO = await fetch(url);
    const resultData = await dataGEO.json();
    return resultData;
  } catch (err) {
    console.log(err);
  }
}

// actualizar mapa
const updateMap = (res) => {
  map.setView([res.location.lat, res.location.lng], 13);
  map.eachLayer(function (layer) {
    map.removeLayer(layer);    
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
const marker = L.marker([res.location.lat, res.location.lng]).addTo(map);

// Popup
let popup = L.popup().setContent("This is your IP Location");
  marker.bindPopup(popup);

map.locate({setView: true, maxZoom: 16});


}
btnIP.addEventListener ('click', searchIP);
