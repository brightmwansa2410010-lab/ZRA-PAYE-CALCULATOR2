function calculate() {
    // Get input values
    let basic = Number(document.getElementById("basicPay").value) || 0;
    let allowances = Number(document.getElementById("allowances").value) || 0;
    let other = Number(document.getElementById("otherDeductions")?.value) || 0; // optional if missing

    // Gross Pay
    let gross = basic + allowances;
    document.getElementById("grossPay").textContent = "K " + gross.toFixed(2);

    // NAPSA 5%
    let napsa = gross * 0.05;
    // NHIMA 1%
    let nhima = gross * 0.01;

    document.getElementById("napsa").textContent = "K " + napsa.toFixed(2);
    document.getElementById("nhima").textContent = "K " + nhima.toFixed(2);

    // Total contributions
    let totalContributions = napsa + nhima;
    document.getElementById("totalContributions").textContent = "K " + totalContributions.toFixed(2);

    // Taxable income
    let taxable = gross - napsa; // only NAPSA deducted for PAYE
    let paye = 0;

    // PAYE Bands 2026
    if (taxable <= 5100) {
        paye = 0;
    } else if (taxable <= 7100) {
        paye = (taxable - 5100) * 0.20;
    } else if (taxable <= 9200) {
        paye = (2000 * 0.20) + ((taxable - 7100) * 0.30);
    } else {
        paye = (2000 * 0.20) + (2100 * 0.30) + ((taxable - 9200) * 0.37);
    }

    document.getElementById("paye").textContent = "K " + paye.toFixed(2);

    // Total deductions
    let totalDeductions = totalContributions + paye + other;
    document.getElementById("totalDeductions").textContent = "K " + totalDeductions.toFixed(2);

    // Net salary
    let net = gross - totalDeductions;
    document.getElementById("netSalary").textContent = "K " + net.toFixed(2);
}

function clearForm() {
    // Clear inputs
    document.getElementById("basicPay").value = "";
    document.getElementById("allowances").value = "";
    if (document.getElementById("otherDeductions")) {
        document.getElementById("otherDeductions").value = "";
    }

    // Reset outputs
    document.getElementById("grossPay").textContent = "K 0";
    document.getElementById("napsa").textContent = "K 0";
    document.getElementById("nhima").textContent = "K 0";
    document.getElementById("totalContributions").textContent = "K 0";
    document.getElementById("paye").textContent = "K 0";
    document.getElementById("totalDeductions").textContent = "K 0";
    document.getElementById("netSalary").textContent = "K 0";
}
