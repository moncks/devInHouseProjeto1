var addBtn = document.getElementById('addBtn');
var textItem = document.getElementById('text1');
var ulItens = document.getElementById('meusItens');
var itemsJson = [];
var li;
var contador = itemsJson.length
lerLocalStorageEMontarLista()

function adicionar() {
    var itemAFazer = textItem.value;

    if (itemAFazer) {
        criarItem(itemAFazer);
        saveOnLocalStorage(itemAFazer);
        limparCampoInput();
    } else {
        alert('adiciona uma merda aqui!')
    }
}

function criarItem(valor) {
    let li = document.createElement("li");
    li.setAttribute('id', contador += 1)
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox')
    li.appendChild(checkbox)

    let label = document.createElement('label')
    label.appendChild(document.createTextNode(valor))
    li.appendChild(label);

    li.appendChild(criarBotaoRemoverItem(contador));
    ulItens.appendChild(li);
}

function criarBotaoRemoverItem(id) {
    let btn = document.createElement('button');
    btn.setAttribute('onclick', 'remover(' + id + ')');
    btn.className = 'remover'
    btn.appendChild(document.createTextNode("X"))
    return btn;
}


function saveOnLocalStorage(item) {
    itemsJson.push(item);
    localStorage.setItem('listaToDo', JSON.stringify(itemsJson));
}

function limparCampoInput() {
    textItem.value = "";
}

function lerLocalStorageEMontarLista() {
    var lista = JSON.parse(localStorage.getItem('listaToDo'));
    if (lista) {
        itemsJson = lista;
        for (var i = 0; i < itemsJson.length; i++) {
            criarItem(itemsJson[i]);
        }
    }
}

function limpeItemStorage(id) {
    var index = id - 1
    var item = JSON.parse(localStorage.getItem('listaToDo'))
    console.log(`ANTES DA EXCLUSAO ${item}`)
    item.splice(index, 1)
    console.log(`DEPOIS DA EXCLUSAO ${item}`)
    localStorage.setItem('listaToDo', JSON.stringify(item))
}

function remover(id) {
    for (i = 0; i < ulItens.children.length; i++) {
        if (ulItens.children[i].getAttribute('id') == id) {
            ulItens.children[i].remove();
            limpeItemStorage(id)
        }
    }
}