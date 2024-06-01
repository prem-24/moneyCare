// item controller
const ItemCtrl = (() => {
  const Item = function (id, name, money) {
    this.id = id;
    this.name = name;
    this.money = money;
  };

  const data = {
    items: [
      { id: 0, name: "Clothes", money: 100 },
      { id: 1, name: "Food", money: 200 },
      { id: 2, name: "Bike", money: 300 },
    ],
    totalMoney: 0,
    currentItem: null,
  };

  return {
    getItems: () => {
      return data.items;
    },

    addItem: (name, money) => {
      let ID =
        data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0;
      money = parseInt(money);
      const newItem = new Item(ID, name, money);
      data.items.push(newItem);
      return newItem;
    },
    clearItems: () => {
      data.items = [];
    },
    deleteItem: (id) => {
      // Find index of item with given id
      const index = data.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        // Remove item from array
        data.items.splice(index, 1);
      }
    },


updateItem: (id, name, money) => {
  id = parseInt(id);
  money = parseInt(money);

  const index = data.items.findIndex((item) => item.id === id);
  if (index !== -1) {
    data.items[index].name = name;
    data.items[index].money = money;
  }
}

,
    getTotalMoney: () => {
      if (data.items.length > 0) {
        const total = data.items.reduce((total, item) => {
          return total + item.money;
        }, 0);
        data.totalMoney = total;
        return total;
      } else {
        data.totalMoney = 0;
        return 0;
      }
    },
    showData: (items) => {
      let ul = document.getElementById("item-list");
      ul.innerHTML = "";
    
      items.forEach((item) => {
        let li = document.createElement("li");
        li.className = "collection-item";
        li.id = `item-${item.id}`;
        li.innerHTML = `
          <strong>${item.name} : <em>${item.money}</em></strong>
          <a class="btn-floating pulse right btn"><i class="material-icons edit-btn">edit</i></a>`;
        ul.appendChild(li);
      });
    },
    
    
  };
})();

// ui controller
const UiCtrl = (() => {
  // show data to ui
  return {
    showData: (items) => {
      let ul = document.getElementById("item-list");
      ul.innerHTML = "";

      items.forEach((item) => {
        let li = document.createElement("li");
        li.className = "collection-item";
        li.id = `item-${item.id}`;
        li.innerHTML = `
          <strong>${item.name} : <em>${item.money}</em></strong>
          <a class="btn-floating pulse right btn"><i class="material-icons edit-btn">edit</i></a>`;
        ul.appendChild(li);
      });
    },

    btnHide: () => {
      document.querySelector(".add-btn").style.display = "inline";
      document.querySelector(".update-btn").style.display = "none";
      document.querySelector(".delete-btn").style.display = "none";
      document.querySelector(".back-btn").style.display = "none";
    },

    showEditBtnUi: () => {
      document.querySelector(".add-btn").style.display = "none";
      document.querySelector(".update-btn").style.display = "inline";
      document.querySelector(".delete-btn").style.display = "inline";
      document.querySelector(".back-btn").style.display = "inline";
    },

    getItemInput: () => {
      return {
        name: document.querySelector("#item-name").value,
        money: document.querySelector("#item-money").value,
      };
    },
    deleteAllItems: () => {
      return {
        data: ItemCtrl.getItems(),
      };
    },

    showTotalMoney(total){
      document.querySelector(".total-money").innerText =`Total Expenses : ${total}`;
  },
  };
})();

// app controller
const AppCtrl = ((ItemCtrl, UiCtrl) => {
  // event listeners
  const loadEventListeners = () => {
    // add click event
    document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);

    // edit icon click event
    document.querySelector("#item-list").addEventListener("click", editBtnUi);

    // delete all click event
    document.querySelector(".deleteAll").addEventListener("click", deleteAll);

      // update click event
      document.querySelector(".update-btn").addEventListener("click", UpdateValues);

  //  search
  document.getElementById("search-input").addEventListener("input", searchitem);

    document
      .querySelector(".delete-btn")
      .addEventListener("click", deleteIndivialItem);
  };

  // add click event function
  const itemAddSubmit = () => {
    let input = UiCtrl.getItemInput();

    if (input.name === "" || input.money === "") {
      alert("Please fill all the fields");
    } else {
      let newItem = ItemCtrl.addItem(input.name, input.money);

      let data = ItemCtrl.getItems();
      UiCtrl.showData(data);

      // GET INPUT MONEY
      // GET INPUT MONEY
      const totalMoney = ItemCtrl.getTotalMoney(); 

      // ADD TOTAL MONEY TO UI
      UiCtrl.showTotalMoney(totalMoney);

      // total money

      // Clear the input fields
      document.querySelector("#item-name").value = "";
      document.querySelector("#item-money").value = "";
    }
  };

  // edit click event function
  function editBtnUi(e) {
    if (e.target.classList.contains("edit-btn")) {
      UiCtrl.showEditBtnUi();

      // Get the item ID from the list item ID
      const itemId = parseInt(
        e.target.parentElement.parentElement.id.split("-")[1]
      );

      // Get the item data from ItemCtrl
      const item = ItemCtrl.getItems().find((item) => item.id === itemId);

      // Populate the input fields with the item data
      document.querySelector("#item-name").value = item.name;
      document.querySelector("#item-money").value = item.money;

      // Delete the item using ItemCtrl
      ItemCtrl.deleteItem(itemId);

      // Save the current item being edited in ItemCtrl
      // ItemCtrl.setCurrentItem(item);
    }
  }

  // delete all click event function
  function deleteAll() {
    ItemCtrl.clearItems(); // Clear all items from data structure
    let data = ItemCtrl.getItems(); // Retrieve updated items (empty array)
    UiCtrl.showData(data); // Update UI to reflect the changes
  }

  function deleteIndivialItem(e) {
    if (e.target.classList.contains("delete-btn")) {
      // Get the item ID from the list item ID
      const itemId = parseInt(e.target.parentElement.id.split("-")[1]);

      // Delete the item using ItemCtrl
      ItemCtrl.deleteItem(itemId);

      // Get updated items and display them in UI
      const data = ItemCtrl.getItems();
      UiCtrl.showData(data);
    }
  }

  function UpdateValues(e){
    const input = UiCtrl.getItemInput();
    const itemId = parseInt(e.target.parentElement.id.split("-")[1]);

    ItemCtrl.updateItem(itemId, input.name, input.money);
    
    UiCtrl.btnHide(); // Hide edit buttons
    const data = ItemCtrl.getItems();
    UiCtrl.showData(data);
    const totalMoney = ItemCtrl.getTotalMoney();
    UiCtrl.showTotalMoney(totalMoney);
  }
  function searchitem() {
    let searchQuery = document.getElementById("search-input").value.toLowerCase();
    let data = ItemCtrl.getItems().filter(item => item.name.toLowerCase().includes(searchQuery));
    UiCtrl.showData(data);
  }
  

  return {
    init: () => {
      UiCtrl.btnHide();
      loadEventListeners();
      let data = ItemCtrl.getItems();
      UiCtrl.showData(data);
      const totalMoney = ItemCtrl.getTotalMoney();

      UiCtrl.showTotalMoney(totalMoney);
    
    },
  };
})(ItemCtrl, UiCtrl);

AppCtrl.init();
