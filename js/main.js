const itemsContainer = document.querySelector("#list-items"); //Traer el contenedor que alojara las cards
let lSArray = []; // Array vacio que mandaremos al localStorage


//<--------- Creacion de botones----------->
let removeBtn = document.createElement('button'); //*EXTRA
removeBtn.className = 'btn btn-danger';
removeBtn.innerText = 'Remover registro';
removeBtn.style.width = '50%';
removeBtn.style.margin = '3%';

let loadBtn = document.createElement('button'); //*EXTRA
loadBtn.className = 'btn btn-success';
loadBtn.innerText = 'Cargar registro';
loadBtn.style.width = '50%';
loadBtn.style.margin = '3%';

itemsContainer.insertAdjacentElement('beforeend', removeBtn);
itemsContainer.insertAdjacentElement('beforeend', loadBtn);

//                                     ↓ elimina datos
removeBtn.addEventListener('click', removeItemslS);
//                                     ↓ carga Datos pero desde localStorage
loadBtn.addEventListener('click', loadColorsFromStorage)

/* Esta funcion ya estaba declarada
Requiere un argumento que traiga la info que va a meter a las cards en formato JSON  
                   ↓    */                
function addItem(item) {
    const itemHTML = '<div class="card" style="width: 18rem;">\n' +
        '    <div class="card-body">\n' + //↓ Utiliza indentacion para acceder a los valores
        '        <h5 class="card-title">' + item.name + '</h5>\n' +
        '        <p class="card-text">' + item.pantone_value + '</p>\n' +
        '        <div style="background:' + item.color + ';">' + item.color + '</div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    // Insertar el elemento creado en el html
    itemsContainer.insertAdjacentHTML("beforeend", itemHTML);
}//addItem

// after fetching the colors, call addItem with each color
function fetchColorsList() {
    // Traemos los datos con un get
    const promesa = fetch ('https://reqres.in/api/unknown', {method : 'GET'});
    promesa
    .then( (response) => { //La respuesta viene en formato string
      //  ↓ Convierte la respuesta en JSON
        response.json().then( (colorsObj) => { //Cuando la promesa se resuelve, utiliza funcion flecha para iterar sobre los elementos con un foreach
            //colorsObj es la respuesta de la API, pero sus datos estan dentro de otro objeto que se llama 'data'
            colorsObj.data.forEach(element => {
                lSArray.push(element); // <- Agrega cada elemento al array que definimos arriba
            });
            localStorage.setItem('colors', JSON.stringify(lSArray)) //Manda el array a localStorage en formato string
        } )
    .catch(
        (error) => {console.log('Problema con el json ' + error);}
        )
    })
    .catch((err) => { console.log('Existio un problema con la solicitud' + err);});
}//fetchColorsList

//La deje declarada para que traiga los datos automaticamente cada que recargue la pagina
fetchColorsList()
//Funcion que muestra las tarjetas de colores, pero buscando los datos en el localStorage
function loadColorsFromStorage() {
  let array = JSON.parse(localStorage.getItem('colors')); //Declare otro array pero que contenga los datos traidos del lStorage en formato JSON
  array.forEach(element => { //Itera este nuevo array y utiliza la funcion addItem para crear una card por cada objeto de datos
        addItem(element)
  });
}
// Esta funcion es para limpiar el localStorage
function removeItemslS() {
    localStorage.removeItem('colors'); //Quita el unico array que guardamos
    itemsContainer.innerHTML = ''; //Limpia el contenedor
    itemsContainer.insertAdjacentElement('beforeend', removeBtn); //Reinserta los botones
    itemsContainer.insertAdjacentElement('beforeend', loadBtn);
}