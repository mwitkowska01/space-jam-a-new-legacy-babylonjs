//// Create a default engine to load the scene
try {
    engine = createDefaultEngine();
} catch (e) {
    console.log(
        "the available createEngine function failed. Creating the default engine instead"
    );
    engine = createDefaultEngine();
}
if (!engine) throw "engine should not be null.";

// Create the scene
createScene().then((returnedScene) => {
    sceneToRender = returnedScene;
});

// Render the scene by using the engine
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Resize the engine to fit the scene
window.addEventListener("resize", function () {
    engine.resize();
});

// Create the physics engine
var cannonPlugin = new CannonJSPlugin(true, 10, cannon);

//enable physics and set gravity force.
scene.enablePhysics(new Vector3(0, -3, 0), cannonPlugin);


// Create a default engine to load the scene
try {
    engine = createDefaultEngine();
} catch (e) {
    console.log(
        "the available createEngine function failed. Creating the default engine instead"
    );
    engine = createDefaultEngine();
}
if (!engine) throw "engine should not be null.";

// Create the scene
createScene().then((returnedScene) => {
    sceneToRender = returnedScene;
});

// Render the scene by using the engine
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Resize the engine to fit the scene
window.addEventListener("resize", function () {
    engine.resize();
});

// Create a floor in the scene and position it to the center
var gymFloor = MeshBuilder.CreateGround("ground", { width: 60, height: 60 }, scene);
gymFloor.position = new Vector3(0, -3.5, 0);

// Create wood materials and texture in the scene
var woodMaterial = new StandardMaterial("woodMaterial", scene);
var woodTexture = new WoodProceduralTexture("text", 1024, scene);

// Adjust the texture to look more realistic 
woodTexture.ampScale = 80.0;

// Apply the texture to the material
woodMaterial.diffuseTexture = woodTexture;

// Apply the material to the gym floor mesh object
gymFloor.material = woodMaterial;

// Add physics that simulates the ground
gymFloor.physicsImpostor = new PhysicsImpostor(gymFloor, PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 1 }, scene);


// Create the default XR experience
const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground],
});

// Create PhotoDome with a .png image and add it to the scene
var dome = new PhotoDome(
    "mydome",
    "https://sjanlassets.blob.core.windows.net/assets/Looney-Court.png",
    {
        resolution: 32,
        size: 100
    },
    scene
);

import {
    Scene,
    Engine,
    AssetsManager,
    Vector3,
    TransformNode,
    SceneLoader,
    Mesh
} from "babylonjs";

import { Player } from "./models/Player";
import * as GUI from "babylonjs-gui";
import 'babylonjs-loaders';
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";


export class Environment {
    private _scene: Scene;
    private _engine: Engine;
    private _players: Array<Player>;

    constructor(scene: Scene, engine: Engine) {
        this._scene = scene;
        this._engine = engine;

        //Import data from JSON
        this._players = require('./data/players.json');
    }
}

public createCharacterButtons() {
    // Create the main 3D UI manager for the icon grid
    var mainManager = new GUI.GUI3DManager(this._scene);

    // Create a cylindrical panel so that the images wrap around the user
    var mainButtonPanel = new GUI.CylinderPanel();
    mainButtonPanel.margin = 0.2;
    mainManager.addControl(mainButtonPanel);

    // Create an anchor so that the main panel doesn't move
    var anchor = new TransformNode("");
    mainButtonPanel.linkToTransformNode(anchor);
    mainButtonPanel.position = new Vector3(0, -2, -3);

    // Create 8 columns and 2 rows so that each of the 16 players can be displayed
    mainButtonPanel.columns = 8;
    mainButtonPanel.rows = 2;

    // Set panel layouts
    mainButtonPanel.blockLayout = true;
}

// Create the mesh 3D UI manager for the pop-up image when a user selects a player
var meshManager = new GUI.GUI3DManager(this._scene);
var meshPanel = new GUI.PlanePanel();
meshPanel.margin = 0.2;

// Add meshPanel to meshManager and anchor it
meshManager.addControl(meshPanel);
meshPanel.linkToTransformNode(anchor);
meshPanel.position = new Vector3(6, 0, -1);

// Set the player container and add it to the mesh panel
var displayStatsContainer = new GUI.HolographicButton("orientation");
meshPanel.addControl(displayStatsContainer);
displayStatsContainer.isVisible = false;

// Create an array of meshes to access later
var activeMesh: AbstractMesh[] = null;

// When the pop-up image is selected, hide the player container and close button
displayStatsContainer.onPointerUpObservable.add(() => {
    displayStatsContainer.isVisible = false;
    if (activeMesh) {
        activeMesh.forEach(mesh => {
            mesh.dispose();
        });
    }
});

// Loop through players in the JSON file and create a button for each player
for (var index = 0; index < this._players.length; index++) {
    let player = this._players[index];

    // Create the button and add it to mainButtonPanel
    var button = new GUI.HolographicButton("orientation");
    mainButtonPanel.addControl(button);

    // Add the player's name and their image to the button on mainButtonPanel
    button.text = player.name;
    button.imageUrl = player.imgUrl;

    // When the button is selected, trigger the pop-up image to appear, now with the PER
    button.onPointerUpObservable.add(async function () {
        displayStatsContainer.imageUrl = player.imgUrl;
        displayStatsContainer.text = `PER: ${player.per}`;
        displayStatsContainer.isVisible = true;
        displayStatsContainer.scaling = new Vector3(3, 3, 1);
        displayStatsContainer.position = new Vector3(-6, -1, 2);
    });


    public addLegalLine() {
        const guiMenu = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        guiMenu.idealHeight = 720;

        //Creating the legal text box
        const textRect = new GUI.Rectangle("legalContainer");
        textRect.color = "white";
        guiMenu.addControl(textRect);

        //Creating the legal text
        const legal = new GUI.TextBlock("legalText", "© 2021 WBEI TM & ©2021 WarnerMediaDirect, LLC. All Rights Reserved.");
        legal.height = 0.2;

        // Positioning the legal text to the bottom center
        legal.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        legal.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        textRect.addControl(legal);
    }
};













