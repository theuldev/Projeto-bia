// Initialize the map centered on Salvador
const map = L.map('map').setView([-12.9714, -38.5014], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Sample data for water quality monitoring points in Salvador
const monitoringPoints = [
    {
        name: "Rio do Cobre",
        position: [-12.9814, -38.4814],
        ph: 7.2,
        turbidity: 12,
        oxygen: 8.4,
        coliforms: 120,
        temperature: 26.5,
        quality: "good",
        lastUpdate: "10/06/2023 09:30",
        status: "stable"
    },
    {
        name: "Dique do Tororó",
        position: [-12.9714, -38.4914],
        ph: 6.8,
        turbidity: 25,
        oxygen: 5.2,
        coliforms: 450,
        temperature: 28.1,
        quality: "fair",
        lastUpdate: "10/06/2023 10:15",
        status: "alert"
    },
    {
        name: "Praia de Itapuã",
        position: [-12.9614, -38.3714],
        ph: 8.1,
        turbidity: 8,
        oxygen: 9.1,
        coliforms: 80,
        temperature: 25.8,
        quality: "good",
        lastUpdate: "10/06/2023 08:45",
        status: "stable"
    },
    {
        name: "Rio Camurujipe",
        position: [-12.9514, -38.4214],
        ph: 5.9,
        turbidity: 42,
        oxygen: 3.8,
        coliforms: 1200,
        temperature: 27.3,
        quality: "poor",
        lastUpdate: "10/06/2023 07:20",
        status: "critical"
    },
    {
        name: "Lagoa do Abaeté",
        position: [-12.9414, -38.3614],
        ph: 7.5,
        turbidity: 15,
        oxygen: 7.9,
        coliforms: 200,
        temperature: 26.2,
        quality: "good",
        lastUpdate: "10/06/2023 11:00",
        status: "stable"
    }
];

// Define icons based on water quality
const icons = {
    excellent: L.divIcon({
        html: '<div class="quality-indicator excellent pulse"></div>',
        className: 'dummy',
        iconSize: [20, 20]
    }),
    good: L.divIcon({
        html: '<div class="quality-indicator good"></div>',
        className: 'dummy',
        iconSize: [20, 20]
    }),
    fair: L.divIcon({
        html: '<div class="quality-indicator fair"></div>',
        className: 'dummy',
iconSize: [20, 20]
    }),
    poor: L.divIcon({
        html: '<div class="quality-indicator poor pulse"></div>',
        className: 'dummy',
        iconSize: [20, 20]
    }),
    critical: L.divIcon({
        html: '<div class="quality-indicator critical pulse"></div>',
        className: 'dummy',
        iconSize: [20, 20]
    })
};

// Add markers for each monitoring point
monitoringPoints.forEach(point => {
    const marker = L.marker(point.position, {
        icon: icons[point.quality]
    }).addTo(map);
    
    // Create custom popup content
    const popupContent = `
        <div class="custom-popup">
            <h3>${point.name}</h3>
            <div class="data-row">
                <span class="data-label">Status:</span>
                <span class="data-value">${getQualityLabel(point.quality)}</span>
            </div>
            <div class="data-row">
                <span class="data-label">pH:</span>
                <span class="data-value">${point.ph}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Turbidez:</span>
                <span class="data-value">${point.turbidity} NTU</span>
            </div>
            <div class="data-row">
                <span class="data-label">Oxigênio Dissolvido:</span>
                <span class="data-value">${point.oxygen} mg/L</span>
            </div>
            <div class="data-row">
                <span class="data-label">Coliformes:</span>
                <span class="data-value">${point.coliforms} UFC</span>
            </div>
            <div class="data-row">
                <span class="data-label">Temperatura:</span>
                <span class="data-value">${point.temperature} °C</span>
            </div>
            <div class="mt-2 text-sm text-gray-500">
                <i class="fas fa-clock mr-1"></i> Atualizado em ${point.lastUpdate}
            </div>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Add hover effects
    marker.on('mouseover', function() {
        this.openPopup();
    });
});

// Helper function to get quality label
function getQualityLabel(quality) {
    const labels = {
        excellent: 'Excelente',
        good: 'Boa',
        fair: 'Regular',
        poor: 'Ruim',
        critical: 'Crítica'
    };
    return labels[quality];
}

// Countdown timer for data refresh
let minutes = 3;
let seconds = 45;

const countdown = setInterval(() => {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(countdown);
            document.getElementById('countdown').textContent = "Atualizando...";
            // Here you would typically refresh the data
            setTimeout(() => {
                minutes = 3;
                seconds = 45;
                document.getElementById('countdown').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            }, 2000);
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    
    document.getElementById('countdown').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}, 1000);
