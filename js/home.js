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
  // We execute the same script as before
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
  elementAt(index) {
    return this.row[index];
  }
  count() {
    return this.row.length;
  }
}



// Leer excel desde input
// File.
//const excelInput = document.getElementById('cbcExcel')
const excelInput = document.getElementById('cbcExcel')
excelInput.addEventListener('change', async function () {
  const content = await readXlsxFile(excelInput.files[0]);
  const excel = new Excel(content);
  header = excel.header();
  ExcelPrinter.print("excel-table", excel);
})


// Leer excel desde ruta en archivos 
// Blob.
fetch(excelInput.src)
  .then(response => response.blob())
  .then(blob => readXlsxFile(blob))
  .then((rows) => {
    //console.log(rows);
    const content = rows;
    const excel = new Excel(content)
    
    for (let i = 0; i < excel.rows().count(); i++) {
      if (excel.rows().get(i)[0]!=null) {
        Proyectos.push(new Proyecto(excel.rows().get(i),excel.header()))
      }
    }
    ExcelPrinter.print("excel-table", excel);
  })


class ExcelPrinter {
  static print(TableId, excel) {
    const table = document.getElementById(TableId)
    let j = 0;

    for (let j = 0; j < 9; j++) {
      const title = excel.header()[j];

      const div = document.createElement("div");
      div.setAttribute("class", "d-flex justify-content-center dropdown");
      //div.setAttribute("onclick", "e.stopPropagation()");

      const btn = document.createElement("button");
      btn.setAttribute("class", "btn btn-dark d-flex flex-row gap-1 align-items-center dropdown-toggle");
      btn.setAttribute("type", "button");
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("onclick", "tableFilter(event)");
      btn.setAttribute("data-bs-auto-close", "false");// Dropdown solo se cierre apretando el toogle https://getbootstrap.com/docs/5.0/components/dropdowns/
      btn.innerHTML = title;

      const ul = document.createElement("ul");
      ul.setAttribute("class", "dropdown-menu overflow-auto");
      ul.setAttribute("style", "max-height:50vh");
      //ul.setAttribute("onchange", "tableFilter(event)");

      let columnData = [];
      for (let i = 0; i < excel.rows().count(); i++) {
        if (excel.rows().get(i)[0] == null) {
          break;
        }
        let data= excel.rows().get(i)[j];

        j==8?data=data.toLocaleString("en-US",{maximumFractionDigits: 0}):"";

        if (columnData.includes(data)) {
          continue;
        }
        else {
          columnData.push(data);
        }

        const li = document.createElement("li");
        li.setAttribute("class", "dropdown-item");
        const cbxInput = document.createElement("input");
        cbxInput.setAttribute("class", "form-check-input");
        cbxInput.setAttribute("type", "checkbox");
        //cbxInput.setAttribute("onchange","tableFilter()");
        cbxInput.defaultChecked = true;
        //cbxInput.setAttribute("id","flexCheckDefault"+i);
        const cbxLabel = document.createElement("label");
        cbxLabel.setAttribute("class", "form-check-label mx-2");
        //cbxLabel.setAttribute("for","flexCheckDefault"+i);
        cbxLabel.innerHTML = data;

        li.appendChild(cbxInput);
        li.appendChild(cbxLabel);
        ul.appendChild(li);
      }

      div.appendChild(btn);
      div.appendChild(ul);
      const tblhead = document.createElement("th");
      tblhead.appendChild(div);
      table.querySelector("thead").appendChild(tblhead);
    }

    const tblBody = table.querySelector("tbody");
    for (let j = 0; j < excel.rows().count(); j++) {
      if (excel.rows().get(j)[0] == null) {
        break;
      }
      const tblRow = document.createElement("tr");
      for (let i = 0; i < 9; i++) {
        const row = excel.rows().get(j);
        const tblCell = document.createElement("td");
        let cellText = row[i]==null?document.createTextNode(""):document.createTextNode(row[i]);
        if (i==8) {
          cellText = row[i]==null?document.createTextNode(""):document.createTextNode(row[i].toLocaleString("en-US",{maximumFractionDigits: 0}));
        }
        tblCell.appendChild(cellText);
        tblRow.appendChild(tblCell);
      }
      tblBody.appendChild(tblRow);
    }

  }
}

function tableSearch() {
  let searchTxt = document.getElementById('searchInput').value;
  let table = document.getElementById('excel-table')
  const tblBody = table.querySelector("tbody");
  // Recorremos las filas
  for (let i = 0; i < tblBody.children.length; i++) {
    let keepRow = false;
    const row = tblBody.children[i];
    //Recorremos los datos de cada fila
    for (let j = 0; j < row.children.length; j++) {
      const data = row.children[j].innerHTML;
      if (data.toLowerCase().includes(searchTxt.toLowerCase())) {
        keepRow = true;
        break;
      }
    }
    if (keepRow == false) {
      row.style.display = "none";
    }
    else {
      row.style.display = "table-row";
    }
  }
}


