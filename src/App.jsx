import { BrowserRouter } from "react-router-dom";
import { About, Experience, Hero, Navbar, Tech, Works, CustomCursor, CameraRig, Contact } from "./components";
import Tree from "./components/Tree";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ScrollControls, Scroll } from "@react-three/drei";
import CropRecommendationForm from "./components/CropRecommendationForm";
import CropForm from "./components/CropForm";
import FertilizerForm from "./components/FertilizerForm";
import React, { useState } from "react";

const App = () => {
    const [treeX, setTreeX] = useState(5); // default right
  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <Works />
        <Tech />
        <div className="w-full h-screen">
<Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
  <ambientLight intensity={1} />
  <directionalLight position={[10, 10, 10]} intensity={1} />
  <Suspense fallback={null}>
    <ScrollControls pages={3}>
      {/* <Tree url="/whispering_elm_tree.glb" /> */}
      <Tree url="/whispering_elm_tree.glb" x={treeX} />
      <CameraRig setTreeX={setTreeX} />
      <Scroll html>
        {/* Page 1 */}
        <div className="w-full h-screen flex">
          <div className="flex-1 h-full flex items-center justify-start pl-12">
            <CropRecommendationForm />
          </div>
          <div className="flex-1 h-full" />
        </div>
        {/* Page 2 */}
        <div className="w-full h-screen flex">
          <div className="flex-1 h-full flex items-center justify-start pl-12">
            <CropForm />
          </div>
          <div className="flex-1 h-full" />
        </div>
        {/* Page 3 */}
        <div className="w-full h-screen flex">
          <div className="flex-1 h-full flex items-center justify-start pl-12">
            <FertilizerForm />
          </div>
          <div className="flex-1 h-full" />
        </div>
      </Scroll>
    </ScrollControls>
  </Suspense>
</Canvas>
        </div>
        <Experience />
        <About />
        <Contact/>
      </div>
    </BrowserRouter>
  );
};

export default App;