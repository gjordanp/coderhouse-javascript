//Variables
let loginSuccess;
let email;
let pass;
let emailR;
let passR;
let usuarios = [];

// let sessionSavedEmail=JSON.parse(sessionStorage.getItem('sessionUser'))?.email;
// let sessionSavedPass=JSON.parse(sessionStorage.getItem('sessionUser'))?.password;

// (sessionSavedEmail || false)  && (sessionSavedPass|| false) && loadSessionSavedUser();

// function loadSessionSavedUser(){
//     document.getElementById("floatingInput").value=sessionSavedEmail;
//     document.getElementById("floatingPassword").value=sessionSavedPass;
// }

//Recuperar credenciales guardadas en LocalStorage
let localSavedEmail = JSON.parse(localStorage.getItem('sessionUser'))?.email;
let localSavedPass = JSON.parse(localStorage.getItem('sessionUser'))?.password;

(localSavedEmail || false) && (localSavedPass || false) && loadLocalSavedUser();

//Completrar campos en formulario de inicio
function loadLocalSavedUser() {
    document.getElementById("floatingInput").value = localSavedEmail;
    document.getElementById("floatingPassword").value = localSavedPass;
}

//funcion delay para detener procesos
const delay = ms => new Promise(res => setTimeout(res, ms));

//Esconder mensajes
document.getElementById("floatingMessage").style.display = "none";
document.getElementById("checkIcon").style.display = "none";
document.getElementById("xIcon").style.display = "none";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
})

//Eventos
const signInForm = document.getElementById("signInForm");
signInForm.addEventListener("submit", formSubmit);
const registerForm = document.getElementById("modalSigninForm");
registerForm.addEventListener("submit", modalSubmit);

//Submit Registro de Usuarios
async function modalSubmit(e) {
    e?.preventDefault();
    const regName = document.getElementById("modalName").value;
    const regEmail = document.getElementById("modalEmail").value;
    const regPass = document.getElementById("modalPassword").value;

    if (regName != '' && regEmail != '' && regPass != '') {
        //Hash del Password con Argon2
        let encpass;
        await argon2.hash({
            pass: regPass,
            salt: 'CubicaSalt',
        })
            .then(res => {
                usuarios.push(new usuario(regName, regEmail, res.encoded))
                encpass = res.encoded;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                registerForm.querySelectorAll('input').forEach(i => i.value = "");
            })
            .catch(err => {
                err.message // error message as string, if available
                err.code // numeric error code
            })
        //console.log(encpass);

        if (encpass != null) {
            document.getElementById("checkIcon").style.display = "block";
            await delay(2000);
            document.getElementById("modalSignin").querySelector('button').click();
            document.getElementById("checkIcon").style.display = "none";
        }

    }
    else {
        document.getElementById("xIcon").style.display = "block";
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").innerHTML = "Debe completar los 3 campos";
        await delay(2000);
        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("xIcon").style.display = "none";
    }

}



//Submit Inicio de Session
async function formSubmit(e) {
    e?.preventDefault();
    email = document.getElementById("floatingInput").value;
    pass = document.getElementById("floatingPassword").value;
    recordar = document.getElementById("recordarCheckbox").checked;

    //]Guardamos los datos de inicio de session de LocalStorage o SessionStorage dependiendo si recordar esta checkeado¿
    if (recordar) {
        localStorage.removeItem('sessionUser');
        localStorage.setItem('sessionUser', JSON.stringify({ email: email, password: pass }));
    }
    else {
        sessionStorage.removeItem('sessionUser');
        sessionStorage.setItem('sessionUser', JSON.stringify({ email: email, password: pass }));
    }


    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuarios.map(e => e.email).includes(email) && pass != "") {
        let encodedPass = usuarios.find(e => e.email = email).password;
        //Funcion para verificar encoded password
        await argon2.verify({ pass: pass, encoded: encodedPass })
            .then((verify) => {
                loginSuccess = true;
                Toast.fire({
                    icon: 'success',
                    title: 'Hola ' + usuarios.find(e => e.email = email).nombre
                })
                setTimeout(() => {
                    document.getElementById('anchor_home').click();
                }, 2000);

            })
            .catch(e => {
                console.error(e.message, e.code)

            })
        if (loginSuccess !=true) {
            document.getElementById("floatingMessage").innerHTML = "Email y/o password no coinciden";
            document.getElementById("floatingMessage").style.color = "red";
            document.getElementById("floatingMessage").style.display = "block";
        }

    }
}

function usuario(nombre, email, password) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    return false;
}




