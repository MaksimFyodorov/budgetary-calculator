var modelController = (function() {
    var data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0,
        },
        budget: 0,
        percentage: -1,
    }

    function Income(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    function Expense(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPerc = function(totalInc) {
        if (totalInc > 0) {
            this.percentage = Math.round(this.value / totalInc * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPerc = function() {
        return this.percentage;
    }

    function calcPercentages() {
        data.allItems.exp.forEach(function(item) {
            item.calcPerc(data.totals.inc)
        })
    }

    function getAllIdsAndPercents() {
        var allPers = data.allItems.exp.map(function(item) {
            return [item.id, item.getPerc()]
        })
        return allPers
    }

    function addItem(type, desc, val) {
        var newItem, ID;

        if (data.allItems[type].length > 0) {
            var lastInd = data.allItems[type].length - 1;
            ID = data.allItems[type][lastInd].id + 1;
        } else {
            ID = 0;
        }

        if (type == "inc") {
            newItem = new Income(ID, desc, val);
        } else if (type == "exp") {
            newItem = new Expense(ID, desc, val);
        }
        data.allItems[type].push(newItem);
        return newItem;
    }

    function deleteItem(type, id) {
        var ids, index;
        ids = data.allItems[type].map(function(item) {
            return item.id;
        });
        index = ids.indexOf(id);
        if (index > -1) {
            data.allItems[type].splice(index, 1);
        }
    }

    function calcTotalSum(type) {
        var sum = 0;
        data.allItems[type].forEach(function(item) {
            sum = sum + item.value;
        });
        return sum;
    }

    function calcBudget() {
        data.totals.inc = calcTotalSum("inc");         
        data.totals.exp = calcTotalSum("exp");
        
        data.budget = data.totals.inc - data.totals.exp;

        if (data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
    }

    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage,
        }
    }

    return {
        addItem,
        calcBudget,
        getBudget,
        deleteItem,
        calcPercentages,
        getAllIdsAndPercents,
        
    }

})()

