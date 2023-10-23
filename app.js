const $template = document.getElementById("template").content;
const $fragment = document.createDocumentFragment();
const contenedor = document.querySelector(".lista-main")

let  db = [];
// Verifica si hay tareas guardadas, si hay las agrega sino, crea un db vacio
if(localStorage.getItem("toDoList")){
const data = localStorage.getItem("toDoList");
db = JSON.parse(data)
}

// Crea un template de cada tarea
db.forEach(e => {   
  $template.querySelector(".checkTarea").dataset.id = e.id;
  $template.querySelector(".texto").textContent = e.texto
  const $div = $template.querySelector(".texto")
  e.leido ? $div.classList.add("leido") : $div.classList.remove("leido");
  $template.querySelector(".btn-tachar").dataset.id = e.id;
  $template.querySelector(".btn-tachar").textContent = e.leido ? "✔️" : "❌";
  $template.querySelector(".btn-editar").dataset.id = e.id;
  
  let $clone = document.importNode($template, true);
  $fragment.appendChild($clone)
})
  contenedor.appendChild($fragment)

// Agrega nueva tarea a la lista y actualica el localStorage o edita contenido.
document.addEventListener("submit",e => {
  e.preventDefault();
  let msj = document.querySelector(".nuevoTexto");
  let idOculto = document.getElementById("edit-id");
  if(!idOculto.dataset.id){
    db.push({
      id: Date.now(),
      texto:msj.value,
      leido: false
    })
  localStorage.setItem("toDoList",JSON.stringify(db))
  msj.value = " "
  location.reload();
  }else {
    db.forEach(e => {
      if(e.id == idOculto.dataset.id){
        e.texto = msj.value;
        localStorage.setItem("toDoList",JSON.stringify(db))
        location.reload();
      }
    })
  }
})

let checkTodos = document.querySelector(".checkTodos");
let checkIndividual = document.querySelectorAll(".checkTarea");

//Marca todos los check
checkTodos.addEventListener("click", () => {
if(checkTodos.checked){
  checkIndividual.forEach( e => {
    e.checked = checkTodos.checked
  })
}else {
  checkIndividual.forEach(e => {
    e.checked = false
  })
}
})

// Boton tacha una tarea de la lista
const btnTachar = document.querySelectorAll(".btn-tachar");
btnTachar.forEach(e => {
  e.addEventListener("click", e => {        
    let idTachar = e.target.dataset.id;
    db.forEach(e => {
      if(!e.leido) {
        if(e.id == idTachar){
          e.leido = true;
          localStorage.setItem("toDoList",JSON.stringify(db))
          location.reload()
        };
      }else{
        if(e.id == idTachar){
          e.leido = false;
          localStorage.setItem("toDoList",JSON.stringify(db))
          location.reload()
        };
      }
    })   
  })
})

//Edita una tarea de la lista
const btnEditar = document.querySelectorAll(".btn-editar");
let mas = document.getElementById("mas")

btnEditar.forEach(e => {
  e.addEventListener("click", e => {
    let id = e.target.dataset.id
    let idOculto = document.getElementById("edit-id")
    idOculto.dataset.id = id
    
    let msjEdit = document.querySelector(".nuevoTexto");
    db.forEach(e => {
      if(e.id == id){
        msjEdit.value = e.texto
        mas.value = "💾"
      }
    })
  })
})

//Borra todo o tarea individual
const btnBorrar = document.querySelector(".btn-borrar");
btnBorrar.addEventListener("click", () => {
  checkIndividual.forEach(e => {
    if(e.checked){
      let idDelete = e.dataset.id;
        db.forEach(e => {
          if(e.id == idDelete){
            let idEdit= db.findIndex(e => e.id == idDelete)
            db.splice(idEdit,1)
            localStorage.setItem("toDoList",JSON.stringify(db))
                            
          };                
        });
    };
  });
  location.reload();
});