// ************delgtstei ajillah controller*********
// *************************************************
var uiController = (function(){

    // html css deer selectelj bga class, id ner hrve uurchlugdvul hurdan zasah bolomj
    var DOMstrings = {
        inputType : ".add__type",
        inputdescription : ".add__description",
        inputValue : ".add__value",
        addBtn: '.add__btn',
        incomeList: ".income__list",
        expenseList: '.expenses__list',
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        containerDiv: ".container"
    };

    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, // exp, inc
                description: document.querySelector(DOMstrings.inputdescription).value,
                // temdegtiig Int rurul bolgono
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        },

        clearFields: function(){
            // querySelectorAll gdegn ene dotor bga buguugn seletlene gsen ug
            var fields = document.querySelectorAll(DOMstrings.inputdescription + ', ' + DOMstrings.inputValue);

            // Convert List to Array
            var fieldsArr = Array.prototype.slice.call(fields);

            // value gdegn dotorn bga utgiig zaana********

            // for davtaltiig hylbarshuulsan hesg
            fieldsArr.forEach(function(el, index, array){
                el.value = "";
            });

            // for(var i=0;i<fields.length;i++){
            //     fieldsArr[i].value = ""
            // }

            // corsairiig buyu bicih talbariig dahin ehlelru shiljuuleh bolno
            fieldsArr[0].focus();
        },

        tusviigUzuuleh: function(tusuv){
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;
            if(tusuv.huvi !== 0)
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + "%";
            else
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
        },

        deleteListItem: function(id){
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },

        // delgtsend orlogo zarlagiig hevle talbaig haruuldag func
        addListItem: function(item, type){
            // orlogo zarlagiin elmentiig aguulsan html-iig beltegne
            var html, list;

            if(type === "inc"){
                list = DOMstrings.incomeList;
                html =
                '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
            }else{
                list = DOMstrings.expenseList;
                html =
                '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // ter html dotroo zarlagiin utgiidig REPLACE ashiglaj iruurchilj ugnu
            html = html.replace('%id%', item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace('$$VALUE$$', item.value);

            // betlgesen HTML ee DOM ruu hiij ugnu
            // beforeend fdef n duusahiin umnu buyu div duusahaas umn ter hest html codiig nemlj ugnu
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
            
        }
    }

})();

// *************************************************
// ************sanhuutei ajillah controller*********
// *************************************************
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

    var calculateTotal = function(type){
        var sum = 0;
        data.items[type].forEach(function(el){
            sum = sum + el.value;
        });

        data.totals[type] = sum;
    };

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
        },

        tusuv : 0,
        huvi: 0
    }

    return {
        tusuvTootsooloh(){
            // niit orlogiig tootsolno
            calculateTotal('inc');

             // niit zarlagiig tootsolno
            calculateTotal('exp');

            // tusviig shineer tootsoolno
            data.tusuv = data.totals.inc - data.totals.exp;

            // orlogo zarlagin huviig tootolno
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);


        },

        tusviigAvah: function(){
            return{
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

        deleteItem: function(type, id){
            var ids = data.items[type].map(function(el){
                return el.id;
            })

            var index = ids.indexOf(id);
             
            if(index !== -1){
                ids.splice(index,1);
            }
        },

        addItem: function(type, desc, val) {
            var item, id;
            
            if (data.items[type].length === 0) id = 1;
            else {
              id = data.items[type][data.items[type].length - 1].id + 1;
            }
            
            // data.items[type] = data var-in items-in 'inc' , 'exp' 2-in orj irsen turliig songoh bolno
          if (type === "inc") {
            item = new Income(id, desc, val);
          } else {
            // type = exp
            item = new Expense(id, desc, val);
          }
    
          data.items[type].push(item);
    
          return item;
        },
    
        // zuger datag web browser deer harah
        seeData: function() {
          return data;
        }
    }
})();

// ****************************************
// *********programm holbogch controller***
// ****************************************
var appController = (function(uiController, financeController){

    var ctrlAddItem  = (function(){
        // 1. oruulah ugudliig delgtsees orj avna
        var input = uiController.getInput();

        // decription esvel value hooson bvl ajlhagui
        if(input.description !== "" && input.value !== ""){

        // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hdagalna
        var item = financeController.addItem(input.type, input.description, input.value);
    };

    // 3. olj avsan ugugdluufig web deere tohirih hesgt n gargah
    uiController.addListItem(item, input.type);
    uiController.clearFields();

    // 4. tusviig tootsoolno
    financeController.tusuvTootsooloh();

    // 5. etssiin uldegdel tootsoog delgtsend gargna
    var tusuv = financeController.tusviigAvah();

    // 6. tusviin tootsoog delgtsend gargana
    uiController.tusviigUzuuleh(tusuv);
    })

    var setupEventListeners =  function(){
        
        var DOM = uiController.getDOMstrings();
        
        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
    
        // "ENTER" dragdahad ajilaah eventlistener.
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
              ctrlAddItem();
            }
          });

        document.querySelector(DOM.containerDiv).addEventListener('click',function(){
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
            if(id){
                // inc-2
                var arr = id.split('-');
                var type = arr[0];
                var itemId = parseInt(arr[1]);

                // 1. sanhuugin modulaas type, id ashiglaj ustagna.
                financeController.deleteItem(type, itemId);

                // 2. delgets deeres ene elmentiig ustagna
                uiController.deleteListItem(id);

                // 3. uldegdel tootsoog shincilj haruulna

            }
        });
    }

    return {
        init: function(){
            console.log("Application started...");
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            })
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();