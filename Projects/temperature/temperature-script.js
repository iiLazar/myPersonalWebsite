function showTableElement(el) {
    document.querySelector(el).style.display = 'table-row';
}

function showElement(el) {
    document.querySelector(el).style.display = 'block';
}

function hideElement(el) {
    document.querySelector(el).style.display = 'none';
}

function calcParacetamol(w) {
    let dMin = 10 * w * 5 / 120;
    let dMax = 15 * w * 5 / 120;
    if (w <= 20) {
        dMin = dMin.toFixed(1);
        dMax = dMax.toFixed(1);
    } else  {
        dMin = Math.ceil(dMin);
        dMax = Math.floor(dMax);
    }
    document.querySelector('.paracetamol .dMax').innerHTML = dMax + ' mL';
    document.querySelector('.paracetamol .dMin').innerHTML = dMin + ' mL';
}

function calcIbuprofen100(w) {
    let dMin = 4 * w * 5 / 100;
    let dMax = 10 * w * 5 / 100;
    let dMin200 = dMin / 2;
    let dMax200 = dMax / 2;
    if (w <= 20) {
        dMin = dMin.toFixed(1);
        dMax = dMax.toFixed(1);
        dMin200 = dMin200.toFixed(1);
        dMax200 = dMax200.toFixed(1);
    } else {
        dMin = Math.ceil(dMin);
        dMax = Math.floor(dMax);
        dMin200 = Math.ceil(dMin200);
        dMax200 = Math.floor(dMax200);
    }
    document.querySelector('.ibu100 .dMin').innerHTML = dMin + ' mL';
    document.querySelector('.ibu100 .dMax').innerHTML = dMax + ' mL';
    document.querySelector('.ibu200 .dMin').innerHTML = dMin200 + ' mL';
    document.querySelector('.ibu200 .dMax').innerHTML = dMax200 + ' mL';
}

function suppoCalc(w) {
    if (w <= 17) {
        showElement('.suppo');
        if (w >= 4 && w <= 6) {
                showElement('.eff80');
                hideElement('.eff150');
                hideElement('.febricetSupp');
            } else if (w > 6 && w < 8) {
                showElement('.eff80');
                showElement('.eff150');
                hideElement('.febricetSupp');
            } else if (w >= 8 && w < 12) {
                showElement('.eff150');
                hideElement('.eff80');
                hideElement('.febricetSupp');
            } else if (w === 12) {
                showElement('.eff150');
                showElement('.febricetSupp');
                hideElement('.eff80');
            } else if (w > 12 && w <= 17) {
                showElement('.febricetSupp');
                hideElement('.eff80');
                hideElement('.eff150');
            }
    
        document.querySelector('.suppGeneral').addEventListener('click', function() {
            showElement('.suppDrug');
            document.querySelector('.suppGeneral').addEventListener('click', function() {
                hideElement('.suppDrug');
                document.querySelector('.suppGeneral').addEventListener('click', function() {
                    showElement('.suppDrug');
                });
            });
        });
    }  else {
        hideElement('.suppo');
        hideElement('.suppDrug');
        hideElement('.eff80');
        hideElement('.eff150');
        hideElement('.febricetSupp');
    }
}

function calculateAll() {
    let weight = Number(document.querySelector('#weightInput').value);
    if (weight >= 4 && weight <= 65) {
        calcParacetamol(weight);
        calcIbuprofen100(weight);
        showTableElement('.tableHead');
        showTableElement('.paracetamol');
        showTableElement('.ibuBtn');
        hideElement('.resultPholder');
        suppoCalc(weight);
    } else {
        hideElement('.tableHead');
        hideElement('.paracetamol');
        hideElement('.ibuBtn');
        hideElement('.ibu100');
        hideElement('.ibu200');
        hideElement('.suppo');
        hideElement('.eff80');
        hideElement('.eff150');
        hideElement('.febricetSupp');
        showTableElement('.resultPholder');
    }
}



