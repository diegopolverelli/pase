class Procesador {
    constructor(caracteres, titulo) {
        this.cantidadCaracteres=caracteres;
        this.titulo=titulo;
     }
    procesar(datos) { }
}

class CsvProcesador extends Procesador {
    constructor(caracteres, titulo, esExcel) {
        super(caracteres, titulo);
        this.esExcel=esExcel;
    }

    procesar(datos) {
        console.log(`Procesando archivo CSV: ${datos}`);
    }
}

class JsonProcesador extends Procesador {
    constructor(caracteres, titulo, baseDeDatos, configuracion) {
        super(caracteres, titulo);
        this.esDB=baseDeDatos;
        this.configuracion=configuracion;
    }

    procesar(datos) {
        console.log(`Procesando archivo JSON: ${datos}`);
    }
}

class XmlProcesador extends Procesador {
    constructor() {
        super();
    }

    procesar(datos) {
        console.log(`Procesando archivo XML: ${datos}`);
    }
}


class ProcesadorFactory {
    static crearProcesador(tipo, ...parametros) {
        if (tipo === "csv") {
            return new CsvProcesador(...parametros);
        } else if (tipo === "json") {
            return new JsonProcesador(...parametros);
        } else if (tipo === "xml") {
            return new XmlProcesador();
        } else {
            throw new Error(`Tipo de procesador desconocido: ${tipo}`);
        }
    }
}



const tipoArchivo = "csv";
const procesador = ProcesadorFactory.crearProcesador(tipoArchivo, 500, 'Titulo del CSV', false);
procesador.procesar("datos del archivo CSV");
console.log(procesador)

const tipoArchivo2 = "json";
const procesador2 = ProcesadorFactory.crearProcesador(tipoArchivo2, 500, 'Titulo del JSON', false, [8080, 'miPalabraSecreta', 'root']);
procesador2.procesar("datos del archivo CSV");
console.log(procesador2)
