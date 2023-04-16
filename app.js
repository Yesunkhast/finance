// delgtstei ajillah controller
var uiController = (function(){

})();


// sanhuutei ajillah controller
var financeController = (function(){

})();


// programm holbogch controller
var appController = (function(uiController, financeController){

    var ctrlAddItem  = (function(){
        // 1. oruulah ugudliig delgtsees orj avna
        console.log("heyyy");
        // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hdagalna

        // 3. olj avsan ugugdluufig web deere tohirih hesgt n gargna

        // 4. tusviig tootsoolno

        // 5. etssiin uldegdel tootsoog delgtsend gargna
    })

    document.querySelector('.add__btn').addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13 ){
            ctrlAddItem();
        }
    })

})(uiController, financeController);