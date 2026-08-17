const takePhoto = document.getElementById("takePhoto");
const camera = document.getElementById("camera");
const photoCanvas = document.getElementById("photoCanvas");
const canvasContext = photoCanvas.getContext("2d");
let selectedStyle = "white";
const photos = [];
const photoSound = new Audio("assets/photoSound.mp3");

const buttonContainer = document.getElementById("buttonContainer");
const countdown = document.getElementById("countdown");

const containerResults = document.getElementById("containerResults");

const photoBooth = document.getElementById("photoBooth");

const firstStyle = document.getElementById("firstStyle");
const secondStyle = document.getElementById("secondStyle");
const thirdStyle = document.getElementById("thirdStyle");

const styleButtons = document.getElementById("styleButtons");

const downloadButton = document.getElementById("downloadButton");

const downloadContainer = document.getElementById("downloadContainer");

async function oneSecondInterval() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function countDown() {
  countdown.textContent = 3;
  await oneSecondInterval();
  countdown.textContent = 2;
  await oneSecondInterval();
  photoSound.play();
  countdown.textContent = 1;
  await oneSecondInterval();
}

function capturePhotos() {
  photoCanvas.width = camera.videoWidth;
  photoCanvas.height = camera.videoHeight;

  canvasContext.drawImage(camera, 0, 0, photoCanvas.width, photoCanvas.height);

  photos.push(photoCanvas.toDataURL("image/png"));
}

takePhoto.addEventListener("click", startCamera);

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  camera.srcObject = stream;

  await countDown();
  capturePhotos();
  await countDown();
  capturePhotos();
  await countDown();
  capturePhotos();

  buttonContainer.style.display = "none";

  photos.forEach((photo) => {
    const imgPhoto = document.createElement("img");
    imgPhoto.className = "imgPhoto";
    imgPhoto.src = photo;
    imgPhoto.alt = "Your photoBooth images";
    containerResults.appendChild(imgPhoto);
  });

  containerResults.style.display = "flex";
  styleButtons.style.display = "flex";
  downloadContainer.style.display = "flex";
}

firstStyle.addEventListener("click", () => {
  selectedStyle = "purple";
  containerResults.classList.remove("blueStyle", "redStyle");
  containerResults.classList.add("purpleStyle");
});

secondStyle.addEventListener("click", () => {
  selectedStyle = "blue";
  containerResults.classList.remove("purpleStyle", "redStyle");
  containerResults.classList.add("blueStyle");
});

thirdStyle.addEventListener("click", () => {
  selectedStyle = "red";
  containerResults.classList.remove("blueStyle", "purpleStyle");
  containerResults.classList.add("redStyle");
});

downloadButton.addEventListener("click", () => {
  const newCanvas = document.createElement("canvas");
  newCanvas.width = 280;
  newCanvas.height = 1100;

  const newCtx = newCanvas.getContext("2d");

  const previewStyles = {
    white: {
      background: "rgb(156, 137, 13)",
      border: "transparent",
    },
    purple: {
      background: "rgb(156, 137, 13)",
      border: "purple",
    },
    blue: {
      background: "rgb(156, 137, 13)",
      border: "rgb(5, 36, 151)",
    },
    red: {
      background: "rgb(156, 137, 13)",
      border: "rgb(206, 16, 16)",
    },
  };

  const currentStyle = previewStyles[selectedStyle];

  newCtx.fillStyle = currentStyle.background;
  newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

  let loadedPhotos = 0;

  function downloadFinalPhotoBooth() {
    const link = document.createElement("a");

    link.href = newCanvas.toDataURL("image/png");
    link.download = "nickai-photobooth.png";

    link.click();
  }

  function drawFinalPhoto(photo, photoY) {
    newCtx.drawImage(photo, 20, photoY, 240, 320);

    newCtx.strokeStyle = currentStyle.border;
    newCtx.lineWidth = 8;
    newCtx.strokeRect(20, photoY, 240, 320);

    loadedPhotos++;

    if (loadedPhotos === 3) {
      downloadFinalPhotoBooth();
    }
  }

  const firstPhoto = new Image();

  firstPhoto.onload = () => {
    drawFinalPhoto(firstPhoto, 70);
  };

  firstPhoto.src = photos[0];

  const secondPhoto = new Image();

  secondPhoto.onload = () => {
    drawFinalPhoto(secondPhoto, 405);
  };

  secondPhoto.src = photos[1];

  const thirdPhoto = new Image();

  thirdPhoto.onload = () => {
    drawFinalPhoto(thirdPhoto, 740);
  };

  thirdPhoto.src = photos[2];
});
