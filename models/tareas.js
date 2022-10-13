const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });


        return listado;
    }

    constructor ( desc ){
        this._listado = {};
    }

    cargarTareasfromArray( tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        
        this._listado[tarea.id] = tarea; 
    }

    borrarTarea ( id ){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    listadoCompleto( ){
        this.listadoArr.forEach( (tarea,id) => {

            // Asi lo hice yo
            // let completado = 'Completado';
            // if (tarea.completadoEn === null){
            //     completado = 'Pendiente';
            //     idx = `${id +1}`.red;
            // }

            console.log();

            // asi se hace con javascript nuevo
            const idx = `${id +1}`.green;
            const {desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red
            
            console.log(`${idx}. ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas ( completadas = true){

        let contador = 0;
        console.log();
        this.listadoArr.forEach( tarea => {
            const {desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red
            
            if (completadas){
                if (completadoEn){
                    contador += 1;
                    console.log(`${contador.toString() + '.'.green} ${desc} :: ${completadoEn}`);
                }
            } else {
                if (!completadoEn){
                    contador += 1;
                    console.log(`${contador.toString() + '.'.green} ${desc} :: ${estado}`);
                }
            }
            
            
        });

    }

}




module.exports = Tareas;  