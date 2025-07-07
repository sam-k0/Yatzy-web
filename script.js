
function calculateUpperTotal() {
    // Get the value of each input field, or 0 if crossed
    let ones = document.getElementById('ones-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('ones').value) || 0;
    let twos = document.getElementById('twos-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('twos').value) || 0;
    let threes = document.getElementById('threes-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('threes').value) || 0;
    let fours = document.getElementById('fours-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('fours').value) || 0;
    let fives = document.getElementById('fives-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('fives').value) || 0;
    let sixes = document.getElementById('sixes-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('sixes').value) || 0;

    let upperTotal = ones + twos + threes + fours + fives + sixes;
    document.getElementById('upperTotal').value = upperTotal;

    // Calculate bonus
    let bonus = upperTotal >= 63 ? 35 : 0;
    document.getElementById('bonus').value = bonus;
    // calc missing poits for bonus
    let missingPoints = 63 - upperTotal;
    // set bonus label text
    let lang = document.getElementById('language-select').value;
    let translation = translations[lang];
    let addonText = missingPoints > 0 ? ` (-${missingPoints})` : '';
    document.getElementById('bonus-label').textContent = `${translation['bonus-label']}` + addonText;

    // Also return the value for use in the grand total calculation
    return upperTotal + bonus;
}

function calculateLowerTotal() {
    // Get the value of each input field, or 0 if crossed
    let threeOfAKind = document.getElementById('threeOfAKind-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('threeOfAKind').value) || 0;
    let fourOfAKind = document.getElementById('fourOfAKind-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('fourOfAKind').value) || 0;
    let chance = document.getElementById('chance-label').style.textDecoration === 'line-through' ? 0 : parseInt(document.getElementById('chance').value) || 0;

    let fullHouse = document.getElementById('fullHouse-label').style.textDecoration === 'line-through' ? 0 : document.getElementById('fullHouse').checked ? 25 : 0;
    let smallStraight = document.getElementById('smallStraight-label').style.textDecoration === 'line-through' ? 0 : document.getElementById('smallStraight').checked ? 30 : 0;
    let largeStraight = document.getElementById('largeStraight-label').style.textDecoration === 'line-through' ? 0 : document.getElementById('largeStraight').checked ? 40 : 0;
    let yahtzee = document.getElementById('yatzy-label').style.textDecoration === 'line-through' ? 0 : document.getElementById('yatzy').checked ? 50 : 0;

    let lowerTotal = threeOfAKind + fourOfAKind + fullHouse + smallStraight + largeStraight + yahtzee + chance;
    document.getElementById('lowerTotal').value = lowerTotal;

    // Also return the value for use in the grand total calculation
    return lowerTotal;
}
// Sets the grand total field and updates upper and lower totals
function calculateGrandTotal() {
    let grandTotal = calculateUpperTotal() + calculateLowerTotal();
    document.getElementById('grandTotal').value = grandTotal;
}

function crossOutField(labelId, inputId) {
    let label = document.getElementById(labelId);
    let input = document.getElementById(inputId);

    if (label.style.textDecoration === 'line-through') {
        label.style.textDecoration = 'none';
        input.disabled = false;
        // remove the css class from the table cell
        let cell = label.parentElement;
        cell.classList.remove('crossed');
    } else {
        label.style.textDecoration = 'line-through';
        input.disabled = true;
    
        // get the parent cell of the label
        let cell = label.parentElement;
        cell.classList.add('crossed');
    }

    calculateGrandTotal();
}

// Dictionary of language translations
let translations = {
    // EN
    "en": {
        "header-category": 'Category',
        "header-score": 'Score',
        "ones-label": 'Ones',
        "twos-label": 'Twos',    
        "threes-label": 'Threes',
        "fours-label": 'Fours',
        "fives-label": 'Fives',
        "sixes-label": 'Sixes',
        "total-upper-label": 'Upper Section Total',
        "bonus-label": 'Bonus of 35 (If total >= 63)',
        "threeOfAKind-label": 'Three of a Kind',
        "fourOfAKind-label": 'Four of a Kind',
        "fullHouse-label": 'Full House',
        "smallStraight-label": 'Small Straight',
        "largeStraight-label": 'Big Straight',
        "chance-label": 'Chance',
        "yatzy-label": 'Yatzy',
        "total-lower-label": 'Lower Section Total',
        "total-grand-label": 'Grand Total',
        "tip-crossout": 'Click / tap on a category to cross it out.',
    },
    // DE
    "de": {
        "header-category": 'Kategorie',
        "header-score": 'Punkte',
        "ones-label": 'Einsen',
        "twos-label": 'Zweien',    
        "threes-label": 'Dreien',
        "fours-label": 'Vieren',
        "fives-label": 'Fünfen',
        "sixes-label": 'Sechsen',
        "total-upper-label": 'Summe Oben',
        "bonus-label": '35 Bonus (Wenn Summe >= 63)',
        "threeOfAKind-label": 'Dreierpasch',
        "fourOfAKind-label": 'Viererpasch',
        "fullHouse-label": 'Full House',
        "smallStraight-label": 'Kleine Straße',
        "largeStraight-label": 'Große Straße',
        "chance-label": 'Chance',
        "yatzy-label": 'Yatzy',
        "total-lower-label": 'Summe Unten',
        "total-grand-label": 'Gesamtsumme',
        "tip-crossout": 'Klicken / Tippen Sie auf eine Kategorie, um sie zu durchstreichen.',
    },
    // Hangul
    "kr": {
        "header-category": '카테고리',
        "header-score": '점수',
        "ones-label": '일',
        "twos-label": '이',    
        "threes-label": '삼',
        "fours-label": '사',
        "fives-label": '오',
        "sixes-label": '육',
        "total-upper-label": '상단 총합',
        "bonus-label": '보너스 35 (총합 >= 63)',
        "threeOfAKind-label": '트리플',
        "fourOfAKind-label": '포카드',
        "fullHouse-label": '풀하우스',
        "smallStraight-label": '작은 스트레이트',
        "largeStraight-label": '큰 스트레이트',
        "chance-label": '찬스',
        "yatzy-label": '야츠',
        "total-lower-label": '하단 총합',
        "total-grand-label": '총합',
        "tip-crossout": '카테고리를 클릭하여 취소선을 긋습니다.',
    }

}

function changeLanguage()
{
    // Get the selected language
    let lang = document.getElementById('language-select').value;
    let translation = translations[lang];
    console.log(translation);

    // Update the text content of each label
    for (let key in translation) {
        document.getElementById(key).textContent = translation[key];
    }
}


// Attach event listeners to each input field
document.querySelectorAll('#ones, #twos, #threes, #fours, #fives, #sixes')
    .forEach(input => input.addEventListener('input', calculateGrandTotal));

document.querySelectorAll('#threeOfAKind, #fourOfAKind, #chance')
    .forEach(input => input.addEventListener('input', calculateGrandTotal));

// add event listeners to checkboxes
document.querySelectorAll('#fullHouse, #smallStraight, #largeStraight, #yatzy')
    .forEach(input => input.addEventListener('change', calculateGrandTotal));
