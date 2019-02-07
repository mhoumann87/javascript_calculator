const display = document.querySelector(".display");
const clearDisplay = document.querySelector(".clear-display");
const clearAll = document.querySelector(".clear");
const numbers = document.querySelectorAll(".num");
const decimalPoint = document.querySelector("#decimal");
const reverseValue = document.querySelector(".reverse");
const divide = document.querySelector("#divide");
const times = document.querySelector("#times");
const sub = document.querySelector("#sub");
const add = document.querySelector("#addNum");
const equal = document.querySelector("#equal");

let input = "0";
let prevInput = "";
let subTotal = 0;
let prevOperator = "";

const pageInput = num => {
  if (input == "0") {
    input = "";
    input += num.toString();
  } else if (parseFloat(input) == subTotal) {
    input = "";
    input += num.toString();
  } else {
    input += num.toString();
  }
  showInput();
};

const keyboardInput = e => {
  let code = e.keyCode;

  // Of one of the function keya are pushed, do nothing
  if (code >= 112 && code <= 123) {
    return;
  }
  // If the / key not on numpad is pushed
  if (code == 55 && e.shiftKey) {
    code == 999;
    return;
  }
  // If the * key not on numpad is pushed
  if (code == 48 && e.shiftKey) {
    code = 997;
    return;
  }

  // If the = key is pushed
  if (code == 191 && e.shiftKey) {
    code = 998;
    return;
  }

  // If one of the number keya are pushed update the display
  if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
    if (input == "0") {
      input = "";
      input += e.key.toString();
    } else if (parseFloat(input) == subTotal) {
      input = "";
      input += e.key.toString();
    } else {
      input += e.key.toString();
    }
    showInput();
  }

  // If . is pushed
  if (code == 110 || code == 190) {
    addDecimalPoint();
  }

  // If the + key is pushed
  if (code == 107 || code == 187) {
    operations("+");
    showInput();
  }

  // if the - key is pushed
  if (code == 109 || code == 189) {
    operations("-");
    showInput();
  }

  // if the / key is pushed
  if (code == 111 || code == 999) {
    operations("/");
    showInput();
  }

  // If the * key is pushed
  if (code == 106 || code == 998) {
    operations("*");
    showInput();
  }

  // If the = or enter key is pushed
  if (code == 13 || code == 997) {
    operations("=");
    showInput();
  }

  // If tht DEL key is pushed reset all
  if (code == 46) {
    resetAll();
  }

  // If back-space is pushed reset display
  if (code == 8) {
    resetDisplay();
  }
};

// Function where the calculation is handled
const operate = (number, operator) => {
  switch (operator) {
    case "+":
      subTotal += number;
      input = subTotal.toString();
      showInput();
      break;
    case "-":
      subTotal -= number;
      input = subTotal.toString();
      showInput();
      break;
    case "*":
      subTotal *= number;
      input = subTotal.toString();
      showInput();
      break;
    case "/":
      if (subTotal == 0 || number == 0) {
        input = "error";
        break;
      }
      subTotal /= number;
      input = subTotal.toString();
      showInput();
      break;
    case "=":
      input = subTotal;
      showInput();
      subTotal = parseInt(input);
      prevOperator = "=";
      break;
  }
};

// The operation functions takes the input see if the prevOperator is set.
// If it is, send prevOperator and input to operate(), else add the operation to
// prevOperator, and the value of input as number to subTotal and empty input
const operations = opr => {
  if (input === "0" || input === "") {
    input = input;
    showInput();
    return;
  } else if (prevOperator === "" && subTotal == 0) {
    subTotal = parseFloat(input);
    prevOperator = opr;
  } else if (prevOperator === "" && subTotal != 0) {
    input = "error";
    showInput();
  } else if (prevOperator == "=") {
    prevOperator = opr;
  } else {
    operate(parseFloat(input), prevOperator);
    prevOperator = opr;
  }
};

// Add decimal point if there isn't one allready
const addDecimalPoint = () => {
  if (input.indexOf(".") < 0) {
    input += ".";
  } else {
    return;
  }
};

const reverse = () => {
  console.log("clicked");
  let val = parseFloat(input);
  val = -1 * val;
  input = val.toString();
  showInput();
};

// Update the display when something happends
const showInput = () => {
  display.innerText = input;
};

// Reset everything
const resetAll = () => {
  subTotal = 0;
  resetDisplay();
};

// Reset the display to 0
const resetDisplay = () => {
  input = "0";
  showInput();
};

// Get the input from the keyboard if used
document.addEventListener("keydown", e => {
  keyboardInput(e);
});

// Get the input form the calculator buttons
numbers.forEach(number => {
  number.addEventListener("click", e => {
    pageInput(e.target.id);
  });
});

add.addEventListener("click", () => operations("+"));
sub.addEventListener("click", () => operations("-"));
times.addEventListener("click", () => operations("*"));
divide.addEventListener("click", () => operations("/"));
equal.addEventListener("click", () => operations("="));

// Add decimal point when button is clicked
decimalPoint.addEventListener("click", addDecimalPoint);

// Toggle pocitive negative when button +/- is clicked
reverseValue.addEventListener("click", reverse);

// Reset everything when the C button is clicked
clearAll.addEventListener("click", resetAll);

// Reset diaplay when the CE button is clicked
clearDisplay.addEventListener("click", resetDisplay);

// Show the value of input when page is loaded
window.onload = showInput();
