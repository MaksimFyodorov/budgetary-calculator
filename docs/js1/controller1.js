var controller = (function(model, view) {
    function setupEventListeners() {
        var DOM = view.getDomStrings();
        document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);
        document.querySelector(DOM.budgetTable).addEventListener("click", ctrlDeleteItem);
    }

    function ctrlAddItem(e) {
        e.preventDefault();
        var input = view.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            var newItem = model.addItem(input.type, input.description, parseFloat(input.value));
            view.renderListItem(newItem, input.type);
            view.clearFields();
            generateTestData.init();
            updateBudget();
            updatePercentages();
        }
    }

    function ctrlDeleteItem(e) {
        var itemID, splitID, type, ID;
        if (e.target.closest(".item__remove")) {
            itemID = e.target.closest("li").id;
            splitID = itemID.split("-");
            type = splitID[0];
            ID = parseInt(splitID[1]);
            model.deleteItem(type, ID);
            view.deleteListItem(itemID);
            updateBudget();
            updatePercentages();
        }
    }

    function updatePercentages() {
        model.calcPercentages();
        var idsAndPercents = model.getAllIdsAndPercents();
        view.updateItemsPercentages(idsAndPercents);
    }

    function updateBudget() {
        model.calcBudget();
        var budgetObj = model.getBudget();
        view.updateBudget(budgetObj);
    }

    return {
        init: function() {
            view.displayMonth();
            setupEventListeners();
            view.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            });
        }
    }

})(modelController, viewController)

controller.init()