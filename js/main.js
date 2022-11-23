//Variable
document.getElementById("form_submit").addEventListener("click", formSubmit);
//document.getElementById("form_submit").onclick = function() {formSubmit()};
let email;
let pass;
let loginSuccess;

//document.getElementById("signInForm").addEventListener('submit', formSubmit);


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
        document.getElementById("floatingMessage").innerHTML="Email y password no coinciden";
        document.getElementById("floatingMessage").style.color="red";
        document.getElementById("floatingMessage").style.display='block';
        return false;
    }
}




//   console.log(window.location.href.split("/").pop()); 

//   window.location.href.trimEnd(window.location.href.split("/").pop())