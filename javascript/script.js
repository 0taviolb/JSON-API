document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchData").addEventListener("click", function() {
        fetchAdvice();
    });
});

function fetchAdvice() {
    fetch("https://api.adviceslip.com/advice", { cache: "no-cache" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na resposta da API");
            }
            return response.json();
        })
        .then(data => {
            if (data && data.slip) {
                displayAdvice(data.slip);
            } else {
                throw new Error("Formato de dados inesperado");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar conselho: ", error);
            displayError("Não foi possível obter um conselho. Tente novamente.");
        });
}

function displayAdvice(advice) {
    let output = document.getElementById("output");
    output.innerHTML = ""; // Limpa o conteúdo anterior
    let adviceDiv = document.createElement("div");
    adviceDiv.classList.add("advice-item");
    adviceDiv.innerHTML = `
        <h2>Conselho do Dia</h2>
        <p>"${advice.advice}"</p>
    `;
    output.appendChild(adviceDiv);
}

function displayError(message) {
    let output = document.getElementById("output");
    output.innerHTML = "";
    let errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.innerHTML = `<p>${message}</p>`;
    output.appendChild(errorDiv);
}
