const emailRegex=/\w+@\w+\.com/;
const phoneRegex=/(\+88)?-?01\d{9}/;
const nameRegex=/\w+/;

let contactForm=document.querySelector(".contact-form");
contactForm.addEventListener("submit",(event)=>{
  showLoadingScreen();
  event.preventDefault();
  let name=document.getElementById("name").value;
  let email=document.getElementById("email").value;
  let phone=document.getElementById("phone").value;
  let desc=document.getElementById("desc").value;

  if(nameRegex.test(name)==false){
    toast("You must enter your name");
    hideLoadingScreen();
    return;
  }

  if(emailRegex.test(email)==false){
    toast("Invalid email");
    hideLoadingScreen();
    return;
  }

  if(phoneRegex.test(phone)==false){
    toast("Invalid phone number");
    hideLoadingScreen();
    return;
  }

  if(phone.length!=11){
    toast("Invalid phone number");
    hideLoadingScreen();
    return;
  }

  if(desc.length<30){
    toast("Description is too short");
    hideLoadingScreen();
    return;
  }

  let newContact=new contactInfo(name,email,phone,desc);
  newContact.saveToServer();
})