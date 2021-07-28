//1. canvas위 마우스 감지
//2. 선 긋기(path canvas api이용한다)
//3. 색상 바꾸기



//canvas는 pixcel 사이즈를 정해줘야함 pixcel modifier
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //contex설정 canvas안 픽셀을 다룬다
//context는 픽셀 컨트롤 fill stroke linewidth path을 가지고 있음
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height =700;

ctx.strokeStyle="#2c2c2c"; //모든 선이 갖는 색
ctx.lineWidth = 2.5; //선의 기본 넓이(두께)

let painting = false;

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

function handleColorClick(event) {
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color; //override
}

// function onMouseLeave(event) {
//     painting = false;
// } stopPainting 함수로

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //onMouseDown 클릭하면 시작
    canvas.addEventListener("mouseup", stopPainting); //onMouseDown 마우스를 떼면 종료
    canvas.addEventListener("mouseleave", stopPainting); //onMouseLeave
}

//console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));