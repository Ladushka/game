
var state = {
    numClickCard: 0,
    pictures: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
    id1: undefined,
    id2: undefined
}

function Card(id, picture) {
    this.status = false;//состояние карточки(нажата/не нажата)
    this.id = id;//id (номер картинки)
    this.picture = picture;
}
function Stack(width, height) {
    var array = [], count = 0, temp = [], arr = [], count = 0, buf;
    idName(arr, width * height);
    for (var i = 0; i < width * height; i++) {
        temp[i] = i + 1;//номера id
    }

    for (var i = 0; i < height; i++) {
        var row = [];
        for (var j = 0; j < width; j++) {
            buf = Math.floor(Math.random() * (temp.length));
            row.push(new Card(temp[buf], state.pictures[arr[temp[buf]]]));
            temp.splice(buf, 1);//извлекает из массива уже отданный id(для избежания повторений)
        }
        array.push(row);
    }

    delete count, arr, temp, buf;

    return {
        getCard(id) { return retIndex(id) },
        getStack() { return array; },
        render() {
            var table = document.createElement("table");
            array.forEach(function (row) {
                var tr = document.createElement("tr");
                row.forEach(function (item) {
                    var td = document.createElement("td");
                    var img = document.createElement('img');
                    img.style.backgroundImage = "url('images/down.jpg')";
                    img.className = 'picture';
                    img.addEventListener("click", coupleOfCards);
                    img.id = item.id;
                    td.appendChild(img)
                    tr.appendChild(td);
                    count++;
                });
                table.appendChild(tr);
                count = 0;
            })
            document.body.innerHTML = '';
            document.body.appendChild(table);
        }
    };
}
////массив соответствия id и name
function idName(arr, n) {
    for (var i = 1; i <= n; i++) {
        if (i <= n / 2) {
            arr[i] = i;
        }
        else {
            arr[i] = i - (n / 2);
        }
    }
}
//раскладывает карты в начальное состояние(все закрыты)
function initGame() {

    var width, height;
    for (var i = 0; i < 5; i++) {
        if (document.selectForm.r1[i].checked) {
            width = document.selectForm.r1[i].dataset.width;
            height = document.selectForm.r1[i].dataset.height;
        }
    }

    state.stack = new Stack(width, height);
    state.stack.render();

    state.stack.width = width;
    state.stack.height = height;
}

function retIndex(el) {
    var g = state.stack.getStack();
    for (var i = 0; i < state.stack.height; i++) {
        for (var j = 0; j < state.stack.width; j++) {
            if (g[i][j].id == el) {
                return g[i][j];
            }
        }
    }
}


function coupleOfCards() {

    if (state.stack.getCard(this.id).status === false) {
        state.numClickCard++;
    }

    if (state.numClickCard === 1) {
        state.id1 = this.id;
        state.stack.getCard(this.id).status === true;
    }

    this.style.backgroundImage = "url('images/" + state.stack.getCard(this.id).picture + "')";


    if (state.numClickCard === 2) {
        state.id2 = this.id;
        if (state.stack.getCard(this.id).picture == state.stack.getCard(state.id1).picture) {
            state.stack.getCard(this.id).status = true;
            state.numClickCard = 0;
        } else {
            setTimeout(function () {
                document.getElementById(state.id1).style.backgroundImage = "url('images/down.jpg')";
                document.getElementById(state.id2).style.backgroundImage = "url('images/down.jpg')";
                state.stack.getCard(id1).status = false;
            }, 700);
            state.numClickCard = 0;
        }
    }

};
