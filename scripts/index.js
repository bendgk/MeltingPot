$( document ).ready(function() {
  var app = new Vue({
    el: '#cookbook',
    data: {
      // included ingredients, starts off as list of total ingredients
      ingredients: {},
      searchtext: "",
      includedIngredients: [],
      recipes: {},
      isMeatIncluded: false,
    },
    methods: {
      checkshow: function(index, ingdex) {
        console.log(!this.ingredients[index][ingdex][1]);
        return (!this.ingredients[index][ingdex][1] && !this.ingredients[
          index][ingdex][2]);
      },
      /**
       * Toggles display settings of div with specified Id
       * @param {string} id - of specified divider
       */
      toggleShow: function(id) {
        var toToggle = document.getElementById(id);
        var buttonToggle = id + 'BUTTON';
        if (!(toToggle.style.display == "none")) {
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
      pruneUnselectedIngredients: function() {
        if (this.includedIngredients.length) {
          for (var key in this.recipes) {
            var display = true;
            for (var includedIngredient of this.includedIngredients) {
              var included = false;
              for (var ingredientKey in this.recipes[key]["ingredients"]) {
                if (this.recipes[key]["ingredients"][ingredientKey][0].includes(
                    includedIngredient[0])) {
                  included = true;
                }
              }
              if (!included) {
                display = false;
              }
            }
            this.recipes[key]["display"] = display;
          }
        } else {
          for (var key in this.recipes) {
            this.recipes[key]['display'] = true;
          }
        }
      },

      /**
       * Toggles ingredient between using/not using and checks what recipes to display
       * @param {array} ingredient - representing ingredient to toggle
       */
      toggleIngredient: function(ingredient) {
        if (ingredient[1]) {
          toRemove = -1;
          for (var i = 0; i < this.includedIngredients.length; i++) {
            if (ingredient[0] == this.includedIngredients[i][0]) {
              toRemove = i;
              break;
            }
          }
          this.includedIngredients.splice(toRemove, 1);
          for (var key in this.ingredients) {
            for (var ikey in this.ingredients[key]) {
              if (ingredient[0] == this.ingredients[key][ikey][0]) {
                this.ingredients[key][ikey][1] = false;
              }
            }
          }
        } else {
          this.includedIngredients.push(ingredient);
          for (var key in this.ingredients) {
            for (var ikey in this.ingredients[key]) {
              if (ingredient[0] == this.ingredients[key][ikey][0]) {
                this.ingredients[key][ikey][1] = true;
              }
            }
          }
        }

        this.pruneUnselectedIngredients();

        //check if meat is in pot
        if (this.includedIngredients.length == 0) this.isMeatIncluded = false;
        for (var i in this.includedIngredients) {
          var meat = ["beef", "pork", "poultry", "fish"];
          console.log(this.includedIngredients[i][0]);
          if (meat.includes(this.includedIngredients[i][0])) {
            this.isMeatIncluded = true;
            break;
          }
          else {
            this.isMeatIncluded = false;
          }
        }
        this.hideUnusableIngredients();
      },

      /**
       * Clear recipe
       */
      clearRecipe: function() {
          let inc_ing = this.includedIngredients.slice(0);
          for (let i = 0; i < inc_ing.length; i++) {
              console.log(i);
              console.log(inc_ing.length)
              this.toggleIngredient(inc_ing[i]);
          }
      },

      search: function() {
        for (var key in this.ingredients) {
          for (var ikey in this.ingredients[key]) {
            if (this.ingredients[key][ikey][0].toLowerCase().includes(this.searchtext.toLowerCase())) {
              this.ingredients[key][ikey][2] = false;
            } else {
              this.ingredients[key][ikey][2] = true;
            }
          }
        }
      },
      setBorder: function(recipe, ingredient) {
        for (var i in this.recipes[recipe]["ingredients"]) {
          if (this.recipes[recipe]["ingredients"][i][0] == ingredient) {
            if (this.recipes[recipe]["ingredients"][i][1]) {
              return "customBorder"
            }
          }
        }

        return ""
      },
      hideUnusableIngredients: function() {
        availableIngredients = []

        for (var recipe in this.recipes) {
          if (this.recipes[recipe]["display"]) {
            for (var ingredient in this.recipes[recipe]["ingredients"]) {
              var data_item = this.recipes[recipe]["ingredients"][ingredient][0].split(",")

              for (var item in data_item) {
                availableIngredients.push(data_item[item].trim());
              }
            }
          }
        }

        availableIngredients = new Set(availableIngredients);

        $('.ing-img').each(function(i, obj) {
          if (availableIngredients.has(obj.name)) {
            $(obj).show();
          }
          else {
            $(obj).hide();
          }
        });

        var meats = ["pork", "beef", "poultry", "fish"];

        if (this.isMeatIncluded) {
          for (meat in meats) {
            $('#' + meats[meat]).hide();
          }

          var imSoTired = [];
          for (var recipe in this.recipes) {
            if (this.recipes[recipe]["display"]) {
              for (var ingredient in this.recipes[recipe]["ingredients"]) {
                if (this.recipes[recipe]["ingredients"][ingredient][1] == false && meats.includes(this.recipes[recipe]["ingredients"][ingredient][0])) {
                  //console.log(this.recipes[recipe]["ingredients"][ingredient][0]);
                  imSoTired.push(this.recipes[recipe]["ingredients"][ingredient][0]);
                }
              }
            }
          }

          imSoTired = new Set(imSoTired);
          console.log(imSoTired);
          $('.ing-img').each(function(i, obj) {
            if (imSoTired.has(obj.name)) {
              $(obj).show();
              $(obj).show();
            }
          });
        }

        else {
          for (meat in meats) {
            $('#' + meats[meat]).show();
          }
        }
      },

      getRecipePath: function(ingredient) {
        var ingredientPath = ingredient[2];
        ingredientPath = ingredientPath.split(",")

        if (ingredientPath.length == 1) {
          return ingredientPath[0];
        }

        else {
          return "/static/images/meat.jpg"
        }
      },
    },

    created() {
      $.getJSON('ingredients.json').then((data) => {
        this.ingredients = data;
      });
      $.getJSON('recipes.json').then((data) => {
        this.recipes = data;
      });
    }
  });
});