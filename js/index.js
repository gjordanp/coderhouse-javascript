
//document.getElementById("form_submit").onclick = function() {formSubmit()};
let email;
let pass;
let emailR;
let passR;

let usuarios=[new usuario('admin','admin@btd.cl','admin')];
//localStorage.getItem('usuarios')

let loginSuccess;
const delay = ms => new Promise(res => setTimeout(res, ms));

//Esconder mensaje
document.getElementById("floatingMessage").style.display = "none";
document.getElementById("checkIconMessage").style.display="none";
//Buscamos el click
//document.getElementById("form_submit").addEventListener("click", formSubmit);

//Eventos
const signInForm=document.getElementById("signInForm")
signInForm.addEventListener('submit',formSubmit);
const registerForm = document.getElementById("modalSigninForm");
registerForm.addEventListener('submit',modalSubmit);


//Submit Registro
async function modalSubmit(e){
    e.preventDefault();
    const regName=document.getElementById("modalName").value;
    const regEmail=document.getElementById("modalEmail").value;
    const regPass=document.getElementById("modalPassword").value;

    if (regName!='') {
        //Hash del Password con Argon2
        let encpass;
        await argon2.hash({
            pass: regPass,
            salt: 'CubicaSalt',
        })
        .then(res => {
            usuarios.push(new usuario(regName,regEmail,res.encoded))
            encpass=res.encoded;
            localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
        })
        .catch(err => {
            err.message // error message as string, if available
            err.code // numeric error code
        })
        console.log(encpass);
        document.getElementById("checkIconMessage").style.display="block";
        await delay(1000);
        document.getElementById("modalSignin").querySelector('button').click();
        document.getElementById("checkIconMessage").style.display="none";
    }

}

function validarCampos(regName,regEmail,regPass){

}

async function argonHash(pass){
    let enc;
    await argon2.hash({
        pass: pass,
        salt: 'CubicaSalt',
    })
    .then(res => {
        enc=res.encoded;
    })
    .catch(err => {
        err.message // error message as string, if available
        err.code // numeric error code
    })
    return enc;
}
//
async function argonVerify(pass, encoded){
    await argon2.verify({ pass:pass , encoded: encoded })
    .then(() => {return true})
    .catch(e => {
        console.error(e.message, e.code);
        return false;
    })

}

async function argonVerifyPassword(password, encoded) {
    return await argon2.verify({ pass:password , encoded: encoded });
}

async function formSubmit(e) 
{
    e.preventDefault();
    email=document.getElementById("floatingInput").value;
    pass= document.getElementById("floatingPassword").value;
    
    let usuarios = JSON.parse(localStorage.getItem("Usuario1"));

    if (email==usuario1.user) {
        // await argon2.verify({ pass:pass , encoded: usuario1.pass })
        // .then((verify) => loginSuccess = true)
        // .catch(e => console.error(e.message, e.code))
        if (argonVerifyPassword(pass, usuario1.pass)) {
            console.log('OK');
        }
        else{
            console.log('error');
        }

    }

    // //Revisamos coincidencia de usuario y password
    // for (let i = 0; i < usuarios.length; i++) {
    //     const usuario = usuarios[i];
    //     if (usuario.email==email && usuario.password==pass) {
    //         loginSuccess = true;
    //         break;
    //     }
    // }
    
    if(loginSuccess)
    {
        document.getElementById('anchor_home').click();
        return false;
    }
    else
    {
        document.getElementById("floatingMessage").innerHTML="Email y/o password no coinciden";
        document.getElementById("floatingMessage").style.color="red";
        document.getElementById("floatingMessage").style.display = "block";
        return false;
    }
}

function usuario(nombre,email,password){
    this.nombre=nombre;
    this.email=email;
    this.password=password;
    return false;
}


function registro(){
    const regex=/^([\S\d]+)@(\S+)[.](\S+.?\S+)$/;
    emailR=prompt("Ingresa tu Email")
    while(!emailR.includes('@') || !emailR.includes('.')){
        alert("Revísa el formato del Email ejemplo: juan@mail.cl")
        emailR=prompt("Ingresa tu Email")
    }

    passR=prompt("Ingresa tu Password (8 caracteres)")
    while(passR.length<8){
        alert("Password debe contener un minimo de 8 caracteres")
        passR=prompt("Ingresa tu Password (8 caracteres)")
    }

    // Password Hash
    argon2.hash({
        // required
        pass: passR,
        salt: 'Somesomesalt',
    })
    .then(res => {
      res.hash ;  // hash as Uint8Array
      res.hashHex; // hash as hex-string
      res.encoded;// encoded hash, as required by argon2
      localStorage.setItem("Usuario1", JSON.stringify({user:emailR , pass:res.encoded})); 
    })
    .catch(err => {
        err.message // error message as string, if available
        err.code // numeric error code
    })

   

    usuarios.push(new usuario(emailR,passR))
    alert("¡Registro Exitoso! ahora Inicia Sesión")
    return false;
}

async function argonEncHash(pass){
        // Password Hash
        let encoded=null;
        await argon2.hash({
            // required
            pass: pass,
            salt: 'CubicaSalt',
        })
        .then(res => {
          res.hash ;  // hash as Uint8Array
          res.hashHex; // hash as hex-string
          encoded=res.encoded;// encoded hash, as required by argon2
          //localStorage.setItem("Usuario1", JSON.stringify({user:emailR , pass:res.encoded})); 
        })
        .catch(err => {
            err.message // error message as string, if available
            err.code // numeric error code
        })
        return encoded
}





