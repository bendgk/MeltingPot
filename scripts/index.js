var app = new Vue({
    el: '#cookbook',
    data: {
        // included ingredients, starts off as list of total ingredients
        ingredients: {},
        searchtext: "",
        includedIngredients:[],
        recipes: {},
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
          for(var fullIngredient of this.includedIngredients) {
            var display = false;
            for(var key of this.recipes){
              for(var )
            }
          }
        },

        /**
         * Toggles ingredient between using/not using and checks what recipes to display
         * @param {array} ingredient - representing ingredient to toggle
         */
        toggleIngredient: function(ingredient) {
            if(ingredient[1]){
              toRemove = -1;
              for(var i = 0; i < this.includedIngredients.length; i++){
                if(ingredient[0] == this.includedIngredients[i][0]){
                  toRemove = i;
                  break;
                }
              }
              this.includedIngredients.splice(toRemove, 1);
              for(var key in this.ingredients) {
                for(var ikey in this.ingredients[key]){
                  if(ingredient[0] == this.ingredients[key][ikey][0]){
                    this.ingredients[key][ikey][1] = false;
                  }
                }
              }
            }else{
              this.includedIngredients.push(ingredient);
              for(var key in this.ingredients) {
                for(var ikey in this.ingredients[key]){
                  if(ingredient[0] == this.ingredients[key][ikey][0]){
                    this.ingredients[key][ikey][1] = true;
                  }
                }
              }
            }
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
