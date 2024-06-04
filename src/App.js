import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import * as PIXI3D from "pixi3d";

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

    let mesh = app.stage.addChild(PIXI3D.Mesh3D.createCube());

    let light = new PIXI3D.Light();
    light.position.set(-1, 0, 2);
    PIXI3D.LightingEnvironment.main.lights.push(light);

    let rotation = 0;
    app.ticker.add(() => {
      rotation += 0.5
      mesh.rotationQuaternion.setEulerAngles(0, rotation, 0);
    });
  }, []);

  return <div ref={pixiContainer} />;
};

export default App;
