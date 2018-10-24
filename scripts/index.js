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

        },

        /**
         * Toggles ingredient between using/not using and checks what recipes to display
         * @param {string} ingredient - representing ingredient to toggle
         */
        toggleIngredient: function(ingredient) {

            this.pruneUnselectedIngredients();
        },
        search: function() {
          for(var key in this.ingredients) {
            for(var ikey in this.ingredients[key]){
              if(this.ingredients[key][ikey][0].includes(this.searchtext)){
                this.ingredients[key][ikey][2] = false;
              }else{
                this.ingredients[key][ikey][2] = true;
              }
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
