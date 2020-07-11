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
    f.weeklyUnspent = f.weeklyNet - (f.weeklyFood + f.weeklyBills + f.weeklyRent + f.weeklySpending);
    //fortnightly
    f.fortnightlyIncome = f.weeklyIncome * 2;
    f.fortnightlyTax = f.weeklyTax * 2;
    f.fortnightlyNet = f.fortnightlyIncome - f.fortnightlyTax;
    f.fortnightlyFood = f.weeklyFood * 2;
    f.fortnightlyBills = f.weeklyBills * 2;
    f.fortnightlyRent = f.weeklyRent * 2;
    f.fortnightlySpending = f.weeklySpending * 2;
    f.fortnightlyTotalExpenses = f.weeklyTotalExpenses * 2;
    f.fortnightlyUnspent = f.fortnightlyNet - (f.fortnightlyFood + f.fortnightlyBills + f.fortnightlyRent + f.fortnightlySpending);
    //monthly
    f.monthlyIncome = (f.weeklyIncome * 52) / 12;
    f.monthlyTax = (f.weeklyTax * 52) / 12;
    f.monthlyNet = f.monthlyIncome - f.monthlyTax;
    f.monthlyFood = (f.weeklyFood * 52) / 12;
    f.monthlyBills = (f.weeklyBills * 52) / 12;
    f.monthlyRent = (f.weeklyRent * 52) / 12;
    f.monthlySpending = (f.weeklySpending * 52) / 12;
    f.monthlyTotalExpenses = (f.weeklyTotalExpenses * 52) / 12;
    f.monthlyUnspent = f.monthlyNet - (f.monthlyFood + f.monthlyBills + f.monthlyRent + f.monthlySpending);
    //annually
    f.annualIncome = f.weeklyIncome * 52;
    f.annualTax = f.weeklyTax * 52;
    f.annualNet = f.annualIncome - f.annualTax;
    f.annualFood = f.weeklyFood * 52;
    f.annualBills = f.weeklyBills * 52;
    f.annualRent = f.weeklyRent * 52;
    f.annualSpending = f.weeklySpending * 52;
    f.annualTotalExpenses = f.weeklyTotalExpenses * 52;
    f.annualUnspent = f.annualNet - (f.annualFood + f.annualBills + f.annualRent + f.annualSpending);
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