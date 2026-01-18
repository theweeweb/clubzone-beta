/* =========================================
   CLUBZONE DASHBOARD LOGIC (UNIFIED)
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. GET USER DATA & SET UP NAVBAR
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name") || "Guest User";

    // Update the Name and Role in the Navbar
    const nameEl = document.getElementById("navUserName");
    const roleEl = document.getElementById("navUserRole");

    if (nameEl) nameEl.textContent = name;
    if (roleEl) {
        roleEl.textContent = role ? role.toUpperCase() : "GUEST";
        // This adds the specific color class (student, officer, or adviser)
        roleEl.className = "badge " + (role ? role.toLowerCase() : "student");
    }

    // 2. ROLE-BASED DASHBOARD REDIRECTION
    // Hide all dashboards first
    document.querySelectorAll(".role-section").forEach(section => {
        section.style.display = "none";
    });

    // Show the dashboard based on role
    if (role === "student") {
        document.getElementById("studentDashboard").style.display = "block";
    } else if (role === "officer") {
        document.getElementById("officerDashboard").style.display = "block";
    } else if (role === "adviser") {
        document.getElementById("adviserDashboard").style.display = "block";
    } else {
        // If no role, redirect to login
        window.location.href = "index.html";
        return; // Stop execution
    }

    // 3. UNIFIED LOGOUT BUTTON
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear(); 
            window.location.href = "index.html"; 
        });
    }

    // 4. NOTIFICATIONS TOGGLE (Kept from original)
    document.querySelectorAll(".notif-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const dropdown = btn.nextElementSibling;
            if (dropdown) dropdown.classList.toggle("show");
        });
    });

    // 5. INTERNAL NAVIGATION (Handling "Home" section transitions)
    document.querySelectorAll(".nav-links-desktop a").forEach(link => {
        link.addEventListener("click", (e) => {
            const page = link.getAttribute("href");

            // Only prevent default if we are staying on the same page (using data-page logic)
            // Since we updated the HTML to use real links (profile.html), 
            // the browser will handle those naturally.
            if (page.includes(".html") && !page.includes("dashboard.html")) {
                return; 
            }
        });
    });
});

// Global Window Click to close dropdowns
window.onclick = (event) => {
    if (!event.target.matches('.notif-btn')) {
        document.querySelectorAll(".notif-dropdown").forEach(d => d.classList.remove("show"));
    }
};