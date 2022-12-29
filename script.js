// »»»»»»»»»»»»»»»»»»»»» Criando as Variavéis «««««««««««««««««««««««

// contador de itens

let count = 0;

// Array dos elementos
let arrayItems = [];

// »»»»»»»»»»»»»»»»»»»»» Selecionando Componentes do DOM «««««««««««««««««««««««

// Inputs
const inputNome = document.getElementById("nome");
const inputPrimeiro = document.getElementById("primeiro");
const inputSegundo = document.getElementById("segundo");
const inputResultado = document.getElementById("resultado");
const medicoesArray = document.getElementById("medicoes_previstas");

//     -   Botões
const button = document.getElementById("add");
const verify = document.getElementById("verify");

//     -   Div que vai receber os items
const items = document.getElementById("items");

// »»»»»»»»»»»»»»»»»»» Definindo os Status Iniciais dos Elementos ««««««««««««««««««««««««««

// Inputs vazios quando a página carregar

inputNome.value = "";
inputPrimeiro.value = "";
inputSegundo.value = "";
inputResultado.value = "";

// desabilitando o input resultado para este não poder ser editado

inputResultado.disabled = true;

//     -   desabilitando o botão de adicionar

button.disabled = true;

// »»»»»»»»»»»»»»»»»»» Funções que fazem verificações ««««««««««««««««««««««««««

//     -   função pra verificar se os inputs de números estão preenchidos

function verificaNumbers() {
  if (inputPrimeiro.value > 0 && inputSegundo.value > 0) {
    return true;
  } else {
    inputResultado.value = "";
    return false;
  }
}

//     -   função pra verificar se existe um nome preenchido

function verificaNome() {
  if (inputNome.value) {
    return true;
  } else {
    return false;
  }
}

// »»»»»»»»»»»»»»»»»»» Funções que fazem tarefas ««««««««««««««««««««««««««

//     -   função para calcular e adicionar o valor no input resultado

function calcular(primeiroValor, segundoValor) {
  // colocando o resultado no input
  return (inputResultado.value = parseInt(primeiroValor) * parseInt(segundoValor));
}

//     -   para criar o objeto que vai ser adicionado ao array

function createObject() {
  return {
    nome: inputNome.value,
    primeiro: inputPrimeiro.value,
    segundo: inputSegundo.value,
    resultado: inputResultado.value,
    position: count,
  };
}

//     -   função para adicionar o objeto ao array

function addToArray() {
  arrayItems.push(createObject());
}

//     -   função para limpar os inputs

function clearInputs() {
  inputNome.value = "";
  inputPrimeiro.value = 0;
  inputSegundo.value = 0;
  inputResultado.value = 0;
}

//     -   função para remover o elemento da div

function removeElement(itemPos) {
  // selecionando o elemento que vai ser removido
  const element = document.querySelector(`[position="${itemPos}"]`);
  element.remove();
}

//     -   função para remover o objeto do array

function removeFromArray(pos) {
  // filtrando o array e removendo o objeto que tem a mesma posição do elemento que foi removido
  arrayItems = arrayItems.filter((itemDoArray) => itemDoArray.position !== parseInt(pos));
}

//     -   função para criar o elemento que vai ser adicionado na div

function createElement() {
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `<div class="itemBox" position=${count}>
    <p>Nome: ${inputNome.value}</p>
    <p>Primeiro: ${inputPrimeiro.value}</p>
    <p>Segundo: ${inputSegundo.value}</p>
    <p>Resultado: ${inputResultado.value}</p>
    <button class="remove" remove=${count}>Remover</button>
    </div>
  `;
  count++;
  return div;
}

// função para adicionar o elemento na div

function addElement() {
  items.appendChild(createElement());
}

//  função para converter o array em um objeto para ser enviado ao PHP

const popularArrayParaPHP = () => {
  let nomedocampo = medicoesArray.id;
  let objectToPHP = "";

  arrayItems.forEach((item) => {
    objectToPHP += JSON.stringify(item) + ", ";
  });
  objectToPHP = objectToPHP.slice(0, -1);
  medicoesArray.name = nomedocampo + "[" + objectToPHP + "]";
};

// função para adicionar o objeto ao array, adicionar o elemento à div e limpar os inputs

async function add() {
  addToArray();
  addElement();
  popularArrayParaPHP();
  clearInputs();
}

// »»»»»»»»»»»»»»»»»»» EventListeners (Watchers) ««««««««««««««««««««««««««

// Adicionando o evento de watch aos dois inputs ao mesmo tempo usando um array
// esse event listener vai ser ativado sempre que o input for alterado
// se um dos campos estiver vazio vai limpar o resultado

[inputPrimeiro, inputSegundo].forEach((input) => {
  input.addEventListener("keyup", () => {
    if (verificaNumbers()) {
      // se os dois campos estiverem preenchidos vai calcular
      calcular(inputPrimeiro.value, inputSegundo.value);
    }
  });
});

// adicionando watcher nos inputs, sempre que eles forem alterados
// vai ser verificado se nome e resultado estão preenchidos, se estiverem vai habilitar o botão

[inputNome, inputPrimeiro, inputSegundo, inputResultado].forEach((input) => {
  // aqui foi usado keyup, pois é preciso verificar sempre se existe um nome e um resultado
  input.addEventListener("keyup", () => {
    if (inputNome.value !== "" && inputResultado.value > 0) {
      //se  existe um nome e um resultado vai habilitar o botão
      button.disabled = false;
    } else {
      // se não existe vai desabilitar
      button.disabled = true;
    }
  });
});

// adicionando o evento de click no botão remover de cada item criado

items.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    // os botões de remover foram criados com a tag remove, se o objeto clicado tiver essa tag vai retornar true
    const removeItem = e.target.getAttribute("remove");
    removeElement(removeItem);
    removeFromArray(removeItem);
  }
});

// adicionando o evento de click no botão

button.addEventListener("click", () => {
  add();
});

// »»»»»»»»»»»»»»»»»»» Testador ««««««««««««««««««««««««««

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

///

///
