import * as THREE from "three";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const PureJsImplementationTest = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    //1.Scene
    const scene: THREE.Scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0f"); // Deep space dark

    //2.Camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    //3.Objects
    // Main Dodecahedron - Crystal/Gem-like
    const geometry = new THREE.DodecahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4a90e2,
      emissive: 0x1a2332, // Subtle blue glow
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.9,
    });
    const dodecahedronMesh = new THREE.Mesh(geometry, material);
    dodecahedronMesh.castShadow = true;
    dodecahedronMesh.receiveShadow = true;

    // Floating cube - Accent piece
    const boxGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b35,
      emissive: 0x331a0a, // Subtle orange glow
      shininess: 80,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(-2.5, 1.5, 0);
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;

    // Add a third geometric shape - Torus
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 8, 16);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x50c878,
      emissive: 0x0f2618, // Subtle green glow
      shininess: 90,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.position.set(2.5, -1, 0);
    torusMesh.rotation.x = Math.PI / 4;
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;

    scene.add(dodecahedronMesh);
    scene.add(boxMesh);
    scene.add(torusMesh);

    //4.Enhanced Lighting
    // Strong directional light from front-right
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight1.position.set(5, 5, 5);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.set(2048, 2048);
    scene.add(dirLight1);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Point light for accent
    const pointLight = new THREE.PointLight(0x7c4dff, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    //5.Renderer with shadows
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //6.Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.maxDistance = 10;
    controls.minDistance = 2;

    //7.Enhanced Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate objects at different speeds for visual interest
      dodecahedronMesh.rotation.x += 0.008;
      dodecahedronMesh.rotation.y += 0.012;

      boxMesh.rotation.x += 0.015;
      boxMesh.rotation.z += 0.01;

      torusMesh.rotation.x += 0.005;
      torusMesh.rotation.y += 0.02;

      // Add floating animation
      boxMesh.position.y = 1.5 + Math.sin(Date.now() * 0.001) * 0.3;
      torusMesh.position.y = -1 + Math.cos(Date.now() * 0.0015) * 0.2;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    //8.Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      boxGeometry.dispose();
      boxMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      <div className="absolute top-20 w-full flex justify-center md:justify-start md:px-10 z-10">
        <h1 className="text-white text-4xl font-bold text-center md:text-left">
          Hello Three js
        </h1>
      </div>
    </section>
  );
};

export default PureJsImplementationTest;
