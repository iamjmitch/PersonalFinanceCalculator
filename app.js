//-------------Get Elements----------------
//Graphs
var graphs = qs("#graphs");
var button = qs("#button");

//Tax Pie Chart
var taxPieTextTax = qs("#taxPieTextTax");
var taxPieTextNet = qs("#taxPieTextNet");
var taxPieTextAnnual = qs("#taxPieTextAnnual");

//Cost Breakdown Pie Chart
var breakdownFood = qs("#breakdownFood");
var breakdownRent = qs("#breakdownRent");
var breakdownBills = qs("#breakdownBills");
var breakdownSpending = qs("#breakdownSpending");
var breakdownUnallow = qs("#breakdownUnallow");

//Widget
var widgetContainer = qs('#widgetContainer');
var incomeWidgetText = qs('#incomeWidgetText');
var netPayWidgetText = qs('#netPayWidgetText');
var taxPaidWidgetText = qs('#taxPaidWidgetText');
var expensesWidgetText = qs('#expensesWidgetText');


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
//setup obj
var finances = {};

//function to grab values from inputs and assign to obj.values
function updateFinances() {
  //weekly
  var f = finances;
  f.weeklyIncome = getWeeklyCost("#income", "#incomeFreq");
  f.weeklyTax = calcTax(f.weeklyIncome) / 52;
  f.weeklyNet = f.weeklyIncome - f.weeklyTax;
  f.weeklyFood = getWeeklyCost("#food", "#foodFreq");
  f.weeklyBills = getWeeklyCost("#bills", "#billsFreq");
  f.weeklyRent = getWeeklyCost("#rent", "#rentFreq");
  f.weeklySpending = getWeeklyCost("#spending", "#spendingFreq");
  f.weeklyTotalExpenses = f.weeklyFood + f.weeklyBills + f.weeklyRent + f.weeklySpending;
  f.weeklyUnspent = f.weeklyNet - (f.weeklyFood + f.weeklyBills + f.weeklyRent + f.weeklySpending)
  //fortnightly
  f.fortnightlyIncome = f.weeklyIncome * 2;
  f.fortnightlyTax = f.weeklyTax * 2;
  f.fortnightlyNet = f.fortnightlyIncome - f.fortnightlyTax;
  f.fortnightlyFood = f.weeklyFood * 2;
  f.fortnightlyBills = f.weeklyBills * 2;
  f.fortnightlyRent = f.weeklyRent * 2;
  f.fortnightlySpending = f.weeklySpending * 2;
  f.fortnightlyTotalExpenses = f.weeklyTotalExpenses * 2;
  f.fortnightlyUnspent = f.fortnightlyNet - (f.fortnightlyFood + f.fortnightlyBills + f.fortnightlyRent + f.fortnightlySpending)
  //monthly
  f.monthlyIncome = (f.weeklyIncome * 52) / 12;
  f.monthlyTax = (f.weeklyTax * 52) / 12;
  f.monthlyNet = f.monthlyIncome - f.monthlyTax;
  f.monthlyFood = (f.weeklyFood * 52) / 12;
  f.monthlyBills = (f.weeklyBills * 52) / 12;
  f.monthlyRent = (f.weeklyRent * 52) / 12;
  f.monthlySpending = (f.weeklySpending * 52) / 12;
  f.monthlyTotalExpenses = (f.weeklyTotalExpenses * 52) / 12;
  f.monthlyUnspent = f.monthlyNet - (f.monthlyFood + f.monthlyBills + f.monthlyRent + f.monthlySpending)
  //annually
  f.annualIncome = f.weeklyIncome * 52;
  f.annualTax = f.weeklyTax * 52;
  f.annualNet = f.annualIncome - f.annualTax;
  f.annualFood = f.weeklyFood * 52;
  f.annualBills = f.weeklyBills * 52;
  f.annualRent = f.weeklyRent * 52;
  f.annualSpending = f.weeklySpending * 52;
  f.annualTotalExpenses = f.weeklyTotalExpenses * 52;
  f.annualUnspent = f.annualNet - (f.annualFood + f.annualBills + f.annualRent + f.annualSpending)
  //savings
  f.currentSavings = getValue("#currentSavings");
  f.weeklyContribution = getWeeklyCost("#contributions", "#contributionsFreq");
  f.fortnightlyContribution = f.weeklyContribution * 2;
  f.monthlyContribution = (f.weeklyContribution * 52) / 12;
  f.annualContribution = f.weeklyContribution * 52;
  f.sixMonth = f.currentSavings + (f.annualContribution / 2);
  f.oneYear = f.currentSavings + f.annualContribution;
  f.fiveYear = f.currentSavings + (f.annualContribution * 5);
  f.tenYear = f.currentSavings + (f.annualContribution * 10);
  f.twentyYear = f.currentSavings + (f.annualContribution * 20);
}
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
  expensesWidgetText.innerHTML = decimals(totalExpenses, 2);
}

function assignValues(n, s, e, t, a, l, o, i, d) {
  tax = n, gross = s, net = e, food = t, rent = a, bills = l, totalExpenses = o, spending = i, unallowcated = d;
}


function calc() {
  updateFinances();
  assignWeekly();
  writeWidgetValues();
  drawGraphs();
  graphs.style.display = "grid";
  widgetContainer.style.display = 'block';
  widgetContainer.scrollIntoView();

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

function decimals(value, qty) {
  return parseFloat(value.toFixed(qty)).toLocaleString();
}