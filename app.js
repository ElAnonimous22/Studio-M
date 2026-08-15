// BASE DE DATOS DE STUDIO M
// Estado disponible: "Disponible", "Reservado" o "Vendido"
const productos = [
  {
    id: "gorra-nike-pro",
    titulo: "Gorra Nike Pro Dri-FIT Negra",
    precio: "16.00€",
    disponibilidad: "Disponible",
    imagenes: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800",
      "https://images.unsplash.com/photo-1521369984125-a4ec6c406329?w=800"
    ],
    marca: "Nike",
    estado: "Como nuevo",
    talla: "Única (Ajustable)",
    peso: "120 g",
    material: "100% Poliéster",
    entrega: "Envío o en mano",
    descripcion: "Gorra original Nike Dri-FIT en impecable estado. Visera rígida, broche trasero regulable perfecto. Sin manchas ni descolorido.",
    linkWallapop: "https://es.wallapop.com",
    linkVinted: "https://www.vinted.es"
  },
  {
    id: "sudadera-vintage-adidas",
    titulo: "Sudadera Adidas Originals Retro",
    precio: "28.00€",
    disponibilidad: "Reservado",
    imagenes: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800"
    ],
    marca: "Adidas",
    estado: "Muy bueno",
    talla: "M",
    peso: "480 g",
    material: "80% Algodón, 20% Poliéster",
    entrega: "Solo envío",
    descripcion: "Sudadera Adidas estilo retro con logo bordado en el pecho. Muy cómoda y abrigada, ajuste clásico.",
    linkWallapop: "https://es.wallapop.com",
    linkVinted: "https://www.vinted.es"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
  comprobarURL();
});

// Función para obtener la clase CSS del badge según disponibilidad
function getBadgeClass(estado) {
  if (estado === "Vendido") return "badge-vendido";
  if (estado === "Reservado") return "badge-reservado";
  return "badge-disponible";
}

function renderCatalogo() {
  const grid = document.getElementById("grid-productos");
  grid.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.onclick = () => verDetalle(producto.id);

    const fotoPortada = producto.imagenes[0] || 'https://via.placeholder.com/600';
    const badgeClass = getBadgeClass(producto.disponibilidad);

    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${fotoPortada}" alt="${producto.titulo}">
        <span class="card-badge ${badgeClass}">${producto.disponibilidad}</span>
      </div>
      <div class="card-info">
        <h3>${producto.titulo}</h3>
        <div class="card-footer-info">
          <span class="card-brand">${producto.marca}</span>
          <span class="precio">${producto.precio}</span>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function verDetalle(id, actualizarURL = true) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  if (actualizarURL) {
    window.location.hash = `producto=${producto.id}`;
  }

  const contenedor = document.getElementById("detalle-contenido");
  const fotosValidas = producto.imagenes.slice(0, 10);
  const badgeClass = getBadgeClass(producto.disponibilidad);

  const htmlMiniaturas = fotosValidas.map((imgUrl, index) => `
    <img 
      src="${imgUrl}" 
      class="thumb ${index === 0 ? 'active' : ''}" 
      onclick="cambiarImagenPrincipal('${imgUrl}', this)"
      alt="Vista ${index + 1}"
    >
  `).join('');

  contenedor.innerHTML = `
    <div class="galeria-seccion">
      <div class="detalle-imagen-principal">
        <img id="foto-principal-display" src="${fotosValidas[0]}" alt="${producto.titulo}">
        <span class="card-badge ${badgeClass}">${producto.disponibilidad}</span>
      </div>
      <div class="carrusel-miniaturas">
        ${htmlMiniaturas}
      </div>
    </div>

    <div class="detalle-info">
      <div class="detalle-header">
        <h1>${producto.titulo}</h1>
      </div>
      <p class="precio-grande">${producto.precio}</p>

      <div class="specs-grid">
        <div class="spec-item">
          <span>Marca</span>
          <strong>${producto.marca}</strong>
        </div>
        <div class="spec-item">
          <span>Estado del producto</span>
          <strong>${producto.estado}</strong>
        </div>
        <div class="spec-item">
          <span>Talla</span>
          <strong>${producto.talla}</strong>
        </div>
        <div class="spec-item">
          <span>Peso</span>
          <strong>${producto.peso}</strong>
        </div>
        <div class="spec-item">
          <span>Material</span>
          <strong>${producto.material}</strong>
        </div>
        <div class="spec-item">
          <span>Entrega</span>
          <strong>${producto.entrega}</strong>
        </div>
      </div>

      <div class="descripcion-box">
        <h4>Descripción del artículo</h4>
        <p>${producto.descripcion}</p>
      </div>

      <div class="botones-compra">
        ${
          producto.linkWallapop
            ? `<a href="${producto.linkWallapop}" target="_blank" class="btn-marketplace btn-wallapop">Comprar en Wallapop</a>`
            : ""
        }
        ${
          producto.linkVinted
            ? `<a href="${producto.linkVinted}" target="_blank" class="btn-marketplace btn-vinted">Comprar en Vinted</a>`
            : ""
        }
        <button onclick="copiarEnlace()" class="btn-marketplace btn-share" id="btn-share-text">
          🔗 Copiar enlace del producto
        </button>
      </div>
    </div>
  `;

  document.getElementById("catalogo-view").classList.add("hidden");
  document.getElementById("detalle-view").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function cambiarImagenPrincipal(url, elementoThumb) {
  document.getElementById("foto-principal-display").src = url;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  elementoThumb.classList.add('active');
}

function mostrarCatalogo() {
  window.location.hash = "";
  document.getElementById("detalle-view").classList.add("hidden");
  document.getElementById("catalogo-view").classList.remove("hidden");
  window.scrollTo(0, 0);
}

// Función para copiar el enlace directo al producto
function copiarEnlace() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById("btn-share-text");
    btn.innerText = "¡Enlace copiado!";
    setTimeout(() => {
      btn.innerText = "🔗 Copiar enlace del producto";
    }, 2000);
  });
}

// Cargar producto directo si entran con un enlace compartido
function comprobarURL() {
  const hash = window.location.hash;
  if (hash.includes("#producto=")) {
    const id = hash.replace("#producto=", "");
    verDetalle(id, false);
  }
}

