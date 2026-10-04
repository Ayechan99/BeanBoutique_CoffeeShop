/*SHARED FUNCTIONS*/

document.addEventListener("DOMContentLoaded", function () {
  /* Mobile menu */

  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.onclick = function () {
      nav.classList.toggle("open");
    };
  }

  /*Cart counter */

  updateCount();

  /* Footer newsletter */

  var footerForm = document.getElementById("footerForm");

  if (footerForm) {
    footerForm.onsubmit = function (e) {
      e.preventDefault();

      var footerEmail = document.getElementById("footerEmail");
      var footerMsg = document.getElementById("footerMsg");

      if (!footerEmail || !footerEmail.value.trim()) {
        return;
      }

      if (footerMsg) {
        footerMsg.textContent = "Thanks! You joined our coffee notes.";
      }

      Swal.fire({
        icon: "success",
        title: "Welcome to BeanBoutique!",
        text: "Thanks! You joined our coffee notes.",
        confirmButtonText: "Lovely!",
        confirmButtonColor: "#472924",
        background: "#fffdf9",
        color: "#806654",
      });

      footerForm.reset();
    };
  }
});

/* CART FUNCTIONS */
/* Get cart from localStorage */

function getCart() {
  return JSON.parse(localStorage.getItem("beanCart")) || [];
}

/* Save cart */

function saveCart(cart) {
  localStorage.setItem("beanCart", JSON.stringify(cart));

  updateCount();
}

/* Update cart counter */

function updateCount() {
  var cartCount = document.getElementById("cartCount");

  if (!cartCount) {
    return;
  }

  var cart = getCart();
  var totalQuantity = 0;

  cart.forEach(function (item) {
    totalQuantity += Number(item.quantity) || 0;
  });

  cartCount.textContent = totalQuantity;
}

/* ADD NORMAL PRODUCT TO CART */

function addToCart(name, price) {
  var cart = getCart();

  var existingItem = cart.find(function (item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      quantity: 1,
    });
  }

  saveCart(cart);

  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "success",
      title: "Added to cart!",
      text: name + " has been added to your basket.",
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping",
      confirmButtonColor: "#472924",
      cancelButtonColor: "#806654",
      background: "#fffdf9",
      color: "#806654",
    }).then(function (result) {
      if (result.isConfirmed) {
        window.location.href = "cart.html";
      }
    });
  }
}

/* HOME PAGE */

var slide = 0;

/* Show home slider */

function showSlide(number) {
  var slides = document.querySelectorAll(".slide");

  if (!slides.length) {
    return;
  }

  if (number >= slides.length) {
    slide = 0;
  }

  if (number < 0) {
    slide = slides.length - 1;
  }

  slides.forEach(function (item) {
    item.classList.remove("active");
  });

  slides[slide].classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  /* Home slider */

  var nextBtn = document.getElementById("next");

  var prevBtn = document.getElementById("prev");

  if (nextBtn && prevBtn) {
    showSlide(slide);

    nextBtn.onclick = function () {
      slide++;
      showSlide(slide);
    };

    prevBtn.onclick = function () {
      slide--;
      showSlide(slide);
    };

    setInterval(function () {
      slide++;
      showSlide(slide);
    }, 5000);
  }

  /* Welcome discount popup */

  var modal = document.getElementById("modal");

  var closeBtn = document.getElementById("close");

  var discountForm = document.getElementById("discountForm");

  if (modal && !localStorage.getItem("registered")) {
    window.addEventListener("scroll", function showWelcomePopup() {
      if (window.scrollY > 150) {
        modal.classList.add("show");

        window.removeEventListener("scroll", showWelcomePopup);
      }
    });
  }

  /* Close popup */

  if (closeBtn && modal) {
    closeBtn.onclick = function () {
      modal.classList.remove("show");
    };
  }

  /* Registration / BEAN39*/

  if (discountForm) {
    discountForm.onsubmit = function (e) {
      e.preventDefault();

      localStorage.setItem("registered", "1");

      var discountMsg = document.getElementById("discountMsg");

      if (discountMsg) {
        discountMsg.textContent =
          "Thanks for registering! Your code is BEAN39.";
      }

      if (modal) {
        modal.classList.remove("show");
      }

      Swal.fire({
        icon: "success",
        title: "You're all set!",
        text: "Your 50% first-order discount code is BEAN39.",
        confirmButtonText: "Start Shopping",
        confirmButtonColor: "#472924",
        background: "#fffdf9",
        color: "#806654",
      });
    };
  }

  /*Home search */

  var homeSearch = document.getElementById("homeSearch");

  if (homeSearch) {
    homeSearch.oninput = function () {
      var searchText = homeSearch.value.toLowerCase();

      document.querySelectorAll("[data-search]").forEach(function (item) {
        item.classList.toggle(
          "hide",
          searchText && !item.textContent.toLowerCase().includes(searchText),
        );
      });
    };
  }
});

