// Base de datos actualizada con array de imágenes (máximo 10)
const productos = [
  {
    id: "gorra-nike-pro",
    titulo: "Gorra Nike Pro Dri-FIT Negra",
    precio: "16.00€",
    // Guardas hasta 10 imágenes en un array
    imagenes: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=600",
      "https://images.unsplash.com/photo-1521369984125-a4ec6c406329?w=600"
    ],
    marca: "Nike",
    estado: "Como nuevo",
    talla: "Única (Ajustable)",
    peso: "120 g",
    material: "100% Poliéster",
    entrega: "Envío o en mano",
    descripcion: "Gorra original en perfecto estado. Sin marcas de uso.",
    linkWallapop: "https://es.wallapop.com",
    linkVinted: "https://www.vinted.es"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
});

function renderCatalogo() {
  const grid = document.getElementById("grid-productos");
  grid.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.onclick = () => verDetalle(producto.id);

    // Muestra la primera imagen de la lista en la portada
    const fotoPortada = producto.imagenes[0] || '';

    card.innerHTML = `
      <img src="${fotoPortada}" alt="${producto.titulo}">
      <div class="card-info">
        <h3>${producto.titulo}</h3>
        <p class="precio">${producto.precio}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

function verDetalle(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  const contenedor = document.getElementById("detalle-contenido");
  
  // Limitar estrictamente a un máximo de 10 imágenes
  const fotosValidas = producto.imagenes.slice(0, 10);

  // Generar HTML para la galería de miniaturas
  const htmlMiniaturas = fotosValidas.map((imgUrl, index) => `
    <img 
      src="${imgUrl}" 
      class="thumb ${index === 0 ? 'active' : ''}" 
      onclick="cambiarImagenPrincipal('${imgUrl}', this)"
      alt="Vista previa ${index + 1}"
    >
  `).join('');

  contenedor.innerHTML = `
    <div class="galeria-seccion">
      <div class="detalle-imagen">
        <img id="foto-principal-display" src="${fotosValidas[0]}" alt="${producto.titulo}">
      </div>
      <div class="carrusel-miniaturas">
        ${htmlMiniaturas}
      </div>
    </div>

    <div class="detalle-info">
      <h1>${producto.titulo}</h1>
      <p class="precio-grande">${producto.precio}</p>

      <ul class="especificaciones-list">
        <li><span>Marca:</span> <strong>${producto.marca}</strong></li>
        <li><span>Estado:</span> <strong>${producto.estado}</strong></li>
        <li><span>Talla:</span> <strong>${producto.talla}</strong></li>
        <li><span>Peso:</span> <strong>${producto.peso}</strong></li>
        <li><span>Material:</span> <strong>${producto.material}</strong></li>
        <li><span>Entrega:</span> <strong>${producto.entrega}</strong></li>
      </ul>

      <div class="descripcion-box">
        <h4>Descripción</h4>
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
      </div>
    </div>
  `;

  document.getElementById("catalogo-view").classList.add("hidden");
  document.getElementById("detalle-view").classList.remove("hidden");
  window.scrollTo(0, 0);
}

// Función para cambiar la foto grande al hacer clic en una miniatura
function cambiarImagenPrincipal(url, elementoThumb) {
  document.getElementById("foto-principal-display").src = url;
  
  // Quitar la clase active de las demás miniaturas y ponérsela a la elegida
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  elementoThumb.classList.add('active');
}

function mostrarCatalogo() {
  document.getElementById("detalle-view").classList.add("hidden");
  document.getElementById("catalogo-view").classList.remove("hidden");
  window.scrollTo(0, 0);
}