function checkboxUpdate(event){
  const btn = event.target;
  const div = btn.parentElement;
  const ul = div.children[1];

  let table = document.getElementById('excel-table')
  const tblHead = table.querySelector("thead")
  const tblBody = table.querySelector("tbody");


  //Loop en las filas
  for (let j = 0; j < tblHead.children.length; j++) {
    
    let visibleDataList = [];
    //Se crea la columna con los datos
    for (let k = 0; k < tblBody.children.length; k++) {
      const row = tblBody.children[k];
      const data = row.children[j].innerHTML;
      if (!(row.style.display=="none")) {
        visibleDataList.push(data);
      }
    }

    // Loop en el dropdown para identificar checkboxes
    for (let i = 0; i < tblHead.children[j].children[0].children[1].children.length; i++) {

      let chbx = tblHead.children[j].children[0].children[1].children[i].children[0].checked;
      let label = tblHead.children[j].children[0].children[1].children[i].children[1].innerHTML;
      // if (chbx == true && !visibleDataList.includes(label) && btn.ariaExpanded == "true") {
      //   tblHead.children[j].children[0].children[1].children[i].children[0].checked=false;
      //   chbx=false;
      // }

      const button=tblHead.children[j].children[0].children[0];
      //if (!visibleDataList.includes(label) && !button.classList.value.includes("dropdown-filtered")) {
      if (visibleDataList.includes(label)) {
        tblHead.children[j].children[0].children[1].children[i].style.display="block";
      }
      
      if (chbx == true && !visibleDataList.includes(label)) {
        //tblHead.children[j].children[0].children[1].children[i].children[0].checked=false;
        if (!button.classList.value.includes("dropdown-filtered")) {
          tblHead.children[j].children[0].children[1].children[i].style.display="none";
        }
        
      }
      else if(!chbx && visibleDataList.includes(label)){
        //tblHead.children[j].children[0].children[1].children[i].children[0].checked=true;
        if (!button.classList.value.includes("dropdown-filtered")) {
          tblHead.children[j].children[0].children[1].children[i].style.display="block";
        }
      }
      
    }
  }
}


function tableFilter(event) {
  
  

  const btn = event.target;
  const div = btn.parentElement;
  const th = div.parentElement;
  const ul = div.children[1];

  if (btn.ariaExpanded == "true") {
    return;
  }
  // if (btn.ariaExpanded == "true") {
  //   return;
  // }
  // const input = event.target;
  // const ul = input.parentElement;
  // if (ul.classList.value.includes("show")) {
  //   return;
  // }

  let table = document.getElementById('excel-table')
  const tblHead = table.querySelector("thead")
  const tblBody = table.querySelector("tbody");
 
  
  let j=getChildIndex(th)-3;

 
  //Loop en las filas
    //for (let j = 0; j < tblHead.children.length; j++) {


      let cbxListOn = [];
      let cbxListOff = [];
      let lbListOn = [];
      let lbListOff = [];

      const button=tblHead.children[j].children[0].children[0];
      let IsButtonfiltered=button.childElementCount==1;
      button.classList.remove("dropdown-filtered");
      if (!button.classList.value.includes("dropdown-toggle")) {
        button.classList.add("dropdown-toggle");
      }
      if (IsButtonfiltered) {
        button.removeChild(button.lastChild);
      }
      

      // Loop en el dropdown para identificar checkboxes
      for (let i = 0; i < tblHead.children[j].children[0].children[1].children.length; i++) {
        
        // const row = tblBody.children[i];
        // if (!(row.style.display == "") || row.style.display == "none") {
        //   continue;
        // }
        const dropItem=tblHead.children[j].children[0].children[1].children[i];
        if ( dropItem.style.display == "none") {
          continue;
        }
        let chbx = tblHead.children[j].children[0].children[1].children[i].children[0].checked;
        let label = tblHead.children[j].children[0].children[1].children[i].children[1].innerHTML;

        if (chbx == true) {
          cbxListOn.push(tblHead.children[j].children[0].children[1].children[i].children[0].checked);
          lbListOn.push(tblHead.children[j].children[0].children[1].children[i].children[1].innerHTML);
        }
        else{
          lbListOff.push(tblHead.children[j].children[0].children[1].children[i].children[1].innerHTML);
          cbxListOff.push(tblHead.children[j].children[0].children[1].children[i].children[0].checked);
        }
      }
      
      for (let i = 0; i < tblBody.children.length; i++) {
        let IsRowHidden=false;
        const row = tblBody.children[i];
        //Para la primera columna prendemos todas las filas
        //if (j==0) {
          row.style.display = "table-row";
        //}
  
        if (!(row.style.display == "") && !(row.style.display == "table-row")|| row.style.display == "none") {
          IsRowHidden=true;
          continue;
        }
        let displayRow = true;
        const data = row.children[j].innerHTML;
        if (data == "null") {
          continue;
        }
        if (!lbListOn.includes(data)) {
          displayRow = false;
          const icon = document.createElement("i");
          icon.setAttribute("class", "bi bi-funnel-fill");
          button.style.display="inline-block"
          // button.getAttribute("class","dropdown-toggle")
          // button.classList.toggle("")
          //button.classList.getElementsByClassName("dropdown-toggle").style.visibility = "hidden";
          //button.getAttribute("class","dropdown-toggle").style.display="none";
          // tog.after(icon);
          if(button.lastChild.nodeName=="#text"){
            button.appendChild(icon);
          }
          button.classList.remove("dropdown-toggle");
          button.classList.add("dropdown-filtered")
          row.style.display = "none";
        }
        // else if (!IsRowHidden){
        //   displayRow = true;
        //   row.style.display = "table-row";
        // }
      }

      checkboxUpdate(event);


  //}

  
  
}

function getChildIndex(node) {
  return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}

function navBarChange(e) {
  const NavBarMobile = document.getElementById('navBarMobile')
  const NavBarDesktop = document.getElementById('navBarMobile')

  const btn = e.target;

  if (condition) {
    
  }
}
//   console.log(window.location.href.split("/").pop());

//   window.location.href.trimEnd(window.location.href.split("/").pop())

//Cerrar Sesión
document.getElementById('CerrarSesionMobile').addEventListener('click',cerrarSesion)
document.getElementById('CerrarSesionDesktop').addEventListener('click',cerrarSesion)

function cerrarSesion(){
  sessionStorage.removeItem('sessionUser')
  window.location.reload();
}