document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll effect
                    block: 'start' // Align top of target element to top of viewport
                });
            }
        });
    });

    // --- Order Tracking Form Simulation ---
    const trackingForm = document.getElementById('tracking-form');
    const trackingInput = document.getElementById('tracking-id');
    const trackingResultDiv = document.getElementById('tracking-result');

    if (trackingForm) {
        trackingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            const trackingId = trackingInput.value.trim();
            trackingResultDiv.style.display = 'block'; // Show the results div
            trackingResultDiv.className = 'tracking-info'; // Reset classes

            if (trackingId === '') {
                trackingResultDiv.textContent = 'Please enter a Tracking ID.';
                trackingResultDiv.classList.add('error');
            } else {
                // Simulate an API call / lookup
                trackingResultDiv.textContent = `Searching for Tracking ID: ${trackingId}...`;
                trackingResultDiv.classList.add('loading'); // Optional: style for loading state

                setTimeout(() => {
                    // Simulate different results based on ID (simple example)
                    if (trackingId.toLowerCase() === 'swift123') {
                        trackingResultDiv.textContent = `Order ${trackingId}: Status - Out for Delivery. Estimated Arrival: 30 mins.`;
                        trackingResultDiv.classList.remove('loading');
                        trackingResultDiv.classList.add('success');
                    } else if (trackingId.length > 5) {
                         trackingResultDiv.textContent = `Order ${trackingId}: Status - In Transit. Currently at Sorting Facility.`;
                         trackingResultDiv.classList.remove('loading');
                         trackingResultDiv.classList.add('success');
                     }
                    else {
                        trackingResultDiv.textContent = `Tracking ID "${trackingId}" not found. Please check the ID and try again.`;
                        trackingResultDiv.classList.remove('loading');
                        trackingResultDiv.classList.add('error');
                    }
                }, 1500); // Simulate network delay (1.5 seconds)
            }
        });
    }

     // --- Quick Order Form Simulation (Optional) ---
     const quickOrderForm = document.getElementById('quick-order-form');
     if(quickOrderForm) {
         quickOrderForm.addEventListener('submit', (e) => {
             e.preventDefault();
             const pickup = quickOrderForm.querySelector('input[placeholder="Enter Pickup Address"]').value;
             const delivery = quickOrderForm.querySelector('input[placeholder="Enter Delivery Address"]').value;

             if (pickup && delivery) {
                 // In a real app, you'd send this to a backend or redirect
                 alert(`Quote requested:\nPickup: ${pickup}\nDelivery: ${delivery}\n\n(This is a simulation)`);
                 quickOrderForm.reset(); // Clear the form
             } else {
                 alert("Please enter both pickup and delivery addresses.");
             }
         });
     }


    // --- Add subtle animation on scroll (Optional - Intersection Observer) ---
    const animatedSections = document.querySelectorAll('.step, .card');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    animatedSections.forEach(section => {
        // Initial state for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(section);
    });


}); // End DOMContentLoaded