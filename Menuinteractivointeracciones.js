// ========================================================
// 1. NAVEGACIÓN Y VALIDACIÓN ENTRE PASOS
// ========================================================

const paso1 = document.getElementById('paso1');
const paso2 = document.getElementById('paso2');
const paso3 = document.getElementById('paso3');

const btnIrPaso2 = document.getElementById('btnIrPaso2');
const btnVolverPaso1 = document.getElementById('btnVolverPaso1');
const btnIrPaso3 = document.getElementById('btnIrPaso3');
const btnVolverPaso2 = document.getElementById('btnVolverPaso2');
const formMateria = document.getElementById('formMateria');

// Función que valida los campos requeridos del paso activo
function validarPaso(contenedorPaso) {
    const campos = contenedorPaso.querySelectorAll('input, select, textarea');
    for (let campo of campos) {
        if (!campo.checkValidity()) {
            campo.reportValidity();
            return false;
        }
    }
    return true;
}

// Navegación Paso 1 -> Paso 2
btnIrPaso2.addEventListener('click', () => {
    if (validarPaso(paso1)) {
        paso1.classList.add('oculto');
        paso2.classList.remove('oculto');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Navegación Paso 2 -> Paso 1
btnVolverPaso1.addEventListener('click', () => {
    paso2.classList.add('oculto');
    paso1.classList.remove('oculto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navegación Paso 2 -> Paso 3
btnIrPaso3.addEventListener('click', () => {
    if (validarPaso(paso2)) {
        paso2.classList.add('oculto');
        paso3.classList.remove('oculto');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Navegación Paso 3 -> Paso 2
btnVolverPaso2.addEventListener('click', () => {
    paso3.classList.add('oculto');
    paso2.classList.remove('oculto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Envío y registro final
formMateria.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarPaso(paso3)) {
        alert('¡La materia y su programa han sido registrados exitosamente!');
    }
});

// Autoformato de guion para el campo Período (ej. 2026-2)
const inputPeriodo = document.getElementById('periodoEstudios');
if (inputPeriodo) {
    inputPeriodo.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/[^0-9]/g, '');
        if (valor.length > 4) {
            e.target.value = valor.slice(0, 4) + '-' + valor.slice(4, 5);
        } else {
            e.target.value = valor;
        }
    });
}

// ========================================================
// 2. BASE DE DATOS DE MATERIAS (CATÁLOGO UAQ - FIF)
// ========================================================

// Mapeo numérico oficial del <select id="etapa">:
// 1 = Entorno Social
// 2 = Matemáticas
// 3 = Arquitectura de las Computadoras
// 4 = Tratamiento de la Información
// 5 = Redes
// 6 = Interacción Hombre Máquina
// 7 = Software de Base
// 8 = Programación e Ingeniería de Software
// 9 = Formación Universitaria
// 10 = Inglés

const m = (nombre, etapa, creditos, ht, hp, hai = 0, htcs = 0) => ({
    nombre,
    etapa: String(etapa),
    creditos,
    ht,
    hp,
    hl: 0,
    hv: 0,
    hai,
    htcs,
    modalidad: "Escolarizada",
    opcion: "Presencial"
});

const catalogoMaterias = {
    // Tronco común inicial
    "2001": m("ADMINISTRACION", 1, 5, 2, 2, 0),                                // Entorno Social[cite: 10, 11]
    "2002": m("INTRODUCCION A LAS TECNOLOGIAS DE INFORMACION", 3, 5, 2, 2, 0),   // Arquitectura de Comp.[cite: 10, 11]
    "2003": m("ETICA Y LEGISLACION INFORMATICA", 1, 6, 2, 2, 2),                // Entorno Social[cite: 10, 11]
    "2004": m("MATEMATICAS COMPUTACIONALES", 2, 5, 4, 0, 0),                    // Matemáticas[cite: 10, 11]
    "2005": m("INTRODUCCION A LA PROGRAMACION", 8, 5, 2, 2, 0),                 // Prog. e Ing. de Software[cite: 10, 11]
    "2006": m("DESARROLLO HUMANO I", 9, 5, 2, 2, 0),                            // Formación Universitaria[cite: 10, 11]
    "2007": m("INTRODUCCION A LA INVESTIGACION", 9, 6, 2, 2, 2),                // Formación Universitaria[cite: 10, 11]
    "2008": m("DEPORTES I", 9, 5, 0, 4, 0),                                     // Formación Universitaria[cite: 10, 11]

    // Formativas y Matemáticas Compartidas
    "2009": m("DISEÑO DE INTERFACES DE SOFTWARE", 6, 6, 2, 2, 2),              // Interacción Hombre Máquina[cite: 11, 12]
    "2010": m("PRINCIPIOS DE ELECTRONICA", 3, 5, 2, 2, 0),                      // Arquitectura de Comp.
    "2011": m("CALCULO DIFERENCIAL E INTEGRAL", 2, 5, 4, 0, 0),                 // Matemáticas[cite: 10, 12]
    "2012": m("ALGEBRA LINEAL", 2, 5, 4, 0, 0),                                 // Matemáticas[cite: 10, 11]
    "2013": m("PROGRAMACION DE SISTEMAS EMBEBIDOS", 8, 5, 2, 2, 0),             // Prog. e Ing. de Software
    "2014": m("DESARROLLO HUMANO II", 9, 6, 2, 2, 2),                           // Formación Universitaria[cite: 10, 11]
    "2015": m("INGLES I", 10, 5, 2, 2, 0),                                      // Inglés[cite: 10, 11]
    "2016": m("DEPORTES II", 9, 5, 0, 4, 0),                                    // Formación Universitaria[cite: 10, 11]
    "2017": m("ANALISIS Y DISEÑO DE SISTEMAS COMPUTACIONALES", 4, 6, 2, 2, 2),   // Tratamiento de Información
    "2018": m("ELECTRONICA ANALOGICA Y DIGITAL", 3, 6, 2, 2, 2),                // Arquitectura de Comp.
    "2019": m("PROBABILIDAD Y ESTADISTICA", 2, 5, 4, 0, 0),                     // Matemáticas[cite: 10, 12]
    "2020": m("CALCULO VECTORIAL", 2, 5, 4, 0, 0),                              // Matemáticas[cite: 10]
    "2021": m("ALGORITMOS Y ESTRUCTURA DE DATOS", 8, 6, 2, 2, 2),               // Prog. e Ing. de Software[cite: 10, 12]
    "2022": m("DESARROLLO HUMANO III", 9, 6, 2, 2, 2),                          // Formación Universitaria[cite: 10, 11]
    "2023": m("INGLES II", 10, 5, 2, 2, 0),                                     // Inglés[cite: 10, 11]
    "2024": m("DEPORTES III", 9, 5, 0, 4, 0),                                   // Formación Universitaria[cite: 10, 11]

    // Inglés Transversal
    "2031": m("INGLES III", 10, 5, 2, 2, 0),                                    // Inglés[cite: 10, 11]
    "2038": m("INGLES IV", 10, 5, 2, 2, 0),                                     // Inglés[cite: 10, 11]
    "2044": m("INGLES V", 10, 5, 2, 2, 0),                                      // Inglés[cite: 10, 11]
    "2049": m("INGLES VI", 10, 5, 2, 2, 0),                                     // Inglés[cite: 10, 11]

    // Formación terminal compartida
    "2046": m("TOPICO I", 11, 6, 2, 2, 2),                                       // Entorno Social[cite: 10, 11]
    "2051": m("TOPICO II", 11, 6, 2, 2, 2),                                      // Entorno Social[cite: 10, 11]
    "2052": m("GESTION DE LAS TI", 1, 6, 2, 2, 2),                              // Entorno Social[cite: 11, 12]
    "2053": m("SERVICIO SOCIAL", 9, 10, 0, 0, 0, 480),                          // Formación Universitaria[cite: 10, 11]
    "2054": m("PRACTICAS PROFESIONALES", 12, 14, 4, 0, 0, 478),                  // Entorno Social[cite: 10, 11]

    // Ing. en Computación
    "2025": m("FUNDAMENTOS DE REDES", 5, 5, 2, 2, 0),                           // Redes
    "2026": m("LOGICA DIGITAL", 3, 5, 2, 2, 0),                                 // Arquitectura de Comp.
    "2027": m("SISTEMAS OPERATIVOS", 7, 5, 2, 2, 0),                            // Software de Base[cite: 10, 12]
    "2028": m("ECUACIONES DIFERENCIALES", 2, 5, 4, 0, 0),                       // Matemáticas[cite: 10]
    "2029": m("PROGRAMACION DE BAJO NIVEL", 8, 5, 2, 2, 0),                     // Prog. e Ing. de Software
    "2030": m("INTERCONECTIVIDAD DE DISPOSITIVOS", 6, 6, 2, 2, 2),              // Interacción Hombre Máquina
    "2032": m("PROTOCOLOS DE RUTEO", 5, 5, 2, 2, 0),                            // Redes
    "2033": m("SISTEMAS DIGITALES", 3, 6, 2, 2, 2),                             // Arquitectura de Comp.
    "2034": m("ADMINISTRACION DE SISTEMAS OPERATIVOS", 7, 6, 2, 2, 2),           // Software de Base[cite: 12]
    "2035": m("SERIES Y TRANSFORMADAS DE FOURIER", 2, 5, 4, 0, 0),              // Matemáticas[cite: 10]
    "2036": m("INSTRUMENTACION VIRTUAL", 8, 7, 2, 2, 3),                        // Prog. e Ing. de Software
    "2037": m("DISPOSITIVOS PROGRAMABLES", 6, 6, 2, 2, 2),                      // Interacción Hombre Máquina
    "2039": m("ADMINISTRACION Y SEGURIDAD DE REDES", 5, 6, 2, 2, 2),            // Redes
    "2040": m("SISTEMAS DE PROPOSITO GENERAL", 3, 6, 2, 2, 2),                  // Arquitectura de Comp.
    "2041": m("ARQUITECTURAS DE MODELOS CLOUD", 7, 6, 2, 2, 2),                 // Software de Base
    "2042": m("DESARROLLO CON SISTEMAS MINIMOS", 8, 7, 2, 2, 3),                // Prog. e Ing. de Software
    "2043": m("RECUPERACION DE LA INFORMACION Y BASE DE DATOS", 4, 6, 2, 2, 2), // Tratamiento de Información
    "2045": m("PROTOCOLOS DE COMUNICACION", 5, 6, 2, 2, 2),                     // Redes
    "2047": m("ADMINISTRACION DE PROYECTOS DE COMPUTACION", 1, 6, 2, 2, 2),     // Entorno Social
    "2048": m("SISTEMAS DE TIEMPO REAL", 8, 7, 2, 2, 3),                        // Prog. e Ing. de Software
    "2050": m("INTELIGENCIA ARTIFICIAL", 6, 6, 2, 2, 2),                        // Interacción Hombre Máquina

    // Ing. de Software / LIn / LAT
    "2055": m("CONTABILIDAD FINANCIERA", 1, 6, 2, 2, 2),                        // Entorno Social[cite: 11, 13]
    "2056": m("PRINCIPIOS DE ELECTRONICA Y CIRCUITOS LOGICOS", 3, 5, 2, 2, 0),  // Arquitectura de Comp.[cite: 11, 12]
    "2057": m("PROGRAMACION ORIENTADA A OBJETOS", 8, 5, 2, 2, 0),               // Prog. e Ing. de Software[cite: 10, 11]
    "2058": m("REDES I", 5, 5, 2, 2, 0),                                        // Redes[cite: 10, 11]
    "2059": m("INGENIERIA DE REQUERIMIENTOS", 8, 6, 2, 2, 2),                   // Prog. e Ing. de Software[cite: 11]
    "2060": m("ALGORITMOS", 8, 6, 2, 2, 2),                                     // Prog. e Ing. de Software[cite: 11]
    "2061": m("CALCULO DIFERENCIAL E INTEGRAL", 2, 5, 4, 0, 0),                 // Matemáticas[cite: 11]
    "2062": m("BASE DE DATOS I", 4, 6, 2, 2, 2),                                // Tratamiento de Información[cite: 11]
    "2063": m("REDES II", 5, 5, 2, 2, 0),                                       // Redes[cite: 10, 11]
    "2064": m("DESARROLLO DE SISTEMAS EN INTERNET", 8, 6, 2, 2, 2),             // Prog. e Ing. de Software[cite: 10, 11]
    "2065": m("ESTRUCTURAS DE DATOS", 8, 6, 2, 2, 2),                           // Prog. e Ing. de Software[cite: 11]
    "2066": m("TEORIA DE LA COMPUTACION", 2, 5, 4, 0, 0),                       // Matemáticas[cite: 11]
    "2067": m("BASE DE DATOS II", 4, 6, 2, 2, 2),                               // Tratamiento de Información[cite: 11]
    "2068": m("ANALISIS Y DISEÑO DE SOFTWARE", 4, 6, 2, 2, 2),                  // Tratamiento de Información[cite: 11]
    "2069": m("DISEÑO Y SOPORTE DE REDES DE COMPUTADORAS", 5, 6, 2, 2, 2),       // Redes[cite: 11]
    "2070": m("SISTEMAS BASICOS, ARQUITECTURA Y PROCESAMIENTO", 3, 5, 2, 2, 0), // Arquitectura de Comp.[cite: 11]
    "2071": m("SISTEMAS DISTRIBUIDOS", 8, 6, 2, 2, 2),                          // Prog. e Ing. de Software[cite: 11]
    "2072": m("FRAMEWORKS Y ARQUITECTURAS DE SOFTWARE", 8, 6, 2, 2, 2),          // Prog. e Ing. de Software[cite: 11]
    "2073": m("ADMINISTRACION DE BASE DE DATOS", 4, 6, 2, 2, 2),                // Tratamiento de Información[cite: 11, 12]
    "2074": m("SISTEMAS OPERATIVOS", 7, 5, 2, 2, 0),                            // Software de Base[cite: 11, 13]
    "2075": m("INTELIGENCIA ARTIFICIAL", 6, 6, 2, 2, 2),                        // Interacción Hombre Máquina[cite: 11]
    "2076": m("DESARROLLO DE APLICACIONES MOVILES", 8, 6, 2, 2, 2),             // Prog. e Ing. de Software[cite: 11]
    "2077": m("APLICACIONES DE BIG DATA", 4, 6, 2, 2, 2),                        // Tratamiento de Información[cite: 11]
    "2078": m("SERVICIOS CLOUD", 7, 6, 2, 2, 2),                                // Software de Base[cite: 11]
    "2079": m("ADMINISTRACION DE PROYECTOS DE SOFTWARE", 1, 6, 2, 2, 2),         // Entorno Social[cite: 11]
    "2080": m("SISTEMAS INMERSIVOS Y DE REALIDAD AUMENTADA", 6, 6, 2, 2, 2),     // Interacción Hombre Máquina[cite: 11]
    "2081": m("PRUEBAS Y ASEGURAMIENTO DE LA CALIDAD DEL SOFTWARE", 8, 5, 2, 2, 0), // Prog. e Ing. de Software[cite: 11]
    "2082": m("INTELIGENCIA DE NEGOCIOS", 4, 6, 2, 2, 2),                       // Tratamiento de Información[cite: 11]
    "2083": m("ARQUITECTURAS DE TI EMPRESARIALES", 4, 6, 2, 2, 2),              // Tratamiento de Información[cite: 11]

    // Telecomunicaciones y Redes
    "2084": m("FUNDAMENTOS DE COMUNICACIONES", 5, 5, 2, 2, 0),                  // Redes[cite: 10]
    "2085": m("ELECTRICIDAD Y MAGNETISMO", 3, 6, 2, 2, 2),                      // Arquitectura de Comp.[cite: 10]
    "2086": m("CIRCUITOS ELECTRICOS", 3, 5, 2, 2, 0),                           // Arquitectura de Comp.[cite: 10]
    "2087": m("COMUNICACIONES ELECTRONICAS", 3, 6, 2, 2, 2),                     // Arquitectura de Comp.[cite: 10]
    "2088": m("RECUPERACION DE LA INFORMACION Y BASE DE DATOS", 4, 6, 2, 2, 2), // Tratamiento de Información[cite: 10]
    "2089": m("TELEFONIA", 5, 6, 2, 2, 2),                                      // Redes[cite: 10]
    "2090": m("REDES III", 5, 5, 2, 2, 0),                                      // Redes[cite: 10]
    "2091": m("ANTENAS", 5, 6, 2, 2, 2),                                        // Redes[cite: 10]
    "2092": m("NUEVOS PARADIGMAS TECNOLOGICOS", 3, 6, 2, 2, 2),                 // Arquitectura de Comp.[cite: 10]
    "2093": m("REGULACION DE LAS TELECOMUNICACIONES", 1, 6, 2, 2, 2),            // Entorno Social[cite: 10]
    "2094": m("REDES IV", 5, 5, 2, 2, 0),                                       // Redes[cite: 10]
    "2095": m("COMUNICACIONES OPTICAS", 5, 7, 2, 2, 3),                         // Redes[cite: 10]
    "2096": m("SISTEMAS DE MODULACION", 3, 5, 2, 2, 0),                         // Arquitectura de Comp.[cite: 10]
    "2097": m("SISTEMAS DE COMUNICACIONES MOVILES", 5, 7, 2, 2, 3),             // Redes[cite: 10]
    "2098": m("TELEMETRIA", 6, 6, 2, 2, 2),                                     // Interacción Hombre Máquina[cite: 10]
    "2099": m("SEGURIDAD EN REDES", 5, 6, 2, 2, 2),                             // Redes[cite: 10]
    "2100": m("LINEAS DE TRANSMISION", 5, 6, 2, 2, 2),                          // Redes[cite: 10]
    "2101": m("CIRCUITOS DE RADIO FRECUENCIA", 3, 8, 2, 2, 4),                  // Arquitectura de Comp.[cite: 10]
    "2102": m("COMUNICACIONES SATELITALES", 5, 7, 2, 2, 3),                     // Redes[cite: 1, 10]
    "2103": m("PROYECTOS DE TELECOMUNICACIONES", 5, 8, 2, 2, 4)                  // Redes[cite: 3, 10]
};

// ========================================================
// 3. AUTOCOMPLETADO AL ESCRIBIR LA CLAVE DE MATERIA
// ========================================================

const inputClave = document.getElementById('claveMateria');
const inputNombre = document.getElementById('nombreMateria');
const selectEtapa = document.getElementById('etapa');
const inputCreditos = document.getElementById('creditos');
const inputHT = document.getElementById('horasTeoria');
const inputHP = document.getElementById('horasPresenciales');
const inputHL = document.getElementById('horasLinea');
const inputHV = document.getElementById('horasVirtuales');
const inputHAI = document.getElementById('horasIndependiente');
const inputHTCS = document.getElementById('horasCampo');
const selectModalidad = document.getElementById('modalidadPlan');
const selectOpcion = document.getElementById('opcionEducativa');

inputClave.addEventListener('input', (e) => {
    const clave = e.target.value.trim();

    if (catalogoMaterias[clave]) {
        const mat = catalogoMaterias[clave];
        
        inputNombre.value = mat.nombre;
        selectEtapa.value = mat.etapa; // Selecciona el option con value="1" a "10"
        inputCreditos.value = mat.creditos;
        inputHT.value = mat.ht;
        inputHP.value = mat.hp;
        inputHL.value = mat.hl;
        inputHV.value = mat.hv;
        inputHAI.value = mat.hai;
        inputHTCS.value = mat.htcs;
        selectModalidad.value = mat.modalidad;
        selectOpcion.value = mat.opcion;
    }
});