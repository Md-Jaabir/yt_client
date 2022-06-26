let blog_cont=document.querySelector(".blogs");
showLoadingScreen();
fetch("https://youtubechannelbackend.herokuapp.com/user/blog_posts")
.then(res=>res.json())
.then(blogs=>{
  appendBlogs(blogs);
  hideLoadingScreen();
})
.catch(()=>{
  toast("Network problem");
  hideLoadingScreen();
});

function appendBlogs(blogs){
  blogs.forEach(blog=>{
    blog_cont.innerHTML+=`<div class="blog my-16 px-10 w-ful flex flex-col justify-center">
        <img class="h-44 x:h-52 sm:h-60 md:h-44" src="${blog.coverImageUrl}" alt="" class="blogCover">
        <h2 class="title text-xl font-['Poppins'] font-bold mt-5">${blog.title}</h2>
        <p class="mt-3">${blog.content.substr(0,40)}<span>...</span></p>
        <button onclick="redirect('https://youtubechannelfrontend.ibnchowdhury.repl.co/blog.html?id=${blog._id}')" class="read-more flex items-center justify-center bg-[#ff1f78] mt-8 py-2 text-white rounded-md border border-[#ff1f78] hover:bg-transparent hover:text-black">Read more &#8594</button>
      </div>`;
  })
}