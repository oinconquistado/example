// Items do DOM

// contador de itens

let count = 0;

// selecionando os quatro inputs
const inputNome = document.getElementById("nome");
const inputPrimeiro = document.getElementById("primeiro");
const inputSegundo = document.getElementById("segundo");
const inputResultado = document.getElementById("resultado");

// limpando tudo no reload

inputNome.value = "";
inputPrimeiro.value = "";
inputSegundo.value = "";
inputResultado.value = "";

// botões de ações selecionados
const button = document.getElementById("add");
const verify = document.getElementById("verify");

// desabilitando o input resultado para não poder ser editado

inputResultado.disabled = true;

// div onde vai ficar os campos selecionado
const items = document.getElementById("items");

// Array dos elementos
const arrayItems = [];

// função pra verificar se os inputs de números estão preenchidos

function verificaNumbers() {
  if (inputPrimeiro.value > 0 && inputSegundo.value > 0) {
    return true;
  } else {
    inputResultado.value = "";
    return false;
  }
}

// função pra verificar se existe um nome preenchido

function verificaNome() {
  if (inputNome.value) {
    return true;
  } else {
    return false;
  }
}

// função para calcular e adicionar o valor no input resultado

function calcular(a, b) {
  // colocando o resultado no input
  return (inputResultado.value = parseInt(a) * parseInt(b));
}

// Adicionando o evento de watch aos dois inputs ao mesmo tempo usando um array
// esse event listener vai ser ativado sempre que o input for alterado
// se um dos campos estiver vazio vai limpar o resultado

[inputPrimeiro, inputSegundo].forEach((input) => {
  input.addEventListener("input", () => {
    if (verificaNumbers()) {
      // se os dois campos estiverem preenchidos vai calcular
      calcular(inputPrimeiro.value, inputSegundo.value);
    }
  });
});

// adicionando watcher nos inputs de nome e resultado, sempre que o nome e resultado forem alterados
// vai ser se nome e resultado estão preenchidos, se estiverem vai habilitar o botão

button.disabled = true;

[inputNome, inputPrimeiro, inputSegundo, inputResultado].forEach((input) => {
  input.addEventListener("keyup", () => {
    if (inputNome.value !== "" && inputResultado.value > 0) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
});

// criando o objeto que vai ser adicionado ao array

function createObject() {
  return {
    nome: inputNome.value,
    primeiro: inputPrimeiro.value,
    segundo: inputSegundo.value,
    resultado: inputResultado.value,
  };
}

// função para adicionar o objeto ao array

function addToArray() {
  arrayItems.push(createObject());
}

// função para limpar os inputs

function clearInputs() {
  inputNome.value = "";
  inputPrimeiro.value = "";
  inputSegundo.value = "";
  inputResultado.value = "";
}

// função para remover o elemento da div

function removeElement(index) {
  const element = document.querySelector(`[index="${index}"]`);
  element.remove();
}

// função para remover o objeto do array

function removeFromArray(index) {
  arrayItems.splice(index, 1);
}

// adicionando o evento de click no botão remover

items.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.getAttribute("index");
    removeElement(index);
    removeFromArray(index);
  }
});

// função para criar o elemento que vai ser adicionado na div

function createElement() {
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `<div class="itemBox" index=${count}>
    <p>Nome: ${inputNome.value}</p>
    <p>Primeiro: ${inputPrimeiro.value}</p>
    <p>Segundo: ${inputSegundo.value}</p>
    <p>Resultado: ${inputResultado.value}</p>
    <button class="remove" index=${count}>Remover</button>
    </div>
  `;
  count++;
  return div;
}

// função para adicionar o elemento na div

function addElement() {
  items.appendChild(createElement());
}

// função para adicionar o objeto ao array e adicionar o elemento na div

function add() {
  addToArray();
  addElement();
  clearInputs();
}

// adicionando o evento de click no botão

button.addEventListener("click", () => {
  add();
});

// Tabela pra verificar valores

verify.addEventListener("click", () => {
  console.table({
    inputNome: inputNome.value,
    inputPrimeiro: inputPrimeiro.value,
    inputSegundo: inputSegundo.value,
    inputResultado: inputResultado.value,
    buttonIsDisabled: button.disabled,
  });
  console.table(arrayItems);
});
