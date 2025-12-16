document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelector('.buttons');
    let isResultDisplayed = false;

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) {
            return;
        }

        const value = target.dataset.value;
        const action = target.dataset.action;

        if (value) {
            // If a result was just displayed, clear the display before adding a new number.
            if (isResultDisplayed) {
                display.value = '';
                isResultDisplayed = false;
            }
            display.value += value;
        }

        if (action) {
            isResultDisplayed = false; // Any action resets this flag
            switch (action) {
                case 'clear':
                    display.value = '';
                    break;
                case 'backspace':
                    display.value = display.value.slice(0, -1);
                    break;
                case 'calculate':
                    calculate();
                    break;
                case 'sin':
                case 'cos':
                case 'tan':
                case 'log':
                case 'sqrt':
                    calculateScientific(action);
                    break;
            }
        }
    });

    function calculate() {
        let expression = display.value;
        try {
            // A safer way to evaluate mathematical expressions than eval()
            const safeEval = new Function('return ' + expression);
            const result = safeEval();
            display.value = result;
            isResultDisplayed = true;
        } catch (error) {
            display.value = 'Error';
            isResultDisplayed = true;
        }
    }

    function calculateScientific(operation) {
        let value = parseFloat(display.value);
        if (isNaN(value)) {
            display.value = 'Error';
            isResultDisplayed = true;
            return;
        }

        let result;
        switch (operation) {
            case 'sin':
                result = Math.sin(value * Math.PI / 180); // Convert degrees to radians
                break;
            case 'cos':
                result = Math.cos(value * Math.PI / 180); // Convert degrees to radians
                break;
            case 'tan':
                result = Math.tan(value * Math.PI / 180); // Convert degrees to radians
                break;
            case 'log': // Changed to base-10 log
                result = Math.log10(value);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
        }
        display.value = result;
        isResultDisplayed = true;
    }
});
