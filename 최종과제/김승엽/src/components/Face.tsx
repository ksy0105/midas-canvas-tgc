import { useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

// 모든 속성은 0~1 사이의 값을 가짐
type MorphTargetDictionaryType = {
  browDown_L: number;
  browDown_R: number;
  browInnerUp: number;
  browOuterUp_L: number;
  browOuterUp_R: number;
  cheekPuff: number;
  cheekSquint_L: number;
  cheekSquint_R: number;
  eyeBlink_L: number;
  eyeBlink_R: number;
  eyeLookDown_L: number;
  eyeLookDown_R: number;
  eyeLookIn_L: number;
  eyeLookIn_R: number;
  eyeLookOut_L: number;
  eyeLookOut_R: number;
  eyeLookUp_L: number;
  eyeLookUp_R: number;
  eyeSquint_L: number;
  eyeSquint_R: number;
  eyeWide_L: number;
  eyeWide_R: number;
  jawForward: number;
  jawLeft: number;
  jawOpen: number;
  jawRight: number;
  mouthClose: number;
  mouthDimple_L: number;
  mouthDimple_R: number;
  mouthFrown_L: number;
  mouthFrown_R: number;
  mouthFunnel: number;
  mouthLeft: number;
  mouthLowerDown_L: number;
  mouthLowerDown_R: number;
  mouthPress_L: number;
  mouthPress_R: number;
  mouthPucker: number;
  mouthRight: number;
  mouthRollLower: number;
  mouthRollUpper: number;
  mouthShrugLower: number;
  mouthShrugUpper: number;
  mouthSmile_L: number;
  mouthSmile_R: number;
  mouthStretch_L: number;
  mouthStretch_R: number;
  mouthUpperUp_L: number;
  mouthUpperUp_R: number;
  noseSneer_L: number;
  noseSneer_R: number;
  tongueOut: number;
};

interface FaceProps {
  className?: string;
  onReady?: (changeExpression: (expression: string) => void) => void;
}

const Face = ({ className, onReady }: FaceProps) => {
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
    let head: THREE.Mesh;
    let morphTargetDictionary: { [key: string]: number };
    let influences: number[];

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

          head = mesh.getObjectByName("mesh_2") as THREE.Mesh;
          influences = head?.morphTargetInfluences || [];
          morphTargetDictionary =
            (head?.morphTargetDictionary as MorphTargetDictionaryType) || {};

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

          // 표정 변화 함수 정의
          const changeExpression = (expression: string) => {
            const animationDuration = 1000; // 1초
            const startValues = influences.slice(); // 현재 값들을 복사
            let startTime: number | null = null;

            const targetValues = {
              openMouth: {
                jawOpen: 0.7,
                mouthFunnel: 0.3,
                tongueOut: 0.2,
              },
              closeMouth: {
                jawOpen: 0.13,
                mouthFunnel: 0.07,
                tongueOut: 0,
              },
            };

            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / animationDuration, 1);

              const easeProgress =
                progress < 0.5
                  ? 2 * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 2) / 2;

              // 표정 업데이트 로직 수정
              const currentTarget =
                targetValues[expression as keyof typeof targetValues];
              if (currentTarget) {
                Object.entries(currentTarget).forEach(([key, targetValue]) => {
                  const index = morphTargetDictionary[key];
                  if (typeof index !== "undefined") {
                    influences[index] =
                      startValues[index] +
                      (targetValue - startValues[index]) * easeProgress;
                  }
                });
              }

              renderer.render(scene, camera);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          };

          // onReady 콜백으로 표정 변화 함수 전달
          if (onReady) {
            onReady(changeExpression);
          }
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
  }, [onReady]);

  return <div ref={containerRef} className={className}></div>;
};

export default Face;
