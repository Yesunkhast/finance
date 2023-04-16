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
                type: document.querySelector(DOMstrings.inputType).value,
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
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
      
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // huvisagchdiig ur ashigtai zarlah
    var data = {
        allItems: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    }
})();


// programm holbogch controller
var appController = (function(uiController, financeController){

    
    var ctrlAddItem  = (function(){
        // 1. oruulah ugudliig delgtsees orj avna
        console.log(uiController.getInput());
        // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hdagalna
        
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