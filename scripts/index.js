var app = new Vue({
    el: '#cookbook',
    data: {
        // included ingredients, starts off as list of total ingredients
        ingredients: {},
        
        unincludedIngredients:["Lettuce",
        "Fish",
        "Noodles"
        ],
        // array of currently included ingredients by name
        includedIngredients:[],
        // array of recipes, [0] is recipe name/identifier, [1] is boolean representing whether or not it is currently being displayed, [2] is array of ingredients by name
        recipes: {},
    },
    methods: {
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

        /**
         * Gets image path using name
         * @param {string} name - representing name of image to find
         * @return {string} full image path
         */
        getImagePath: function(name){
            return "Images/" + name + ".jpg";
        },
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
