// name - это номера картинок, они повторяются. может быть только ровно два одинаковых имени.
var ok = 0, wp, hp, picture, card = new Array(), id1, id2;

function play() {
    //window.alert = navigator.notification.alert;
    //window.alert("go!");
    var id1 = this.id;
    document.body.innerHTML = '<h1 class="rb1">Выберите размеры поля</h1><div class="rb"><input type="radio" name="r1" value="1">4X4<br><input type="radio" class="rb" name="r1" value="2">5X4<br><input type="radio" class="rb" name="r1" value="3">4X3<br><input type="radio" class="rb" name="r1" value="4">5X6<br><input type="radio" class="rb" name="r1" value="5">5X8<br></div><h1><input type="button" value="ops" name="play" onclick="deck()" width="10" height="20" /></h1>';
}

function radioClick() {
    var n;
    var radios = document.getElementsByName("r1");
   
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type == "radio") {
            if (radios[i].checked) {
               
                switch (i + 1) {
                    case 1: wp = 4; hp = 4; break;
                    case 2: wp = 5; hp = 4; break;
                    case 3: wp = 4; hp = 3; break;
                    case 4: wp = 5; hp = 6; break;
                    case 5: wp = 5; hp = 8; break;
                }
            }
        }
    }
}
function Card(cardID,status) {
    this.status = status;//состояние карточки(нажата/не нажата)
    this.l = cardID;//id (номер картинки)
    this.name=name;
}
/*
массив соответствия id и name
*/
function idName(arr,n)
{
    for (var i = 1; i <= n; i++) {
        if (i <= n / 2) {
            arr[i] = i;
        }
        else {
            arr[i] = i-(n/2);
        }
    }   
}
/**
раскладывает карты в начальное состояние(все закрыты)
*/

function deck() {
    radioClick();
    document.body.innerHTML = '<table id="table"></table>';
   
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var img = document.createElement('img');

    var arr = new Array();
    idName(arr, wp * hp);
    var temp1;//временная переменная
    var temp = new Array();
    // var td = document.createElement('td');
    for (var i = 0; i < hp*wp; i++) {
        temp[i] = i+1;//номера id
    }
    var count = 0;
    for (var i = 0; i < hp; i++) {
        tr = document.createElement("tr");
        for (var j = 0; j < wp; j++) {
            /**
            *создаёт поле
            */
            td = document.createElement("td");
            
            img = document.createElement('img');
            img.style.backgroundImage = "url('images/down.jpg')";
            img.className = 'pic';
            img.onclick = para;
            temp1 = Math.floor(Math.random() * (temp.length));
            img.id = temp[temp1];//присваивает случайные id
            img.name = arr[img.id];
            temp.splice(temp1 , 1);//извлекает из массива уже отданный id(для избежания повторений)
            card.push(new Card(img.id, false));
            card[count].name = arr[img.id];//номер картинки которая у неё будет
            td.appendChild(img)
            tr.appendChild(td);
            count++;
        }       
        table.appendChild(tr);
    }
    picture = document.getElementsByClassName('pic');
}

function retIndex(el) {
    for (var i = 0; i < picture.length; i++) {
        if (picture[i].id == el) {
            return i;
        }
    }
}


function downCard() {
    //переварачивает карты, если не совпали
    picture[retIndex(id1)].style.backgroundImage = "url('images/down.jpg')";
    picture[retIndex(id2)].style.backgroundImage = "url('images/down.jpg')";
    card[retIndex(id1)].status = false;
}

function para() {
    var ind = retIndex(this.id);
    window.alert = navigator.notification.alert;
    if (card[ind].status == false) {
        ok++;
    }
    if (ok == 1) {
        id1 = this.id;
        card[ind].status = true;
    }
   
    picture[ind].style.backgroundImage = "url('images/"+this.name+".jpg')";
    
    if (ok == 2) {
        id2 = this.id;
        if (card[retIndex(id1)].name == this.name) {
            card[ind].status = true;
            
            ok = 0;
        } else {
            setTimeout(downCard, 1000);
            ok = 0;
        }
    }

};

