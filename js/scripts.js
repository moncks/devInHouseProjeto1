var addBtn = document.getElementById('addBtn');
var textItem = document.getElementById('text1');
var ulItens = document.getElementById('meusItens');
var itemsJson = [];
var labelClass = [];
var li;
var contador = itemsJson.length
lerLocalStorageEMontarLista()

function adicionar() {
    var itemAFazer = textItem.value;

    if (itemAFazer) {
        criarItem(itemAFazer, 'check');
        saveOnLocalStorage(itemAFazer, 'check');
        limparCampoInput();
    } else {
        alert('adiciona uma merda aqui!')
    }
}

function criarItem(valor, classAtributo) {
    let li = document.createElement("li");
    li.setAttribute('id', contador += 1)

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('onclick', 'alterarCheck(' + contador + ')');
    li.appendChild(checkbox)

    let label = document.createElement('label')
    label.appendChild(document.createTextNode(valor))
    label.setAttribute('class', classAtributo)
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


function saveOnLocalStorage(item, classLabel) {
    itemsJson.push(item);
    localStorage.setItem('listaToDo', JSON.stringify(itemsJson));

    labelClass.push(classLabel)
    localStorage.setItem('labelStyleCheck', JSON.stringify(labelClass))
}

function updateStyleLocalStorage(index, classLabel) {
    labelClass = JSON.parse(localStorage.getItem('labelStyleCheck'))
    console.log(labelClass[index] = classLabel)
    localStorage.setItem('labelStyleCheck', JSON.stringify(labelClass))
}

function limparCampoInput() {
    textItem.value = "";
}

function lerLocalStorageEMontarLista() {
    var lista = JSON.parse(localStorage.getItem('listaToDo'));
    var styleJson = JSON.parse(localStorage.getItem('labelStyleCheck'))
    if (lista) {
        itemsJson = lista;
        for (var i = 0; i < itemsJson.length; i++) {
            criarItem(itemsJson[i], styleJson[i]);
        }
    }
}

// function limpeItemStorage(id) {
//     var index = id - 1
//     console.log(`ID ${id} / index ${index}`)

//     var item = JSON.parse(localStorage.getItem('listaToDo'))
//     console.log(`ANTES DA EXCLUSAO ${item}`)
//     item.splice(index, 1)
//     console.log(`DEPOIS DA EXCLUSAO ${item}`)
//     localStorage.setItem('listaToDo', JSON.stringify(item))
// }

function remover(id) {
    console.log(`id para ser removido ${id}`)
    for (i = 0; i < ulItens.children.length; i++) {
        if (ulItens.children[i].getAttribute('id') == id) {
            console.log(ulItens.children[i])
            ulItens.children[i].remove();
        }
    }
}

function alterarCheck(id) {
    var index = id - 1
    var label = document.getElementsByTagName('label')[index]
    if (label.getAttribute('class') == 'check') {
        //marcar como concluida
        label.setAttribute('class', 'checked')
        updateStyleLocalStorage(index, 'checked')
    } else {
        // desmarcar conclusão da tarefa
        label.setAttribute('class', 'check')
        updateStyleLocalStorage(index, 'check')
    }
    return label
}