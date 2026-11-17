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
if (btnIrPaso2) {
    btnIrPaso2.addEventListener('click', () => {
        if (validarPaso(paso1)) {
            paso1.classList.add('oculto');
            paso2.classList.remove('oculto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Navegación Paso 2 -> Paso 1
if (btnVolverPaso1) {
    btnVolverPaso1.addEventListener('click', () => {
        paso2.classList.add('oculto');
        paso1.classList.remove('oculto');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Navegación Paso 2 -> Paso 3
if (btnIrPaso3) {
    btnIrPaso3.addEventListener('click', () => {
        if (validarPaso(paso2)) {
            paso2.classList.add('oculto');
            paso3.classList.remove('oculto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Navegación Paso 3 -> Paso 2
if (btnVolverPaso2) {
    btnVolverPaso2.addEventListener('click', () => {
        paso3.classList.add('oculto');
        paso2.classList.remove('oculto');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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

const m = (nombre, etapa, creditos, ht, hp, hai = 0, htcs = 0, hlab = 0) => ({
    nombre,
    etapa: String(etapa),
    creditos,
    ht,
    hp,
    hl: 0,
    hv: 0,
    hai,
    htcs,
    hlab,
    modalidad: "Escolarizada",
    opcion: "Presencial"
});

const catalogoMaterias = {
    // Tronco común inicial
    "2001": m("ADMINISTRACION", 1, 5, 2, 2, 0),
    "2002": m("INTRODUCCION A LAS TECNOLOGIAS DE INFORMACION", 3, 5, 2, 2, 0),
    "2003": m("ETICA Y LEGISLACION INFORMATICA", 1, 6, 2, 2, 2),
    "2004": m("MATEMATICAS COMPUTACIONALES", 2, 5, 4, 0, 0),
    "2005": m("INTRODUCCION A LA PROGRAMACION", 8, 5, 2, 2, 0),
    "2006": m("DESARROLLO HUMANO I", 9, 5, 2, 2, 0),
    "2007": m("INTRODUCCION A LA INVESTIGACION", 9, 6, 2, 2, 2),
    "2008": m("DEPORTES I", 9, 5, 0, 4, 0),

    // Formativas y Matemáticas Compartidas
    "2009": m("DISEÑO DE INTERFACES DE SOFTWARE", 6, 6, 2, 2, 2),
    "2010": m("PRINCIPIOS DE ELECTRONICA", 3, 5, 2, 2, 0),
    "2011": m("CALCULO DIFERENCIAL E INTEGRAL", 2, 5, 4, 0, 0),
    "2012": m("ALGEBRA LINEAL", 2, 5, 4, 0, 0),
    "2013": m("PROGRAMACION DE SISTEMAS EMBEBIDOS", 8, 5, 2, 2, 0),
    "2014": m("DESARROLLO HUMANO II", 9, 6, 2, 2, 2),
    "2015": m("INGLES I", 10, 5, 2, 2, 0),
    "2016": m("DEPORTES II", 9, 5, 0, 4, 0),
    "2017": m("ANALISIS Y DISEÑO DE SISTEMAS COMPUTACIONALES", 4, 6, 2, 2, 2),
    "2018": m("ELECTRONICA ANALOGICA Y DIGITAL", 3, 6, 2, 2, 2),
    "2019": m("PROBABILIDAD Y ESTADISTICA", 2, 5, 4, 0, 0),
    "2020": m("CALCULO VECTORIAL", 2, 5, 4, 0, 0),
    "2021": m("ALGORITMOS Y ESTRUCTURA DE DATOS", 8, 6, 2, 2, 2),
    "2022": m("DESARROLLO HUMANO III", 9, 6, 2, 2, 2),
    "2023": m("INGLES II", 10, 5, 2, 2, 0),
    "2024": m("DEPORTES III", 9, 5, 0, 4, 0),

    // Inglés Transversal
    "2031": m("INGLES III", 10, 5, 2, 2, 0),
    "2038": m("INGLES IV", 10, 5, 2, 2, 0),
    "2044": m("INGLES V", 10, 5, 2, 2, 0),
    "2049": m("INGLES VI", 10, 5, 2, 2, 0),

    // Formación terminal compartida
    "2046": m("TOPICO I", 11, 6, 2, 2, 2),
    "2051": m("TOPICO II", 11, 6, 2, 2, 2),
    "2052": m("GESTION DE LAS TI", 1, 6, 2, 2, 2),
    "2053": m("SERVICIO SOCIAL", 9, 10, 0, 0, 0, 480),
    "2054": m("PRACTICAS PROFESIONALES", 12, 14, 4, 0, 0, 478),

    // Ing. en Computación
    "2025": m("FUNDAMENTOS DE REDES", 5, 5, 2, 2, 0),
    "2026": m("LOGICA DIGITAL", 3, 5, 2, 2, 0),
    "2027": m("SISTEMAS OPERATIVOS", 7, 5, 2, 2, 0),
    "2028": m("ECUACIONES DIFERENCIALES", 2, 5, 4, 0, 0),
    "2029": m("PROGRAMACION DE BAJO NIVEL", 8, 5, 2, 2, 0),
    "2030": m("INTERCONECTIVIDAD DE DISPOSITIVOS", 6, 6, 2, 2, 2),
    "2032": m("PROTOCOLOS DE RUTEO", 5, 5, 2, 2, 0),
    "2033": m("SISTEMAS DIGITALES", 3, 6, 2, 2, 2),
    "2034": m("ADMINISTRACION DE SISTEMAS OPERATIVOS", 7, 6, 2, 2, 2),
    "2035": m("SERIES Y TRANSFORMADAS DE FOURIER", 2, 5, 4, 0, 0),
    "2036": m("INSTRUMENTACION VIRTUAL", 8, 7, 2, 2, 3),
    "2037": m("DISPOSITIVOS PROGRAMABLES", 6, 6, 2, 2, 2),
    "2039": m("ADMINISTRACION Y SEGURIDAD DE REDES", 5, 6, 2, 2, 2),
    "2040": m("SISTEMAS DE PROPOSITO GENERAL", 3, 6, 2, 2, 2),
    "2041": m("ARQUITECTURAS DE MODELOS CLOUD", 7, 6, 2, 2, 2),
    "2042": m("DESARROLLO CON SISTEMAS MINIMOS", 8, 7, 2, 2, 3),
    "2043": m("RECUPERACION DE LA INFORMACION Y BASE DE DATOS", 4, 6, 2, 2, 2),
    "2045": m("PROTOCOLOS DE COMUNICACION", 5, 6, 2, 2, 2),
    "2047": m("ADMINISTRACION DE PROYECTOS DE COMPUTACION", 1, 6, 2, 2, 2),
    "2048": m("SISTEMAS DE TIEMPO REAL", 8, 7, 2, 2, 3),
    "2050": m("INTELIGENCIA ARTIFICIAL", 6, 6, 2, 2, 2),

    // Ing. de Software / LIn / LAT
    "2055": m("CONTABILIDAD FINANCIERA", 1, 6, 2, 2, 2),
    "2056": m("PRINCIPIOS DE ELECTRONICA Y CIRCUITOS LOGICOS", 3, 5, 2, 2, 0),
    "2057": m("PROGRAMACION ORIENTADA A OBJETOS", 8, 5, 2, 2, 0),
    "2058": m("REDES I", 5, 5, 2, 2, 0),
    "2059": m("INGENIERIA DE REQUERIMIENTOS", 8, 6, 2, 2, 2),
    "2060": m("ALGORITMOS", 8, 6, 2, 2, 2),
    "2061": m("CALCULO DIFERENCIAL E INTEGRAL", 2, 5, 4, 0, 0),
    "2062": m("BASE DE DATOS I", 4, 6, 2, 2, 2),
    "2063": m("REDES II", 5, 5, 2, 2, 0),
    "2064": m("DESARROLLO DE SISTEMAS EN INTERNET", 8, 6, 2, 2, 2),
    "2065": m("ESTRUCTURAS DE DATOS", 8, 6, 2, 2, 2),
    "2066": m("TEORIA DE LA COMPUTACION", 2, 5, 4, 0, 0),
    "2067": m("BASE DE DATOS II", 4, 6, 2, 2, 2),
    "2068": m("ANALISIS Y DISEÑO DE SOFTWARE", 4, 6, 2, 2, 2),
    "2069": m("DISEÑO Y SOPORTE DE REDES DE COMPUTADORAS", 5, 6, 2, 2, 2),
    "2070": m("SISTEMAS BASICOS, ARQUITECTURA Y PROCESAMIENTO", 3, 5, 2, 2, 0),
    "2071": m("SISTEMAS DISTRIBUIDOS", 8, 6, 2, 2, 2),
    "2072": m("FRAMEWORKS Y ARQUITECTURAS DE SOFTWARE", 8, 6, 2, 2, 2),
    "2073": m("ADMINISTRACION DE BASE DE DATOS", 4, 6, 2, 2, 2),
    "2074": m("SISTEMAS OPERATIVOS", 7, 5, 2, 2, 0),
    "2075": m("INTELIGENCIA ARTIFICIAL", 6, 6, 2, 2, 2),
    "2076": m("DESARROLLO DE APLICACIONES MOVILES", 8, 6, 2, 2, 2),
    "2077": m("APLICACIONES DE BIG DATA", 4, 6, 2, 2, 2),
    "2078": m("SERVICIOS CLOUD", 7, 6, 2, 2, 2),
    "2079": m("ADMINISTRACION DE PROYECTOS DE SOFTWARE", 1, 6, 2, 2, 2),
    "2080": m("SISTEMAS INMERSIVOS Y DE REALIDAD AUMENTADA", 6, 6, 2, 2, 2),
    "2081": m("PRUEBAS Y ASEGURAMIENTO DE LA CALIDAD DEL SOFTWARE", 8, 5, 2, 2, 0),
    "2082": m("INTELIGENCIA DE NEGOCIOS", 4, 6, 2, 2, 2),
    "2083": m("ARQUITECTURAS DE TI EMPRESARIALES", 4, 6, 2, 2, 2),

    // Telecomunicaciones y Redes
    "2084": m("FUNDAMENTOS DE COMUNICACIONES", 5, 5, 2, 2, 0),
    "2085": m("ELECTRICIDAD Y MAGNETISMO", 3, 6, 2, 2, 2),
    "2086": m("CIRCUITOS ELECTRICOS", 3, 5, 2, 2, 0),
    "2087": m("COMUNICACIONES ELECTRONICAS", 3, 6, 2, 2, 2),
    "2088": m("RECUPERACION DE LA INFORMACION Y BASE DE DATOS", 4, 6, 2, 2, 2),
    "2089": m("TELEFONIA", 5, 6, 2, 2, 2),
    "2090": m("REDES III", 5, 5, 2, 2, 0),
    "2091": m("ANTENAS", 5, 6, 2, 2, 2),
    "2092": m("NUEVOS PARADIGMAS TECNOLOGICOS", 3, 6, 2, 2, 2),
    "2093": m("REGULACION DE LAS TELECOMUNICACIONES", 1, 6, 2, 2, 2),
    "2094": m("REDES IV", 5, 5, 2, 2, 0),
    "2095": m("COMUNICACIONES OPTICAS", 5, 7, 2, 2, 3),
    "2096": m("SISTEMAS DE MODULACION", 3, 5, 2, 2, 0),
    "2097": m("SISTEMAS DE COMUNICACIONES MOVILES", 5, 7, 2, 2, 3),
    "2098": m("TELEMETRIA", 6, 6, 2, 2, 2),
    "2099": m("SEGURIDAD EN REDES", 5, 6, 2, 2, 2),
    "2100": m("LINEAS DE TRANSMISION", 5, 6, 2, 2, 2),
    "2101": m("CIRCUITOS DE RADIO FRECUENCIA", 3, 8, 2, 2, 4),
    "2102": m("COMUNICACIONES SATELITALES", 5, 7, 2, 2, 3),
    "2103": m("PROYECTOS DE TELECOMUNICACIONES", 5, 8, 2, 2, 4)
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
const inputHLAB = document.getElementById('horasLaboratorio');
const selectModalidad = document.getElementById('modalidadPlan');
const selectOpcion = document.getElementById('opcionEducativa');

if (inputClave) {
    inputClave.addEventListener('input', (e) => {
        const clave = e.target.value.trim();

        if (catalogoMaterias[clave]) {
            const mat = catalogoMaterias[clave];
            
            inputNombre.value = mat.nombre;
            selectEtapa.value = mat.etapa;
            inputCreditos.value = mat.creditos;
            inputHT.value = mat.ht;
            inputHP.value = mat.hp;
            inputHL.value = mat.hl;
            inputHV.value = mat.hv;
            inputHAI.value = mat.hai;
            inputHTCS.value = mat.htcs;
            if (inputHLAB) inputHLAB.value = mat.hlab || 0;
            selectModalidad.value = mat.modalidad;
            selectOpcion.value = mat.opcion;
        }
    });
}

// ========================================================
// 4. LISTA DINÁMICA DE OBJETIVOS ESPECÍFICOS
// ========================================================

const contenedorObjetivos = document.getElementById('contenedorObjetivos');
const btnAgregarObjetivo = document.getElementById('btnAgregarObjetivo');

function actualizarNumeracionObjetivos() {
    const filas = contenedorObjetivos.querySelectorAll('.fila-objetivo');
    filas.forEach((fila, index) => {
        fila.querySelector('.numero-objetivo').textContent = `${index + 1}.`;
        fila.querySelector('.btn-eliminar-item').disabled = (filas.length === 1);
    });
}

if (btnAgregarObjetivo && contenedorObjetivos) {
    btnAgregarObjetivo.addEventListener('click', () => {
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'fila-objetivo';
        nuevaFila.innerHTML = `
            <span class="numero-objetivo"></span>
            <input type="text" class="input-objetivo" name="objetivoEspecifico[]" placeholder="Escribe el objetivo específico..." required>
            <button type="button" class="btn-eliminar-item" title="Eliminar objetivo">✕</button>
        `;

        nuevaFila.querySelector('.btn-eliminar-item').addEventListener('click', () => {
            nuevaFila.remove();
            actualizarNumeracionObjetivos();
        });

        contenedorObjetivos.appendChild(nuevaFila);
        actualizarNumeracionObjetivos();
        nuevaFila.querySelector('input').focus();
    });

    contenedorObjetivos.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.fila-objetivo').remove();
            actualizarNumeracionObjetivos();
        });
    });
}

// ========================================================
// 5. LISTA DINÁMICA DE COMPETENCIAS
// ========================================================

const contenedorCompetencias = document.getElementById('contenedorCompetencias');
const btnAgregarCompetencia = document.getElementById('btnAgregarCompetencia');

function actualizarEstadoBotonesCompetencias() {
    const filas = contenedorCompetencias.querySelectorAll('.fila-competencia');
    filas.forEach((fila) => {
        fila.querySelector('.btn-eliminar-item').disabled = (filas.length === 1);
    });
}

if (btnAgregarCompetencia && contenedorCompetencias) {
    btnAgregarCompetencia.addEventListener('click', () => {
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'fila-competencia';
        nuevaFila.innerHTML = `
            <span class="icono-vineta">•</span>
            <input type="text" class="input-competencia" name="competencias[]" placeholder="Escribe otra competencia..." required>
            <button type="button" class="btn-eliminar-item" title="Eliminar competencia">✕</button>
        `;

        nuevaFila.querySelector('.btn-eliminar-item').addEventListener('click', () => {
            nuevaFila.remove();
            actualizarEstadoBotonesCompetencias();
        });

        contenedorCompetencias.appendChild(nuevaFila);
        actualizarEstadoBotonesCompetencias();
        nuevaFila.querySelector('input').focus();
    });

    contenedorCompetencias.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.fila-competencia').remove();
            actualizarEstadoBotonesCompetencias();
        });
    });
}

// ========================================================
// 6. CONTROL DINÁMICO DE UNIDADES Y SUBTEMAS (HASTA 20)
// ========================================================

const contenedorUnidades = document.getElementById('contenedorUnidades');
const btnAgregarUnidad = document.getElementById('btnAgregarUnidad');
const contadorUnidades = document.getElementById('contadorUnidades');
const MAX_UNIDADES = 20;

function renumerarTodoElContenido() {
    const unidades = contenedorUnidades.querySelectorAll('.tarjeta-unidad');

    if (contadorUnidades) {
        contadorUnidades.textContent = `${unidades.length} de ${MAX_UNIDADES} unidades`;
    }
    if (btnAgregarUnidad) {
        btnAgregarUnidad.disabled = (unidades.length >= MAX_UNIDADES);
    }

    unidades.forEach((tarjeta, indexUnidad) => {
        const numUnidad = indexUnidad + 1;
        tarjeta.setAttribute('data-unidad', numUnidad);

        tarjeta.querySelector('.badge-unidad').textContent = `Unidad ${numUnidad}`;
        tarjeta.querySelector('.btn-eliminar-unidad').disabled = (unidades.length === 1);

        const filasSubtema = tarjeta.querySelectorAll('.fila-subtema');
        filasSubtema.forEach((filaSub, indexSub) => {
            const numSubtema = indexSub + 1;
            const spanPrefijo = filaSub.querySelector('.prefijo-subtema');
            const inputSub = filaSub.querySelector('.input-subtema');
            const btnEliminarSub = filaSub.querySelector('.btn-eliminar-subtema');

            spanPrefijo.textContent = `${numUnidad}.${numSubtema}.`;
            inputSub.name = `subtema_${numUnidad}[]`;
            btnEliminarSub.disabled = (filasSubtema.length === 1);
        });
    });
}

function vincularEventosUnidad(tarjeta) {
    const btnEliminarUnidad = tarjeta.querySelector('.btn-eliminar-unidad');
    const btnAgregarSubtema = tarjeta.querySelector('.btn-agregar-subtema');
    const contenedorSubtemas = tarjeta.querySelector('.contenedor-subtemas');

    btnEliminarUnidad.addEventListener('click', () => {
        tarjeta.remove();
        renumerarTodoElContenido();
    });

    btnAgregarSubtema.addEventListener('click', () => {
        const numUnidad = tarjeta.getAttribute('data-unidad');
        const totalSub = contenedorSubtemas.querySelectorAll('.fila-subtema').length;

        const nuevaFilaSub = document.createElement('div');
        nuevaFilaSub.className = 'fila-subtema';
        nuevaFilaSub.innerHTML = `
            <span class="prefijo-subtema">${numUnidad}.${totalSub + 1}.</span>
            <input type="text" class="input-subtema" name="subtema_${numUnidad}[]" placeholder="Subtema..." required>
            <button type="button" class="btn-eliminar-subtema" title="Eliminar subtema">✕</button>
        `;

        nuevaFilaSub.querySelector('.btn-eliminar-subtema').addEventListener('click', () => {
            nuevaFilaSub.remove();
            renumerarTodoElContenido();
        });

        contenedorSubtemas.appendChild(nuevaFilaSub);
        renumerarTodoElContenido();
        nuevaFilaSub.querySelector('input').focus();
    });

    tarjeta.querySelectorAll('.btn-eliminar-subtema').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.fila-subtema').remove();
            renumerarTodoElContenido();
        });
    });
}

if (btnAgregarUnidad && contenedorUnidades) {
    btnAgregarUnidad.addEventListener('click', () => {
        const totalActual = contenedorUnidades.querySelectorAll('.tarjeta-unidad').length;
        if (totalActual >= MAX_UNIDADES) return;

        const proxNum = totalActual + 1;
        const nuevaTarjeta = document.createElement('div');
        nuevaTarjeta.className = 'tarjeta-unidad';
        nuevaTarjeta.setAttribute('data-unidad', proxNum);
        nuevaTarjeta.innerHTML = `
            <div class="fila-cabecera-unidad">
                <span class="badge-unidad">Unidad ${proxNum}</span>
                <input type="text" class="input-titulo-unidad" name="tituloUnidad[]" placeholder="Título de la unidad..." required>
                <button type="button" class="btn-eliminar-unidad" title="Eliminar unidad">✕</button>
            </div>

            <div class="contenedor-subtemas">
                <div class="fila-subtema">
                    <span class="prefijo-subtema">${proxNum}.1.</span>
                    <input type="text" class="input-subtema" name="subtema_${proxNum}[]" placeholder="Subtema..." required>
                    <button type="button" class="btn-eliminar-subtema" disabled title="Debe haber al menos un subtema">✕</button>
                </div>
            </div>

            <button type="button" class="btn-agregar-subtema">+ Agregar subtema</button>
        `;

        vincularEventosUnidad(nuevaTarjeta);
        contenedorUnidades.appendChild(nuevaTarjeta);
        renumerarTodoElContenido();
        nuevaTarjeta.querySelector('.input-titulo-unidad').focus();
    });

    const primeraUnidad = document.querySelector('.tarjeta-unidad');
    if (primeraUnidad) {
        vincularEventosUnidad(primeraUnidad);
        renumerarTodoElContenido();
    }
}

// ========================================================
// 7. LISTA DINÁMICA DE METODOLOGÍA Y ESTRATEGIAS
// ========================================================

const contenedorEstrategias = document.getElementById('contenedorEstrategias');
const btnAgregarEstrategia = document.getElementById('btnAgregarEstrategia');

function actualizarEstadoBotonesEstrategias() {
    const filas = contenedorEstrategias.querySelectorAll('.fila-estrategia');
    filas.forEach((fila) => {
        fila.querySelector('.btn-eliminar-item').disabled = (filas.length === 1);
    });
}

if (btnAgregarEstrategia && contenedorEstrategias) {
    btnAgregarEstrategia.addEventListener('click', () => {
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'fila-estrategia';
        nuevaFila.innerHTML = `
            <span class="icono-vineta">•</span>
            <input type="text" class="input-estrategia" name="estrategias[]" placeholder="Escribe una estrategia de enseñanza..." required>
            <button type="button" class="btn-eliminar-item" title="Eliminar estrategia">✕</button>
        `;

        nuevaFila.querySelector('.btn-eliminar-item').addEventListener('click', () => {
            nuevaFila.remove();
            actualizarEstadoBotonesEstrategias();
        });

        contenedorEstrategias.appendChild(nuevaFila);
        actualizarEstadoBotonesEstrategias();
        nuevaFila.querySelector('input').focus();
    });

    contenedorEstrategias.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.fila-estrategia').remove();
            actualizarEstadoBotonesEstrategias();
        });
    });
}

// ========================================================
// 8. INSTRUMENTOS DE EVALUACIÓN Y TABLA DE PONDERACIÓN
// ========================================================

const contenedorInstrumentos = document.getElementById('contenedorInstrumentos');
const btnAgregarInstrumento = document.getElementById('btnAgregarInstrumento');

function actualizarEstadoBotonesInstrumentos() {
    const filas = contenedorInstrumentos.querySelectorAll('.fila-instrumento');
    filas.forEach((fila) => {
        fila.querySelector('.btn-eliminar-item').disabled = (filas.length === 1);
    });
}

if (btnAgregarInstrumento && contenedorInstrumentos) {
    btnAgregarInstrumento.addEventListener('click', () => {
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'fila-instrumento';
        nuevaFila.innerHTML = `
            <span class="icono-vineta">•</span>
            <input type="text" class="input-instrumento" name="instrumentosEval[]" placeholder="Escribe un instrumento de evaluación..." required>
            <button type="button" class="btn-eliminar-item" title="Eliminar instrumento">✕</button>
        `;

        nuevaFila.querySelector('.btn-eliminar-item').addEventListener('click', () => {
            nuevaFila.remove();
            actualizarEstadoBotonesInstrumentos();
        });

        contenedorInstrumentos.appendChild(nuevaFila);
        actualizarEstadoBotonesInstrumentos();
        nuevaFila.querySelector('input').focus();
    });

    contenedorInstrumentos.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.fila-instrumento').remove();
            actualizarEstadoBotonesInstrumentos();
        });
    });
}

