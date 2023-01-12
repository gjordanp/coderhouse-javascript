//Start Verificar session--------------------------------------------------------------------------------
//buscamos credenciales desde SessionStorage
let sessionSavedEmail=JSON.parse(sessionStorage.getItem('sessionUser'))?.email;
let sessionSavedPass=JSON.parse(sessionStorage.getItem('sessionUser'))?.password;

verifySession();

//Submit Inicio de Session
async function verifySession(e) 
{
    e?.preventDefault();
    let loginSuccess=false;
    //Obtenemos lista de usuarios de base de datos
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    //Verificamos usuario
    if (usuarios.map(e=>e.email).includes(sessionSavedEmail) && pass!="") {
        let encodedPass= usuarios.find(e=>e.email=email).password;
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
const ctx5 = document.getElementById('myChart5');
const ctx6 = document.getElementById('myChart6');

let gradient = ctx1.getContext("2d").createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0,60,100,0.5)');
gradient.addColorStop(1, 'rgba(0,60,100,0.1)');

let labeldefault = ['Escalera', 'Fund', 'Perimetral', 'Vigas', 'Losas', 'Muros'];
let datadefault = [4, 8, 12, 20, 28, 30];


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

const chartSteelDonut = new Chart(ctx3, {
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




const chart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgba(0,100,180,1)',
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






let data2 = {
  labels: [
    'Armadura',
    'Punta',
    'Confinamiento'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    borderColor: bootstrapDark,
    borderWidth: 5,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};





const chart4 = new Chart(ctx4, {
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
  const selectedProyect = ProyectosFE.find(e => e.Codigo == proyectSelector.value);
  const ceroDecimal = { maximumFractionDigits: 0 };
  const dosDecimal = { maximumFractionDigits: 2 };

  console.table(selectedProyect);
  const labels = [];
  const labeldata = [];
  for (const key in selectedProyect) {
    if (key.slice(-2) == "kg" && selectedProyect[key] > 0 && !key.includes('Total')) {
      labeldata.push(Math.round(selectedProyect[key]));
    }
  }
  labeldata.sort((a, b) => a - b)
  labeldata.forEach(e => {
    for (const key in selectedProyect) {
      if (Math.round(selectedProyect[key]) == e) {
        labels.push(key.slice(0, -3));
      }
    }
  })

  dataSteelBar.labels = labels;
  dataSteelBar.datasets[0].data = labeldata;
  chartSteelBar.update();


  const labeldatapercent = labeldata.map(el => Math.round(el / labeldata.reduce((a, b) => a + b) * 100 * 10) / 10);
  dataSteelDonut.labels = labels;
  dataSteelDonut.datasets[0].data = labeldatapercent;
  chartSteelDonut.update();

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