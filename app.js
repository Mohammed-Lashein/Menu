
let menu;

let sectionCenter = document.querySelector(".section-center");
let buttonsContainer = document.querySelector(".buttons-container");

window.addEventListener("DOMContentLoaded", function () {
  let promise = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onload = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(Error('Data not found'));
      }
    }
    request.open('GET', './menu.json');
    request.send();
  });
  promise.then((menuItems) => {
    menu = menuItems;
    console.log(menu);

    displayMenuItems(menu);
    displayMenuButtons();

    /*Because I used promises here , the invocation
    of these two functions should be within the then body
    otherwise , an error would occur first when invoking
    displayMenuItems function because we will try to 
    access the menu before it actually has its elements
    from the response */
  })
  
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map((item) => {
    return `<article class="menu-item">
    <img src="${item.img}" alt="menuItem" class="photo" />
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">$${item.price}</h4>
      </header>
      <p class="item-text">
        ${item.desc}
      </p>
    </div>
  </article>`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}

function displayMenuButtons() {
  let categoriesArray = menu.map((item) => {
    return item.category;
  });
  let categories = ['all', ...new Set(categoriesArray)];

  const categoryBtns = categories.map(function (category) {
    return `<button class='filter-btn' data-id='${category}'>
    ${category}
    </button>`;
  }).join('');

  buttonsContainer.innerHTML = categoryBtns;

  let filterBtns = buttonsContainer.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      let category = e.target.dataset.id;
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });

      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}


