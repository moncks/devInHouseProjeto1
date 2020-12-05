var textItem = document.getElementById('text1');
var ulItens = document.getElementById('meusItens');
var itemsJson = [];
var li;
var checkbox;
var label
var contador = itemsJson.length

lerLocalStorageEMontarLista()

function adicionar() {
    var itemAFazer = textItem.value;

    if (itemAFazer) {
        criarItem(itemAFazer, 'check');
        saveOnLocalStorage(itemAFazer, 'check');
        limparCampoInput();
    } else {
        alert('Você precisa escrever uma tarefa aqui!')
    }
}

function criarItem(valor, classAtributo) {
    li = document.createElement("li");
    li.setAttribute('id', contador += 1)

    checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('class', classAtributo)
    checkbox.setAttribute('onclick', 'alterarCheck(' + contador + ')');

    if (classAtributo == 'checked') {
        checkbox.checked = true
    } else {
        checkbox.checked = false
    }

    li.appendChild(checkbox)

    label = document.createElement('label')
    label.appendChild(document.createTextNode(valor))
    label.setAttribute('class', classAtributo)
    li.appendChild(label);

    li.appendChild(criarBotaoRemoverItem(contador));
    ulItens.appendChild(li);
}

function alterarCheck(id) {
    var index = id - 1
    label = document.getElementsByTagName('label')[index]
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

function criarBotaoRemoverItem(id) {
    var btn = document.createElement('button');
    btn.setAttribute('onclick', 'remover(' + id + ')');
    btn.className = 'remover'
    btn.appendChild(document.createTextNode("X"))
    return btn;
}

function limparCampoInput() {
    textItem.value = "";
}


function saveOnLocalStorage(item, classLabel) {
    var obj = {
        'item': item,
        'labelClass': classLabel
    }
    itemsJson.push(obj);
    localStorage.setItem('listaToDo', JSON.stringify(itemsJson));
}

function lerLocalStorageEMontarLista() {
    var lista = JSON.parse(localStorage.getItem('listaToDo'));
    if (lista) {
        itemsJson = lista;
        for (var i = 0; i < itemsJson.length; i++) {
            criarItem(itemsJson[i].item, itemsJson[i].labelClass);
        }
    }
}

function updateStyleLocalStorage(index, classLabel) {
    itemsJson = JSON.parse(localStorage.getItem('listaToDo'))
    itemsJson[index].labelClass = classLabel
    localStorage.setItem('listaToDo', JSON.stringify(itemsJson))
}

function remover(id) {
    for (i = 0; i < ulItens.children.length; i++) {
        if (ulItens.children[i].getAttribute('id') == id) {
            ulItens.children[i].remove();
            limpeItemStorage(i)
        }
    }
}

function limpeItemStorage(id) {
    itemsJson = JSON.parse(localStorage.getItem('listaToDo'));
    const index = itemsJson.indexOf(itemsJson[id]);
    itemsJson.splice(index, 1);
    localStorage.setItem('listaToDo', JSON.stringify(itemsJson))
}