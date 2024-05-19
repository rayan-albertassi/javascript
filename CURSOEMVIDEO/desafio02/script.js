function clique(){
    var data = new Date();
    var ano = data.getFullYear();
    var anoNascimento = document.getElementById("anoNascimento").value;
    var idade = (ano - Number(anoNascimento));
    var mensagem = document.getElementById("mensagem")
    var imagem = document.getElementById("imagem");
    var sexo = document.querySelector('input[name="sexo"]:checked'); 
    var section = document.getElementById("sessao");
    var foto = document.getElementById("foto");
    foto.style.display = "block";
    section.style.height = "500px";


    var sexo = sexo.value;
    mensagem.innerHTML = ("Detectamos " + sexo + " de " + idade + " anos.");

    if (idade > 0 && idade <= 3){ // bebê
        imagem.src = "bebe.jpg";
    } else if (idade > 3 && idade < 11 && sexo == "homem"){ // criança
        imagem.src = "criancaM.webp";
    } else if (idade > 3 && idade < 11 && sexo == "mulher"){ // criança
        imagem.src = "criancaF.avif";
    } else if (idade >= 11 && idade < 18 && sexo == "homem") { // adolescente
        imagem.src = "adolescenteM.jpg";
    } else if (idade >= 11 && idade < 18 && sexo == "mulher") { // adolescente
        imagem.src = "adolescenteF.jpeg";
    } else if (idade >= 18 && idade < 24 && sexo == "homem") { // jovem adulto
        imagem.src = "jovem-adultoM.jpeg";
    } else if (idade >= 18 && idade < 24 && sexo == "mulher") { // jovem adulto
        imagem.src = "jovem-adulto.avif";
    } else if (idade >= 24 && idade < 60 && sexo == "homem") { // adulto
        imagem.src = "adultoM.jpeg";
    } else if (idade >= 24 && idade < 60 && sexo == "mulher") { // adulto
        imagem.src = "adultoF.jpeg";
    } else if (idade > 60 && idade <= 100 && sexo == "homem") { // idoso
        imagem.src = "idosoM.jpg";
    } else if (idade > 60 && idade <= 100 && sexo == "mulher") { // idoso
        imagem.src = "idosoF.webp";
    } else if (idade > 100) {  // mortokjkkkkk
        imagem.src = "morto.jpeg";
    } else { // inválido
        mensagem.innerHTML = "Ano de nascimento inválido!";
    }
}