
var budgetController = (function() {

    var _id = 0;

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {

        if(totalIncome == 0) {
            return 0;
        }
        return Math.round(this.value / totalIncome * 100);
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items: {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    };

    return {
        addItem : function(type, description, value) {
            var newItem;

            switch(type) {
                
                case 'exp':

                    var expVal = value;
                    newItem = new Expense(_id++, description, expVal);
                    data.totals.exp += expVal;
                    break;

                case 'inc':
                    var incVal = value;
                    newItem = new Income(_id++, description, incVal);
                    data.totals.inc += incVal;
                    break;
                
                default: 
                    console.log('addItem unknown type: ' + type);
                    return;
            }

            data.items[type].push(newItem);
            return newItem;
        },
        getData : function() {
            return data;
        },
        getPercentage : function() {
            if(data.totals.inc === 0) {
                return 0;
            }
            return Math.round(data.totals.exp / data.totals.inc * 100);
        },
        deleteOperation : function(type, id) {

            var ids = data.items[type].map(function(current) {
                return current.id;
            });

            var index = ids.indexOf(id);

            if(index !== -1) {
                
                data.totals[type] -= data.items[type][index].value;
                data.items[type].splice(index, 1);
            }
        }
    }
})();

var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        budgetIncomeValue: '.budget__income--value',
        budgetExpensesValue: '.budget__expenses--value',
        budgetValue: '.budget__value',
        budgetExpensesPercentage: '.budget__expenses--percentage',
        container: '.container',
    };

    return {
        initialize: function() {
            document.querySelector(DOMStrings.budgetValue).textContent = "+ 0";
            document.querySelector(DOMStrings.budgetIncomeValue).textContent = '+ 0';
            document.querySelector(DOMStrings.budgetExpensesValue).textContent = '- 0';

            document.querySelector('.budget__income--percentage').innerHTML = '&nbsp;';
            document.querySelector(DOMStrings.budgetExpensesPercentage).innerHTML = "0\%";

            var months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ];
            var now = new Date();

            document.querySelector('.budget__title--month').textContent = months[now.getMonth()] + " " + now.getFullYear();
        },
        getInput: function() {
            return {
                //either inc or exp
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        getDOMStrings: function() {
            return DOMStrings;
        },
        addListItem: function(type, newItem) {
            var DOMList, html;
            switch(type) {
                case 'inc':
                    DOMList = document.querySelector(DOMStrings.incomeList);
                    html = 
                    '<div class="item clearfix" id="inc-%id%"> \
                        <div class="item__description">%description%</div> \
                        <div class="right clearfix"> \
                            <div class="item__value">%value%</div> \
                            <div class="item__delete"> \
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                            </div>\
                        </div>\
                    </div>';

                    break;
                case 'exp':
                    DOMList = document.querySelector(DOMStrings.expensesList);

                    html = 
                    '<div class="item clearfix" id="exp-%id%"> \
                        <div class="item__description">%description%</div> \
                        <div class="right clearfix"> \
                            <div class="item__value">%value%</div> \
                            <div class="item__percentage expense__percentage-%id2%">%percentage%</div> \
                            <div class="item__delete"> \
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                            </div>\
                        </div>\
                    </div>';

                    break;
                default: 
                    console.log('unknown item type: ' + type);
                    return;
            }

            newHtml = html.replace('%id%', newItem.id);
            newHtml = newHtml.replace('%id2%', newItem.id);
            newHtml = newHtml.replace('%description%', newItem.description);
            newHtml = newHtml.replace('%value%', this.formatNumber(newItem.value, type));

            DOMList.insertAdjacentHTML('beforeend', newHtml);

        },
        clearFields: function() {
            var fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            var fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(element, index, array) {
                element.value = "";
            });
        },
        updateBudgetUI : function(budget, expenses) {
            document.querySelector(DOMStrings.budgetIncomeValue).textContent = this.formatNumber(budget.totals.inc, 'inc');
            document.querySelector(DOMStrings.budgetExpensesValue).textContent = this.formatNumber(budget.totals.exp, 'exp');
            
            var type = 'exp';
            if(budget.totals.inc >= budget.totals.exp) {
                type = 'inc';
            }

            document.querySelector(DOMStrings.budgetValue).textContent = this.formatNumber(budget.totals.inc - budget.totals.exp, type);

            document.querySelector(DOMStrings.budgetExpensesPercentage).innerHTML = budget.percentage + "%";

            expenses.forEach(function(expense) {

                var expensePercentageUI = document.querySelector('.expense__percentage-'+expense.id);
                
                var expensePercentage = expense.calcPercentage(budget.totals.inc);
                expensePercentageUI.textContent = expensePercentage+"%";
            });
        },
        deleteNode : function(id) {
            var node = document.getElementById(id);
            node.parentNode.removeChild(node);
        },
        formatNumber : function(num, type) {

            var result = '';
            switch(type) {
                case 'inc':
                    result += '+ ';
                    break;
                
                case 'exp':
                    result += '- ';
                    break;
            }
            var numStr = num.toFixed(2);
            var stack = [];
            var counter = 0;
            var dotIndex = numStr.indexOf('.');
            for(var i = dotIndex-1; i >=0; --i) {
                stack.push(numStr[i]);
                if(++counter === 3 && i > 0) {
                    counter = 0;
                    stack.push(',');
                }
            }

            for(var i = stack.length-1; i >= 0; --i) {
                result += stack[i];
            }

            for(var i = dotIndex; i < numStr.length; ++i) {
                result += numStr[i];
            }
            return result;
        },
        changedType : function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );

            Array.prototype.slice.call(fields).forEach(function(element) {
                element.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.addBtn).classList.toggle('red');
        }
    }
})();

var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        document.querySelector(UICtrl.getDOMStrings().addBtn).onclick = ctrlAddItem;

        document.addEventListener('keypress', function(event) {
            var enterKeyCode = 13;
            if(event.keyCode === enterKeyCode || event.which === enterKeyCode) {
                ctrlAddItem();
            }
        });

        document.querySelector(
            UICtrl.getDOMStrings().container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(UICtrl.getDOMStrings().inputType).addEventListener('change', UICtrl.changedType);
    }

    var updateBudget = function() {
        //Return the budget
        return {totals: budgetCtrl.getData().totals, percentage: budgetCtrl.getPercentage()}
    }

    var ctrlAddItem = function() {
        var input, newItem;
        //Get field input data

        input = UICtrl.getInput();

        // Validate data
        if(!!input.description && !!input.value && input.value > 0) {
            //Add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //Add item to UI
            UICtrl.addListItem(input.type, newItem);

            //Clear Fields
            UICtrl.clearFields();

            //Calculate and display budget
            var budget = updateBudget();

            //Display the budget on the UI
            UICtrl.updateBudgetUI(budget, budgetCtrl.getData().items.exp);
        }

    };

    var ctrlDeleteItem = function(event) {
        
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(!!itemID) {
            
            var splitID = itemID.split('-');
            var type = splitID[0];
            var id = parseInt(splitID[1]);

            budgetCtrl.deleteOperation(type, id);
            UICtrl.deleteNode(itemID);
            var budget = updateBudget();
            UICtrl.updateBudgetUI(budget, budgetCtrl.getData().items.exp);
        }
    };

    return {
        init: function() {
            setupEventListeners();
            UICtrl.initialize();
        }
    }

})(budgetController, UIController);

controller.init();