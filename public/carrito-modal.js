// Funcionalidad para el modal del carrito
document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos del DOM
  const carritoModal = document.getElementById('carritoModal');
  const closeCarritoModal = document.getElementById('closeCarritoModal');
  const carritoModalOverlay = document.getElementById('carritoModalOverlay');
  const carritoModalContent = document.getElementById('carritoModalContent');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.cart-summary');
  const modalSubtotal = document.getElementById('modal-subtotal');
  const modalTotal = document.getElementById('modal-total');
  const continuarComprandoBtn = document.getElementById('continuarComprando');
  const vaciarCarritoModalBtn = document.getElementById('vaciarCarritoModal');
  const finalizarCompraModalBtn = document.getElementById('finalizarCompraModal');
  
  // Botón del carrito en la barra de navegación
  const cartButtons = document.querySelectorAll('.cart-button');
  
  // Formatear precio
  const formatPrice = (price) => {
    return price.toFixed(2);
  };
  
  // Abrir modal del carrito
  function openCarritoModal() {
    carritoModal.classList.remove('hidden');
    carritoModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevenir scroll en el body
    updateCarritoModal();
  }
  
  // Cerrar modal del carrito
  function closeCarritoModal() {
    carritoModal.classList.remove('show');
    setTimeout(() => {
      carritoModal.classList.add('hidden');
      document.body.style.overflow = ''; // Restaurar scroll
    }, 300);
  }
  
  // Actualizar contenido del modal del carrito
  function updateCarritoModal() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    
    // Mostrar mensaje de carrito vacío o lista de productos
    if (carrito.length === 0) {
      emptyCartMessage.classList.remove('hidden');
      cartSummary.classList.add('hidden');
      cartItemsContainer.innerHTML = '';
    } else {
      emptyCartMessage.classList.add('hidden');
      cartSummary.classList.remove('hidden');
      
      // Limpiar contenedor de items
      cartItemsContainer.innerHTML = '';
      
      // Calcular subtotal
      let subtotal = 0;
      
      // Agregar cada producto al modal
      carrito.forEach(item => {
        subtotal += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item flex items-center justify-between p-3 border-b border-gray-100 cart-item-enter';
        cartItem.setAttribute('data-product-id', item.id);
        
        cartItem.innerHTML = `
          <div class="flex items-center">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded bg-gray-100 p-1 mr-3">
            <div>
              <h4 class="font-medium text-gray-800">${item.name}</h4>
              <div class="text-sm text-gray-500">Precio: $${formatPrice(item.price)}</div>
              <div class="flex items-center mt-1">
                <button class="decrease-quantity-modal bg-gray-100 hover:bg-gray-200 text-gray-700 w-6 h-6 rounded-l flex items-center justify-center transition-colors" data-product-id="${item.id}">
                  <i class="fas fa-minus text-xs"></i>
                </button>
                <span class="quantity-display w-8 h-6 flex items-center justify-center border-y border-gray-200 text-sm">${item.quantity}</span>
                <button class="increase-quantity-modal bg-gray-100 hover:bg-gray-200 text-gray-700 w-6 h-6 rounded-r flex items-center justify-center transition-colors" data-product-id="${item.id}">
                  <i class="fas fa-plus text-xs"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <span class="font-medium">$${formatPrice(item.price * item.quantity)}</span>
            <button class="remove-item-modal text-red-500 hover:text-red-700 transition-colors mt-2 text-sm" data-product-id="${item.id}">
              <i class="fas fa-trash-alt mr-1"></i> Eliminar
            </button>
          </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
      });
      
      // Actualizar subtotal y total
      modalSubtotal.textContent = `$${formatPrice(subtotal)}`;
      modalTotal.textContent = `$${formatPrice(subtotal)}`;
      
      // Agregar event listeners a los botones de cantidad y eliminar
      addModalEventListeners();
    }
  }
  
  // Agregar event listeners a los elementos dentro del modal
  function addModalEventListeners() {
    // Disminuir cantidad
    document.querySelectorAll('.decrease-quantity-modal').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        updateQuantityInModal(productId, -1);
      });
    });
    
    // Aumentar cantidad
    document.querySelectorAll('.increase-quantity-modal').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        updateQuantityInModal(productId, 1);
      });
    });
    
    // Eliminar producto
    document.querySelectorAll('.remove-item-modal').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        removeFromCartModal(productId);
      });
    });
  }
  
  // Actualizar cantidad de un producto en el modal
  function updateQuantityInModal(productId, change) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const productIndex = carrito.findIndex(item => item.id === productId);
    
    if (productIndex !== -1) {
      // Asegurarse de que la cantidad no sea menor a 1
      const newQuantity = Math.max(1, carrito[productIndex].quantity + change);
      carrito[productIndex].quantity = newQuantity;
      
      // Actualizar localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      
      // Actualizar la interfaz
      const quantityDisplay = document.querySelector(`.cart-item[data-product-id="${productId}"] .quantity-display`);
      const itemTotal = document.querySelector(`.cart-item[data-product-id="${productId}"] .font-medium`);
      
      if (quantityDisplay && itemTotal) {
        quantityDisplay.textContent = newQuantity;
        itemTotal.textContent = `$${formatPrice(carrito[productIndex].price * newQuantity)}`;
      }
      
      // Actualizar subtotal y total
      updateTotals();
    }
  }
  
  // Eliminar un producto del carrito desde el modal
  function removeFromCartModal(productId) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const updatedCart = carrito.filter(item => item.id !== productId);
    
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(updatedCart));
    
    // Eliminar el elemento del DOM con animación
    const cartItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
    if (cartItem) {
      cartItem.style.opacity = '0';
      cartItem.style.transform = 'translateY(10px)';
      cartItem.style.transition = 'opacity 0.3s, transform 0.3s';
      
      setTimeout(() => {
        cartItem.remove();
        
        // Si no quedan productos, mostrar mensaje de carrito vacío
        if (updatedCart.length === 0) {
          emptyCartMessage.classList.remove('hidden');
          cartSummary.classList.add('hidden');
        } else {
          // Actualizar subtotal y total
          updateTotals();
        }
      }, 300);
    }
  }
  
  // Actualizar subtotal y total
  function updateTotals() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const subtotal = carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    modalSubtotal.textContent = `$${formatPrice(subtotal)}`;
    modalTotal.textContent = `$${formatPrice(subtotal)}`;
  }
  
  // Event Listeners
  
  // Abrir modal al hacer clic en el botón del carrito
  cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openCarritoModal();
    });
  });
  
  // Cerrar modal
  if (closeCarritoModal) {
    closeCarritoModal.addEventListener('click', closeCarritoModal);
  }
  
  // Cerrar modal al hacer clic en el overlay
  if (carritoModalOverlay) {
    carritoModalOverlay.addEventListener('click', closeCarritoModal);
  }
  
  // Continuar comprando
  if (continuarComprandoBtn) {
    continuarComprandoBtn.addEventListener('click', closeCarritoModal);
  }
  
  // Vaciar carrito
  if (vaciarCarritoModalBtn) {
    vaciarCarritoModalBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        localStorage.removeItem('carrito');
        updateCarritoModal();
      }
    });
  }
  
  // Finalizar compra
  if (finalizarCompraModalBtn) {
    finalizarCompraModalBtn.addEventListener('click', () => {
      alert('¡Gracias por tu compra! En un sistema real, aquí continuarías al proceso de pago.');
      localStorage.removeItem('carrito');
      window.location.href = '/productos';
    });
  }
  
  // Actualizar contador de productos en el icono del carrito
  function updateCartCounter() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCounters = document.querySelectorAll('.cart-counter');
    cartCounters.forEach(counter => {
      if (totalItems > 0) {
        counter.textContent = totalItems;
        counter.classList.remove('hidden');
      } else {
        counter.classList.add('hidden');
      }
    });
  }
  
  // Actualizar contador al cargar la página
  updateCartCounter();
  
  // Escuchar cambios en localStorage para actualizar el contador
  window.addEventListener('storage', (e) => {
    if (e.key === 'carrito') {
      updateCartCounter();
    }
  });
  
  // Actualizar contador después de añadir productos al carrito
  document.addEventListener('carritoUpdated', updateCartCounter);
  
  // Escuchar evento para actualizar el modal del carrito
  document.addEventListener('updateCarritoModal', updateCarritoModal);
});