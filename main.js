import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const stock = parseInt(document.getElementById('stock').value);
  const proveedor = document.getElementById('proveedor').value;

  await addDoc(collection(db, "productos"), {
    nombre, precio, stock, proveedor
  });

  form.reset();
  loadProductos();
});

async function loadProductos() {
  productList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "productos"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement('li');
    item.textContent = `${data.nombre} | $${data.precio} | Stock: ${data.stock} | Prov: ${data.proveedor}`;
    productList.appendChild(item);
  });
}

loadProductos();