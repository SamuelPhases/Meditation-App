const app = () => {
  const timeBtns = document.querySelectorAll(".time-button");
  const song = document.querySelector(".song");
  const movingOutline = document.querySelector(".moving-outline circle");
  const timeDisplay = document.querySelector(".time-display");
  const video = document.querySelector(".video-container video");
  const soundBtns = document.querySelectorAll(".sound-select button");
  const playBtn = document.querySelector(".play-btn");

  let fakeDuration = 600;

  // Time Display
  timeBtns.forEach(option => {
    option.addEventListener("click", () => {
      fakeDuration = option.getAttribute("data-time");
      //   console.log(option.getAttribute("data-time"));
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // Beach/Rain Sounds
  soundBtns.forEach(choice => {
    choice.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  // GET TRACK OUTLINE LENGTH
  const outlineLength = movingOutline.getTotalLength();
  //   console.log(outlineLength);
  movingOutline.style.strokeDasharray = outlineLength;
  movingOutline.style.strokeDashoffset = outlineLength;

  playBtn.addEventListener("click", () => {
    checkPlaying(song);
  });

  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      playBtn.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      playBtn.src = "./svg/play.svg";
    }
  };

  // OUTLINE
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = fakeDuration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);
    // console.log(currentTime);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    movingOutline.style.strokeDashoffset = progress;
    // console.log(progress);

    timeDisplay.textContent = `${minutes}:${seconds}`;
  };
};

app();
