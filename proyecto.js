let ingresarProyecto = false;

let textoYaudioLista = 
[
    { textoRandom: "1-texto.txt", audioRandom: "1-audio.mp3" },
    { textoRandom: "2-texto.txt", audioRandom: "2-audio.mp3" },
    { textoRandom: "3-texto.txt", audioRandom: "3-audio.mp3" },
    { textoRandom: "4-texto.txt", audioRandom: "4-audio.mp3" }
];

let textoElegido = "";
let textoVisible = "";

let permisoAudioBoleano = false;
let audioBoton = null;
let audioElegido = null;
let audioInstances = [];

let imgLista = ["Collage_Hermana_16112024.jpg", "Collage_Hija_15112024.jpg", "Collage_Madre_16112024.jpg"];
let imgElegido;
let imgVisible;

let canvas;
let startIndex = 0;
let camara;
let isHovering = false;

function preload() 
{
    loadImage('Collage_Hermana_16112024.jpg');
    loadImage('Collage_Hija_15112024.jpg');
    loadImage('Collage_Madre_16112024.jpg');
    loadSound('1-audio.mp3');
    loadSound('2-audio.mp3');
    loadSound('3-audio.mp3');
    loadSound('4-audio.mp3');
    loadSound('click.mp3');
    loadFont('Playwrite DE Grund');
}

function setup() 
{
    frameRate(5);
    canvas = createCanvas(windowWidth, windowHeight);

    camara = createCapture(VIDEO);
    camara.size(100, 50);
    camara.hide();

    canvas.mouseOver(() => 
    {
        if (permisoAudioBoleano)
        {
            isHovering = true;
            elegirTextoYAudioAleatorio();
            cargarTextoAleatorio();
            cargarAudioAleatorio();
            cargarImagenAleatoria();
        }
    });

    canvas.mouseOut(() => 
    {
        if (permisoAudioBoleano)
        {
            isHovering = false;
            elegirTextoYAudioAleatorio();
            cargarTextoAleatorio();
            cargarAudioAleatorio();
            cargarImagenAleatoria();
        }
    });
}


function permisoAudio() 
{
    canvas.hide();
    if (permisoAudioBoleano === false) 
    {
        audioBoton = new Audio("click.mp3");
        permisoAudioBoleano = true;
        audioBoton.play().then(() => 
        {
            document.getElementById("contenedor-consent").remove();
            canvas.show();
        });
    }
}


function draw() 
{
    if (permisoAudioBoleano === true) 
    {
        if (isHovering) 
        {
            elegirTextoYAudioAleatorio();
            muestra_ASCII_Video();
        } else 
        {
            elegirTextoYAudioAleatorio();
            muestra_ASCII_Imagenes();
        }
    }
}

function elegirTextoYAudioAleatorio() 
{
    const seleccionRandom = random(textoYaudioLista);
    textoElegido = seleccionRandom.textoRandom;
    audioElegido = seleccionRandom.audioRandom;
}

function cargarTextoAleatorio() 
{
    console.log(textoElegido);
    loadStrings(textoElegido, (data) => {
        let textoCargado = data;
        textoVisible = textoCargado.join('');
    });
}

function cargarAudioAleatorio() 
{
    console.log(audioElegido);
    for (let audio of audioInstances) 
    {
        audio.pause();
        audio.currentTime = 0;
    }
    let nuevoAudio = new Audio(audioElegido);
    audioInstances.push(nuevoAudio);
    nuevoAudio.loop = true;
    nuevoAudio.play()
        .then(() => 
        {
            console.log("Reproduciendo:", audioElegido);
        })
        .catch((err) => {
            console.error("Error al reproducir el audio:", err);
        });
    nuevoAudio.onended = () => 
    {
        audioInstances = audioInstances.filter(audio => audio !== nuevoAudio);
        console.log("Audio terminado y eliminado:", audioElegido);
    };
}

function cargarImagenAleatoria() 
{
    imgElegido = random(imgLista);
    imgVisible = loadImage(imgElegido);
    resize(imgVisible = width / 10, height / 10);
}

function muestra_ASCII_Imagenes() 
{
    clear();
    background(0);

    let charIndex = startIndex;
    let w = (width / imgVisible.width);
    let h = (height / imgVisible.height);

    imgVisible.loadPixels();

    for (let j = 0; j < imgVisible.height; j++) 
    {
        for (let i = 0; i < imgVisible.width; i++) 
        {
            const pixelIndex = (i + j * imgVisible.width) * 4;
            const r = imgVisible.pixels[pixelIndex + 0];
            const g = imgVisible.pixels[pixelIndex + 1];
            const b = imgVisible.pixels[pixelIndex + 2];

            noStroke();
            fill(r, g, b);
            textSize(w * 1.2);
            textAlign(CENTER, CENTER);
            text(textoVisible.charAt(charIndex % textoVisible.length), i * w + w * 0.5, j * h + h * 0.5);
            charIndex++;
        }
    }
    startIndex++;
}

function muestra_ASCII_Video() 
{
    clear();
    background(0);
    camara.loadPixels();

    let w = width / camara.width;
    let h = height / camara.height;
    let charIndex = startIndex;

    for (let j = 0; j < camara.height; j++) 
    {
        for (let i = 0; i < camara.width; i++) 
        {
            const pixelIndex = (i + j * camara.width) * 4;
            const r = camara.pixels[pixelIndex + 0];
            const g = camara.pixels[pixelIndex + 1];
            const b = camara.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;
            fill(avg);
            textSize(w * 1.2);
            textAlign(CENTER, CENTER);
            text(textoVisible.charAt(charIndex % textoVisible.length), i * w + w * 0.5, j * h + h * 0.5);
            charIndex++;
        }
    }
    startIndex += camara.width * camara.height;
}