/* COFFEE PAGE */

document.addEventListener("DOMContentLoaded", function () {
  var coffeeSearch = document.getElementById("coffeeSearch");

  var products = document.querySelectorAll(".product");

  var filterButtons = document.querySelectorAll(".filter button");

  if (coffeeSearch && products.length) {
    function filterCoffee() {
      var searchText = coffeeSearch.value.toLowerCase();

      var activeFilter = document.querySelector(".filter .active");

      var category = activeFilter ? activeFilter.dataset.cat : "all";

      products.forEach(function (product) {
        var matchesSearch = product.textContent
          .toLowerCase()
          .includes(searchText);

        var matchesCategory =
          category === "all" || product.dataset.cat === category;

        product.classList.toggle("hide", !(matchesSearch && matchesCategory));
      });
    }

    coffeeSearch.oninput = filterCoffee;

    filterButtons.forEach(function (button) {
      button.onclick = function () {
        filterButtons.forEach(function (item) {
          item.classList.remove("active");
        });

        button.classList.add("active");

        filterCoffee();
      };
    });
  }
});

/* EQUIPMENT PAGE */

document.addEventListener("DOMContentLoaded", function () {
  var equipmentSearch = document.getElementById("equipmentSearch");

  if (equipmentSearch) {
    equipmentSearch.oninput = function () {
      var searchText = equipmentSearch.value.toLowerCase();

      document.querySelectorAll(".equipment").forEach(function (item) {
        item.classList.toggle(
          "hide",
          !item.textContent.toLowerCase().includes(searchText),
        );
      });
    };
  }
});

/* EVENTS PAGE */

document.addEventListener("DOMContentLoaded", function () {
  var eventForm = document.getElementById("eventForm");

  if (!eventForm) {
    return;
  }

  eventForm.onsubmit = function (e) {
    e.preventDefault();

    /* Get form values */

    var firstInput = document.getElementById("first");
    var lastInput = eventForm.elements["lastName"];
    var emailInput = eventForm.elements["email"];
    var eventInput = eventForm.elements["event"];
    var eventMsg = document.getElementById("eventMsg");

    var first = firstInput ? firstInput.value.trim() : "";

    var last = lastInput ? lastInput.value.trim() : "";

    var email = emailInput ? emailInput.value.trim().toLowerCase() : "";

    var eventName = eventInput ? eventInput.value.trim() : "";

    /* Check required information */

    if (!first || !last || !email || !eventName) {
      if (eventMsg) {
        eventMsg.textContent = "Please complete all required fields.";
      }

      Swal.fire({
        icon: "error",
        title: "Missing information",
        text: "Please complete all required fields.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#472924",
        background: "#fffdf9",
        color: "#806654",
      });

      return;
    }

    /* Get previous registrations */

    var registrations =
      JSON.parse(localStorage.getItem("beanEventRegistrations")) || [];

    /* Check duplicate email for the same event */

    var alreadyRegistered = registrations.some(function (registration) {
      return registration.email === email && registration.event === eventName;
    });

    if (alreadyRegistered) {
      if (eventMsg) {
        eventMsg.textContent =
          "This email is already registered for this event.";
      }

      Swal.fire({
        icon: "warning",
        title: "Already registered",
        text: "This email address is already registered for this event.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#472924",
        background: "#fffdf9",
        color: "#806654",
      });

      return;
    }

    /* Save registration */

    registrations.push({
      firstName: first,
      lastName: last,
      email: email,
      event: eventName,
      date: new Date().toISOString(),
    });

    localStorage.setItem(
      "beanEventRegistrations",
      JSON.stringify(registrations),
    );

    /* Display success message */

    if (eventMsg) {
      eventMsg.textContent =
        "Registration successful! We look forward to seeing you.";
    }

    Swal.fire({
      icon: "success",
      title: "Registration successful!",
      text:
        "Thank you, " + first + "! You are registered for " + eventName + ".",
      confirmButtonText: "Great!",
      confirmButtonColor: "#472924",
      background: "#fffdf9",
      color: "#806654",
    });

    /* Clear form */

    eventForm.reset();
  };
});

