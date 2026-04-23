let expression = "0";
let current = "0";
let lastWasEqual = false;
const formul = document.getElementById("formul");
const display = document.getElementById("display");
function updateDisplay() {
  display.textContent = current;
  formul.textContent=expression;
}

// Numbers
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (lastWasEqual) {
      expression = value;
      current = value;
      lastWasEqual = false;
    } 
    else {
      if (current === "0") {
        current = value;
        expression = expression === "0" ? value : expression.slice(0, -1) + value;
      } else {
        current += value;
        expression += value;
      }
    }
    updateDisplay();
  });
});

// Operators
document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    const op = btn.textContent;
    // ✅ CAS CRUCIAL : après "="
    if (lastWasEqual) {
      lastWasEqual = false;
      expression = current; // ← repartir du résultat
    }
    if (/[+\-*/]$/.test(expression)) {
      if (op === "-" && !expression.endsWith("-")) {
        expression += "-";
      } 
    else {
        // remplacer tous les opérateurs à la fin
        expression = expression.replace(/[+\-*/]+$/, op);
    } }
    else {
      expression += op;
    }
    current = op;
    updateDisplay();
  });
});
// Equals
document.getElementById("equals").addEventListener("click", () => {
  try {
    let result = eval(expression);

    // précision
    result = parseFloat(result.toFixed(10));

    formul.textContent = expression ;
    display.textContent = result;

    // 👉 IMPORTANT pour continuer calcul
    expression += " = "+ result.toString();
    current = result.toString();
    lastWasEqual = true;

  } catch {
    display.textContent = "Error";
    expression = "";
    current = "0";
  }
  updateDisplay();
  
});

// Clear
document.getElementById("clear").addEventListener("click", () => {
  expression = "0";
  current = "0";
  lastWasEqual = false;
  formul.textContent="0";
  display.textContent = "0";
  updateDisplay();
});

// Decimal
document.getElementById("decimal").addEventListener("click", () => {
   const parts = expression.split(/[+\-*/]/);
  const lastNumber = parts[parts.length - 1];

  if (!lastNumber.includes(".")) {
    // si dernier caractère est opérateur → commencer par 0.
    if (/[+\-*/]$/.test(expression) || expression === "") {
      expression += "0.";
      current = "0.";
    } else {
      expression += ".";
      current += ".";
    }
  }
});
