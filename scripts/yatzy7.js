
// Field definitions for upper section
const upperFields = {
    ones: new Field('ones', 'ones-label', 'ones', 'number'),
    twos: new Field('twos', 'twos-label', 'twos', 'number'),
    threes: new Field('threes', 'threes-label', 'threes', 'number'),
    fours: new Field('fours', 'fours-label', 'fours', 'number'),
    fives: new Field('fives', 'fives-label', 'fives', 'number'),
    sixes: new Field('sixes', 'sixes-label', 'sixes', 'number'),
    sevens: new Field('sevens', 'sevens-label', 'sevens', 'number'),
};

// Field definitions for lower section
const lowerFields = {
    threeOfAKind: new Field('threeOfAKind', 'threeOfAKind-label', 'threeOfAKind', 'number'),
    fourOfAKind: new Field('fourOfAKind', 'fourOfAKind-label', 'fourOfAKind', 'number'),
    fullHouse: new Field('fullHouse', 'fullHouse-label', 'fullHouse', 'checkbox', 25),
    smallStraight: new Field('smallStraight', 'smallStraight-label', 'smallStraight', 'checkbox', 30),
    largeStraight: new Field('largeStraight', 'largeStraight-label', 'largeStraight', 'checkbox', 40),
    chance: new Field('chance', 'chance-label', 'chance', 'number'),
    yatzy: new Field('yatzy', 'yatzy-label', 'yatzy', 'checkbox', 50),
};

// Result fields (readonly)
const resultFields = {
    upperTotal: new Field('upperTotal', 'total-upper-label', 'upperTotal', 'number'),
    bonus: new Field('bonus', 'bonus-label', 'bonus', 'number'),
    topBonus: new Field('topBonus', 'top-bonus-label', 'topBonus', 'number'),
    lowerTotal: new Field('lowerTotal', 'total-lower-label', 'lowerTotal', 'number'),
    grandTotal: new Field('grandTotal', 'total-grand-label', 'grandTotal', 'number'),
};

// Combine all fields for easier iteration
const allFields = {
    ...upperFields,
    ...lowerFields,
};

function calculateUpperTotal() {
    // Calculate sum of upper section
    let upperTotal = 0;
    for (let key in upperFields) {
        upperTotal += upperFields[key].getValue();
    }

    resultFields.upperTotal.setValue(upperTotal);

    // Calculate bonus
    let bonus = upperTotal >= 63 ? 35 : 0;
    resultFields.bonus.setValue(bonus);

    // Calculate top bonus
    let topbonus = upperTotal >= 84 ? 35 : 0;
    resultFields.topBonus.setValue(topbonus);
    
    
    // set bonus label text
    let lang = document.getElementById('language-select').value;
    let translation = translations[lang];
    // calc missing points for bonus
    let missingPoints = 63 - upperTotal;
    let addonText = missingPoints > 0 ? ` (-${missingPoints})` : '';
    document.getElementById('bonus-label').textContent = `${translation['bonus-label']}` + addonText;


    // calc missing points for top bonus
    let missingPointsTop = 84 - upperTotal;
    let addonTextTop = missingPointsTop > 0 ? ` (-${missingPointsTop})` : '';
    document.getElementById('top-bonus-label').textContent = `${translation['top-bonus-label']}` + addonTextTop;

    // Return the total including bonus for grand total calculation
    return upperTotal + bonus + topbonus;
}

function calculateLowerTotal() {
    // Calculate sum of lower section number fields
    let lowerTotal = 0;
    for (let key in lowerFields) {
        lowerTotal += lowerFields[key].getValue();
    }

    resultFields.lowerTotal.setValue(lowerTotal);

    // Return the total for grand total calculation
    return lowerTotal;
}

// Sets the grand total field and updates upper and lower totals
function calculateGrandTotal() {
    let grandTotal = calculateUpperTotal() + calculateLowerTotal();
    resultFields.grandTotal.setValue(grandTotal);
}

// Attach event listeners to each input field
function setupFieldListeners() {
    // Upper section fields
    for (let key in upperFields) {
        upperFields[key].addChangeListener(calculateGrandTotal);
        upperFields[key].addCrossOutListener(calculateGrandTotal);
    }

    // Lower section fields
    for (let key in lowerFields) {
        lowerFields[key].addChangeListener(calculateGrandTotal);
        lowerFields[key].addCrossOutListener(calculateGrandTotal);
    }
}

function changeLanguage() {
    // Get the selected language
    let lang = document.getElementById('language-select').value;
    let translation = translations[lang];
    console.log(translation);

    // Update the text content of each label
    for (let key in translation) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translation[key];
        }
    }

    // Recalculate to update bonus text
    calculateGrandTotal();
}

// Initialize field listeners when DOM is ready
document.addEventListener('DOMContentLoaded', setupFieldListeners);
