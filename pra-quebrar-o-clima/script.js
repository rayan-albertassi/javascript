document.addEventListener("DOMContentLoaded", function () {
    const botaoNao = document.getElementById("nao");
    const botaoSim = document.getElementById("sim");
    const body = document.body;

    botaoNao.addEventListener("click", function (event) {
        // Obtém as dimensões da janela do navegador
        const larguraMax = window.innerWidth - botaoNao.clientWidth;
        const alturaMax = window.innerHeight - botaoNao.clientHeight;

        // Gera novas coordenadas aleatórias dentro da tela inteira
        const novaPosX = Math.random() * larguraMax;
        const novaPosY = Math.random() * alturaMax;

        // Aplica a nova posição
        botaoNao.style.position = "absolute";
        botaoNao.style.left = `${novaPosX}px`;
        botaoNao.style.top = `${novaPosY}px`;
    });

    botaoSim.addEventListener("click", function () {
        // Remove todo o conteúdo da página
        document.body.innerHTML = "";

        // Cria o elemento de vídeo
        const video = document.createElement("video");
        video.src = "meme.mp4"; // Caminho do vídeo
        video.width = 480;
        video.height = 480;
        video.autoplay = true;
        video.controls = false; // Remove os controles do player
        video.style.position = "absolute";
        video.style.top = "50%";
        video.style.left = "50%";
        video.style.transform = "translate(-50%, -50%)"; // Centraliza o vídeo

        // Adiciona o vídeo ao corpo da página
        document.body.appendChild(video);
    });
});
