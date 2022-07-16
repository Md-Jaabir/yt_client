class contactInfo{
  constructor(name,email,phone,description){
    this.name=name;
    this.phone=phone;
    this.email=email;
    this.description=description;
  }
  saveToServer(){
      this.infoObj={
        name:this.name,
        email:this.email,
        phone:this.phone,
        description:this.description
      }
      fetch("https://youtubechannelbackend.herokuapp.com/user/contact", {
        method: "POST",
        body: JSON.stringify(this.infoObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => {
       location.href="./success.html?msg=Your form has successfully submitted and datas are successfully sent to the author of the channel&backpath=./index.html";  
      // hideLoadingScreen();
    })
    .catch(err=>{
      location.href="./error.html?msg=Your form hasn't  submitted because of some network issue.Pleae check your internet connection first.&backpath=./index.html";  
      // hideLoadingScreen();
    })
  }
}

class review{
  constructor(stars,name,description,email){
    this.stars=stars;
    this.name=name;
    this.description=description;
    this.email=email;
  }
  saveToServer(){
      this.infoObj={
        name:this.name,
        stars:this.stars,
        description:this.description,
        email:this.email
      }
      fetch("https://youtubechannelbackend.herokuapp.com/user/publish_riview", {
        method: "POST",
        body: JSON.stringify(this.infoObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json =>{
      location.reload();
    })
    .catch(()=>{
      toast("Network issue");
    })
  }
}

class blogComment{
  constructor(blogId,name,comment,date){
    this.name=name;
    this.blogId=blogId;
    this.date=date;
    this.comment=comment;
  }
  saveToServer(){
      this.infoObj={
        name:this.name,
        blogId:this.blogId,
        comment:this.comment,
        date:this.date
      }
      fetch("https://youtubechannelbackend.herokuapp.com/user/publish_comment", {
        method: "POST",
        body: JSON.stringify(this.infoObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then((data)=>{
      location.reload();
      console.log(data);
    })
    .catch(()=>{
      toast("Network issue");
    })
  }
}

function showLoadingScreen(){
  document.querySelector("html").style.overflow="hidden";
  document.querySelector(".loadingScreen").classList.remove("hidden");
}

function hideLoadingScreen(){
  document.querySelector("html").style.overflow="auto";
  document.querySelector(".loadingScreen").classList.add("hidden");
}

function toast(text){
  document.querySelector(".toast").style.display="flex";
  document.querySelector(".toast").style.opacity="1";
  document.querySelector(".toast").innerHTML=text;
  setTimeout(()=>{
    document.querySelector(".toast").style.opacity="0";
    setTimeout(()=>{
      document.querySelector(".toast").style.display="none";
    },1100)
  },2000)
}

function searchToObj(){
  let key,value;
  let searchObj={}
  let searchStr=location.search.trim().replace("?","").replaceAll("%20"," ");
  searchArr=searchStr.split("&");
  searchArr.forEach(element=>{
    key=element.trim().split("=")[0].trim();
    value=element.trim().split("=")[1].trim();
    searchObj[key]=value;
  });
  return searchObj;
}