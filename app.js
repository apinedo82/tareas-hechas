
require ('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar
} = require ('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {

  let opt = '';
  const tareas = new Tareas();    //

  const tareasDB =  leerDB();

  if (tareasDB){ // Cargar tareas
    tareas.cargarTareasfromArray(tareasDB);
  }

  //await pausa();

  do{

    console.clear();

    // imprimir el menu
    opt = await inquirerMenu();
    
    
    
    switch (opt) {
      case '1':
          //crear opcion
          const desc = await leerInput('Descripcion:' );
          tareas.crearTarea(desc);
        break;
      
      case '2':
          //console.log(tareas.listadoArr);
          tareas.listadoCompleto();
        break;
      
      case '3':
          tareas.listarPendientesCompletadas(true);
        break;
      
      case '4':
          tareas.listarPendientesCompletadas(false);
        break;
      
      case '6': // Borrar
          const id = await listadoTareasBorrar(tareas.listadoArr);
          if (id !== '0'){
            const confir = await confirmar('Desea Borrar esta tarea?');
            if (confir){
              tareas.borrarTarea(id);
              console.log('Tarea Borrada');
            }
          }          
        break; 
    }

    guardarDB( tareas.listadoArr);

      await pausa();

      console.clear();

  } while ( opt !== '0')

  

 

}


main();
