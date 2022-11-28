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


class Excel{
  constructor(content){
      this.content=content;
  }

  type(){
      return this.content[0];
  }

  header(){
      return this.content[1];
  }

  rows(){
      return new RowCollection(this.content.slice(2,this.content.length));
  }

}

class RowCollection{
  constructor(rows){
      this.rows=rows;
  }

  first(){
      return  new Row(this.rows[0]);
  }
  get(index){
      return this.rows[index];
  }
  count(){
      return this.rows.length;
  }

}

class Row{
  constructor(row){
      this.row=row;
  }

  name(){
      return this.rows[0];
  }
  get(){
      return this.rows;
  }
  count(){
      return this.rows.length;
  }

}

// //const excelInput0 = document.createAttribute('input');
// const dataTransfer = new DataTransfer();
// dataTransfer.items.add(myFile);//your file(s) reference(s)
// document.getElementById('input_field').files = dataTransfer.files;

// File.
//const excelInput = document.getElementById('cbcExcel')
const excelInput = document.getElementById('cbcExcel')
excelInput.addEventListener('change', async function() {
  const content= await readXlsxFile(excelInput.files[0]);
  const excel=new Excel(content);
  header = excel.header();

  ExcelPrinter.print("excel-table",excel);

  console.log(excel.header());
  console.log(excel.type());
  console.log(excel.rows().first());
  console.log(excel.rows().get());
  console.log(excel.rows().count());

})

excelInput.src='./database/cubicaciones.xlsm';

class ExcelPrinter{
  static print(TableId, excel){
    const table=document.getElementById(TableId)
    let j=0;

    for (let j = 0; j < 9; j++) {
      const title=excel.header()[j];
      table.querySelector("thead>tr").innerHTML+=`<th>${title}</th>`
    }

    const tblBody=table.querySelector("tbody");
    for (let j = 0; j < excel.rows().count(); j++) {
      if (excel.rows().get(j)[0]==null) {
        break;
      } 
      const tblRow = document.createElement("tr");
      for (let i = 0; i< 9; i++) {
        const row = excel.rows().get(j);
        const tblCell=document.createElement("td");
        const cellText = document.createTextNode(row[i]);

        tblCell.appendChild(cellText);
        tblRow.appendChild(tblCell);
      }
      tblBody.appendChild(tblRow);
    }

  }
}


//   console.log(window.location.href.split("/").pop()); 

//   window.location.href.trimEnd(window.location.href.split("/").pop())