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

/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()


class Excel {
  constructor(content) {
    this.content = content;
  }

  type() {
    return this.content[0];
  }

  header() {
    return this.content[1];
  }

  rows() {
    return new RowCollection(this.content.slice(2, this.content.length));
  }

}

class RowCollection {
  constructor(rows) {
    this.rows = rows;
  }

  first() {
    return new Row(this.rows[0]);
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

  name() {
    return this.row[0];
  }
  get() {
    return this.row;
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
  // console.log(excel.header());
  // console.log(excel.type());
  // console.log(excel.rows().first());
  // console.log(excel.rows().get());
  // console.log(excel.rows().count());
})

// Leer excel desde ruta en archivos 
// Blob.
fetch(excelInput.src)
  .then(response => response.blob())
  .then(blob => readXlsxFile(blob))
  .then((rows) => {
    console.log(rows);
    const content = rows;
    const excel = new Excel(content)
    ExcelPrinter.print("excel-table", excel);
  })


class ExcelPrinter {
  static print(TableId, excel) {
    const table = document.getElementById(TableId)
    let j = 0;

    for (let j = 0; j < 9; j++) {
      const title = excel.header()[j];

      const div = document.createElement("div");
      div.setAttribute("class", "dropdown");
      //div.setAttribute("onclick", "e.stopPropagation()");

      const btn = document.createElement("button");
      btn.setAttribute("class", "btn btn-dark dropdown-toggle");
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
        let data = excel.rows().get(i)[j];
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
        const cellText = row[i]==null?document.createTextNode(""):document.createTextNode(row[i]);

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
      if (data.toLowerCase().includes(searchTxt)) {
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

    // Loop en el dropdown para identificar checkboxes
    for (let i = 0; i < tblHead.children[j].children[0].children[1].children.length; i++) {

      //Se crea la columna con los datos
      for (let i = 0; i < tblBody.children.length; i++) {
        const row = tblBody.children[i];
        const data = row.children[j].innerHTML;
        if (!(row.style.display=="none")) {
          visibleDataList.push(data);
        }
      }

      let chbx = tblHead.children[j].children[0].children[1].children[i].children[0].checked;
      let label = tblHead.children[j].children[0].children[1].children[i].children[1].innerHTML;
      // if (chbx == true && !visibleDataList.includes(label) && btn.ariaExpanded == "true") {
      //   tblHead.children[j].children[0].children[1].children[i].children[0].checked=false;
      //   chbx=false;
      // }
      const button=tblHead.children[j].children[0].children[0];
      if (!visibleDataList.includes(label) && !button.classList.value.includes("dropdown-filtered")) {
        tblHead.children[j].children[0].children[1].children[i].style.display="none";
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
    for (let j = 0; j < tblHead.children.length; j++) {
      let cbxList = [];
      let lbList = [];
      let visibleDataList = [];


      // Loop en el dropdown para identificar checkboxes
      for (let i = 0; i < tblHead.children[j].children[0].children[1].children.length; i++) {

        //Se crea la columna con los datos
        // for (let i = 0; i < tblBody.children.length; i++) {
        //   const row = tblBody.children[i];
        //   const data = row.children[j].innerHTML;
        //   if (!(row.style.display=="none")) {
        //     visibleDataList.push(data);
        //   }
        // }

        let chbx = tblHead.children[j].children[0].children[1].children[i].children[0].checked;
        let label = tblHead.children[j].children[0].children[1].children[i].children[1].innerHTML;
        // if (chbx == true && !visibleDataList.includes(label) && btn.ariaExpanded == "true") {
        //   tblHead.children[j].children[0].children[1].children[i].children[0].checked=false;
        //   chbx=false;
        // }
        
        if (chbx == true) {
          cbxList.push(tblHead.children[j].children[0].children[1].children[i].children[0].checked);
          lbList.push(tblHead.children[j].children[0].children[1].children[i].children[1].innerHTML);
        }
      }
      
      for (let i = 0; i < tblBody.children.length; i++) {

        const row = tblBody.children[i];
        let displayRow = true;
        const data = row.children[j].innerHTML;
        if (data == "null") {
          continue;
        }
        if (!lbList.includes(data)) {
          displayRow = false;
          btn.classList.add("dropdown-filtered")
          row.style.display = "none";
        }
        // else {
        //   displayRow = true;
        //   row.style.display = "table-row";
        // }
      }


  }

  checkboxUpdate(event);
  
}

function getChildIndex(node) {
  return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}


//   console.log(window.location.href.split("/").pop());

//   window.location.href.trimEnd(window.location.href.split("/").pop())