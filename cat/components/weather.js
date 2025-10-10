// 샘플 날씨 데이터 (실제로는 서버에서 받아올 데이터)
const sampleWeatherData = [
    { time: '06:00', temp: 12, precipitation: 10, cloud: 30 },
    { time: '07:00', temp: 13, precipitation: 5, cloud: 25 },
    { time: '08:00', temp: 14, precipitation: 0, cloud: 20 },
    { time: '09:00', temp: 16, precipitation: 0, cloud: 15 },
    { time: '10:00', temp: 18, precipitation: 0, cloud: 10 },
    { time: '11:00', temp: 20, precipitation: 0, cloud: 15 },
    { time: '12:00', temp: 22, precipitation: 5, cloud: 25 },
    { time: '13:00', temp: 23, precipitation: 10, cloud: 35 },
    { time: '14:00', temp: 24, precipitation: 15, cloud: 40 },
    { time: '15:00', temp: 23, precipitation: 20, cloud: 45 },
    { time: '16:00', temp: 21, precipitation: 25, cloud: 50 },
    { time: '17:00', temp: 19, precipitation: 30, cloud: 55 },
];

function displayWeather(data) {
    const container = document.getElementById('weather-container');
    container.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <span class="time">${item.time}</span>
            <div class="temp">${item.temp}°C</div>
            <div class="weather-item">
                <span class="label">강수확률</span>
                <span class="value">${item.precipitation}%</span>
            </div>
            <div class="weather-item">
                <span class="label">구름정도</span>
                <span class="value">${item.cloud}%</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// 페이지 로드 시 샘플 데이터 표시
window.addEventListener('load', () => {
    displayWeather(sampleWeatherData);
});

// 서버에서 실제 API 데이터를 받을 때 사용할 함수
function fetchWeatherFromServer(authKey) {
    const container = document.getElementById('weather-container');
    container.innerHTML = '<div class="loading">날씨 데이터를 불러오는 중...</div>';
    fetch('/api/weather?authKey=' + authKey)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            container.innerHTML = '<div class="error">데이터 불러오기 실패: ' + error.message + '</div>';
            console.error(error);
        });
}