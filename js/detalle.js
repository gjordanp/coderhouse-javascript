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
let bootstrapDark = 'rgb(38, 45, 54, 1)';
let donutBordeColor = 'rgba(180,180,180,0)';

//DOM div para chart
const ctx1 = document.getElementById('myChart1');
const ctx2 = document.getElementById('myChart2');
const ctx3 = document.getElementById('myChart3');
const ctx4 = document.getElementById('myChart4');

let gradient = ctx1.getContext("2d").createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0,60,100,0.5)');
gradient.addColorStop(1, 'rgba(0,60,100,0.1)');

let labeldefault = ['Escalera', 'Fund', 'Perimetral', 'Vigas', 'Losas', 'Muros'];
let datadefault = [4, 8, 12, 20, 28, 30];
let numberFormat = Intl.NumberFormat('en-US',{maximumFractionDigits: 0});

//ChartAceroBarras
const dataSteelBar = {
  labels: labeldefault,
  datasets: [{
    label: 'Acero',
    data: datadefault,
    borderColor: 'rgba(0,100,180,1)',
    backgroundColor: gradient,
    borderWidth: 1
  }]

};

const chartSteelBar = new Chart(ctx1, {
  type: 'bar',
  data: dataSteelBar,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'KG',
          color: 'white',
          font: {
            // family: 'Comic Sans MS',
            size: 12,
            weight: 'bold',
            lineHeight: 1,
          },
        },
        beginAtZero: true,
        ticks: {
          color: 'white'
        }
      },
      x: {
        ticks: {
          color: 'white'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        font: { weight: 'bold', size: '20' },
        text: 'Acero',
        color: 'white'
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) =>{
            return  numberFormat.format(context.parsed["y"])+ ' Kg';
          }
        }
      }
    }
  }
});

//Chart Acero Donut
const dataSteelDonut = {
  labels: labeldefault,
  datasets: [{
    label: 'Acero',
    data: datadefault,
    borderColor: bootstrapDark,
    borderWidth: 4,
    backgroundColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(201, 203, 207, 1)'
    ],
    // offset:5,
    // spacing:5,
    weight: 0.8,
    hoverOffset: 20,

  }]
};

const chartSteelDonut = new Chart(ctx2, {
  type: 'doughnut',
  data: dataSteelDonut,
  options: {
    responsive: true,
    // cutout:50,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        font: { weight: 'bold', size: '20' },
        text: 'Acero',
        color: 'white'
        // padding: {
        //   top: 10,
        //   bottom: 30
        // }
      },
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: 'white',
          font: { weight: 'normal' },
        }
      },
      tooltip: {
        callbacks: {
          label: (context) =>{
            return  context.parsed+ '%';
          }
        }
      }
    }
  }

});


//ChartAceroBarras
const dataHormigonBar = {
  labels: labeldefault,
  datasets: [{
    label: 'Hormigon',
    data: datadefault,
    borderColor: 'rgba(0,100,180,1)',
    backgroundColor: gradient,
    borderWidth: 1
  }]

};

const chartHormigonBar = new Chart(ctx3, {
  type: 'bar',
  data: dataHormigonBar,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'M3',
          color: 'white',
          font: {
            // family: 'Comic Sans MS',
            size: 12,
            weight: 'bold',
            lineHeight: 1,
          },
        },
        beginAtZero: true,
        ticks: {
          color: 'white'
        }
      },
      x: {
        ticks: {
          color: 'white'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        font: { weight: 'bold', size: '20' },
        text: 'Hormigon',
        color: 'white'
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) =>{
            return  numberFormat.format(context.parsed["y"])+ ' M3';
          }
        }
      }
    }
  }
});

//Chart Acero Donut
const dataHormigonDonut = {
  labels: labeldefault,
  datasets: [{
    label: 'Hormigon',
    data: datadefault,
    borderColor: bootstrapDark,
    borderWidth: 4,
    backgroundColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(201, 203, 207, 1)'
    ],
    // offset:5,
    // spacing:5,
    weight: 0.8,
    hoverOffset: 20,

  }]
};

const chartHormigonDonut = new Chart(ctx4, {
  type: 'doughnut',
  data: dataHormigonDonut,
  options: {
    responsive: true,
    // cutout:50,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        font: { weight: 'bold', size: '20' },
        text: 'Hormigon',
        color: 'white'
        // padding: {
        //   top: 10,
        //   bottom: 30
        // }
      },
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: 'white',
          font: { weight: 'normal' },
        }
      },
      tooltip: {
        callbacks: {
          label: (context) =>{
            return  context.parsed+ '%';
          }
        }
      }
    }
  }

});






//Variables
const Proyectos = [];
const ProyectosHA = [];
const ProyectosFE = [];
/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()