/* OFFERS PAGE */
/*Get today's date.*/

function getTodayDate() {
  var today = new Date();

  var year = today.getFullYear();

  var month = String(today.getMonth() + 1).padStart(2, "0");

  var day = String(today.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}

/*Check whether an offer is currently active.*/

function isOfferActive(offer) {
  var today = getTodayDate();

  var start = offer.dataset.start;

  var end = offer.dataset.end;

  if (!start || !end) {
    return true;
  }

  return today >= start && today <= end;
}

/*Disable limited-time offers outside their promotional period.*/

function checkLimitedOffers() {
  document.querySelectorAll(".limited-offer").forEach(function (offer) {
    var button = offer.querySelector(".offerBtn, .comboBtn");

    if (!isOfferActive(offer)) {
      offer.classList.add("expired");

      if (button) {
        button.disabled = true;

        button.textContent = "Offer Expired";
      }

      var status = offer.querySelector(".offer-status");

      if (status) {
        status.textContent = "This offer is no longer available.";
      }
    }
  });
}

/*Add a discounted coffee to cart.*/

function addOfferToCart(name, price) {
  addToCart(name, price);
}

/*Add Buy One Get One / Pair Deal.*/

function addComboToCart(buyName, buyPrice, secondName, secondPrice) {
  var cart = getCart();

  /* Add first item */

  var firstItem = cart.find(function (item) {
    return item.name === buyName;
  });

  if (firstItem) {
    firstItem.quantity++;
  } else {
    cart.push({
      name: buyName,
      price: Number(buyPrice),
      quantity: 1,
    });
  }

  /* Add discounted second item */

  var secondItem = cart.find(function (item) {
    return item.name === secondName;
  });

  if (secondItem) {
    secondItem.quantity++;
  } else {
    cart.push({
      name: secondName,
      price: Number(secondPrice),
      quantity: 1,
    });
  }

  saveCart(cart);

  Swal.fire({
    icon: "success",

    title: "Coffee deal added!",

    text: buyName + " + " + secondName + " have been added to your basket.",

    showCancelButton: true,

    confirmButtonText: "Go to Cart",

    cancelButtonText: "Continue Shopping",

    confirmButtonColor: "#472924",

    cancelButtonColor: "#806654",

    background: "#fffdf9",

    color: "#806654",
  }).then(function (result) {
    /*Go to cart*/

    if (result.isConfirmed) {
      window.location.href = "cart.html";
    }
  });
}

/* Offers page setup */

document.addEventListener("DOMContentLoaded", function () {
  /* Check promotional dates */

  checkLimitedOffers();

  /* Individual discounted coffee buttons*/

  document.querySelectorAll(".offerBtn").forEach(function (button) {
    button.onclick = function () {
      var offer = button.closest(".limited-offer");

      if (offer && !isOfferActive(offer)) {
        Swal.fire({
          icon: "warning",

          title: "Offer expired",

          text: "This promotional offer is no longer available.",

          confirmButtonText: "Okay",

          confirmButtonColor: "#472924",

          background: "#fffdf9",

          color: "#806654",
        });

        return;
      }

      var name = button.dataset.name;

      var price = parseFloat(button.dataset.price);

      addOfferToCart(name, price);
    };
  });

  /* Buy-one / pair deals */

  document.querySelectorAll(".comboBtn").forEach(function (button) {
    button.onclick = function () {
      var offer = button.closest(".limited-offer");

      if (offer && !isOfferActive(offer)) {
        Swal.fire({
          icon: "warning",

          title: "Offer expired",

          text: "This promotional offer is no longer available.",

          confirmButtonText: "Okay",

          confirmButtonColor: "#472924",

          background: "#fffdf9",

          color: "#806654",
        });

        return;
      }

      var buyName = button.dataset.buy;

      var buyPrice = parseFloat(button.dataset.buyPrice);

      var giftName = button.dataset.gift;

      var giftPrice = parseFloat(button.dataset.giftPrice);

      addComboToCart(buyName, buyPrice, giftName, giftPrice);
    };
  });

  /* Subscription plans */

  document.querySelectorAll(".planBtn").forEach(function (button) {
    button.onclick = function () {
      var name = button.dataset.plan;

      var price = parseFloat(button.dataset.price);

      addToCart(name, price);
    };
  });

  /* FAQ */

  document.querySelectorAll(".question").forEach(function (question) {
    question.onclick = function () {
      question.parentElement.classList.toggle("open");
    };
  });
});

/*CART PAGE */
/*Tax rate*/

var TAX_RATE = 0.05;

/*Current discount percentage.*/

var discount = 0;

/*Render cart when cart page loads.*/

document.addEventListener("DOMContentLoaded", function () {
  var itemsBox = document.getElementById("items");

  if (!itemsBox) {
    return;
  }

  render();

  var promoButton = document.getElementById("promo");

  var checkoutButton = document.getElementById("checkout");

  if (promoButton) {
    promoButton.onclick = promo;
  }

  if (checkoutButton) {
    checkoutButton.onclick = checkout;
  }
});

/* RENDER CART */

function render() {
  var cart = getCart();

  var box = document.getElementById("items");

  if (!box) {
    return;
  }

  var subtotal = 0;

  box.innerHTML = "";

  /* Empty cart */

  if (!cart.length) {
    box.innerHTML =
      '<div class="box content">' +
      "<h2>Your basket is empty</h2>" +
      '<a class="button" href="coffee.html">' +
      "Browse coffee" +
      "</a>" +
      "</div>";

    updateCartTotals(0, 0, 0, 0);

    return;
  }

  /* Display items */

  cart.forEach(function (item, index) {
    var itemPrice = Number(item.price) || 0;

    var quantity = Number(item.quantity) || 0;

    subtotal += itemPrice * quantity;

    box.innerHTML +=
      '<div class="cart-row">' +
      "<div>" +
      "<b>" +
      escapeHTML(item.name) +
      "</b>" +
      "<br>$" +
      itemPrice.toFixed(2) +
      "</div>" +
      '<div class="qty">' +
      "<button " +
      'type="button" ' +
      'onclick="change(' +
      index +
      ',-1)">' +
      "−" +
      "</button>" +
      quantity +
      "<button " +
      'type="button" ' +
      'onclick="change(' +
      index +
      ',1)">' +
      "+" +
      "</button>" +
      "</div>" +
      "<button " +
      'class="remove" ' +
      'type="button" ' +
      'onclick="removeItem(' +
      index +
      ')">' +
      "Remove" +
      "</button>" +
      "</div>";
  });

  /* Discount */

  var discountAmount = subtotal * discount;

  /*Amount after discount */

  var afterDiscount = subtotal - discountAmount;

  /* Tax is calculated AFTER promotional discount. */

  var tax = afterDiscount * TAX_RATE;

  /* Final total */

  var total = afterDiscount + tax;

  updateCartTotals(subtotal, discountAmount, tax, total);
}

/* UPDATE CART TOTALS*/

function updateCartTotals(subtotal, discountAmount, tax, total) {
  var sub = document.getElementById("sub");

  var disc = document.getElementById("disc");

  var taxElement = document.getElementById("tax");

  var totalElement = document.getElementById("total");

  if (sub) {
    sub.textContent = "$" + subtotal.toFixed(2);
  }

  if (disc) {
    disc.textContent = "-$" + discountAmount.toFixed(2);
  }

  if (taxElement) {
    taxElement.textContent = "$" + tax.toFixed(2);
  }

  if (totalElement) {
    totalElement.textContent = "$" + total.toFixed(2);
  }
}

/* CHANGE QUANTITY */

function change(index, amount) {
  var cart = getCart();

  if (!cart[index]) {
    return;
  }

  cart[index].quantity += amount;

  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }

  saveCart(cart);

  render();
}

