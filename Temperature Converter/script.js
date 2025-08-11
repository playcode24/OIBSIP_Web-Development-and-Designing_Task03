function convertTemperature() {
    const tempInput = document.getElementById('temperature');
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const temperature = parseFloat(tempInput.value);

    if (isNaN(temperature)) {
        showResult('Please enter a valid temperature value', true);
        return;
    }

    if (fromUnit === toUnit) {
        showResult(`${temperature}° (Same unit - no conversion needed)`, false);
        return;
    }

    try {
        const result = performConversion(temperature, fromUnit, toUnit);
        const unitSymbol = getUnitSymbol(toUnit);
        showResult(`${result.toFixed(2)}${unitSymbol}`, false);
    } catch (error) {
        showResult(error.message, true);
    }
}

function performConversion(temp, from, to) {
    let celsius;
    switch (from) {
        case 'celsius': celsius = temp; break;
        case 'fahrenheit': celsius = (temp - 32) * 5/9; break;
        case 'kelvin':
            if (temp < 0) throw new Error('Temperature cannot be below 0 Kelvin');
            celsius = temp - 273.15;
            break;
        default: throw new Error('Invalid source unit');
    }
    switch (to) {
        case 'celsius': return celsius;
        case 'fahrenheit': return (celsius * 9/5) + 32;
        case 'kelvin':
            const kelvin = celsius + 273.15;
            if (kelvin < 0) throw new Error('Temperature cannot be below 0 Kelvin');
            return kelvin;
        default: throw new Error('Invalid target unit');
    }
}

function getUnitSymbol(unit) {
    switch (unit) {
        case 'celsius': return '°C';
        case 'fahrenheit': return '°F';
        case 'kelvin': return 'K';
        default: return '°';
    }
}

function showResult(text, isError) {
    const resultDiv = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    resultDiv.classList.remove('show');
    setTimeout(() => {
        if (isError) {
            resultDiv.classList.add('error');
            resultDiv.querySelector('.result-text').textContent = 'Error:';
            resultValue.textContent = text;
        } else {
            resultDiv.classList.remove('error');
            resultDiv.querySelector('.result-text').textContent = 'Converted Temperature:';
            resultValue.textContent = text;
        }
        resultDiv.classList.add('show');
    }, 150);
}

document.getElementById('temperature').addEventListener('keypress', e => {
    if (e.key === 'Enter') convertTemperature();
});

window.addEventListener('load', () => {
    document.getElementById('temperature').focus();
});
