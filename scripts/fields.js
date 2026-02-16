/**
 * Generic Field class to represent a scorecard field
 * Encapsulates the behavior of a field with label, input, and cross-out functionality
 */
class Field {
    constructor(id, labelId, inputId, type = 'number', fixedValue = null) {
        this.id = id;
        this.labelId = labelId;
        this.inputId = inputId;
        this.type = type; // 'number' or 'checkbox'
        this.fixedValue = fixedValue; // For checkbox fields with fixed points (e.g., fullHouse = 25)
        
        this.labelElement = document.getElementById(labelId);
        this.inputElement = document.getElementById(inputId);
    }

    /**
     * Get the current value of the field
     * Returns 0 if crossed out
     */
    getValue() {
        if (this.isCrossed()) {
            return 0;
        }

        if (this.type === 'checkbox') {
            return this.inputElement.checked ? (this.fixedValue || 1) : 0;
        } else {
            return parseInt(this.inputElement.value) || 0;
        }
    }

    /**
     * Set the value of the field
     */
    setValue(value) {
        if (this.type === 'checkbox') {
            this.inputElement.checked = !!value;
        } else {
            this.inputElement.value = value;
        }
    }

    /**
     * Check if the field is crossed out
     */
    isCrossed() {
        return this.labelElement.style.textDecoration === 'line-through';
    }

    /**
     * Toggle the crossed-out state of the field
     */
    toggleCrossOut() {
        if (this.isCrossed()) {
            this.labelElement.style.textDecoration = 'none';
            this.inputElement.disabled = false;
            this.labelElement.parentElement.classList.remove('crossed');
        } else {
            this.labelElement.style.textDecoration = 'line-through';
            this.inputElement.disabled = true;
            this.labelElement.parentElement.classList.add('crossed');
        }
    }

    /**
     * Add a change listener to the input field
     */
    addChangeListener(callback) {
        const eventType = this.type === 'checkbox' ? 'change' : 'input';
        this.inputElement.addEventListener(eventType, callback);
    }

    /**
     * Add a click listener to the label for cross-out functionality
     */
    addCrossOutListener(callback) {
        this.labelElement.addEventListener('click', () => {
            this.toggleCrossOut();
            callback();
        });
    }

    /**
     * Clear the field value
     */
    clear() {
        this.setValue(0);
    }
}
