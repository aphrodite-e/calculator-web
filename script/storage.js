const CACHE_KEY = 'calculation_history';

function checkForStorage() {
    return typeof (Storage) !== 'undifined';
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;

        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 3) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector('.history-list');

    historyList.innerHTML = '';

    for (let history of historyData) {
        let element = document.createElement('p');
        element.innerHTML = `${history.firstNumber} ${history.operator} ${history.secondNumber} = ${history.result}`;

        historyList.appendChild(element);
    }
}

renderHistory();