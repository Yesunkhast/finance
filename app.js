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
        containerDiv: ".container",
        expensePercentageLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };

    var nodeListForeach = function(list, callback){
        for(var i=0;i<list.length;i++){
            callback(list[i], i);
        }
    };

    var formatMoney = function(too, type){
        too = "" + too;
        var x = too.split("").reverse().join("");
        var y = "";
        var count = 1;
        for(var i=0;i<x.length;i++){
            y=y+x[i];
            if(count % 3 === 0) y=y+",";
            count++;
            var z = y.split("").reverse().join("");
            if(z[0]===",") z = z.substr(1, z.length - 1);
            if(type === 'inc') z = "+ " + z;
            else z = "- " + z;
        }
        return z;
    };

    return{


        displayDate: function(){
            var unuudr = new Date();
            document.querySelector(DOMstrings.dateLabel).textContent =
            unuudr.getFullYear()+ " оны "+  unuudr.getMonth() + " сарын" ;
        },

        changeType: function(){
            var fields = document.querySelectorAll(DOMstrings.inputType + ", "
             + DOMstrings.inputdescription + ", " 
             + DOMstrings.inputValue);

            nodeListForeach(fields, function(el){
                el.classList.toggle("red-focus");
            });

            document.querySelector(DOMstrings.addBtn).classList.toggle("red");
        },

        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, // exp, inc
                description: document.querySelector(DOMstrings.inputdescription).value,
                // temdegtiig Int rurul bolgono
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        displayPercentages: function(allPercentages){
            // zaralgiin NodeList-iig oloh
            var elments = document.querySelectorAll(DOMstrings.expensePercentageLabel);

            // elments.forEach
            // elment bolgonii huvid zarlagiin huviig massivaas avch shivj oruulah
            nodeListForeach(elments, function(el,index){
                el.textContent = allPercentages[index] + "%";
            });
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
            if(tusuv.tusuv > 0) type ="inc";
            else type = "exp";
            document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(tusuv.tusuv, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(tusuv.totalInc, "inc");
            document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(tusuv.totalExp, "exp");
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
            html = html.replace('$$VALUE$$', formatMoney(item.value, type));

            // betlgesen HTML ee DOM ruu hiij ugnu
            // beforeend fdef n duusahiin umnu buyu div duusahaas umn ter hesgt html codiig nemeh
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
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0){
        this.percentage = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentage = 0 ;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

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
            if(data.totals.inc > 0){
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
            }


        },

        calculatePercentages: function() {
            data.items.exp.forEach(function(el) {
              el.calcPercentage(data.totals.inc);
            });
          },
      
          getPercentages: function() {
            var allPercentages = data.items.exp.map(function(el) {
              return el.getPercentage();
            });
      
            return allPercentages;
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
                data.items[type].splice(index,1);
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

        // 3. olj avsan ugugdluufig web deere tohirih hesgt n gargah
        uiController.addListItem(item, input.type);
        uiController.clearFields();
    
        // tusviig shineer tootsoolod delgtsend uzuulne
        updateTusuv();
    };
    });

    var updateTusuv = function(){
    // 4. tusviig tootsoolno
    financeController.tusuvTootsooloh();

    // 5. etssiin uldegdel tootsoog delgtsend gargna
    var tusuv = financeController.tusviigAvah();

    // 6. tusviin tootsoog delgtsend gargana
    uiController.tusviigUzuuleh(tusuv);

    // 7. elmentuudiin huviig huleej avna
    financeController.calculatePercentages();

    // 8. elmentuudiin huviig huleej avna
    var allPercentages = financeController.getPercentages();

    // 9. edgeer huviig delgtsend gargana
    uiController.displayPercentages(allPercentages);
    console.log(allPercentages);
    }

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

        document.querySelector(DOM.inputType).addEventListener("change", uiController.changeType);

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
                updateTusuv();

            }
        });
    }

    return {
        init: function(){
            console.log("Application started...");
            uiController.displayDate();
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            });
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();