let commentForm=document.querySelector("#comment_form");
let comment_cont=document.querySelector(".comments .all");
let blogId=location.search.replace("?","").split("&")[0].split("=")[1];
let video_cont=document.querySelector(".videos");
showLoadingScreen()
fetch(`https://youtubechannelbackend.herokuapp.com/user/blog_posts?_id=${blogId}`)
.then(res=>res.json())
.then(blogs=>{
  setEverythingInPlace(blogs[0]);
  hideLoadingScreen();
})
.catch((err)=>{
  console.log(err);
  toast("Network problem");
  hideLoadingScreen();
});

function setEverythingInPlace(blog){
  document.getElementById("cover").src=blog.coverImageUrl;
  document.getElementById("heading").innerHTML=blog.title+`<span id="date" class="text-gray-300 ml-10 text-sm font-regular">${blog.date}</span>`;
  document.getElementById("content").innerHTML=blog.content;
}

commentForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  showLoadingScreen();
  let name=document.getElementById("name").value;
  let desc=document.getElementById("desc").value;
  let blogid=blogId;
  let date=new Date().toLocaleDateString();

  if(!name){
    toast("You must enter your name");
    hideLoadingScreen();
    return;
  }

  if(!blogid){
    toast("Blog id is a must");
    hideLoadingScreen();
    return;
  }

  if(!date){
    toast("Date id is a must");
    hideLoadingScreen();
    return;
  }
  
  if(desc.length<30){
    toast("Description is too short");
    hideLoadingScreen();
    return;
  }
  
  let comment=new blogComment(blogid,name,desc,date);
  comment.saveToServer();
});
showLoadingScreen();

fetch(`https://youtubechannelbackend.herokuapp.com/user/comments?blogId=${blogId}`)
.then(res=>res.json())
.then(comments=>{
  appendComments(comments);
  hideLoadingScreen();
})
.catch(err=>{
  toast('Network issue');
  hideLoadingScreen();
});

function appendComments(comments){
  comments.forEach(comment=>{
    comment_cont.innerHTML+=`<div class="comment xl:w-[819px] w-[80vw] mt-10 md:mt-16 mx-10" >
          <div class="name-items flex w-full items-center">
            <div class="first-later font-bold h-12 w-12 text-3xl text-white bg-[#ff1f78] rounded-full flex justify-center items-center"><h2 class="font-['Poppins']">${comment.name.substr(0,1).toUpperCase()}</h2></div><span class="ml-5 font-['Poppins'] font-bold text-xl">${comment.name}</span>
          </div>
          <div class="mt-3 rounded-sm p-4 bg-gray-200 font-['Poppins']">
            <span class="date text-gray-500">${comment.date}</span>
            <p class="mt-3">${comment.comment}</p>
          </div> 
        </div>`
  })
}