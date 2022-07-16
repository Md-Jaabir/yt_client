document.querySelector(".links").classList.add("hidden");

function openLinks(){
  document.querySelector(".links").classList.remove("hidden");
  setTimeout(()=>{
    document.querySelector(".links").style.right="0";
    document.querySelector("html").style.overflow="hidden";
  },10);
}


function closeLinks(){
  document.querySelector(".links").style.right="-190px";
  setTimeout(()=>{
    document.querySelector(".links").classList.add("hidden");
    document.querySelector("html").style.overflow="auto";
  },300)  
}

function fillStar(Id){
  let intId=parseInt(Id);
  if(document.getElementById(`${Id}`).innerHTML=="grade"){
    for(let i=0;i<=intId;i++){
      document.getElementById(`${i}`).innerHTML="star";
    }
  }else{
    for(let j=4;j>=intId;j--){
      document.getElementById(`${j}`).innerHTML="grade";
    }
  }
}

function redirect(url){
  location.href=url;
}

