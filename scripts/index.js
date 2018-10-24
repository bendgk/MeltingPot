var app = new Vue({
    el: '#cookbook',
    data: {
        // included ingredients, starts off as list of total ingredients
        ingredients: {},
        searchtext: "",
        includedIngredients:{},
        recipes: {},
    },
    computed: {
        
    },
    methods: {
        checkshow: function(index, ingdex){
            console.log(!this.ingredients[index][ingdex][1]);
            return (!this.ingredients[index][ingdex][1] && !this.ingredients[index][ingdex][2]);
        },
        /**
         * Toggles display settings of div with specified Id
         * @param {string} id - of specified divider
         */
        toggleShow: function(id) {
            var toToggle = document.getElementById(id);
            var buttonToggle = id +'BUTTON';
            if(!(toToggle.style.display == "none")){
                toToggle.style.display = "none";
                document.getElementById(buttonToggle).innerHTML = "[+]";
            } else {
                toToggle.style.display = "block";
                document.getElementById(buttonToggle).innerHTML = "[-]";
            }
        },

        /**
         * Prunes any recipes that exclude selected ingredients (using global variables so no parameters)
         */
        pruneUnselectedIngredients: function () {
            for (var recipe of this.recipes){
                var display = true;
                for (var ingredient of this.includedIngredients){
                    if(!recipe[2].includes(ingredient)){
                        display = false;
                        break;
                    }
                }
                recipe[1] = display;
            }
        },

        /**
         * Toggles ingredient between using/not using and checks what recipes to display
         * @param {string} ingredient - representing ingredient to toggle
         */
        toggleIngredient: function(ingredient) {
            if(this.includedIngredients.includes(ingredient)){
                this.unincludedIngredients.push(ingredient);
                this.includedIngredients.splice(this.includedIngredients.indexOf(ingredient), 1);
            }
            else{
                this.includedIngredients.push(ingredient);
                this.unincludedIngredients.splice(this.unincludedIngredients.indexOf(ingredient), 1);
            }
            this.pruneUnselectedIngredients();
        },
        search: function() {
            for (var key in this.ingredients){
                for(var ingredient in this.ingredients[key]){
                    if(ingredient[0].includes(this.searchtext)){
                        ingredient[2] = false;
                    }else{
                        ingredient[2] = true;
                    }
                }
            }
            for (var key in this.ingredients){
                for(var ingredient in this.ingredients[key]){
                    console.log(ingredient[2]);
                }
            }
        }
    },
    created() {
        $.getJSON('python_scripts/ingredients.json').then((data) => {
            this.ingredients = data;
        });
        $.getJSON('python_scripts/recipes.json').then((data) => {
            this.recipes = data;
        });
    }
});
