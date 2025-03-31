// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const message = document.getElementById('message')?.value || '';
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
      }
      
      // Here you would typically send data to a server
      console.log('Form submission:', { name, email, message });
      
      // Show success message
      alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
      contactForm.reset();
    });
  }
  
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const productId = this.getAttribute('data-product-id');
      const productName = this.getAttribute('data-product-name');
      const productPrice = this.getAttribute('data-product-price');
      
      // Here you would typically add to cart in a real application
      console.log('Adding to cart:', { productId, productName, productPrice });
      
      // Show confirmation
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-primary-600 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.textContent = `${productName} añadido al carrito`;
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
    });
  });
  
  // Product filtering functionality
  const filterButtons = document.querySelectorAll('.filter-button');
  const products = document.querySelectorAll('.product-item');
  
  if (filterButtons.length && products.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('bg-primary-600', 'text-white'));
        this.classList.add('bg-primary-600', 'text-white');
        
        // Filter products
        products.forEach(product => {
          const productCategory = product.getAttribute('data-category');
          if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
        });
      });
    });
  }
});