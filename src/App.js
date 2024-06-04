import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import * as PIXI3D from "pixi3d";

function initCube(position) {
  let cube = PIXI3D.Mesh3D.createCube();
  cube.position.set(...position); // Set the position (x, y, z)
  cube.scale.set(2, 2, 0.05);    // Set the scale (width, height, depth)
  console.log(cube.rotation);
  const material = new PIXI3D.StandardMaterial();
  material.baseColor = new PIXI3D.Color(0.95, 0.95, 0.9); // RGB values between 0 and 1
  cube.material = material;

  return cube;
}

const App = () => {
  const pixiContainer = useRef(null);
  useEffect(() => {
    if (pixiContainer.current.childNodes.length > 0) return;

    let app = new PIXI.Application({
      backgroundColor: 0xdddddd,
      resizeTo: window,
      antialias: true,
    });
    pixiContainer.current.appendChild(app.view);
    app.stage.addChild(initCube([0, 0, 0]));
    app.stage.addChild(initCube([0, 0, 1]));

    let light = new PIXI3D.Light();
    light.position.set(-3, 3, 2);
    light.intensity = 100;
    PIXI3D.LightingEnvironment.main.lights.push(light);

    new PIXI3D.CameraOrbitControl(app.view);
  }, []);

  return <div ref={pixiContainer} />;
};

export default App;
