const cities = [
  { name: 'Sydney', timezone: 'Australia/Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Melbourne', timezone: 'Australia/Melbourne', lat: -37.8136, lon: 144.9631 },
  { name: 'Perth', timezone: 'Australia/Perth', lat: -31.9505, lon: 115.8605 },
  { name: 'Brisbane', timezone: 'Australia/Brisbane', lat: -27.4698, lon: 153.0251 },
  { name: 'Adelaide', timezone: 'Australia/Adelaide', lat: -34.9285, lon: 138.6007 }
];

const container = document.getElementById('cities');

function updateClock(elem, timeZone) {
  setInterval(() => {
    const now = new Date().toLocaleTimeString("en-AU", { timeZone: timeZone });
    elem.querySelector('.clock').innerText = now;
  }, 1000);
}

function fetchWeather(city, card) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m&timezone=${city.timezone}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const nowHour = new Date().getHours();
      const temp = data.hourly.temperature_2m[nowHour];
      card.querySelector('.temperature').innerText = `Temp: ${temp}°C`;
    })
    .catch(() => {
      card.querySelector('.temperature').innerText = "Weather unavailable";
    });
}

function createCityCard(city) {
  const card = document.createElement('div');
  card.className = 'city';
  card.innerHTML = `
    <h2>${city.name}</h2>
    <div class="clock">--:--:--</div>
    <div class="temperature">Loading...</div>
  `;
  container.appendChild(card);
  updateClock(card, city.timezone);
  fetchWeather(city, card);
}

cities.forEach(createCityCard);
