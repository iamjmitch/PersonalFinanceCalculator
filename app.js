//-------------Get Elements----------------
//Inputs
inputContainer = qs('#inputContainer')

//Graphs
var graphs = qs("#graphs"),
  button = qs("#button");

//Tax Pie Chart
var taxPieTextTax = qs("#taxPieTextTax"),
  taxPieTextNet = qs("#taxPieTextNet"),
  taxPieTextAnnual = qs("#taxPieTextAnnual");

//Cost Breakdown Pie Chart
var breakdownFood = qs("#breakdownFood"),
  breakdownRent = qs("#breakdownRent"),
  breakdownBills = qs("#breakdownBills"),
  breakdownSpending = qs("#breakdownSpending"),
  breakdownUnallow = qs("#breakdownUnallow");

//Widget
var widgetContainer = qs("#widgetContainer"),
  incomeWidgetText = qs("#incomeWidgetText"),
  netPayWidgetText = qs("#netPayWidgetText"),
  taxPaidWidgetText = qs("#taxPaidWidgetText"),
  expensesWidgetText = qs("#expensesWidgetText"),
  contributionsFreqWidget = qs('#contributionsFreq2');

//-------------declare Global variables----------------
var tax,
  gross,
  net,
  food,
  rent,
  bills,
  spending,
  unallowcated,
  totalExpenses;


//-------------event listeners----------------
button.addEventListener("click", function (event) {
  event.preventDefault();
});

// -------------objects----------------

//functions
function qs(element) {
  return document.querySelector(element);
}

//get value of input
function getValue(input) {
  return parseInt(qs(input).value);
}

//convert costs/expenses to weekly
function getWeeklyCost(input, freq) {
  var val = getValue(input);
  var freq = qs(freq).value;
  var weekly;
  switch (freq) {
    case "weekly":
      weekly = val;
      break;
    case "fortnightly":
      weekly = val / 2;
      break;
    case "monthly":
      weekly = (val * 12) / 52;
      break;
    case "yearly":
      weekly = val / 52;
      break;
    default:
      val = "error";
      break;
  }
  return weekly;
}

//calculate tax payable on total income
function calcTax(inc) {
  var income = inc * 52;
  if (income >= 180001) {
    var base = 54097;
    var remaining = income - 180001;
    taxPaid = base + remaining * 0.45;
  } else if (income >= 90001) {
    var base = 20797;
    var remaining = income - 90001;
    taxPaid = base + remaining * 0.37;
  } else if (income >= 37001) {
    var base = 3572;
    var remaining = income - 37001;
    taxPaid = base + remaining * 0.325;
  } else if (income >= 18201) {
    var remaining = income - 18201;
    taxPaid = base + remaining * 0.19;
  } else {
    taxPaid = income;
  }
  return taxPaid;
}

function writeWidgetValues() {
  incomeWidgetText.innerHTML = decimals(gross, 0);
  netPayWidgetText.innerHTML = decimals(net, 0);
  taxPaidWidgetText.innerHTML = decimals(tax, 0);
  expensesWidgetText.innerHTML = decimals(totalExpenses, 0);
}

function assignValues(n, s, e, t, a, l, o, i, d) {
  tax = n, gross = s, net = e, food = t, rent = a, bills = l, totalExpenses = o, spending = i, unallowcated = d;
}


function calc() {
  updateFinances();
  freqChange(contributionsFreqWidget.value);
  writeWidgetValues();
  drawGraphs();
  button.innerHTML = "Update";
  graphs.style.display = "grid";
  widgetContainer.style.display = 'block';
  widgetContainer.scrollIntoView();

}

function freqChange(val) {
  switch (val) {
    case "weekly":
      assignWeekly();
      break;
    case "fortnightly":
      assignFortnightly();
      break;
    case "monthly":
      assignMonthly();
      break;
    case "yearly":
      assignAnnual();
      break;
    default:
      assignWeekly();
      break;
  }
  drawGraphs();
  writeWidgetValues();

}

function assignWeekly() {
  var f = finances;
  assignValues(f.weeklyTax, f.weeklyIncome, f.weeklyNet, f.weeklyFood, f.weeklyRent, f.weeklyBills, f.weeklyTotalExpenses, f.weeklySpending, f.weeklyUnspent);
}

function assignFortnightly() {
  var f = finances;
  assignValues(f.fortnightlyTax, f.fortnightlyIncome, f.fortnightlyNet, f.fortnightlyFood, f.fortnightlyRent, f.fortnightlyBills, f.fortnightlyTotalExpenses, f.fortnightlySpending, f.fortnightlyUnspent);
}

function assignMonthly() {
  var f = finances;
  assignValues(f.monthlyTax, f.monthlyIncome, f.monthlyNet, f.monthlyFood, f.monthlyRent, f.monthlyBills, f.monthlyTotalExpenses, f.monthlySpending, f.monthlyUnspent);
}

function assignAnnual() {
  var f = finances;
  assignValues(f.annualTax, f.annualIncome, f.annualNet, f.annualFood, f.annualRent, f.annualBills, f.annualTotalExpenses, f.annualSpending, f.annualUnspent);
}

function drawGraphs() {
  google.charts.load("current", {
    packages: ["corechart"]
  });
  google.charts.setOnLoadCallback(drawLineChart);
  google.charts.setOnLoadCallback(drawPieChart);
  google.charts.setOnLoadCallback(drawTaxPieChart);
}

function decimals(value, qty, toLocale) {
  //automatically set toLocale to true unless given false 
  toLocale = typeof toLocale !== 'undefined' ? toLocale : true;
  if (toLocale === true) {
    return parseFloat(value.toFixed(qty)).toLocaleString();
  }
  return parseFloat(value.toFixed(qty));
}

function backToTop() {
  inputContainer.scrollIntoView();

}