// Tabla de Ponderación (Por defecto 30%, 30%, 40% = 100%)
const cuerpoPonderacion = document.getElementById('cuerpoPonderacion');
const btnAgregarRubroEval = document.getElementById('btnAgregarRubroEval');
const badgeTotalPonderacion = document.getElementById('badgeTotalPonderacion');

function recalcularPonderacion() {
    if (!cuerpoPonderacion || !badgeTotalPonderacion) return;

    const filas = cuerpoPonderacion.querySelectorAll('tr');
    const inputsPorcentaje = cuerpoPonderacion.querySelectorAll('.input-porcentaje-eval');
    let suma = 0;

    inputsPorcentaje.forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            suma += val;
        }
    });

    badgeTotalPonderacion.textContent = `Total: ${suma}%`;
    if (suma === 100) {
        badgeTotalPonderacion.className = 'badge-total total-ok';
    } else {
        badgeTotalPonderacion.className = 'badge-total total-error';
    }

    filas.forEach(fila => {
        const btnEliminar = fila.querySelector('.btn-eliminar-fila-tabla');
        if (btnEliminar) {
            btnEliminar.disabled = (filas.length === 1);
        }
    });

    return suma;
}

function vincularEventosFilaPonderacion(fila) {
    const inputPorcentaje = fila.querySelector('.input-porcentaje-eval');
    const btnEliminar = fila.querySelector('.btn-eliminar-fila-tabla');

    inputPorcentaje.addEventListener('input', recalcularPonderacion);

    btnEliminar.addEventListener('click', () => {
        fila.remove();
        recalcularPonderacion();
    });
}

