// delgtstei ajillah controller
var uiController = (function(){

    // html css deer selectelj bga class, id ner hrve uurchlugdvul hurdan zasah bolomj
    var DOMstrings = {
        inputType : ".add__type",
        inputdescription : ".add__description",
        inputValue : ".add__value",
        addBtn: '.add__btn'
    };

    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, // exp, inc
                description: document.querySelector(DOMstrings.inputdescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    }
})();


// sanhuutei ajillah controller
var financeController = (function(){
    // private func
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    // private func
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // huvisagchdiig ur ashigtai zarlah
    // private data
    var data = {
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    }

    return{
        addItem: function(type, desc, val){

            var item, id;

            // data.items[type] = data var-in items-in 'inc' , 'exp' 2-in orj irsen turliig songoh bolno
            if(data.items[type].lenght === 0) id = 1
            else{
                id = data.items[type][data.items[type].lenght - 1].id + 1;
            }

            if(type === 'inc'){
                item =new Income(id, desc, val);
            }else{
                // type = exp
                item =new Expense(id, desc, val);
            }

            data.items[type].push();
        }
    }
})();


// programm holbogch controller
var appController = (function(uiController, financeController){

    
    var ctrlAddItem  = (function(){
        // 1. oruulah ugudliig delgtsees orj avna
        var input = uiController.getInput();

        // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hdagalna
        financeController.addItem(input.type, input.description, input.value);
        // 3. olj avsan ugugdluufig web deere tohirih hesgt n gargna
        
        // 4. tusviig tootsoolno
        
        // 5. etssiin uldegdel tootsoog delgtsend gargna
    })

    var setupEventListener =  function(){
        
        var DOM = uiController.getDOMstrings();
        
        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
    
        // "ENTER" dragdahad ajilaah eventlistener.
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13 ){
                ctrlAddItem();
            }
        })
    }

    return {
        init: function(){
            console.log("Application started...");
            setupEventListener();
        }
    }

})(uiController, financeController);

appController.init();