/* REMOVE ITEM */

function removeItem(index) {
  var cart = getCart();

  if (!cart[index]) {
    return;
  }

  var removedItem = cart[index].name;

  Swal.fire({
    title: "Remove item?",

    text: removedItem + " will be removed from your basket.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Yes, remove it",

    cancelButtonText: "Keep it",

    confirmButtonColor: "#472924",

    cancelButtonColor: "#91664a",

    background: "#fffdf9",

    color: "#806654",
  }).then(function (result) {
    if (result.isConfirmed) {
      cart.splice(index, 1);

      saveCart(cart);

      render();

      Swal.fire({
        icon: "success",

        title: "Removed",

        text: removedItem + " has been removed from your basket.",

        confirmButtonText: "Okay",

        confirmButtonColor: "#472924",

        background: "#fffdf9",

        color: "#806654",
      });
    }
  });
}

/* PROMO CODE */

function promo() {
  var promoInput = document.getElementById("promoCode");

  var promoMessage = document.getElementById("promoMsg");

  if (!promoInput) {
    return;
  }

  var code = promoInput.value.trim().toUpperCase();

  /*BEAN39 = 50% first-order discount.*/

  if (code === "BEAN39") {
    /*Only allow BEAN39 if the visitor has registered.*/

    if (!localStorage.getItem("registered")) {
      discount = 0;

      if (promoMessage) {
        promoMessage.textContent = "Please register first to use BEAN39.";
      }

      Swal.fire({
        icon: "warning",

        title: "Registration required",

        text: "Please register for the first-order offer before using BEAN39.",

        confirmButtonText: "Okay",

        confirmButtonColor: "#472924",

        background: "#fffdf9",

        color: "#806654",
      });

      render();

      return;
    }

    /*BEAN39 can only be used once*/
    if (localStorage.getItem("bean39Used")) {
      discount = 0;
      if (promoMessage) {
        promoMessage.textContent = "BEAN39 has already been used.";
      }
      Swal.fire({
        icon: "info",
        title: "Offer already used",
        text: "BEAN39 is only available for your first purchase.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#472924",
        background: "#fffdf9",
        color: "#806654",
      });
      render();
      return;
    }

    /*Apply 50% discount*/
    discount = 0.5;

    if (promoMessage) {
      promoMessage.textContent = "BEAN39 applied: 50% off your first order.";
    }

    Swal.fire({
      icon: "success",

      title: "Promo applied!",

      text: "BEAN39 gives you 50% off your first order.",

      confirmButtonText: "Great!",

      confirmButtonColor: "#472924",

      background: "#fffdf9",

      color: "#806654",
    });

    /*Invalid promocode*/
  } else {
    discount = 0;

    if (promoMessage) {
      promoMessage.textContent = "Enter BEAN39 for the first-order discount.";
    }

    Swal.fire({
      icon: "error",

      title: "Invalid promo code",

      text: "Please enter BEAN39 for the first-order discount.",

      confirmButtonText: "Try Again",

      confirmButtonColor: "#472924",

      background: "#fffdf9",

      color: "#806654",
    });
  }

  render();
}

