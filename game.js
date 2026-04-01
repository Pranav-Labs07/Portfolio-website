let scene, camera, renderer, mixer;
let player;
let obstacles = [];

let lane = 0;
let speed = 0.12;
let score = 0;
let running = true;

let highScore = localStorage.getItem("runnerHigh") || 0;

const bgMusic = new Audio("assets/bg.mp3");
bgMusic.loop = true;

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  const light = new THREE.PointLight(0xffffff, 2, 100);
  light.position.set(0, 20, 10);
  scene.add(light);

  createGround();
  loadCharacter(); 
  setupControls();

  document.getElementById("highscore").innerText = "Best: " + highScore;

  animate();
}

function createGround() {
  const geo = new THREE.PlaneGeometry(20, 200);
  const mat = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const ground = new THREE.Mesh(geo, mat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
}


function loadCharacter() {
  const loader = new THREE.GLTFLoader();

  loader.load(
    "assets/character.glb",


    gltf => {
      player = gltf.scene;
      player.scale.set(1,1,1);
      player.position.y = 1;
      scene.add(player);

      mixer = new THREE.AnimationMixer(player);
      gltf.animations.forEach(anim => mixer.clipAction(anim).play());
    },

    
    undefined,
    () => {
      console.warn("Model failed, using fallback cube");

      const geo = new THREE.BoxGeometry(1,1,1);
      const mat = new THREE.MeshStandardMaterial({ color: 0x00ffff });
      player = new THREE.Mesh(geo, mat);
      player.position.y = 1;
      scene.add(player);
    }
  );
}

function setupControls() {
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") lane = Math.max(-1, lane-1);
    if (e.key === "ArrowRight") lane = Math.min(1, lane+1);

    bgMusic.play().catch(()=>{});
  });
}

function spawnObstacle() {
  const o = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );

  const laneX = [-2.5, 0, 2.5];
  o.position.set(laneX[Math.floor(Math.random()*3)], 1, -50);

  scene.add(o);
  obstacles.push(o);
}


function animate() {
  requestAnimationFrame(animate);

  if (mixer) mixer.update(0.016);

  if (player && running) updateGame();

  renderer.render(scene, camera);
}

function updateGame() {
  const laneX = [-2.5, 0, 2.5];

  player.position.x += (laneX[lane] - player.position.x) * 0.1;

  if (Math.random() < 0.02) spawnObstacle();

  obstacles.forEach(o => {
    o.position.z += speed;

    if (
      Math.abs(o.position.x - player.position.x) < 1 &&
      Math.abs(o.position.z - player.position.z) < 1
    ) {
      endGame();
    }
  });

  obstacles = obstacles.filter(o => {
    if (o.position.z > 10) {
      scene.remove(o);
      return false;
    }
    return true;
  });

  score++;
  document.getElementById("score").innerText = "Score: " + score;
}

function endGame() {
  running = false;

  if (score > highScore) {
    localStorage.setItem("runnerHigh", score);
  }

  document.getElementById("gameOver").style.display = "block";
}

// RESTART
function restartGame() {
  location.reload();
}