class Proyecto {
  constructor(row, header) {
    header.forEach(el => {
      let index = header.indexOf(el);
      this[el] = row[index];
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
  .then(blob => readXlsxFile(blob, { sheet: 1 }))
  .then((rows) => {
    const content = rows;
    const excel = new Excel(content)

    for (let i = 0; i < excel.rows().count(); i++) {
      if (excel.rows().get(i)[0] != null) {
        Proyectos.push(new Proyecto(excel.rows().get(i), excel.header()))
      }
    }
    proyectListLoad();
  })

//Leemoe Datos de Hormigon
fetch(excelInput.src)
  .then(response => response.blob())
  .then(blob => readXlsxFile(blob, { sheet: 2 }))
  .then((rows) => {
    const content = rows;
    const excel = new Excel(content)

    for (let i = 0; i < excel.rows().count(); i++) {
      if (excel.rows().get(i)[0] != null) {
        ProyectosHA.push(new Proyecto(excel.rows().get(i), excel.header()))
      }
    }
  })

//Leemoe Datos de Acero
fetch(excelInput.src)
  .then(response => response.blob())
  .then(blob => readXlsxFile(blob, { sheet: 3 }))
  .then((rows) => {
    const content = rows;
    const excel = new Excel(content)

    for (let i = 0; i < excel.rows().count(); i++) {
      if (excel.rows().get(i)[0] != null) {
        ProyectosFE.push(new Proyecto(excel.rows().get(i), excel.header()))
      }
    }
  })



//Carga los proyectos en la lista
function proyectListLoad() {
  const proyectSelector = document.getElementById("proyectselector")
  proyectSelector.addEventListener('change', proyectSelectorChange)

  Proyectos.sort((a, b) => a.Codigo - b.Codigo);
  Proyectos.forEach(proyecto => {
    const op = document.createElement('option');
    op.value = proyecto.Codigo;
    op.innerHTML = proyecto.Codigo + " - " + proyecto.Proyecto;
    proyectSelector.appendChild(op);
  });
}


function proyectSelectorChange() {
  const proyectSelector = document.getElementById("proyectselector");
  const selectedProyectSteel = ProyectosFE.find(e => e.Codigo == proyectSelector.value);
  const selectedProyectHormigon = ProyectosHA.find(e => e.Codigo == proyectSelector.value);
  // const ceroDecimal = { maximumFractionDigits: 0 };
  // const dosDecimal = { maximumFractionDigits: 2 };

  updateSteelCharts(selectedProyectSteel);
  updateHormigonCharts(selectedProyectHormigon);

}


function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

//Funcion para actualizar Graficos de Acero
function updateSteelCharts(selectedProyect){
  console.table(selectedProyect);

  const labeldata = [];
  for (const key in selectedProyect) {
    if (key.slice(-2) == "kg" && selectedProyect[key] > 0 && !key.includes('Total')) {
      labeldata.push({key:key.slice(0, -3), value:selectedProyect[key]});
    }
  }
  //ordenamos de menor a mayor
  labeldata.sort((a, b) => a.value- b.value)

  const labelsValue=labeldata.map(e=>e.value);
  const labelsKey=labeldata.map(e=>e.key);

  dataSteelBar.labels = labelsKey;
  dataSteelBar.datasets[0].data = labelsValue;
  chartSteelBar.update();

  const labeldatapercent = labelsValue.map(el => Math.round(el / labelsValue.reduce((a, b) => a + b) * 100 * 10) / 10);
  dataSteelDonut.labels = labelsKey;
  dataSteelDonut.datasets[0].data = labeldatapercent;
  chartSteelDonut.update();
}

//Funcion para actualizar Graficos de Hormigon
function updateHormigonCharts(selectedProyect){
  //console.table(selectedProyect);

  const labeldata = [];
  for (const key in selectedProyect) {
    if (key.slice(-2) == "m3" && selectedProyect[key] > 0 && !key.includes('Total') && !key.includes('Muros Int') && !key.includes('Perimetrales')) {
      labeldata.push({key:key.slice(0, -3), value:selectedProyect[key]});
    }
  }
  //ordenamos de menor a mayor
  labeldata.sort((a, b) => a.value- b.value)

  const labelsValue=labeldata.map(e=>e.value);
  const labelsKey=labeldata.map(e=>e.key);

  dataHormigonBar.labels = labelsKey;
  dataHormigonBar.datasets[0].data = labelsValue;
  chartHormigonBar.update();


  const labeldatapercent = labelsValue.map(el => Math.round(el / labelsValue.reduce((a, b) => a + b) * 100 * 10) / 10);
  dataHormigonDonut.labels = labelsKey
  dataHormigonDonut.datasets[0].data = labeldatapercent;
  chartHormigonDonut.update();
}

//Cerrar Sesión
document.getElementById('CerrarSesionMobile').addEventListener('click',cerrarSesion)
document.getElementById('CerrarSesionDesktop').addEventListener('click',cerrarSesion)

function cerrarSesion(){
  sessionStorage.removeItem('sessionUser')
  window.location.reload();
}