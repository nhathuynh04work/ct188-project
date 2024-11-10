/** ===================== Liên hệ ===================== */
function lienhe() {
	var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	var username = document.getElementById("username");
	var email = document.getElementById("email");
	var message = document.getElementById("message");
	//Username
	if (username.value == "") {
		alert("Vui lòng nhập họ và tên !");
		username.focus();
		return false;
	}
	//Email
	if (email.value == "") {
		alert("Vui lòng nhập địa chỉ email.");
		email.focus();
		return false;
	} else if (!emailPattern.test(email.value)) {
		alert("Vui lòng nhập một địa chỉ email hợp lệ.");
		email.focus();
		return false;
	}
	//Message
	if (message.value == "") {
		alert("Vui lòng nhập nội dung tin nhắn.");
		return false;
	}
	// Nếu tất cả hợp lệ, thông báo thành công và có thể gửi form
	alert("Yêu cầu hỗ trợ của bạn đã được gửi");
	return true;
}

/** ===================== Đăng nhập ===================== */
function formValidateLogIn() {
	var emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	var email = document.getElementById("email");
	var password = document.getElementById("password");
	//Email

	if (email.value == "") {
		alert("Vui lòng nhập tên đăng nhập !");
		email.focus();
		return false;
	} else if (!emailReg.test(email.value)) {
		alert("Email không hợp lệ !");
		email.focus();
		return false;
	}
	//Password
	if (password.value == "") {
		alert("Vui lòng nhập mật khẩu !");
		password.focus();
		return false;
	} else if (password.value.length < 6) {
		alert("Mật khẩu phải từ 6 ký tự trở lên!");
		password.focus();
		return false;
	}

    alert("Đăng nhập thành công ");
	return true;
}

/** ===================== Đăng ký ===================== */
function formValidateSignUp() {
	var emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	var username = document.getElementById("username");
	var email = document.getElementById("email");
	var password = document.getElementById("password");
	var confirmpass = document.getElementById("confirmpass");
	var checkbox = document.getElementById("checkbox");
	//Username
	if (username.value == "") {
		alert("Vui lòng nhập họ và tên !");
		username.focus();
		return false;
	}
	//Email
	if (email.value == "") {
		alert("Vui lòng nhập email !");
		email.focus();
		return false;
	} else if (!emailReg.test(email.value)) {
		alert("Email không hợp lệ !");
		email.focus();
		return false;
	}
	//Password
	if (password.value == "") {
		alert("Vui lòng nhập mật khẩu !");
		password.focus();
		return false;
	} else if (password.value.length < 6) {
		alert("Mật khẩu phải từ 6 ký tự !");
		password.focus();
		return false;
	}
	//Comfirmpass
	if (confirmpass.value == "") {
		alert("Vui lòng xác nhận mật khẩu !");
		confirmpass.focus();
		return false;
	} else if (password.value != confirmpass.value) {
		alert("Mật khẩu không trùng khớp !");
		confirmpass.focus();
		return false;
	}
	//Checkbox
	if (!checkbox.checked) {
		alert("Vui lòng đồng ý với Điều khoản và Quyền riêng tư.");
		checkbox.focus();
		return false;
	}

	alert("Đăng ký thành công ");
	return true;
}

/** ===================== Giỏ hàng ===================== */
var productsApi = "../sanpham.json";
let productList = [];
let cartList = [];
const shoppingCart = document.getElementById("shopping-cart");
const addToCartBtn = document.getElementById("add-to-cart-button");
const currentProductId = new URLSearchParams(window.location.search).get("id");
const quantityInput = document.getElementById("quantity-input");
const totalCostHTML = document.getElementById("total-cost");
const cartQuantity = document.querySelector("#cart-quantity");

