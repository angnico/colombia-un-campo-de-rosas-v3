let camara;
//
let textoLista = ["1-texto.txt","2-texto.txt","3-texto.txt","4-texto.txt"];
let textoElegido;
let textoVisible;
//
let startIndex = 0;
//
function preload()
{
  textoElegido = random(textoLista);
   loadStrings(textoElegido, (data)=>
     { textoCargado = data;
        textoVisible = textoCargado.join(' ')
     })
}
//
function setup()
{
    createCanvas(400, 400);
    camara = createCapture(VIDEO);
    camara.size(100, 100);
    camara.hide();
    textFont("Courier-Bold");
}
//
function draw()
{
    clear();
    background(0);
    camara.loadPixels();
    //
    let w = width/camara.width;
    let h = height/camara.height;
    let charIndex = startIndex;
    //
    for (let j = 0; j < camara.height; j++)
    {
        for (let i = 0; i < camara.width; i++)
        {
            const pixelIndex = (i + j * camara.width) * 4;
            const r = camara.pixels[pixelIndex + 0];
            const g = camara.pixels[pixelIndex + 1];
            const b = camara.pixels[pixelIndex + 2];
            const avg = (r + g + b)/3;
            fill(avg);
            noStroke();
            textSize(w * 1.2);
            textAlign(CENTER, CENTER);
            let charToDisplay = textoVisible.charAt(charIndex % textoVisible.length);
            //
            text(charToDisplay, i * w + w * 0.5, j * h + h * 0.5);
            charIndex++;
        }
    }
    startIndex += camara.width * camara.height;
}
