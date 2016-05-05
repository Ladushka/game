
    var state = {
        numClickCard: 0,
        field: {
            width: undefined,
            heigh: undefined
        },
        cards: [],
        pictures: [],
        id1: undefined,
        id2: undefined
    }



    function Card(cardID, status) {
        this.status = status;//состояние карточки(нажата/не нажата)
        this.l = cardID;//id (номер картинки)
        this.name = name;
    }
    //массив соответствия id и name
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
        var data,width,heigh;
      
        for (var i = 0; i < 5; i++) {
            if (document.RAD.r1[i].checked) {
                data = document.RAD.r1[i].dataset;
                width = data.width;
                heigh = data.heigh;
            }
        }
        //radioClick();
       
        var arr = new Array(), temp = new Array(), temp1, count = 0;
        document.body.innerHTML = '<table id="table"></table>';
        var tr = document.createElement('tr'),
        td = document.createElement('td'),
        img = document.createElement('img');

        idName(arr, width * heigh);

        for (var i = 0; i < width * heigh; i++) {
            temp[i] = i + 1;//номера id
        }

        for (var i = 0; i < heigh; i++) {
            tr = document.createElement("tr");
            for (var j = 0; j <width; j++) {
                //создаёт поле
                td = document.createElement("td");
                img = document.createElement('img');
                img.style.backgroundImage = "url('images/down.jpg')";
                img.className = 'pic';
                img.addEventListener("click", coupleOfCards);
                temp1 = Math.floor(Math.random() * (temp.length));
                img.id = temp[temp1];//присваивает случайные id
                img.name = arr[img.id];
                temp.splice(temp1, 1);//извлекает из массива уже отданный id(для избежания повторений)
                state.cards.push(new Card(img.id, false));
                state.cards[count].name = arr[img.id];//номер картинки которая у неё будет
                td.appendChild(img)
                tr.appendChild(td);
                count++;
            }
            table.appendChild(tr);
        }
        state.pictures = document.getElementsByClassName('pic');
    }


    function retIndex(el) {
        for (var i = 0; i < state.pictures.length; i++) {
            if (state.pictures[i].id === el) {
                return i;
            }
        }
    }


    function downCard() {
        //переварачивает карты, если не совпали   
        state.pictures[retIndex(state.id1)].style.backgroundImage = "url('images/down.jpg')";
        state.pictures[retIndex(state.id2)].style.backgroundImage = "url('images/down.jpg')";
        state.cards[retIndex(state.id1)].status = false;
    }
    //ещё один тест
    function coupleOfCards() {

        window.alert = navigator.notification.alert;

        if (state.cards[retIndex(this.id)].status === false) {
            state.numClickCard++;
        }

        if (state.numClickCard === 1) {
            state.id1 = this.id;
            state.cards[retIndex(this.id)].status = true;
        }
        state.pictures[retIndex(this.id)].style.backgroundImage = "url('images/" + this.name + ".jpg')";

        if (state.numClickCard === 2) {
            state.id2 = this.id;
            if (state.cards[retIndex(state.id1)].name == this.name) {
                state.cards[retIndex(this.id)].status = true;
                state.numClickCard = 0;
            } else {
                setTimeout(downCard, 700);
                state.numClickCard = 0;
            }
        }

    };