if (cuerpoPonderacion && btnAgregarRubroEval) {
    cuerpoPonderacion.querySelectorAll('tr').forEach(fila => {
        vincularEventosFilaPonderacion(fila);
    });
    recalcularPonderacion();

    btnAgregarRubroEval.addEventListener('click', () => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>
                <input type="text" class="input-rubro-eval" name="rubroEval[]" placeholder="Nuevo instrumento o rubro..." required>
            </td>
            <td>
                <div class="grupo-porcentaje">
                    <input type="number" class="input-porcentaje-eval" name="porcentajeEval[]" value="0" min="0" max="100" required>
                    <span>%</span>
                </div>
            </td>
            <td class="celda-accion">
                <button type="button" class="btn-eliminar-fila-tabla" title="Eliminar rubro">✕</button>
            </td>
        `;

        vincularEventosFilaPonderacion(nuevaFila);
        cuerpoPonderacion.appendChild(nuevaFila);
        recalcularPonderacion();
        nuevaFila.querySelector('.input-rubro-eval').focus();
    });
}

// ========================================================
// 9. LISTA DINÁMICA DE BIBLIOGRAFÍA
// ========================================================

const contenedorBibliografia = document.getElementById('contenedorBibliografia');
const btnAgregarBibliografia = document.getElementById('btnAgregarBibliografia');

function actualizarEstadoBotonesBibliografia() {
    const filas = contenedorBibliografia.querySelectorAll('.fila-bibliografia');
    filas.forEach((fila) => {
        fila.querySelector('.btn-eliminar-item').disabled = (filas.length === 1);
    });
}

if (btnAgregarBibliografia && contenedorBibliografia) {
    btnAgregarBibliografia.addEventListener('click', () => {
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'fila-bibliografia';
        nuevaFila.innerHTML = `
            <span class="icono-vineta">•</span>
            <input type="text" class="input-bibliografia" name="bibliografia[]" placeholder="Ej. Apellido, N. (Año). Título del libro. Editorial." required>
            <button type="button" class="btn-eliminar-item" title="Eliminar referencia">✕</button>
        `;

        nuevaFila.querySelector('.btn-eliminar-item').addEventListener('click', () => {
            nuevaFila.remove();
            actualizarEstadoBotonesBibliografia();
        });

        contenedorBibliografia.appendChild(nuevaFila);
        actualizarEstadoBotonesBibliografia();
        nuevaFila.querySelector('input').focus();
    });

    contenedorBibliografia.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.fila-bibliografia').remove();
            actualizarEstadoBotonesBibliografia();
        });
    });
}

// ========================================================
// 10. ENVÍO Y REGISTRO FINAL CON VALIDACIÓN DE PONDERACIÓN
// ========================================================

if (formMateria) {
    formMateria.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validarPaso(paso3)) return;

        const totalPonderacion = recalcularPonderacion();
        if (totalPonderacion !== 100) {
            alert(`La suma de la ponderación debe ser exactamente 100% (actualmente suma ${totalPonderacion}%).`);
            return;
        }

        alert('¡La materia y su programa han sido registrados exitosamente!');
    });
}