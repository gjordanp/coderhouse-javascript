//Start Verificar session--------------------------------------------------------------------------------
//buscamos credenciales desde SessionStorage
let sessionSavedEmail=JSON.parse(sessionStorage.getItem('sessionUser'))?.email;
let sessionSavedPass=JSON.parse(sessionStorage.getItem('sessionUser'))?.password;
let usuarios = JSON.parse(localStorage.getItem("usuarios"));

verifySession();

//Indicamos las iniciales del usuario en el perfil
let nombre=usuarios.find(e=>e.email==sessionSavedEmail)?.nombre;
document.getElementById('userInitialsDesktop').innerHTML=nombre.slice(0,3);

//Submit Inicio de Session
async function verifySession(e) 
{
    e?.preventDefault();
    let loginSuccess=false;
    //Obtenemos lista de usuarios de base de datos
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    //Verificamos usuario
    if (usuarios.map(e=>e.email).includes(sessionSavedEmail)) {
        let encodedPass= usuarios.find(e=>e.email=sessionSavedEmail).password;
        //Funcion para verificar encoded password
        await argon2.verify({ pass:sessionSavedPass , encoded: encodedPass })
        .then((verify) => {
            loginSuccess = true;
        })
        .catch(e => console.error(e.message, e.code))
    }

    if(!loginSuccess) //si las credenciales NO Coinciden redireccionamos al Index
    {
        document.getElementById('anchor_index').click();
    }
}
//End verificar session--------------------------------------------------------------------------------

// Real Viewport Height---------------------------------------------------------------------------
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
// Real Viewport Height---------------------------------------------------------------------------

//Variables
const Proyectos=[];

/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()



class Proyecto{
  constructor(row,header){
    header.forEach(el=>{
      let index = header.indexOf(el);
      this[el]=row[index];
    })
  }
}


class Excel {
  constructor(content) {
    this.content = content;
  }
  header() {
    return this.content[0];
  }
  rows() {
    return new RowCollection(this.content.slice(1, this.content.length));
  }
}

class RowCollection {
  constructor(rows) {
    this.rows = rows;
  }
  get(index) {
    return this.rows[index];
  }
  count() {
    return this.rows.length;
  }
}

class Row {
  constructor(row) {
    this.row = row;
  }
  get() {
    return this.row;
  }
  elementAt(index) {
    return this.row[index];
  }
}


// Leer excel desde input
const excelInput = document.getElementById('cbcExcel')
// Leer excel desde ruta en archivos 
fetch(excelInput.src)
  .then(response => response.blob())
  .then(blob => readXlsxFile(blob,{sheet:1}))
  .then((rows) => {
    //console.log(rows);
    const content = rows;
    const excel = new Excel(content)
    
    for (let i = 0; i < excel.rows().count(); i++) {
      if (excel.rows().get(i)[0]!=null) {
        Proyectos.push(new Proyecto(excel.rows().get(i),excel.header()))
      }
    }
    proyectListLoad();
  }
)




//Carga los proyectos en la lista
function proyectListLoad() {
  const proyectSelector=document.getElementById("proyectselector")
  Proyectos.sort((a,b)=>a.Codigo-b.Codigo);
  Proyectos.forEach(proyecto=>{
    const op=document.createElement('option');
    op.value=proyecto.Codigo;
    op.innerHTML=proyecto.Codigo + " - " + proyecto.Proyecto;
    proyectSelector.appendChild(op);
  });
}

//Cuando se selecciona un proyecto, cambiamos la informacion a presentar
function proyectListChange(){
  const proyectSelector=document.getElementById("proyectselector");
  const selectedProyect=Proyectos.find(e=>e.Codigo==proyectSelector.value);
  const ceroDecimal={maximumFractionDigits: 0};
  const dosDecimal={maximumFractionDigits: 2};
  
  document.querySelector('#card_Codigo > .card-body > .card-title').innerText=selectedProyect['Codigo'];
  document.querySelector('#card_Proyecto> .card-body > .card-title').innerText=selectedProyect['Proyecto'];
  document.querySelector('#card_Inmobiliaria > .card-body > .card-title').innerText=selectedProyect['Inmobiliaria'];
  document.querySelector('#card_Superficie > .card-body > .card-title').innerText=selectedProyect['Superficie m2'].toLocaleString("en-US",ceroDecimal) + " m2";
  document.querySelector('#card_Pisos > .card-body > .card-title').innerText=selectedProyect['Pisos'];
  document.querySelector('#card_Subs > .card-body > .card-title').innerText=selectedProyect['Subt.'];
  document.querySelector('#card_Suelo > .card-body > .card-title').innerText="Suelo "+selectedProyect['T.S'];
  document.querySelector('#card_Zona > .card-body > .card-title').innerText="Zona "+selectedProyect['Z.S'];
  document.querySelector('#card_Hormigon > .card-body > .card-title').innerText=selectedProyect['HA (m3)'].toLocaleString("en-US",ceroDecimal)+ " m3";
  document.querySelector('#card_Acero > .card-body > .card-title').innerText=selectedProyect['Fe (kg)'].toLocaleString("en-US",ceroDecimal) + " Kg";
  document.querySelector('#card_Moldaje> .card-body > .card-title').innerText=selectedProyect['MLD (m2)'].toLocaleString("en-US",ceroDecimal) + " m2";
  document.querySelector('#card_CuantiaV> .card-body > .card-title').innerText=selectedProyect['Fe/HA (kg/m3)'].toLocaleString("en-US",dosDecimal)+ " Kg/m3";
  document.querySelector('#card_CuantiaS > .card-body > .card-title').innerText=selectedProyect['Fe/Sup (kg/m2)'].toLocaleString("en-US",dosDecimal) + " Kg/m2";
}

//Cerrar Sesión
document.getElementById('CerrarSesionMobile').addEventListener('click',cerrarSesion)
document.getElementById('CerrarSesionDesktop').addEventListener('click',cerrarSesion)

function cerrarSesion(){
  sessionStorage.removeItem('sessionUser')
  window.location.reload();
}

