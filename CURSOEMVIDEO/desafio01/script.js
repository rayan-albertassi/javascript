function carregar() {
    var horaAtual = document.getElementById("horaAtual"); // msg
    var imagem = document.getElementById("imagem");
    var data = new Date();
    var hora = data.getHours();
    
    horaAtual.innerText ="Agora são " + hora + " horas."

    if (hora >= 6 && hora < 12){ // dia manhã
        imagem.src = "manha.avif";
        document.body.style.backgroundColor = "#e2cd9f";
    } else if (hora >= 12 && hora < 18) { // tarde
        imagem.src = "tarde.webp";
        document.body.style.backgroundColor = "#b9846f";
    } else{                   // noite
        imagem.src = "noite.jpg";
        document.body.style.backgroundColor = "#515154";
    }
}