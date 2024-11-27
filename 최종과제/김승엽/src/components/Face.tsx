import { useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

interface FaceProps {
  className?: string;
}

const Face = ({ className }: FaceProps) => {
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

      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        20
      );
      camera.position.set(-1.8, 0.8, 3);

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;

      containerRef.current!.appendChild(renderer.domElement);

      const ktx2Loader = new KTX2Loader()
        .setTranscoderPath("jsm/libs/basis/")
        .detectSupport(renderer);

      new GLTFLoader()
        .setKTX2Loader(ktx2Loader)
        .setMeshoptDecoder(MeshoptDecoder)
        .load("models/gltf/facecap.glb", (gltf) => {
          const mesh = gltf.scene.children[0];
          scene.add(mesh);

          mixer = new THREE.AnimationMixer(mesh);

          const head = mesh.getObjectByName("mesh_2") as THREE.Mesh;
          const influences = head?.morphTargetInfluences;
          const morphTargetDictionary = head?.morphTargetDictionary;

          const gui = new GUI();
          gui.close();

          if (morphTargetDictionary && influences) {
            for (const [key, value] of Object.entries(morphTargetDictionary)) {
              gui
                .add(influences, value, 0, 1, 0.01)
                .name(key.replace("blendShape1.", ""))
                .listen()
                .onChange(() => {
                  // 값이 변경될 때마다 렌더러가 다시 렌더링하도록 요청
                  renderer.render(scene, camera);
                });
            }
          }

          // if (morphTargetDictionary && influences) {
          //   for (const [key, value] of Object.entries(morphTargetDictionary)) {
          //     gui
          //       .add(influences, value, 0, 1, 0.01)
          //       .name(key.replace("blendShape1.", ""))
          //       .listen();
          //   }

          //   // 초기에 모든 표정을 0으로 설정
          //   // for (let i = 0; i < influences.length; i++) {
          //   //   influences[i] = 0;
          //   // }

          //   // 표정 변화를 위한 변수들
          //   // let animationStartTime: number | null = null;
          //   // const animationDuration = 1000; // 1초 동안 변화

          //   // // 표정 변화 애니메이션 함수
          //   // const animateExpression = (currentTime: number) => {
          //   //   if (!animationStartTime) animationStartTime = currentTime;

          //   //   const elapsedTime = currentTime - animationStartTime;
          //   //   const progress = Math.min(elapsedTime / animationDuration, 1);

          //   //   const easeProgress =
          //   //     progress < 0.5
          //   //       ? 2 * progress * progress
          //   //       : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          //   //   const jawOpenIndex = morphTargetDictionary["jawOpen"];
          //   //   const mouthFunnelIndex = morphTargetDictionary["mouthFunnel"];
          //   //   const tongueOutIndex = morphTargetDictionary["tongueOut"];

          //   //   if (typeof jawOpenIndex !== "undefined") {
          //   //     influences[jawOpenIndex] = 0.7 * easeProgress;
          //   //   }
          //   //   if (typeof mouthFunnelIndex !== "undefined") {
          //   //     influences[mouthFunnelIndex] = 0.3 * easeProgress;
          //   //   }
          //   //   if (typeof tongueOutIndex !== "undefined") {
          //   //     influences[tongueOutIndex] = 0.2 * easeProgress;
          //   //   }

          //   //   if (progress < 1) {
          //   //     requestAnimationFrame(animateExpression);
          //   //   }
          //   // };

          //   // setTimeout(() => {
          //   //   requestAnimationFrame(animateExpression);
          //   // }, 1000);
          // }
        });

      const environment = new RoomEnvironment();
      const pmremGenerator = new THREE.PMREMGenerator(renderer);

      scene.background = new THREE.Color(0x666666);
      scene.environment = pmremGenerator.fromScene(environment).texture;

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 2.5;
      controls.maxDistance = 5;
      controls.minAzimuthAngle = -Math.PI / 2;
      controls.maxAzimuthAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 1.8;
      controls.target.set(0, 0.15, -0.2);

      stats = new Stats();
      containerRef.current!.appendChild(stats.dom);
    };

    const animate = () => {
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);
      controls.update();
      stats.update();
    };

    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();
    renderer.setAnimationLoop(animate);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null);
      containerRef.current?.removeChild(renderer.domElement);
      containerRef.current?.removeChild(stats.dom);
    };
  }, []);

  return <div ref={containerRef} className={className}></div>;
};

export default Face;
