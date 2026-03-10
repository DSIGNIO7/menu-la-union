// Lógica del Slider de Fondo
/**
 * REFRESCUERÍA LA UNIÓN - CORE APP LOGIC
 * Senior UI/UX Optimized Version
 */

// Selectores Globales
const categoriesGrid = document.getElementById('categories-grid');
const menuContainer = document.getElementById('menu-container');
const modal = document.getElementById('modal');

/**
 * 1. INICIALIZADOR PRINCIPAL
 */
function init() {
    renderMenu();
    initHeroSlider();
    setupEventListeners();
}

/**
 * 2. RENDERIZADO DE CATEGORÍAS Y PRODUCTOS
 */
function renderMenu() {
    // Limpiar contenedores
    categoriesGrid.innerHTML = '';
    menuContainer.innerHTML = '';

    menuData.categorias.forEach(cat => {
        // A. Renderizar Botones de Categoría (Top Nav)
        const catBlock = document.createElement('div');
        catBlock.className = 'category-block';
        catBlock.innerHTML = `
            <img src="${cat.img}" alt="${cat.nombre}">
            <span>${cat.nombre}</span>
        `;
        catBlock.onclick = () => {
            const target = document.getElementById(`sec-${cat.nombre.replace(/\s+/g, '')}`);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        categoriesGrid.appendChild(catBlock);

        // B. Renderizar Secciones de Productos
        const section = document.createElement('section');
        section.id = `sec-${cat.nombre.replace(/\s+/g, '')}`;
        section.className = 'menu-section';
        // Se incluye iconos
        section.innerHTML = `
          <h2 class="category-title">
            <span class="category-icon">${cat.icono}</span>  
            ${cat.nombre}
          </h2>
        `;

        const productsGrid = document.createElement('div');
        productsGrid.className = 'products-grid';

        cat.productos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = () => openModal(prod);
            card.innerHTML = `
                <div class="product-img-container">
                    <img src="${prod.img}" class="product-img" loading="lazy">
                </div>
                <div class="product-info">
                    <h3>${prod.nombre}</h3>
                    <p>${prod.desc}</p>
                    <div class="product-meta">
                        <span class="price-tag">${prod.precio}</span>
                        <span class="add-btn">+</span>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });

        section.appendChild(productsGrid);
        menuContainer.appendChild(section);
    });
}

/**
 * 3. LÓGICA DEL HERO SLIDER (Fondo Animado)
 */
function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    // Si no tienes banners definidos en data.js, usa estos por defecto
    const bgImages = menuData.banners || ['img/s1.webp', 'img/pechuga_asada.webp', 'img/naranja.svg', 'img/h2.svg', 'img/mandarina.svg', 'img/cubano.svg', 'img/arepas.webp'];
    
    slider.innerHTML = ''; // Limpiar

    bgImages.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Banner Promocional";
        if(i === 0) img.classList.add('active');
        slider.appendChild(img);
    });

    let current = 0;
    const imgs = slider.querySelectorAll('img');

    if(imgs.length > 1) {
        setInterval(() => {
            imgs[current].classList.remove('active');
            current = (current + 1) % imgs.length;
            imgs[current].classList.add('active');
        }, 4000); // Cambio cada 4 segundos
    }
}

/**
 * 4. GESTIÓN DEL MODAL (Bottom Sheet Premium)
 */
function openModal(prod) {
    // Rellenar datos
    document.getElementById('modal-title').innerText = prod.nombre;
    document.getElementById('modal-desc').innerText = prod.desc;
    document.getElementById('modal-price').innerText = prod.precio;
    
    const imgContainer = document.getElementById('modal-img-container');
    imgContainer.innerHTML = `<img src="${prod.img}" class="modal-main-img">`;

    // Animación de entrada
    modal.classList.remove('hidden');
    // Pequeño delay para que el navegador detecte el cambio y anime el transform
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Bloquear scroll del cuerpo
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    
    // Esperar a que termine la animación de bajada (0.4s) para ocultar el contenedor
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 400);
}

/**
 * 5. EVENTOS DE CIERRE (Click fuera o Tecla Esc)
 */
function setupEventListeners() {
    // Cerrar al hacer click en el fondo oscuro
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeModal();
    });
}

// Iniciar aplicación al cargar la ventana  bienvenida
window.onload = init;

setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.style.opacity = '0';
    setTimeout(() => splash.remove(), 500);
}, 2500); // Duración de la bienvenida
