// Equation Variables
const arrSign = ["+", "-"];
let slopeFactor = 1;
let yIntercept = 1;
/*
  y = mx + b

  [Y] = s1 m1/m2[X]  s2 b1/b2

  [Y] = ss1 mm[X]  ss2 bb
*/
// Dom Object input
const s1 = document.getElementById("btn-sign1");
const s2 = document.getElementById("btn-sign2");

const a1 = document.getElementById("num1");
const a2 = document.getElementById("deno1");

const b1 = document.getElementById("num2");
const b2 = document.getElementById("deno2");

// Dom Object equation
const ss1 = document.getElementById("slop_sign");
const ss2 = document.getElementById("const_sign");

const mm = document.getElementById("frac1");
const bb = document.getElementById("frac2");

const valX = document.getElementById("valX");

function toggleVal1() {
  if (s1.textContent == arrSign[0]) {
    s1.textContent = arrSign[1];
    s1.value = arrSign[1];
    ss1.textContent = arrSign[1];
  } else {
    s1.textContent = arrSign[0];
    s1.value = arrSign[0];
    ss1.textContent = "";
  }
  //ss1.textContent = s1.textContent;

  slopeFactor *= -1;
  drawGraph();
}
function toggleVal2() {
  if (s2.textContent == arrSign[0]) {
    s2.textContent = arrSign[1];
    s2.value = arrSign[1];
  } else {
    s2.textContent = arrSign[0];
    s2.value = arrSign[0];
  }

  ss2.innerHTML = s2.textContent;

  yIntercept *= -1;
  drawGraph();
}

function num1Func() {
  // value m (slope)
  let n1 = parseInt(a1.value);
  let d1 = parseInt(a2.value);
  let answer1 = n1 / d1;

  if (d1 === 0 || d1 === "+") {
    d1 = 1;
    a2.value = d1;
  }

  if (answer1 === 1) answer1 = "";
  if (n1 === 0) {
    answer1 = "";
    valX.innerHTML = "";
    if (s1.value === "-") {
      toggleVal1();
      ss2.innerHTML = "";
    }
  } else {
    valX.innerHTML = "x";
  }

  if (Number.isInteger(n1 / d1)) {
    mm.innerHTML = answer1;
  } else {
    mm.innerHTML = `<table>
          <tr><td>${n1}</td></tr>
          <tr><td class="upper_line">${d1}</td></tr>
        </table>`;
  }
  slopeFactor = (n1 / d1) * (s1.textContent == arrSign[0] ? 1 : -1);
  drawGraph();
}
function num2Func() {
  //value b (y-intersept)
  let n2 = parseInt(b1.value);
  let d2 = parseInt(b2.value);
  let answer2 = n2 / d2;
  if (d2 === 0 || d2 === "") {
    d2 = 1;
    b2.value = d2;
  }

  if (answer2 === 1) answer1 = "";
  if (n2 === 0) {
    answer2 = "";
    const_sign.innerHTML = "";
  } else {
    const_sign.innerHTML = "+";
  }

  if (Number.isInteger(n2 / d2)) {
    bb.innerHTML = answer2;
  } else {
    bb.innerHTML = `<table>
          <tr><td>${n2}</td></tr>
          <tr><td class="upper_line">${d2}</td></tr>
        </table>`;
  }
  yIntercept = (n2 / d2) * (s2.textContent == arrSign[0] ? 1 : -1);
  drawGraph();
}

// Canvas and Graph
const arrNum = [];
for (let i = -10; i <= 10; i++) arrNum.push(i);

const myGraph = document.querySelector("#myGraph");
let ctx = myGraph.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function lx(n) {
  return 250 + 25 * n;
}

function ly(n) {
  return 250 - 25 * n;
}

function initGraph() {
  drawLine(ctx, 0, 250, 500, 250); // x-axis
  drawLine(ctx, 250, 0, 250, 500); // y-axis

  //draw graduations
  arrNum.forEach((n) => drawLine(ctx, lx(n), ly(0) - 3, lx(n), ly(0) + 3));
  arrNum.forEach((n) => drawLine(ctx, lx(0) - 3, ly(n), lx(0) + 3, ly(n)));

  ctx.font = "14px Arial";
  ctx.fillText("5", lx(5) - 4, ly(0) + 14);
  ctx.fillText("10", lx(10) - 16, ly(0) + 14);
  ctx.fillText("-5", lx(-5) - 8, ly(0) + 14);
  ctx.fillText("-10", lx(-10) - 2, ly(0) + 14);
  ctx.fillText("0", lx(0) - 10, ly(0) + 14);

  ctx.fillText("5", lx(0) - 11, ly(5) + 5);
  ctx.fillText("10", lx(0) - 18, ly(10) + 11);
  ctx.fillText("-5", lx(0) - 17, ly(-5) + 5);
  ctx.fillText("-10", lx(0) - 22, ly(-10) - 1);

  //drawLine(ctx, lx(-10), ly(-10), lx(10), ly(10)); // y=x+1
}

function drawGraph() {
  console.log(`${slopeFactor} x , ${yIntercept}`);
  let contacts = [];
  ctx.clearRect(0, 0, 500, 500);
  initGraph();

  //x=10,-19  y=mx+b x=(y-b)/m
  let xp10 = slopeFactor * 10 + yIntercept;
  let xn10 = slopeFactor * -10 + yIntercept;
  let yp10 = (10 - yIntercept) / slopeFactor;
  let yn10 = (-10 - yIntercept) / slopeFactor;

  /*
    right, left, top, bottom

  */
  if (xp10 >= -10 && xp10 <= 10) contacts.push({ x: 10, y: xp10 });
  if (xn10 >= -10 && xn10 <= 10) contacts.push({ x: -10, y: xn10 });
  if (yp10 >= -10 && yp10 <= 10) contacts.push({ x: yp10, y: 10 });
  if (yn10 >= -10 && yn10 <= 10) contacts.push({ x: yn10, y: -10 });

  if (contacts.length >= 2) {
    ctx.strokeStyle = "#FF0000";
    drawLine(
      ctx,
      lx(contacts[0].x),
      ly(contacts[0].y),
      lx(contacts[1].x),
      ly(contacts[1].y)
    );
    ctx.strokeStyle = "#000000";
  }

  console.log(contacts);
}

// Event Listeners
s1.addEventListener("click", toggleVal1);
s2.addEventListener("click", toggleVal2);
a1.addEventListener("keyup", num1Func);
a2.addEventListener("keyup", num1Func);
b1.addEventListener("keyup", num2Func);
b2.addEventListener("keyup", num2Func);
