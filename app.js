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

//-------------event listeners----------------
button.addEventListener("click", function (event) {
  event.preventDefault();
});

// objects
var finances = {};

function updateFinances() {
  //weekly
  finances.weeklyIncome = getWeeklyCost("#income", "#incomeFreq");
  finances.weeklyTax = calcTax(income) / 52;
  finances.weeklyNet = finances.weeklyIncome - finances.weeklyTax;
  finances.weeklyFood = getWeeklyCost("#food", "#foodFreq");
  finances.weeklyBills = getWeeklyCost("#bills", "#billsFreq");
  finances.weeklyRent = getWeeklyCost("#rent", "#rentFreq");
  finances.weeklySpending = getWeeklyCost("#spending", "#spendingFreq");
  finances.weeklyUnspent = finances.weeklyNet - (finances.weeklyFood + finances.weeklyBills + finances.weeklyRent + finances.weeklySpending)
  //fortnightly
  finances.fortnightlyIncome = finances.weeklyIncome * 2;
  finances.fortnightlyTax = finances.weeklyTax * 2;
  finances.fortnightlyNet = finances.fortnightlyIncome - finances.fortnightlyTax;
  finances.fortnightlyFood = finances.weeklyFood * 2;
  finances.fortnightlyBills = finances.weeklyBills * 2;
  finances.fortnightlyRent = finances.weeklyRent * 2;
  finances.fortnightlySpending = finances.weeklySpending * 2;
  finances.fortnightlyUnspent = finances.fortnightlyNet - (finances.fortnightlyFood + finances.fortnightlyBills + finances.fortnightlyRent + finances.fortnightlySpending)
  //monthly
  finances.monthlyIncome = (finances.weeklyIncome * 52) / 12;
  finances.monthlyTax = (finances.weeklyTax * 52) / 12;
  finances.monthlyNet = finances.monthlyIncome - finances.monthlyTax;
  finances.monthlyFood = (finances.weeklyFood * 52) / 12;
  finances.monthlyBills = (finances.weeklyBills * 52) / 12;
  finances.monthlyRent = (finances.weeklyRent * 52) / 12;
  finances.monthlySpending = (finances.weeklySpending * 52) / 12;
  finances.monthlyUnspent = finances.monthlyNet - (finances.monthlyFood + finances.monthlyBills + finances.monthlyRent + finances.monthlySpending)
  //annually
  finances.annualIncome = finances.weeklyIncome * 52;
  finances.annualTax = finances.weeklyTax * 52;
  finances.annualNet = finances.annualIncome - finances.annualTax;
  finances.annualFood = finances.weeklyFood * 52;
  finances.annualBills = finances.weeklyBills * 52;
  finances.annualRent = finances.weeklyRent * 52;
  finances.annualSpending = finances.weeklySpending * 52;
  finances.annualUnspent = finances.annualNet - (finances.annualFood + finances.annualBills + finances.annualRent + finances.annualSpending)
  //savings
  finances.currentSavings = getValue("#currentSavings");
  finances.weeklyContribution = getWeeklyCost("#contributions", "#contributionsFreq");
  finances.fortnightlyContribution = finances.weeklyContribution * 2;
  finances.monthlyContribution = (finances.weeklyContribution * 52) / 12;
  finances.annualContribution = finances.weeklyContribution * 52;
  finances.sixMonth = finances.currentSavings + (finances.annualContribution / 2);
  finances.oneYear = finances.currentSavings + finances.annualContribution;
  finances.fiveYear = finances.currentSavings + (finances.annualContribution * 5);
  finances.tenYear = finances.currentSavings + (finances.annualContribution * 10);
  finances.twentyYear = finances.currentSavings + (finances.annualContribution * 20);

}


//-------------declare Global variables----------------
var tax,
  gross,
  net,
  food,
  rent,
  bills,
  spending,
  unallowcated,
  sixMonth,
  oneYear,
  fiveYear,
  tenYear,
  twentyYear;


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

function writeValues() {
  incomeWidgetText.innerHTML = income;
  netPayWidgetText.innerHTML = income - tax
  taxPaidWidgetText.innerHTML = taxHelper;
  expensesWidgetText.innerHTML = food + rent + bills + spending;
}

function assignValues(a, b, c, d, e, f, g, h, i, j, k, l, m) {
  tax = a;
  gross = b;
  net = c;
  food = d;
  rent = e;
  bills = f;
  spending = g;
  unallowcated = h;
  sixMonth = i;
  oneYear = j;
  fiveYear = k;
  tenYear = l;
  twentyYear = m;
}

//function to produce graphs
function calc() {
  //calculate all values
  updateFinances();
  //load temp values
  taxHelper = tax;
  netHelper = netPay;
  foodHelper = food;
  rentHelper = rent;
  billsHelper = bills;
  spendingHelper = spending;
  unallowHelper = unspent;

  //chart JS
  google.charts.load("current", {
    packages: ["corechart"]
  });

}

//draw Netpay Pie Chart


//function to change figures of Tax Pie Chart based of frequency
function netPaySwitcher(freq) {
  console.log(`run ${freq}`);
  switch (freq) {
    case "weekly":
      taxHelper = tax / 52;
      netHelper = netPay / 52;
      drawTaxPieChart();

      break;
    case "fortnightly":
      taxHelper = tax / 26;
      netHelper = netPay / 26;
      drawTaxPieChart();

      break;
    case "monthly":
      taxHelper = tax / 12;
      netHelper = netPay / 12;
      drawTaxPieChart();
      break;
    case "yearly":
      taxHelper = tax;
      netHelper = netPay;
      drawTaxPieChart();
      break;

    default:
      break;
  }
}



// google.charts.setOnLoadCallback(drawLineChart);
//   google.charts.setOnLoadCallback(drawPieChart);
//   google.charts.setOnLoadCallback(drawTaxPieChart);
//   graphs.style.display = "grid";

//   widgetContainer.scrollIntoView();