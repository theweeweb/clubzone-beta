// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- NAVIGATION HANDLERS ---
    
    // Select nav elements
    const navLinks = {
        'navHome': 'dashboard-student.html',
        'navDirectory': 'clubdirect.html',
        'navProfile': 'profile.html',
        'navLogout': 'index.html'
    };

    // Attach click listeners to navigation
    Object.keys(navLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                // Check if it's logout to show a confirmation
                if (id === 'navLogout') {
                    if (confirm("Are you sure you want to logout?")) {
                        window.location.href = navLinks[id];
                    }
                } else {
                    window.location.href = navLinks[id];
                }
            });
        }
    });

    // --- REGISTRATION HANDLER ---

    const registerBtn = document.getElementById('registerBtn');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            // Simple student registration simulation
            alert("Application Sent! The Technophile Club adviser will review your registration request.");
            
            // Optional: Visually change the button after clicking
            registerBtn.innerHTML = '<i class="fas fa-clock"></i> Registration Pending';
            registerBtn.style.opacity = '0.7';
            registerBtn.disabled = true;
        });
    }

    // --- TAB INTERACTION ---
    // Minimal logic to demonstrate tab switching visual
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});