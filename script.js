// OPERADORES TERNARIOS:
// Un operador ternario es una forma concisa de escribir una estructura condicional (if-else).
// Su sintaxis es: condición ? valor_si_verdadero : valor_si_falso;
// Ejemplo:
// let edad = 18;
// let mensaje = (edad >= 18) ? "Eres mayor de edad" : "Eres menor de edad";
// console.log(mensaje); // Output: "Eres mayor de edad"

// Selecciona elementos del DOM usando su ID
const fecha = document.querySelector("#fecha"); // Obtiene el elemento con el ID 'fecha'
const lista = document.querySelector("#lista"); // Obtiene el elemento con el ID 'lista'
const input = document.querySelector("#input"); // Obtiene el elemento con el ID 'input'
const botonEnter = document.querySelector("#enter"); // Obtiene el botón con el ID 'enter'

// Definición de clases de FontAwesome usadas para marcar tareas
const check = 'fa-check-circle'; // Clase para indicar tarea completada
const uncheck = 'fa-circle'; // Clase para indicar tarea pendiente
const lineThrough = 'line-through'; // Clase para tachar el texto cuando la tarea está completada

let id = 0; // Variable para asignar identificadores únicos a las tareas

const LIST=[];

// FUNCIÓN PARA AGREGAR UNA TAREA
function agregarTarea(tarea, id, realizado, eliminado) {
  
  // Si la tarea está eliminada, la función no hace nada y se detiene aquí
  if (eliminado) { return; }

  // Determina qué clase asignar según si la tarea está completada o no (operador ternario)
  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : '';

  // Crea el elemento de la lista con la tarea, usando plantillas de cadena (template literals)
  const elemento = `  
    <li>
      <i class="far ${REALIZADO} co" data="realizado" id="${id}"></i> 
      <p class="text ${LINE}">${tarea}</p> 
      <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
    </li>
  `;

  // Inserta la nueva tarea en la lista dentro del HTML
  lista.insertAdjacentHTML("beforeend", elemento);
}

// FUNCIÓN PARA MARCAR UNA TAREA COMO REALIZADA
function tareaRealizada(element) {
  // Alterna entre las clases "fa-check-circle" y "fa-circle" para marcar o desmarcar una tarea
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  


// Accede al nodo padre de 'element'
//element.parentNode.querySelector('.text')
  // Si el elemento con la clase '.text' es encontrado, se le agrega o elimina la clase 'lineThrough'
  //.classList.toggle(lineThrough);

  element.parentNode.querySelector('.text').classList.toggle(lineThrough); 
  //console.log(element.classList); // Muestra en la consola la lista de clases del elemento actualizado

}//cuando usas queryselector el . es para clase y el # para id. 

//FUNCION tarea eliminada
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
}


// Evento asociado al clic del botón "Enter"
botonEnter.addEventListener("click", () => {
  const tarea = input.value; // Obtiene el valor ingresado en el campo de texto (input)
  
  if (tarea) { // Verifica si se ha ingresado una tarea
    agregarTarea(tarea, id, false, false); // Llama a la función agregarTarea para agregar la tarea con estado "pendiente"
    
    // Agrega un objeto con los detalles de la tarea al array LIST
    LIST.push({
      nombre: tarea, // El nombre de la tarea
      id: id, // El identificador único de la tarea
      realizado: false, // Estado de la tarea: no realizada
      eliminado: false // Estado de la tarea: no eliminada
    });
  }
  
  input.value = ""; // Limpia el campo de entrada después de agregar la tarea
  id++; // Incrementa el ID para la siguiente tarea
  console.log(LIST); // Imprime el array LIST actualizado en la consola SOLO CUANDO SE PRESIONA EL BOTON DE SUMA
});

// Evento para agregar una tarea al presionar "Enter"
document.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') { // Verifica si la tecla presionada es "Enter"
    const tarea = input.value; // Obtiene el texto de la nueva tarea desde el campo de entrada
    
    if (tarea) { // Si el campo no está vacío, agrega la tarea
      agregarTarea(tarea, id, false, false); // Llama a la función agregarTarea para agregar la tarea con estado "pendiente"
      
      // Agrega un objeto con los detalles de la tarea al array LIST
      LIST.push({
        nombre: tarea, // El nombre de la tarea
        id: id, // El identificador único de la tarea
        realizado: false, // Estado de la tarea: no realizada
        eliminado: false // Estado de la tarea: no eliminada
      });
    }
    
    input.value = ''; // Limpia el campo de entrada después de agregar la tarea
    id++; // Incrementa el ID para la siguiente tarea
    console.log(LIST); // Imprime el array LIST actualizado en la consola SOLO CUANDO SE PRESIONA LA TECLA ENTER
  }
});

// EVENTO PARA DETECTAR CLICS EN LA LISTA DE TAREAS (DETECCIÓN DE EVENTOS EN ELEMENTOS DINÁMICOS)
lista.addEventListener('click', function(event) {
  const element = event.target; // Captura el elemento en el que se hizo clic
  const elementData = element.attributes.data.value; // Obtiene el valor del atributo "data" del elemento

  // console.log(element)
  // console.log(element.attributes)
  // console.log(element.attributes.data)
  // console.log(element.attributes.data.value)


  // Verifica si se hizo  clic en el icono de "realizado" y marca la tarea como completada o pendiente
  if (elementData === 'realizado') {
    tareaRealizada(element);
  }
  // Verifica si se hizo clic en el icono de "eliminar" y elimina la tarea
  else if (elementData === 'eliminado') {
    tareaEliminada(element);
  }
});