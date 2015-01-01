(() => {
    "use strict";

    const rand_int = n => Math.pow(Math.floor(Math.random() * n + 1), 1);
    const rand_256 = _ => Math.floor(Math.random() * 256);
    const rand_rgb = _ => "rgb(" +
              rand_256() + "," +
              rand_256() + "," +
              rand_256() + ")";

    const add_boxes = (scene, n, ret = []) => {
        const x_size = rand_int(5);
        const y_size = rand_int(150);
        const z_size = rand_int(5);

        const box_geometry = new THREE.BoxGeometry(x_size, y_size, z_size);
        const box_material = new THREE.MeshLambertMaterial({
            color: rand_rgb()
        });
        const box = new THREE.Mesh(box_geometry, box_material);
        // box.position.set(x_size, y_size, z_size);
        box.castShadow = true;
        scene.add(box);
        ret.push(box);
        
        return n == 0
            ? ret
            : add_boxes(scene, n-1, ret);
    };

    const main = () => {
        // new scene
        const scene = new THREE.Scene();

        // object
        const boxes = add_boxes(scene, 100);

        const plane_geometry = new THREE.PlaneBufferGeometry(300, 300);
        const plane_material = new THREE.MeshLambertMaterial({
            color: 0xbbccff,
            side: THREE.DoubleSide
        });    
        const plane = new THREE.Mesh(plane_geometry, plane_material);
        plane.receiveShadow = true;
        plane.rotation.x = 90 * Math.PI / 180;
        scene.add(plane);


        // rendering
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 100, 30);
        light.castShadow = true;
        scene.add(light);
        
        const width  = 600;
        const height = 300;
        const fov    = 45;
        const aspect = width / height;
        const near   = 1;
        const far    = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(100, 100, 300);
        
        const axis = new THREE.AxisHelper(1000);
        axis.position.set(0,0,0);
        scene.add(axis);
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0xeeeeee);
        renderer.shadowMapEnabled = true;
        document.body.appendChild(renderer.domElement);

        
        // mouse control
        const controls = new THREE.OrbitControls(camera, renderer.domElement);


        // animation
        const renderLoop = () => {
            requestAnimationFrame(renderLoop);

            boxes.map(box => box.rotation.set(
                0,
                box.rotation.y + 0.5 * Math.random(),
                box.rotation.z + 0.01 * Math.random()
            ));
            
            renderer.render(scene, camera);
            controls.update();
        };

        renderLoop();
    };

    window.addEventListener('DOMContentLoaded', main, false);
})();
