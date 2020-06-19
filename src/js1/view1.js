var viewController = (function() {
    var DOMstrings = {
        form: "#budget-form",
        inputType: "#input__type",        
        inputDescription: "#input__description",    
        inputValue: "#input__value",
        incomeContainer: "#income__list",    
        expenceContainer: "#expenses__list",
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expensesLabel: "#expense-label",
        expensesPercentLabel: "#expense-percent-label",
        budgetTable: "#budget-table",
        monthLabel: "#month",
        yearLabel: "#year",
    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    }

    function renderListItem(obj, type) {
        var containerForReplace, html, newHtml;
        if (type === "inc") {
            containerForReplace = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`
        } else {
            containerForReplace = DOMstrings.expenceContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`
        }

        newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formateNumber(obj.value, type));

        document.querySelector(containerForReplace).insertAdjacentHTML("beforeend", newHtml);
    }

    function clearFields() {
        var inputDesc, inputVal;
        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputDesc.value = "";
        inputDesc.focus();
        inputVal = document.querySelector(DOMstrings.inputValue).value = "";
    }

    function deleteListItem(itemID) {
        document.querySelector(`#${itemID}`).remove();
    }

    function updateBudget(obj, type) {
        if (obj.budget > 0) {
            type = "inc";
        } else if (obj.budget < 0) {
            type = "exp";
        } 

        document.querySelector(DOMstrings.budgetLabel).textContent = formateNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formateNumber(obj.totalInc, "inc");
        document.querySelector(DOMstrings.expensesLabel).textContent = formateNumber(obj.totalExp, "exp");
        if (obj.percentage !== -1) {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = obj.percentage;
        } else {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = "--";
        }
    }

    function updateItemsPercentages(arrContainsArrays) {
        arrContainsArrays.forEach(function(oneOfArrays) {
            var el = document.querySelector(`#exp-${oneOfArrays[0]}`).querySelector(".item__percent");
            if (oneOfArrays[1] >= 0) {
                el.parentElement.style.display = "block";
                el.textContent = oneOfArrays[1];
            } else {
                el.parentElement.style.display = "none";
            }
        })
    }

    function formateNumber(num, type) {
        var numSplit, int, dec, newInt;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split(".");
        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3) {
            newInt = "";
            for(i = 0; i < int.length / 3; i++) {
                newInt = " " + int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + newInt;
            }
            if (newInt[0] === " ") {
                newInt = newInt.substring(1);
            }
        } else {
            newInt = int;
        }
        resultNumber = newInt + "." + dec;

        if (type === "inc") {
            resultNumber = "+ " + resultNumber;
        } else if (type === "exp") {
            resultNumber = "- " + resultNumber;
        }
         
        return resultNumber
    }

    function displayMonth() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth(); 
        var monthArr = [
            "Январь", "Февраль", "Март",
            "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь",
            "Октябрь", "Ноябрь", "Декабрь"
        ]
        month = monthArr[month];
        document.querySelector(DOMstrings.monthLabel).innerText = month;
        document.querySelector(DOMstrings.yearLabel).innerText = year;
    }

    function getDomStrings() {
        return DOMstrings
    }

    return {
        getDomStrings,
        getInput,
        renderListItem,
        clearFields,
        updateBudget,
        deleteListItem,
        updateItemsPercentages,
        displayMonth
    }

})()