const itemsContainer = document.querySelector("#list-items");
let lSArray = [];

let removeBtn = document.createElement('button');
removeBtn.className = 'btn btn-danger';
removeBtn.innerText = 'Remover registro';
removeBtn.style.width = '50%';
removeBtn.style.margin = '3%';

let loadBtn = document.createElement('button');
loadBtn.className = 'btn btn-success';
loadBtn.innerText = 'Cargar registro';
loadBtn.style.width = '50%';
loadBtn.style.margin = '3%';

itemsContainer.insertAdjacentElement('beforeend', removeBtn);
itemsContainer.insertAdjacentElement('beforeend', loadBtn);

removeBtn.addEventListener('click', removeItemslS);
loadBtn.addEventListener('click', loadColorsFromStorage)

function addItem(item) {
    const itemHTML = '<div class="card" style="width: 18rem;">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">' + item.name + '</h5>\n' +
        '        <p class="card-text">' + item.pantone_value + '</p>\n' +
        '        <div style="background:' + item.color + ';">' + item.color + '</div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
  
    itemsContainer.insertAdjacentHTML("beforeend", itemHTML);
}//addItem

// after fetching the colors, call addItem with each color
function fetchColorsList() {
    const promesa = fetch ('https://reqres.in/api/unknown', {method : 'GET'});
    promesa
    .then( (response) => {
        response.json().then( (colorsObj) => {
            colorsObj.data.forEach(element => {
                lSArray.push(element);
            });
            localStorage.setItem('colors', JSON.stringify(lSArray))
        } )
        .catch(
            (error) => {console.log('Problema con el json ' + error);}
        )
    })
    .catch((err) => { console.log('Existio un problema con la solicitud' + err);});
}//fetchColorsList


fetchColorsList()
function loadColorsFromStorage() {
  let array = JSON.parse(localStorage.getItem('colors'));
  array.forEach(element => {
        addItem(element)
  });
}

function removeItemslS() {
    localStorage.removeItem('colors');
    itemsContainer.innerHTML = '';
    itemsContainer.insertAdjacentElement('beforeend', removeBtn);
    itemsContainer.insertAdjacentElement('beforeend', loadBtn);
}