//num pad: 96-105; num: 48-57; backspace: 8; up, down: 38, 40
window.addEventListener('keydown', function(key) {
    if((key.which >= 96 && key.which <= 105) || (key.which >=48 && key.which <= 57) || (key.which === 8) || (key.which === 13) || (key.which === 38) || (key.which === 40)) {
        setTimeout(function(){calculateAll()}, 1);
    }
});
document.querySelector('.calcBtn').addEventListener('click', function() {
    calculateAll()
});




document.querySelector('.read').addEventListener('mouseover', function() {
    showElement('.important');
});
document.querySelector('.read').addEventListener('mouseout', function() {
    hideElement('.important');
});
    
document.querySelector('.read').addEventListener('click', function() {
    showElement('.important');
});
    
document.querySelector('.important').addEventListener('mouseover', function() {
    showElement('.important');
});
document.querySelector('.important').addEventListener('mouseout', function() {
    hideElement('.important');
});
document.querySelector('.important').addEventListener('click', function() {
    hideElement('.important');
});
    



document.querySelector('.resultPholder').addEventListener('click', function() {
    document.querySelector('#weightInput').focus();
});

document.querySelector('.btn100').addEventListener('click', function() {
    hideElement('.ibu200');
    showTableElement('.ibu100');
});
document.querySelector('.btn200').addEventListener('click', function() {
    hideElement('.ibu100');
    showTableElement('.ibu200');
});





//literature
/*
PARACETAMOL

Efferalgan sup 150mg ALIMS SmPC:
https://www.alims.gov.rs/ciril/files/lekovi/smpc/515-01-04519-16-001.pdf
Preporucena dnevna doza paracetamola zavisi od telesne mase deteta i iznosi oko 60 mg/kg/dan, podeljeno u 4 pojedinacne doze tj. oko 15 mg/kg svakih 6 sati.

https://emedicine.medscape.com/article/2172407-overview
 10-15 mg/kg/dose
 4-6 hours
 not exceed more than 5 doses (2.6 g) in 24 hours
 
 https://www.mydr.com.au/babies-pregnancy/paracetamol-for-children
 10-15 mg per kilogram
  to 6 hours, up to 4 times in 24 hours if needed
  No child should take a total of more than 60 mg per kilogram of their body weight in a day. Caution is needed to never exceed the adult dose of paracetamol (4000 mg/day), which can happen if weight-based dosing is applied to children weighing over 65 kg.
  
  https://bpac.org.nz/2018/paracetamol.aspx
  15 mg/kg per dose, to a maximum of 1 g per dose, every four to six hours, with a maximum of 60 mg/kg daily, without exceeding 4 g daily
  
https://www.healthnavigator.org.nz/tools/p/paracetamol-dose-calculator/
1 month - 18 years 15 mg/kg per dose (maximum 1 g) every four hours; maximum 75 mg/kg per day (without exceeding 4 g) for 48 hours, maximum of 60 mg/kg per day (without exceeding 4 g) thereafter
Note A loading dose of 30 mg/kg (maximum 1.5 g) may be given provided there has been no paracetamol given within the preceding 12 hours
 
  
IBUPROFEN
https://emedicine.medscape.com/article/2172401-overview
4-10 mg/kg/dose;
PO every 6-8 hours;
Maximum single dose is 400 mg/dose
maximum daily dose is 40 mg/kg/day up to 1200 mg/day

Nurofen 100mg/5ml ALIMS SmPC
https://www.alims.gov.rs/ciril/files/lekovi/smpc/515-01-05079-16-001.pdf


https://www.healthnavigator.org.nz/tools/i/ibuprofen-paediatric-dose-calculator/
1 - 3 months
5 mg/kg 3-4 times daily 
5-10 mg/kg 3 or 4 times daily up to 30 mg/kg daily (maximum 2.4 g daily)

https://www.healthychildren.org/English/safety-prevention/at-home/medication-safety/Pages/Ibuprofen-for-Fever-and-Pain.aspx
 */