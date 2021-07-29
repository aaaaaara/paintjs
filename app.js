//1. canvas위 마우스 감지
//2. 선 긋기(path canvas api이용한다)
//3. 색상 바꾸기


//1. 변수(상수) 선언
//canvas는 pixcel 사이즈를 정해줘야함 pixcel modifier
const canvas = document.getElementById("jsCanvas");

//contex설정 canvas안 픽셀을 다룬다 context는 픽셀 컨트롤 fill stroke linewidth path을 가지고 있음
const ctx = canvas.getContext("2d"); 

//color
const colors = document.getElementsByClassName("jsColor");

//input range
const range = document.getElementById("jsRange");

//mode 
const mode = document.getElementById("jsMode");

//
const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE = 700;

//save
const saveBtn = document.getElementById("jsSave");

//clear 강의에 없음
const clearBtn = document.getElementById("jsClear");

//2. 변수(상수) 초기화
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR; //모든 선이 갖는 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선의 기본 넓이(두께)
// ctx.fillStyle="green";
// ctx.fillRect(50,20, 100, 49); //x , y , width, height
// ctx.fillStyle="purple";
// ctx.fillRect(80,100, 100, 49);

let painting = false;
let filling = false;

//3. 함수
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

//마우스를 움직이는 내내 발생
function onMouseMove(event){
    //console.log(event);
    //필요한 값은 offsetX: 698 offsetY: 287 (client는 윈도우 전체)
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x,y);
    if(!painting){
        //console.log("creating path in", x, y);
        ctx.beginPath();
        ctx.moveTo(x,y); //path x,y로 이동
    } else {
        //console.log("creating line in", x, y);
        ctx.lineTo(x,y); //이전위치에서 현재위치까지 라인을 만듬
        ctx.stroke(); // 획을 긋다 
        //ctx.closePath(); 직선을 그린다
    }
}


//canvas를 클릭을 인지하고 그릴 수 있게
// function onMouseDown(event) {
//     //console.log(event);
//     painting = true;
// }


//마우스를 떼면 그리지 않음
function onMouseUp(event){
    stopPainting();
}

//Brush size
function handleRangeChange(event) {
    //console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

//color 변경
function handleColorClick(event) {
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color; //override
    ctx.fillStyle = color;
}

//
function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "FIll";
    } else {
        filling = true;
        mode.innerText = "PAINT";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCavasClick(){
    if(filling) {
        ctx.fillRect(0,0,canvas.width, canvas.height);
        //or ctx.fillStyle(0,0,CANVAS_SIZE,CANVAS_SIZE)
    }
    
}

//우클릭했을 때 이미지 저장이 나오지 않음
function handleCM(event){
    console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL(); //default가 png
    //console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT🌼]";
    //console.log(link);
    link.click();
}

function handleClearClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}
// function onMouseLeave(event) {
//     painting = false;
// } stopPainting 함수로

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //onMouseDown 클릭하면 시작
    canvas.addEventListener("mouseup", stopPainting); //onMouseDown 마우스를 떼면 종료
    canvas.addEventListener("mouseleave", stopPainting); //onMouseLeave
    canvas.addEventListener("click",handleCavasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(clearBtn) {
    clearBtn.addEventListener("click", handleClearClick);
}