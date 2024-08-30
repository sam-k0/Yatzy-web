
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
    
    // Also return the value for use in the grand total calculation
    return upperTotal + bonus;
}

function calculateLowerTotal() {
    let threeOfAKind = parseInt(document.getElementById('threeOfAKind').value) || 0;
    let fourOfAKind = parseInt(document.getElementById('fourOfAKind').value) || 0;
    let chance = parseInt(document.getElementById('chance').value) || 0;

    // Full House, Small Straight, Large Straight, Yatzy are checkboxes
    let fullHouse = document.getElementById('fullHouse').checked ? 25 : 0;
    let smallStraight = document.getElementById('smallStraight').checked ? 30 : 0;
    let largeStraight = document.getElementById('largeStraight').checked ? 40 : 0;
    let yahtzee = document.getElementById('yatzy').checked ? 50 : 0;

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
    
        // if input type is checkbox, uncheck it
        if (input.type === 'checkbox') {
            input.checked = false;
        }else
        {
            //input.value = ''; // Clear the input if crossed out
        }
        // assign the css class to the table cell
        // get the parent cell of the label
        let cell = label.parentElement;
        cell.classList.add('crossed');
    }

    calculateGrandTotal();
}


// Attach event listeners to each input field
document.querySelectorAll('#ones, #twos, #threes, #fours, #fives, #sixes')
    .forEach(input => input.addEventListener('input', calculateGrandTotal));

document.querySelectorAll('#threeOfAKind, #fourOfAKind, #chance')
    .forEach(input => input.addEventListener('input', calculateGrandTotal));

// add event listeners to checkboxes
document.querySelectorAll('#fullHouse, #smallStraight, #largeStraight, #yatzy')
    .forEach(input => input.addEventListener('change', calculateGrandTotal));
