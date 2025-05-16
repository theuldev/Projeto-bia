let map;
let mapMarkers = [];

document.addEventListener('DOMContentLoaded', () => {
    const problemTypeSelect = document.getElementById('problem-type');
    const otherProblemDiv = document.getElementById('other-problem');

    problemTypeSelect.addEventListener('change', function() {
        if (this.value === 'outro') {
            otherProblemDiv.style.display = 'block';
        } else {
            otherProblemDiv.style.display = 'none';
            document.getElementById('other-problem-description').value = ''; // Limpar o campo se mudar a seleção
        }
    });

    // Inicializar um mapa simples (sempre centralizado em algum lugar por padrão)
    initMap({ lat: -12.97, lng: -38.5 }); // Coordenadas aproximadas de Salvador, BA
});

function initMap(center) {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        map = L.map('map').setView([center.lat, center.lng], 13); // Nível de zoom 13

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }
}

function showPosition(position) {
    document.getElementById("latitude").value = position.coords.latitude;
    document.getElementById("longitude").value = position.coords.longitude;

    // Atualizar o mapa para a localização do usuário
    if (map) {
        map.setView([position.coords.latitude, position.coords.longitude], 15);
    } else {
        initMap({ lat: position.coords.latitude, lng: position.coords.longitude });
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Usuário negou a solicitação de geolocalização.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informação de localização indisponível.");
            break;
        case error.TIMEOUT:
            alert("A solicitação para obter a localização do usuário expirou.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ocorreu um erro desconhecido.");
            break;
    }
}

function submitComplaint() {
    const region = document.getElementById("region").value;
    const problemType = document.getElementById("problem-type").value;
    const otherProblemDescription = document.getElementById("other-problem-description").value;
    const description = document.getElementById("description").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const messageDiv = document.getElementById("message");

    if (!region || !problemType || !description) {
        messageDiv.textContent = "Por favor, preencha todos os campos obrigatórios.";
        messageDiv.className = "error";
        messageDiv.classList.remove("hidden");
        return;
    }

    const complaintData = {
        region: region,
        problemType: problemType === 'outro' ? `Outro: ${otherProblemDescription}` : problemType,
        description: description,
        latitude: latitude,
        longitude: longitude
    };

    console.log("Dados da Reclamação:", complaintData);
    messageDiv.textContent = "Reclamação enviada com sucesso! (Dados no console)";
    messageDiv.className = "success";
    messageDiv.classList.remove("hidden");

    // Limpar o formulário (opcional)
    document.getElementById("water-complaint-form").reset();
    document.getElementById("other-problem").style.display = 'none';
}