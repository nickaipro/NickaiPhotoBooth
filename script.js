const takePhoto = document.getElementById("takePhoto");
const camera = document.getElementById("camera");
const photoCanvas = document.getElementById("photoCanvas");
const canvasContext = photoCanvas.getContext("2d");
const photos = [];

const countdown = document.getElementById("countdown");

async function oneSecondInterval() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function countDown() {
  countdown.textContent = 3;
  await oneSecondInterval();
  countdown.textContent = 2;
  await oneSecondInterval();
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
}
