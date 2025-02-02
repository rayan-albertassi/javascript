
const apiKey = "e81eda791b447eb1e3028758a935f062c94dd3f24809a18493dca201c6093bd5"
const apiUrl = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"

const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const description = document.getElementById("description")
const result = document.getElementById("result")
const footer = document.querySelector("footer")
const form = document.querySelector("form")

let quotes = {}

amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "") 
})

async function fetchQuote() {
    try{
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error("Erro ao buscar cotação atual.")
            quotes = await response.json()

        const usdToBrl = quotes.USDBRL
        const eurToBrl = quotes.EURBRL
        const btcToBrl = quotes.BTCBRL
        description.innerHTML = `US$ 1 = R$ ${parseFloat(usdToBrl.bid).toLocaleString("PT-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})} | € 1 = R$ ${parseFloat(eurToBrl.bid).toLocaleString("PT-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})} <br> BTC 1 = R$ ${parseFloat(btcToBrl.bid).toLocaleString("PT-BR", {minimumFractionDigits: 2,maximumFractionDigits: 2})} `
    } catch (error) {
        console.error("Erro ao buscar cotações atuais", error)
        description.textContent = "Erro ao obter cotações atuais. Tente novamente mais tarde."
    }
}

function convert() {
    const value = parseFloat(amount.value)
    const moeda = currency.value


    if (!value || !moeda) {
        alert("Por favor, insira um valor e uma moeda.")
        return
    }

    let quote = 0
    let currencyName = ""

    if (moeda === "USD") {
        quote = parseFloat(quotes.USDBRL.bid)
        currencyName = "Dólares"
    } else if (moeda === "EUR") {
        quote = parseFloat(quotes.EURBRL.bid)
        currencyName = "Euros"
    } else if (moeda === "BTC") {
        quote = parseFloat(quotes.BTCBRL.bid)
        currencyName = "Bitcoin"
    }

    const resultado = (value * quote).toFixed(2)
    const resultadoFormatado = parseFloat(resultado).toLocaleString("PT-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2,
    })

    result.textContent = `R$ ${resultadoFormatado}`
    footer.classList.add("show-result")
}

form.onsubmit = (event) => {
    event.preventDefault()
    convert()    
}

fetchQuote()
