let video_cont=document.querySelector(".videos");
showLoadingScreen();
fetch("https://web-production-2843.up.railway.app/user/videos")
.then(res=>res.json())
.then(videos=>{
  appendVideos(videos);
  hideLoadingScreen();
})
.catch(()=>{
  toast("Network problem");
  hideLoadingScreen();
});

function appendVideos(videos){
  videos.forEach(video=>{
    video_cont.innerHTML+=`<div class="video  px-10 w-ful flex flex-col justify-center">
        <span onclick="redirect('${video.videoUrl}')" class="hover:text-white w-fit material-symbols-outlined relative text-6xl top-[31%] left-[42%] text-[#ff1f78] cursor-pointer">play_circle</span>
        <img class="h-44 xl:h-52 sm:h-60 md:h-44" src="${video.thumbUrl}" alt="" class="blogCover">
        <h2 class="title text-xl font-['Poppins'] font-bold mt-5">${video.title}</h2>
        <button class="transition duration-300 ease-linear read-more mb-10 flex items-center justify-center bg-[#ff1f78] mt-8 py-2 text-white rounded-md border border-[#ff1f78] hover:bg-transparent hover:text-black"><a href="${video.videoUrl}" class="h-full w-full">Watch now</a></button>
      </div>`;
  })
}
