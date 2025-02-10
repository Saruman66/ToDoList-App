const fecha = document.querySelector("#fecha"); // a esta constante vamos a pedirle que lea una parte del html, en este caso el ID
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");

//funcion agregar tarea

function agregarTarea(tarea) {
  const elemento = `  <li>
            <!-- Un ítem de tarea de ejemplo -->
            <i class="far fa-circle co" data="realizado" id="0"></i>
            <!-- Ícono para marcar la tarea como completada; usa clases e identificadores para interacciones -->
            <p class="text">${tarea}</p>
            <!-- Texto descriptivo de la tarea -->
            <i class="fas fa-trash de" data="eliminado" id="0"></i>
            <!-- Ícono de basura para eliminar la tarea; usa un identificador para diferenciarla -->
            </li>
          `;
  lista.insertAdjacentHTML("beforeend", elemento);
}

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea);
  }
  input.value = "";
});

//de esta forma el evento se realiza desde cualquier parte del documento
document.addEventListener('keyup',
    function (event) {
        if (event.key=='Enter') {
            const tarea = input.value
            if (tarea) {
                agregarTarea(tarea)
            }
            input.value=''    
        }
    }
)