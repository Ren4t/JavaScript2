class Hamburger {
  constructor() {
    this.totalCost = 0;
    this.totalCalories = 0;
  }

  setSize(id) {
    this.size = id;
  }

  setFilling(id) {
    this.filling = id;
  }

  setMayonnaise(id) {
    this.mayonnaise = id;
  }

  setSpice(id) {
    this.spice = id;
  }

  calculationTotalCostAndCalories(ingredients) {
    this.totalCost = 0;
    this.totalCalories = 0;
    let price = 0;
    let calories = 0;
    // создать массив с id ингредиентов для подсчёта цены и калорий
    let arr = Array.from([
      this.size,
      this.filling,
      this.mayonnaise,
      this.spice,
    ]);
    // id совпадает с индексом массива ingredients[id-1]
    arr.forEach((elem) => {
      // проверка на undefined
      price = ingredients[elem - 1]?.price;
      price = price === undefined ? 0 : price;
      calories = ingredients[elem - 1]?.calories;
      calories = calories === undefined ? 0 : calories;
      this.totalCost += price;
      this.totalCalories += calories;
    });
  }
}

class Cafe {
  constructor(title) {
    this.title = title;
  }

  setIngredients() {
    this.ingredients = [
      { id: 1, title: "maxHamburger", price: 100, calories: 40 },
      { id: 2, title: "minHamburger", price: 50, calories: 20 },
      { id: 3, title: "withCheese", price: 10, calories: 20 },
      { id: 4, title: "withSalad", price: 20, calories: 5 },
      { id: 5, title: "withPotatoes", price: 15, calories: 10 },
      { id: 6, title: "spicy", price: 15, calories: 0 },
      { id: 7, title: "mayonnaise", price: 20, calories: 5 },
    ];
  }

  init() {
    this.setIngredients();
    this.totalCostEl = document.querySelector(".total_cost");
    this.totalCaloriesEl = document.querySelector(".total_calories");
    return this;
  }

  start() {
    let hamburger = new Hamburger();
    document.body.addEventListener("input", (event) => {
      this.ingredients.forEach((elem) => {
        // пробегаю по массиву ингредиентов
        if (elem.title === event.target.value) {
          // если есть совпадение с выбранным элементом
          // поиск совпадений и присваивание id ингредиента
          switch (elem.title) {
            case "maxHamburger":
            case "minHamburger":
              hamburger.setSize(elem.id);
              return;
            case "withCheese":
            case "withSalad":
            case "withPotatoes":
              hamburger.setFilling(elem.id);
              return;
            case "spicy":
              // проверка выбора checkbox'a
              if (event.target.checked) {
                hamburger.setSpice(elem.id);
                return;
              }
              hamburger.setSpice(null);
              return;
            case "mayonnaise":
              // проверка выбора checkbox'a
              if (event.target.checked) {
                hamburger.setMayonnaise(elem.id);
                return;
              }
              hamburger.setMayonnaise(null);
              return;
            default:
              return;
          }
        }
      });
      hamburger.calculationTotalCostAndCalories(this.ingredients);
      this.totalCostEl.textContent = hamburger.totalCost;
      this.totalCaloriesEl.textContent = hamburger.totalCalories;
      console.log(hamburger);
    });
  }
}

new Cafe("My Burger").init().start();
