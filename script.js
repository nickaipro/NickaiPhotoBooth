const takePhoto = document.getElementById("takePhoto");
const camera = document.getElementById("camera");

takePhoto.addEventListener("click", startCamera);

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  camera.srcObject = stream;
}
