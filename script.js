/* ===== NAV PILL ===== */
const links = document.querySelectorAll(".nav-link");
const pill = document.querySelector(".pill");
function movePill(el){
  pill.style.width = el.offsetWidth + "px";
  pill.style.left = el.offsetLeft + "px";
}
movePill(document.querySelector(".nav-link.active"));
links.forEach(l => {
  l.onclick = () => {
    links.forEach(a => a.classList.remove("active"));
    l.classList.add("active");
    movePill(l);
  }
});

const readMoreBtn = document.getElementById("readMoreBtn");
const aboutFull = document.getElementById("aboutFull");
const aboutShort = document.getElementById("aboutShort");

readMoreBtn.onclick = () => {
  if(aboutFull.style.display === "none") {
    aboutFull.style.display = "block";
    aboutShort.style.display = "none";
    readMoreBtn.innerText = "Read Less";
  } else {
    aboutFull.style.display = "none";
    aboutShort.style.display = "block";
    readMoreBtn.innerText = "Read More";
  }
};

/* ===== PRODUCTS ===== */
const products = [
 {id:1,name:"Red Velvet Cake",price:50000,cat:"cake",img:"red%20velvet.jpg",desc:"Moist red velvet cake with creamy cheese frosting."},
 {id:2,name:"Matcha Cake",price:60000,cat:"cake",img:"matcha.jpg",desc:"Premium matcha cake with smooth earthy taste."},
 {id:3,name:"Chocolate Cake",price:45000,cat:"cake",img:"chocolate.jpg",desc:"Rich chocolate cake with deep cocoa flavor."},
 {id:4,name:"Blueberry Cheesecake",price:55000,cat:"cake",img:"blueberry%20cheesecake.jpg",desc:"Creamy cheesecake topped with blueberry compote."},
 {id:5,name:"Strawberry Cheesecake",price:55000,cat:"cake",img:"strawberry%20cheesecake.jpg",desc:"Classic cheesecake with strawberry glaze."},
 {id:6,name:"Ube Cake",price:40000,cat:"cake",img:"ube%20cake.jpg",desc:"Soft ube cake with coconut aroma."},
 {id:7,name:"Red Velvet Cookies",price:25000,cat:"cookie",img:"red%20velvet%20cookies.jpg",desc:"Chewy red velvet cookies with white chocolate."},
 {id:8,name:"Matcha Cookies",price:28000,cat:"cookie",img:"matcha%20cookies.jpg",desc:"Crunchy matcha cookies with premium tea."}
];

const list = document.getElementById("productList");
function render(cat="all"){
  list.innerHTML="";
  products.filter(p=>cat==="all"||p.cat===cat).forEach(p=>{
    list.innerHTML += `
      <div class="product-card" onclick="openPopup(${p.id})">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>Rp ${p.price.toLocaleString()}</p>
      </div>`;
  });
}
render();

/* ===== FILTER ===== */
document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  }
});

/* ===== SWIPE PRODUCTS ===== */
document.querySelector(".scroll-btn.left").onclick = () => list.scrollLeft -= 300;
document.querySelector(".scroll-btn.right").onclick = () => list.scrollLeft += 300;

/* ===== POPUP + CART ===== */
let current, qty = 1, cart = [];
const popup = document.getElementById("productPopup");
const popupImg = document.getElementById("popupImg");
const popupName = document.getElementById("popupName");
const popupDesc = document.getElementById("popupDesc");
const popupPrice = document.getElementById("popupPrice");
const popupQty = document.getElementById("popupQty");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartEl = document.getElementById("cart");
const cartBtnEl = document.getElementById("cartBtn");

function openPopup(id){
  current = products.find(p=>p.id===id);
  qty = 1;
  popup.style.display="flex";
  popupImg.src = current.img;
  popupName.innerText = current.name;
  popupDesc.innerText = current.desc;
  popupPrice.innerText = "Rp " + current.price.toLocaleString();
  popupQty.innerText = qty;
}
document.querySelector(".close").onclick = () => popup.style.display="none";
function changeQty(n){
  qty = Math.max(1, qty+n);
  popupQty.innerText = qty;
}

