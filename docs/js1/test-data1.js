var generateTestData = (function() {
    function ExampleItem (type, desc, sum) {
        this.type = type;
        this.desc = desc;
        this.sum = sum;
    }

    var testData = [
        new ExampleItem("inc", "Зарплата", 4000),
        new ExampleItem("inc", "Партнерская программа", 800),
        new ExampleItem("inc", "Обучение", 400),
        new ExampleItem("inc", "Фриланс", 350),
        new ExampleItem("exp", "Аренда", 1000),
        new ExampleItem("exp", "Продукты", 1200),
        new ExampleItem("exp", "Бензин", 100),
        new ExampleItem("exp", "Инвестиции", 400),
    ]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }

    function insertInUI() {
        var random = getRandomInt(testData.length);
        var randomItem = testData[random];

        document.querySelector("#input__type").value = randomItem.type;
        document.querySelector("#input__description").value = randomItem.desc;
        document.querySelector("#input__value").value = randomItem.sum;    
    }

    return {
        init: insertInUI
    }
})();

generateTestData.init()