const canvas = new fabric.Canvas('drawContainer');
const grid = 30;
let isDown;
const setColor = document.getElementById("penColor").value;
let point1;
let line = null;
let drawMode = true;
let lineThickness = document.getElementById("lineThickness");

lineThickness.style.display = "none";


function create(board) {
  for (var i = 0; i < (600 / grid); i++) {
    board.add(new fabric.Line([i * grid, 0, i * grid, 600], {
      stroke: '#ccc',
      selectable: false
    }));
    board.add(new fabric.Line([0, i * grid, 600, i * grid], {
      stroke: '#ccc',
      selectable: false
    }))
  }
}
//create grids
create(canvas);

function addListener() {
  canvas.on('mouse:down', onMouseDown);
  canvas.on('mouse:dblclick', onDblClick);
  canvas.on('mouse:move', onMouseMove)
}

function removeListener() {
  canvas.off('mouse:down', onMouseDown);
  canvas.off('mouse:dblclick', onDblClick);
  canvas.off('mouse:move', onMouseMove)
}

function setSelectable(value) {
  canvas.forEachObject(function(object) {
    object.selectable = value;
    object.setCoords()
  })
  canvas.selection = value;
}

function onMouseDown(options) {
  isDown = true;
  var pointer = canvas.getPointer(options.e);
  var points = [Math.round(pointer.x / grid) * grid, Math.round(pointer.y / grid) * grid, pointer.x, pointer.y];
  var thickness =document.getElementById('lineThickness').value;
  
  
  
  
  line = new fabric.Line(points, {
    strokeWidth: fabric.util.parseUnit(thickness),
    strokeLineCap: 'round',
    stroke:document.getElementById('penColor').value,
    hasControls: false,
    hasBorders: false,
    LX: false,
    LY: false,
    hoverCursor: 'default',
    selectable: false
   
  });
  canvas.add(line);
};

console.log(setColor)

function onDblClick() {
  



   var canvas_objects = canvas._objects;
          var sel = canvas_objects[canvas_objects.length -1]; //Get last object 
         canvas.remove(sel);
         sel = canvas_objects[canvas_objects.length -1]; //Get last object 
         canvas.remove(sel);
  line.setCoords()
  isDown = false;
  line = null;
  
};

function onMouseMove(o) {
  if (!isDown) return;
  var pointer = canvas.getPointer(o.e);
  line.set({
    x2:  Math.round(pointer.x / grid) * grid,
    y2:  Math.round(pointer.y / grid) * grid
  });
  canvas.requestRenderAll();
}; //end mouse:move

document.addEventListener("keydown", function(event) {
  var keyPressed = event.keyCode;
  if (keyPressed === 27) { //escape key code
    edit();
  } //end if delete  
}); //end keydown


function draw() {
    lineThickness.style.display = "block"

  drawMode = true
  addListener()
  setSelectable(false);
  // console.log(drawMode)
}


function edit() {
  lineThickness.style.display = "none"
 
console.log(line)
  // bool = false
  if (drawMode &&  line != null) {
    var canvas_objects = canvas._objects;
    var sel = canvas_objects[canvas_objects.length - 1]; //Get last object 
    canvas.remove(sel);
  }
  drawMode = false;
  removeListener();
  setSelectable(true);
}

function changeThickness(){
  line.set({
    strokeWidth: document.getElementById('lineThickness').value
  });
}



var enableDraw = document.getElementById("drawEnabled");
enableDraw.addEventListener("click", draw);
var enableEdit = document.getElementById("editEnabled");
enableEdit.addEventListener("click", edit);




let button = document.getElementById('b');
button.addEventListener('click', reset);
function reset() {
    window.location.reload();
}
/// remove button 


const buttonPrintOrSave = document.querySelector(
  ".print-or-save"
)

function printOrSave() {
  window.print()
}

buttonPrintOrSave.addEventListener("click", printOrSave)

// save and print 



// reoures 
// https://www.codicode.com/art/how_to_draw_on_a_html5_canvas_with_a_mouse.aspx
// https://levelup.gitconnected.com/drawing-on-the-html5-canvas-with-a-mouse-d92c7d57fb7c
// https://www.mysamplecode.com/2012/04/html5-canvas-draw-line-tutorial.html
// http://jsfiddle.net/user/m1erickson/fiddles/
// https://www.youtube.com/watch?v=WbPhV1dyva4
// http://www.java2s.com/example/javascript/canvas/draw-on-canvas-mouse-over-and-mouse-click.html
// http://www.java2s.com/example/javascript/canvas/html5-canvas-drawing-drag-and-drop.html
// https://codepen.io/nakessler/pen/qOdJWm
// https://stackoverflow.com/questions/22441446/mouse-interaction-in-html5-canvas-drawing-lines
// http://www.java2s.com/example/javascript/canvas/mouse-draw.html
// https://prodevhub.com/understanding-canvas-draw-a-line-in-canvas-using-mouse-and-touch-events-in-javascript/
// https://www.aspsnippets.com/Articles/Implement-HTML5-Canvas-Touch-Screen-and-Mouse-Sketchpad-Drawing-App-using-jQuery.aspx
// https://www.youtube.com/watch?v=MV_ITkqLzik
