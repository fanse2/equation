// Equation Variables
const toggle1 = ["+", "-"];
let slopeFactor = 1;
let xIntercept = 1;

// Dom Object
const signObj1 = document.getElementById("btn-sign1");
const signObj2 = document.getElementById("btn-sign2");
const slopSign = document.getElementById("slop_sign");
const constSign = document.getElementById("const_sign");

const num1 = document.getElementById("num1");
const deno1 = document.getElementById("deno1");

const num2 = document.getElementById("num2");
const deno2 = document.getElementById("deno2");

const frac1 = document.getElementById("frac1");
const frac2 = document.getElementById("frac2");

const valX = document.getElementById("valX");

function toggleVal1() {
  if (signObj1.textContent == toggle1[0]) {
    signObj1.textContent = toggle1[1];
    signObj1.value = toggle1[1];
    slopSign.textContent = toggle1[1];
  } else {
    signObj1.textContent = toggle1[0];
    signObj1.value = toggle1[0];
    slopSign.textContent = "";
  }
  //slopSign.textContent = signObj1.textContent;
}
function toggleVal2() {
  if (signObj2.textContent == toggle1[0]) {
    signObj2.textContent = toggle1[1];
    signObj2.value = toggle1[1];
  } else {
    signObj2.textContent = toggle1[0];
    signObj2.value = toggle1[0];
  }

  constSign.innerHTML = signObj2.textContent;
}

function num1Func() {
  let n1 = parseInt(num1.value);
  let d1 = parseInt(deno1.value);
  let answer1 = n1 / d1;
  if (d1 === 0 || d1 === "+") {
    d1 = 1;
    deno1.value = d1;
  }

  if (answer1 === 1) answer1 = "";
  if (n1 === 0) {
    answer1 = "";
    valX.innerHTML = "";
    if (signObj1.value === "-") {
      toggleVal1();
      constSign.innerHTML = "";
    }
  } else {
    valX.innerHTML = "x";
  }

  if (Number.isInteger(n1 / d1)) {
    frac1.innerHTML = answer1;
  } else {
    frac1.innerHTML = `<table>
          <tr><td>${n1}</td></tr>
          <tr><td class="upper_line">${d1}</td></tr>
        </table>`;
  }
}
function num2Func() {
  let n2 = parseInt(num2.value);
  let d2 = parseInt(deno2.value);
  let answer2 = n2 / d2;
  if (d2 === 0 || d2 === "") {
    d2 = 1;
    deno2.value = d2;
  }

  if (answer2 === 1) answer1 = "";
  if (n2 === 0) {
    answer2 = "";
    const_sign.innerHTML = "";
  } else {
    const_sign.innerHTML = "+";
  }

  if (Number.isInteger(n2 / d2)) {
    frac2.innerHTML = answer2;
  } else {
    frac2.innerHTML = `<table>
          <tr><td>${n2}</td></tr>
          <tr><td class="upper_line">${d2}</td></tr>
        </table>`;
  }
}

signObj1.addEventListener("click", toggleVal1);
signObj2.addEventListener("click", toggleVal2);
num1.addEventListener("keyup", num1Func);
deno1.addEventListener("keyup", num1Func);
num2.addEventListener("keyup", num2Func);
deno2.addEventListener("keyup", num2Func);
