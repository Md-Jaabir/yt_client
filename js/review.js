let reviewForm=document.querySelector(".review-form");
let review_cont=document.querySelector(".reviews .all");
const emailRegex=/\w+@\w+\.com/;
reviewForm.addEventListener("submit",(event)=>{
  showLoadingScreen();
  event.preventDefault();
  let name=document.getElementById("name").value;
  let desc=document.getElementById("desc").value;
  let email=document.getElementById("email").value;
  let stars=document.querySelectorAll(".stars");
  let starsCount=0;
  stars.forEach(star=>{
    if(star.innerHTML=="star"){
      starsCount++;
    }
  })

  if(emailRegex.test(email==false)){
    toast("Invalid email");
    hideLoadingScreen();
    return;
  }
  if(!name){
    toast("You must enter your name");
    hideLoadingScreen();
    return;
  }

  if(starsCount<1){
    toast("You have to put at least 1 star");
    hideLoadingScreen();
    return;
  }

  if(desc.length<30){
    toast("Description is too short");
    hideLoadingScreen();
    return;
  }
  
  let newReview=new review(`${starsCount}`,name,desc,email);
  newReview.saveToServer();
});

fetch("https://youtubechannelbackend.herokuapp.com/user/riviews")
.then(res=>res.json())
.then(reviews=>{
  fetchReviews(reviews);
  hideLoadingScreen();
})
.catch(err=>{
  toast('Network issue');
  hideLoadingScreen();
});

function fetchReviews(reviews){
  review_cont.innerHTML="";
  reviews.forEach(review=>{
    review_cont.innerHTML+=`<div class="review xl:w-[819px] w-[80vw] mt-10 md:mt-16 mx-10" >
            <div class="name-items flex w-full items-center">
              <div class="first-letter cursor-pointer font-bold h-12 w-12 text-3xl text-white bg-[#ff1f78] rounded-full flex justify-center items-center" onclick=toast('${review.email}')><h2 class="font-['Poppins']">${review.name.substr(0,1).toUpperCase()}</h2></div><span class="ml-5 font-['Poppins'] font-bold text-xl">${review.name}</span>
            </div>
            <div class="mt-3 rounded-sm p-4 bg-gray-200 font-['Poppins']">
              <div class="stars flex">
                <span id="0" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=1?"star":"grade"}</span>
                <span id="1" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=2?"star":"grade"}</span>
                <span id="2" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=3?"star":"grade"}</span>
                <span id="3" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=4?"star":"grade"}</span>
                <span id="4" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=5?"star":"grade"}</span>
              </div>
              <p class="mt-3">${review.description}</p>
            </div> 
          </div>`
  })
}

window. onload=()=>{
  hideLoadingScreen();
}