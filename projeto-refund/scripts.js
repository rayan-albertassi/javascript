// seleciona o formulário
let form = document.querySelector("form");

// seleciona o input valor da despesa
let valorDaDespesa = document.getElementById("amount");

// seleciona o nome da categoria
let nomeDaDespesa = document.getElementById("expense");

// seleciona a opção de categoria
let category = document.getElementById("category");

// seleciona o botão de submit
let submit = document.querySelector("button");

// seleciona os elementos da lista
let listaDespesa = document.querySelector("ul");

// seleciona a quantidade de despesas
const quantidadeDespesas = document.querySelector("aside header p span");

const despesasTotais = document.querySelector("aside header h2");

// captura o evento de input e formata o valor
valorDaDespesa.oninput = () => {
  //obtem o valor atual do input e remove os caracteres não numéricos.
  let value = valorDaDespesa.value.replace(/\D/g, "");

  // transforma o valor em centavos
  value = Number(value) / 100;

  // atualiza o valor para o valor formatado
  valorDaDespesa.value = formatoBRL(value);
};

// formata no padrão BRL
function formatoBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

// captura o evento de submit
form.onsubmit = (event) => {
  // previne comportamento padrao
  event.preventDefault();

  // cria um objeto com os detalhes da nova despesa
  const novaDespesa = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  // chama a função que vai adicionar o item na lista
  adicionarDespesa(novaDespesa);
};

// adiciona novo item na lista
function adicionarDespesa(novaDespesa) {
  try {
    // cria o elemento li para adicionar na lista ul.
    const itemDespesa = document.createElement("li");
    itemDespesa.classList.add("expense");

    // cria o ícone da categoria.
    const iconeDespesa = document.createElement("img");
    iconeDespesa.setAttribute("src", `img/${novaDespesa.category_id}.svg`);
    iconeDespesa.setAttribute("alt", novaDespesa.category_name);

    // cria as informações da despesa.
    const informacoes = document.createElement("div");
    informacoes.classList.add("expense-info");

    // cria o nome da despesa
    nomeDespesa = document.createElement("strong");
    nomeDespesa.textContent = novaDespesa.expense;

    // cria a categoria da despesa
    categoriaDespesa = document.createElement("span");
    categoriaDespesa.textContent = novaDespesa.category_name;

    // adiciona nome e categoria dentro da div das despesas
    informacoes.append(nomeDespesa, categoriaDespesa);

    // cria o valor da despesa
    valorDespesa = document.createElement("span");
    valorDespesa.classList.add("expense-amount");
    valorDespesa.innerHTML = `<small>R$</small>${novaDespesa.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const iconeRemover = document.createElement("img");
    iconeRemover.classList.add("remove-icon");
    iconeRemover.setAttribute("src", "img/remove.svg");
    iconeRemover.setAttribute("alt", "remover");

    // adiciona as informações no item
    itemDespesa.append(iconeDespesa, informacoes, valorDespesa, iconeRemover);

    // adiciona o item na lista
    listaDespesa.append(itemDespesa);

    // limpa o formulário para adicionar novo item
    limpar()

    // atualiza os totais
    atualizarTotal()
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

// atualiza os totais
function atualizarTotal() {
  try {
    // recupera os itens (li) da lista
    const itens = listaDespesa.children;

    // atualiaza o total de itens da lista
    quantidadeDespesas.textContent = `${itens.length} ${
      itens.length > 1 ? "despesas" : "despesa"
    }`;

    let total = 0;

    for (let item = 0; item < itens.length; item++) {
      const quantidadeItens = itens[item].querySelector(".expense-amount");

      // remove caracteres e substitui a virgula por ponto
      let value = quantidadeItens.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // converte o valor para float
      value = parseFloat(value);
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número."
        );
      }

      // incrementa o valor total
      total += Number(value);
    }

    // cria span para adicionar o R$ formatado.
    const simboloBRL = document.createElement("small");
    simboloBRL.textContent = "R$";

    total = formatoBRL(total).toUpperCase().replace("R$", "");

    // limpa o conteúdo do elemento
    despesasTotais.innerHTML = "";

    // adiciona simbolo BRL e valor total formatado.
    despesasTotais.append(simboloBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais.");
  }
}

// captura clique nos itens da lista
listaDespesa.addEventListener("click", function (event) {

  // verifica se o elemento clicado é o ícone de remover
  if (event.target.classList.contains("remove-icon")) {

    // obtém a li pai do elemento clicado
    const item = event.target.closest(".expense")

    // remove o item da lista
    item.remove()
  }

  atualizarTotal()
});

function limpar() {
  nomeDaDespesa.value = ""
  category.value = ""
  valorDaDespesa.value = ""

  // foca no imput do nome da despesa
  nomeDaDespesa.focus()
}