/* CHECKOUT */

function checkout() {
  var cart = getCart();

  /* Empty cart */

  if (!cart.length) {
    Swal.fire({
      icon: "warning",

      title: "Your basket is empty",

      text: "Add some coffee or a subscription before checking out.",

      confirmButtonText: "Browse Coffee",

      confirmButtonColor: "#472924",

      background: "#fffdf9",

      color: "#806654",
    });

    return;
  }

  /* Get final total */

  var totalElement = document.getElementById("total");

  var total = totalElement ? totalElement.textContent : "$0.00";

  /* Checkout message */

  Swal.fire({
    icon: "success",

    title: "Order placed!",

    text:
      "Thank you for your order. Your total was " + total + " including tax.",

    confirmButtonText: "Continue",

    confirmButtonColor: "#472924",

    background: "#fffdf9",

    color: "#806654",
  }).then(function () {
    /*Mark BEAN39 as used after successful purchase*/
    if (discount == 0.5) {
      localStorage.setItem("bean39Used", "true");
    }

    /* Clear cart */

    localStorage.removeItem("beanCart");

    /* Reset discount */

    discount = 0;

    /* Reset promo input */

    var promoInput = document.getElementById("promoCode");

    if (promoInput) {
      promoInput.value = "";
    }

    /* Reset promo message */

    var promoMessage = document.getElementById("promoMsg");

    if (promoMessage) {
      promoMessage.textContent = "";
    }

    /* Update counter */

    updateCount();

    /* Re-render */

    render();
  });
}

/* SECURITY HELPER */
/*Prevent product names stored in the cart from being interpreted as HTML.*/

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
