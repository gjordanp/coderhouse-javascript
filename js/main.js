
//document.getElementById("form_submit").onclick = function() {formSubmit()};
let email;
let pass;
let loginSuccess;

//Esconder mensaje
document.getElementById("floatingMessage").style.display = "none";
//Buscamos el click
document.getElementById("form_submit").addEventListener("click", formSubmit);


function formSubmit() 
{
    email=document.getElementById("floatingInput").value;
    pass= document.getElementById("floatingPassword").value;
    if(email=="admin@btd.cl" && pass=="admin")
    {
        loginSuccess = true;
        if(loginSuccess){
            let path=window.location.pathname;
            let page=window.location.pathname.split("/").pop()
            let pathhost=path.replace(page,"");
            let homehref=window.location.origin+pathhost+"pages/home.html";
            document.getElementById('anchor_home').click();
            return false
        }
    }
    else
    {
        document.getElementById("floatingMessage").innerHTML="Email y/o password no coinciden";
        document.getElementById("floatingMessage").style.color="red";
        document.getElementById("floatingMessage").style.display = "block";
        return false;
    }
}






