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
let bootstrapDark= 'rgb(38, 45, 54, 1)';
let donutBordeColor='rgba(180,180,180,0)';

const ctx = document.getElementById('myChart1');
let gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0,60,100,0.5)');   
gradient.addColorStop(1, 'rgba(0,60,100,0.1)');


  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Muros', 'Perimetral', 'Vigas', 'Losas', 'Escalera'],
      datasets: [{
        label: 'Kg de Acero',
        data: [12, 19, 3, 5, 2, 3],
        borderColor:'rgba(0,100,180,1)',
        backgroundColor: gradient,
        borderWidth: 1
        
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  
  const ctx2 = document.getElementById('myChart2');

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderColor:'rgba(0,100,180,1)',
        borderWidth: 1

      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const ctx3 = document.getElementById('myChart3');
  const ctx4 = document.getElementById('myChart4');
  const ctx5 = document.getElementById('myChart5');
  const ctx6 = document.getElementById('myChart6');


  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      borderColor:bootstrapDark,
      borderWidth: 5,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const data2 = {
    labels: [
      'Armadura',
      'Punta',
      'Confinamiento'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      borderColor:bootstrapDark,
      borderWidth: 5,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  new Chart(ctx3, {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false
      }
      
  });

  new Chart(ctx4, {
    type: 'doughnut',
    data: data2,
    options: {
        responsive: true,
        maintainAspectRatio: false
      }
      
  });

  new Chart(ctx5, {
    type: 'doughnut',
    data: data2,
    options: {
        responsive: true,
        maintainAspectRatio: false
      }
      
  });

  new Chart(ctx6, {
    type: 'doughnut',
    data: data2,
    options: {
        responsive: true,
        maintainAspectRatio: false
      }
      
  });


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
    console.log(rows);
    const content = rows;
    const excel = new Excel(content)
    
    for (let i = 0; i < excel.rows().count(); i++) {
      if (excel.rows().get(i)[0]!=null) {
        Proyectos.push(new Proyecto(excel.rows().get(i),excel.header()))
      }
    }
    proyectListLoad();
  })




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