/* ADD TO CART */
function addToCart(){
  let item = cart.find(i=>i.id===current.id);
  if(item) item.qty += qty;
  else cart.push({...current, qty});
  renderCartItems();
  popup.style.display = "none";
}

/* RENDER CART ITEMS */
function renderCartItems(){
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(i=>{
    total += i.price * i.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${i.img}" alt="${i.name}">
      <div>
        <p>${i.name}</p>
        <p>Rp ${i.price.toLocaleString()}</p>
        <div class="cart-qty">
          <button onclick="changeCartQty(${i.id}, -1)">−</button>
          <span>${i.qty}</span>
          <button onclick="changeCartQty(${i.id}, 1)">+</button>
        </div>
      </div>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.innerText = total.toLocaleString();
  cartCount.innerText = cart.reduce((a,b)=>a+b.qty,0);
}

/* CHANGE QTY IN CART */
function changeCartQty(id, delta){
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(i=>i.id!==id);
  renderCartItems();
}

/* ===== CART TOGGLE INTERACTIVE ===== */
cartBtnEl.onclick = function(e) {
  e.stopPropagation(); // prevent click bubbling
  cartEl.classList.toggle("show");
};

// Close cart if clicked outside
document.addEventListener("click", function(e) {
  if(cartEl.classList.contains("show") && !cartEl.contains(e.target) && e.target !== cartBtnEl){
    cartEl.classList.remove("show");
  }
});

// Prevent cart from closing when clicking inside
cartEl.onclick = function(e) {
  e.stopPropagation();
};

/* ===== FAQ ===== */
document.querySelectorAll(".faq-card").forEach(c=>{
  c.onclick = () => c.classList.toggle("active");
});

/* ===== CHECKOUT POPUP ===== */
const checkoutDiv = document.getElementById("checkout");

// Create checkout content
checkoutDiv.innerHTML = `
<div style="background:white;padding:25px;border-radius:20px;max-width:350px;margin:auto;text-align:center;">
  <h3>Checkout</h3>
  <input type="text" id="checkoutAddress" placeholder="Alamat lengkap" style="width:100%;padding:10px;margin:10px 0;border-radius:8px;border:1px solid #ccc;">
  <select id="checkoutMethod" style="width:100%;padding:10px;margin:10px 0;border-radius:8px;border:1px solid #ccc;">
    <option value="">Pilih Metode Pembayaran</option>
    <option value="transfer">Transfer Bank</option>
    <option value="ewallet">E-Wallet</option>
    <option value="cod">COD</option>
  </select>
  <button id="payNowBtn" style="padding:10px 20px;border:none;border-radius:10px;background:#5a3a2e;color:white;cursor:pointer;">Pay Now</button>
  <p id="orderMessage" style="margin-top:10px;color:green;"></p>
</div>
`;

/* OPEN CHECKOUT */
function openCheckout(){
  if(cart.length===0){
    alert("Cart kosong!");
    return;
  }
  checkoutDiv.style.display = "flex";
}

// Close checkout when clicking outside
checkoutDiv.onclick = e => { if(e.target===checkoutDiv) checkoutDiv.style.display="none"; };

// Pay Now action
document.getElementById("payNowBtn").onclick = () => {
  const address = document.getElementById("checkoutAddress").value;
  const method = document.getElementById("checkoutMethod").value;
  const orderMsg = document.getElementById("orderMessage");

  if(!address || !method){
    alert("Mohon lengkapi alamat dan metode pembayaran!");
    return;
  }

  orderMsg.innerText = `Order berhasil! Total Rp ${cart.reduce((a,b)=>a+b.price*b.qty,0).toLocaleString()} via ${method}`;
  cart = [];
  renderCartItems();
  cartEl.classList.remove("show");

  setTimeout(()=>{
    checkoutDiv.style.display="none";
    orderMsg.innerText = "";
    document.getElementById("checkoutAddress").value = "";
    document.getElementById("checkoutMethod").value = "";
  },3000);

};