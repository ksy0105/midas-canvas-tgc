import { useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import "./App.css";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let stats: Stats;
    let mixer: THREE.AnimationMixer;
    let clock: THREE.Clock;
    let controls: OrbitControls;

    // 초기화 함수
    const init = () => {
      clock = new THREE.Clock();

      // 카메라 설정
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        20
      );
      camera.position.set(-1.8, 0.8, 3);

      scene = new THREE.Scene();

      // 렌더러 설정
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;

      containerRef.current!.appendChild(renderer.domElement);

      // KTX2 로더 설정
      const ktx2Loader = new KTX2Loader()
        .setTranscoderPath("jsm/libs/basis/")
        .detectSupport(renderer);

      // GLTF 모델 로드
      new GLTFLoader()
        .setKTX2Loader(ktx2Loader)
        .setMeshoptDecoder(MeshoptDecoder)
        .load("models/gltf/facecap.glb", (gltf) => {
          const mesh = gltf.scene.children[0];
          scene.add(mesh);

          mixer = new THREE.AnimationMixer(mesh);
          mixer.clipAction(gltf.animations[0]).play();

          // GUI 설정
          const head = mesh.getObjectByName("mesh_2");
          const influences = head?.morphTargetInfluences;

          console.log(head.morphTargetDictionary);

          const gui = new GUI();
          gui.close();

          for (const [key, value] of Object.entries(
            head?.morphTargetDictionary
          )) {
            gui
              .add(influences, value, 0, 1, 0.01)
              .name(key.replace("blendShape1.", ""))
              .listen();
          }
        });

      // 환경 설정
      const environment = new RoomEnvironment();
      const pmremGenerator = new THREE.PMREMGenerator(renderer);

      scene.background = new THREE.Color(0x666666);
      scene.environment = pmremGenerator.fromScene(environment).texture;

      // 컨트롤 설정
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 2.5;
      controls.maxDistance = 5;
      controls.minAzimuthAngle = -Math.PI / 2;
      controls.maxAzimuthAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 1.8;
      controls.target.set(0, 0.15, -0.2);

      // Stats 설정
      stats = new Stats();
      containerRef.current!.appendChild(stats.dom);
    };

    // 애니메이션 함수
    const animate = () => {
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);
      controls.update();
      stats.update();
    };

    // 윈도우 리사이즈 핸들러
    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // 초기화
    init();
    renderer.setAnimationLoop(animate);
    window.addEventListener("resize", handleResize);

    // 클린업
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null);
      containerRef.current?.removeChild(renderer.domElement);
      containerRef.current?.removeChild(stats.dom);
    };
  }, []);

  return (
    <>
      <div ref={containerRef}></div>
      <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener">
          three.js
        </a>
        webgl - morph targets - face
        <br />
        model by{" "}
        <a
          href="https://www.bannaflak.com/face-cap"
          target="_blank"
          rel="noopener"
        >
          Face Cap
        </a>
      </div>
    </>
  );
}

export default App;