const renderCart = (productList) => {
	shoppingCart.innerHTML = "";
	var totalCost = 0;
	var totalQuantity = 0;
	cartList.forEach((cartItem) => {
		var cartItemInfo = productList.find((product) => {
			return product.id == cartItem.id;
		});
		totalCost += cartItem.quantity * cartItemInfo.price;
		totalQuantity += cartItem.quantity;
		var newItem = document.createElement("div");
		newItem.classList.add(
			"cart-item",
			"d-flex",
			"mb-3",
			"py-3",
			"border-bottom"
		);
		newItem.innerHTML = `<div
                class="thumbnail-container d-flex align-items-center justify-content-center w-25 ratio ratio-1x1">
                <img
                    src="../img/sanpham/${cartItemInfo.thumbnail}"
                    alt=""
                    class="object-fit-contain" />
            </div>
            <div class="w-75 p-3">
                <h4 id="cart-item-name">${cartItemInfo.name}</h4>
                <p>Tác giả: ${cartItemInfo.author}</p>
                <div class="d-flex justify-content-between mt-4">
                    <div class="d-flex align-items-center">
                        <span class="decrease-button btn btn-outline-dark">-</span>
                        <span class="item-quantity px-3">${
							cartItem.quantity
						}</span>
                        <span class="increase-button btn btn-outline-dark">+</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span>${cartItem.quantity * cartItemInfo.price}</span>
                        <span class="delete-button">X</i></span>
                    </div>
                </div>
                            </div>`;
		newItem.dataset.id = cartItemInfo.id;
		shoppingCart.appendChild(newItem);
	});

	totalCostHTML.innerText = `Tổng tiền: ${totalCost}`;
	cartQuantity.innerText = totalQuantity;
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const addItemToCart = () => {
	var positionInCart = cartList.findIndex((cartItem) => {
		return currentProductId == cartItem.id;
	});
	if (positionInCart == -1) {
		cartList.push({
			id: currentProductId,
			quantity: Number(quantityInput.value),
		});
	} else {
		cartList[positionInCart].quantity =
			cartList[positionInCart].quantity + Number(quantityInput.value);
	}

	renderCart(productList);
};

const deleteItem = (targetItem) => {
	targetItem.remove();
	cartList.forEach((item, currentPosition) => {
		if (item.id == targetItem.dataset.id) {
			cartList.splice(currentPosition, 1);
		}
	});
	renderCart(productList);

	localStorage.setItem("cart", JSON.stringify(cartList));
};

const increaseItemQuantity = (targetItem) => {
	cartList.forEach((item) => {
		if (item.id == targetItem.dataset.id) {
			item.quantity++;
		}
		renderCart(productList);
	});
};

const decreaseItemQuantity = (targetItem) => {
	cartList.forEach((item) => {
		if (item.id == targetItem.dataset.id && item.quantity > 1) {
			item.quantity--;
		}
		renderCart(productList);
	});
};

const initApp = () => {
	fetch(productsApi)
		.then((response) => response.json())
		.then((data) => {
			productList = data;

			if (localStorage.getItem("cart")) {
				cartList = JSON.parse(localStorage.getItem("cart"));
			}

			renderCart(productList);
		});

	if (addToCartBtn) {
		addToCartBtn.addEventListener("click", () => {
			addItemToCart();
		});
	}

	shoppingCart.addEventListener("click", (e) => {
		let positionClick = e.target;
		let targetItem =
			positionClick.parentElement.parentElement.parentElement
				.parentElement;
		if (positionClick.classList.contains("delete-button")) {
			deleteItem(targetItem);
		}

		if (positionClick.classList.contains("increase-button")) {
			increaseItemQuantity(targetItem);
		}

		if (positionClick.classList.contains("decrease-button")) {
			decreaseItemQuantity(targetItem);
		}
	});
};

initApp();

/** ===================== Hiển thị sản phẩm ===================== */
if (document.querySelector(".products-grid")) {
	var productsGrid = document.querySelector(".products-grid");
	var productsRow = productsGrid.appendChild(document.createElement("div"));
	productsRow.classList.add("row", "align-items-center");

	fetch(productsApi)
		.then((response) => response.json())
		.then((productList) => {
			renderProducts(productList);
		});

	var renderProducts = (productList) => {
		var html = productList.map((product) => {
			var formattedPrice = String(product.price / 1000) + ".000 đồng";

			return `<a href="chitietsanpham.html?id=${product.id}" class="product-item ratio ratio-1x1">
                            <img
                                src="../img/sanpham/${product.thumbnail}"
                                alt=""
                                class="object-fit-contain" />
                            <div
                                class="product-overlay bg-white align-items-center justify-content-center bg-opacity-75">
                                <p class="text-black font-weight-bold text-center">
                                    Xem chi tiết
                                    </br>
                                    ${formattedPrice}
                                </p>
                            </div>
                    </a>`;
		});

		productsRow.innerHTML = html.join("");
	};
}

/** ===================== Hiển thị chi tiết sản phầm ===================== */
fetch(productsApi)
	.then((response) => response.json())
	.then((productList) => {
		var product = findProductById(productList);
		renderProductDetails(product);
	});

/* Find in product list and return product object by using id passed in the url search bar */
var findProductById = (productList) => {
	var productId = new URLSearchParams(window.location.search).get("id");
	return productList.find((product) => {
		return product.id == productId;
	});
};

/* Render product detail onto the screen */
var renderProductDetails = (product) => {
	var productThumbnail = document.querySelector("#product-thumbnail");
	var productName = document.querySelector("#product-name");
	var productAuthor = document.querySelector("#product-author");
	var productSize = document.querySelector("#product-size");
	var productMaterial = document.querySelector("#product-material");
	var productPrice = document.querySelector("#product-price");
	var formattedPrice = String(product.price / 1000) + ".000 đồng";

	productThumbnail.src = `../img/sanpham/${product.thumbnail}`;
	productName.innerText = `${product.name}`;
	productAuthor.innerText = `Tác giả: ${product.author}`;
	productSize.innerText = `Kích thước: ${product.width} x ${product.height}`;
	productMaterial.innerText = `Chất liệu: ${product.material}`;
	productPrice.innerText = `Giá: ${formattedPrice}`;
};
