
//document.getElementById("form_submit").onclick = function() {formSubmit()};
let email;
let pass;
let emailR;
let passR;

let usuarios=[new usuario("admin@btd.cl","admin")];

let loginSuccess;

//Esconder mensaje
document.getElementById("floatingMessage").style.display = "none";
//Buscamos el click
//document.getElementById("form_submit").addEventListener("click", formSubmit);


function formSubmit() 
{
    email=document.getElementById("floatingInput").value;
    pass= document.getElementById("floatingPassword").value;

    //Revisamos coincidencia de usuario y password
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        if (usuario.email==email&&usuario.password==pass) {
            loginSuccess = true;
            break;
        }
    }
    
    if(loginSuccess)
    {
        let path=window.location.pathname;
        let page=window.location.pathname.split("/").pop()
        let pathhost=path.replace(page,"");
        let homehref=window.location.origin+pathhost+"pages/home.html";
        document.getElementById('anchor_home').click();
        return false
        
    }
    else
    {
        document.getElementById("floatingMessage").innerHTML="Email y/o password no coinciden";
        document.getElementById("floatingMessage").style.color="red";
        document.getElementById("floatingMessage").style.display = "block";
        return false;
    }
}

function usuario(email,password){
    this.email=email;
    this.password=password;
    return false;
}


function registro(){
    emailR=prompt("Ingresa tu Email")
    while(!emailR.includes("@") && !emailR.includes(".")){
        alert("Revísa el formato del Email ejemplo: juan@mail.cl")
        emailR=prompt("Ingresa tu Email")
    }

    passR=prompt("Ingresa tu Password (8 caracteres)")
    while(passR.length<8){
        alert("Password debe contener un minimo de 8 caracteres")
        passR=prompt("Ingresa tu Password (8 caracteres)")
    }

    usuarios.push(new usuario(emailR,passR))
    alert("¡Registro Exitoso! ahora Inicia Sesión")
    return false;
}






