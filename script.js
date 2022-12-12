vedio = document.querySelector(".vedio");
play_pause = document.querySelector(".play");
progress = document.querySelector(".progress-bar");
span = progress.querySelector("span");
spanof = span.querySelector("span");
skipforward = document.querySelector(".forward");
skipbackward = document.querySelector(".backward");
volume_btn = document.querySelector(".volume");
volume_slider = document.querySelector(".volume_slider");
speed = document.querySelector(".speed").childNodes[0];
speedoption = document.querySelector(".speed_option");
li = speedoption.querySelectorAll("li");
pic_pic = document.querySelector(".pic_in_pic");
fullscreen = document.querySelector(".fullscreen");
time = document.querySelector(".duration")
currenttime =document.querySelector(".current_time")
progressarea = document.querySelector(".progress_area")
Hour = "00"
Minutes= "00"
Seconds = "00"
let timer
hidecontrol=()=>{
    if(vedio.paused)return
  timer = setTimeout(() => {
    document.querySelector(".vedio_header").classList.add("hide")
    document.querySelector(".vedio_control").classList.add("hide")
    console.log("hide")
  }, 3000);
  
}
hidecontrol()

document.querySelector(".container").addEventListener("mousemove",()=>{
  document.querySelector(".vedio_header").classList.remove("hide")
  document.querySelector(".vedio_control").classList.remove("hide")
  clearTimeout(timer)
  hidecontrol()
})

play_pause.click();

play_pause.click();

play_pause.click();

play_pause.click();

play_pause.click();
play_pause.click();

play_pause.addEventListener("click", () => {
  vedio.paused ? vedio.play() : vedio.pause();
  if (!vedio.paused) {
    play_pause.childNodes[0].classList.replace("fa-play", "fa-pause");
  } else {
    play_pause.childNodes[0].classList.replace("fa-pause", "fa-play");
  }
});

vedio.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let percent = 100/(duration/currentTime) ;
  progress.childNodes[0].style.width = percent + "%";
 format_time(duration)
  time.textContent =Hour+":"+Minutes+":"+Seconds
  format_time(currentTime)
  currenttime.textContent = Hour+":"+Minutes+":"+Seconds  
});
skipforward.addEventListener("click", () => {
  vedio.currentTime = vedio.currentTime + 5;
});
skipbackward.addEventListener("click", () => {
  vedio.currentTime = vedio.currentTime - 5;
});
volume_btn.addEventListener("click", () => {
  if (volume_btn.childNodes[0].classList.contains("fa-volume-high")) {
    vedio.volume = 0.0;
    volume_slider.value = 0;
    volume_btn.childNodes[0].classList.replace(
      "fa-volume-high",
      "fa-volume-xmark"
    );
  } else {
    vedio.volume = 0.5;
    volume_slider.value = 50;
    volume_btn.childNodes[0].classList.replace(
      "fa-volume-xmark",
      "fa-volume-high"
    );
  }
});

volume_slider.addEventListener("input", (e) => {
  vedio.volume = e.target.value / 100;
  if (e.target.value == 0) {
    volume_btn.childNodes[0].classList.replace(
      "fa-volume-high",
      "fa-volume-xmark"
    );
  } else {
    volume_btn.childNodes[0].classList.replace(
      "fa-volume-xmark",
      "fa-volume-high"
    );
  }
});
speed.addEventListener("click", () => {
  if (speedoption.classList.contains("show")) {
    speedoption.classList.remove("show");
  } else {
    speedoption.classList.add("show");
  }
});
document.addEventListener("click", (e) => {
  if (e.target !== speed) {
    speedoption.classList.remove("show");
  }
});

li.forEach((el) => {
  el.addEventListener("click", () => {
    vedio.playbackRate = el.dataset.s;
    for (e of li) {
      e.classList.remove("active");
    }
    el.classList.add("active");
  });
});
pic_pic.addEventListener("click", () => {
  vedio.requestPictureInPicture();
});
fullscreen.addEventListener("click", () => {
  if (document.fullscreenElement) {
    fullscreen.classList.replace("fa-compress", "fa-expand");
    console.log("low");
    document.exitFullscreen();
  } else {
    fullscreen.classList.replace("fa-expand", "fa-compress");
    document.querySelector(".container").requestFullscreen();
    console.log("high");
  }
});
progress.addEventListener("click", (e) => {
// console.log(100/((100/vedio.currentTime)/vedio.duration),span.width)
clickpercent= e.offsetX/progress.offsetWidth *100
vedio.currentTime=vedio.duration/(100/clickpercent)
spanof.style.left = e.offsetX+"px"

});



format_time=(e)=>{
  Hour=Math.floor(e/3600)?Math.floor(e/3600):"00"
  Minutes = Math.floor(e/60)<=60?Math.floor(e/60):Math.floor(e/60/60)
  Minutes = Minutes< 10?"0"+`${Minutes}`:Minutes
  Seconds = Math.floor(e%60)
   Seconds = Seconds< 10?"0"+`${Seconds}`:Seconds
//  console.log(Hour)
//     console.log(Minutes)
//  console.log(Second)
// }
}
dragprogress=e=>{
  clickpercent= e.offsetX/progress.offsetWidth *100
vedio.currentTime=vedio.duration/(100/clickpercent)
spanof.style.left = e.offsetX+"px"
}
progressarea.addEventListener("mousedown",()=>{
  progressarea.addEventListener("mousemove",dragprogress)
})
document.querySelector(".container").addEventListener("mouseup",()=>{
  progressarea.removeEventListener("mousemove",dragprogress)
})


// *150s *100%
// *3s	2% (duration/currenttime)
// 			width%=100/(duration/currenttime)
// time 5


// duration(100/width%)

// width 20    offsetX/progress.style.width
// cuwidth 2
