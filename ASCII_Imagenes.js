let textoLista = ["1-texto.txt","2-texto.txt","3-texto.txt","4-texto.txt"];
let textoElegido;
let textoVisible;
//
let imgLista = ["1-img.jpg","2-img.jpg","3-img.jpg"];
let imgElegido;
let imgVisible;
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
  imgElegido = random(imgLista);
  imgVisible = loadImage(imgElegido);
  // 

}
//
function setup()
{
  //
  createCanvas(400,400);
  textFont("Courier-Bold");
}
//
function draw()
{
  clear();
  background(0);
  //
  let charIndex = startIndex;
  let w = (width/imgVisible.width);
  let h = (height/imgVisible.height);
  //
  imgVisible.loadPixels();
  //
  for (let j = 0; j < imgVisible.height; j++) 
    {
      for (let i = 0; i < imgVisible.width; i++)
      { 
        const pixelIndex = (i + j * imgVisible.width) * 4;
        const r = imgVisible.pixels[pixelIndex + 0];
        const g = imgVisible.pixels[pixelIndex + 1];
        const b = imgVisible.pixels[pixelIndex + 2];
        const avg = (r + g+ b)/3;
        //
        noStroke();
        fill(avg);
        
        textSize(w*1.2);
        textAlign(CENTER,CENTER); 
        //
        text(textoVisible.charAt(charIndex % textoVisible.length), i * w + w * 0.5, j * h + h * 0.5)
        charIndex ++;
      }
    }
    startIndex ++;
}
