document.addEventListener("DOMContentLoaded", () => {
    // 1. GET USER DATA
    const role = localStorage.getItem("role") || "student";
    const name = localStorage.getItem("name") || "Guest User";
    const strand = localStorage.getItem("strand") || "N/A";
    const club = localStorage.getItem("club") || "No Club Joined";

    // 2. UPDATE UNIFIED NAVBAR
    document.getElementById("navUserName").textContent = name;
    const roleBadge = document.getElementById("navUserRole");
    roleBadge.textContent = role.toUpperCase();
    roleBadge.className = "badge " + role.toLowerCase();
    
    // Set Profile Link to active
    document.getElementById("nav-prof").classList.add("active");

    // 3. SHOW CORRECT PROFILE CARD
    if (role === "student") {
        document.getElementById("studentProfile").style.display = "block";
        document.getElementById("studentName").textContent = name;
        document.getElementById("studentStrand").textContent = strand;
        document.getElementById("studentClub").textContent = "Club Member: " + club;
    } else if (role === "officer") {
        document.getElementById("officerProfile").style.display = "block";
        document.getElementById("officerName").textContent = name;
        document.getElementById("officerStrand").textContent = strand;
        document.getElementById("officerClub").textContent = club;
        document.getElementById("officerPosition").textContent = "Position: Club Officer";
    } else if (role === "adviser") {
        document.getElementById("adviserProfile").style.display = "block";
        document.getElementById("adviserName").textContent = name;
        document.getElementById("adviserClub").textContent = "Advising: " + club;
    }

    // 4. UNIFIED LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });

    // 5. LOAD ADVISER PHOTO (If exists)
    const savedPhoto = localStorage.getItem("adviserPhoto");
    if (savedPhoto && role === "adviser") {
        const img = document.getElementById("adviserAvatar");
        const placeholder = document.getElementById("adviserAvatarPlaceholder");
        if (img && placeholder) {
            img.src = savedPhoto;
            img.style.display = "block";
            placeholder.style.display = "none";
        }
    }

    // 6. ADVISER PHOTO UPLOAD LISTENER
    const photoInput = document.getElementById("adviserPhotoInput");
    if (photoInput) {
        photoInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const dataUrl = event.target.result;
                    
                    // Save to LocalStorage
                    try {
                        localStorage.setItem("adviserPhoto", dataUrl);
                        
                        // Update UI
                        const img = document.getElementById("adviserAvatar");
                        const placeholder = document.getElementById("adviserAvatarPlaceholder");
                        img.src = dataUrl;
                        img.style.display = "block";
                        placeholder.style.display = "none";
                        
                    } catch (err) {
                        alert("Image is too large to save. Please try a smaller image.");
                        console.error("Storage failed", err);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // MOBILE NAVIGATION TOGGLE
    const menuToggles = document.querySelectorAll(".menu-toggle");
    menuToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const navContainer = toggle.closest(".nav-container");
            const navLinks = navContainer.querySelector(".nav-links-desktop");
            if (navLinks) {
                navLinks.classList.toggle("active");
            }
        });
    });
});

// Modal Functions
function openRegForm() { document.getElementById("regModal").style.display = "flex"; }
function closeRegForm() { document.getElementById("regModal").style.display = "none"; }
function submitRegistration() {
    alert("Registration Submitted Successfully!");
    closeRegForm();
}
document.addEventListener("DOMContentLoaded", () => {
    // 1. Load initial name
    const currentName = localStorage.getItem("name") || "User Name";
    document.getElementById("profileNameDisplay").textContent = currentName;

    // 2. Open Modal
    document.getElementById("openEditNameBtn").addEventListener("click", () => {
        document.getElementById("newNameInput").value = localStorage.getItem("name");
        document.getElementById("nameModal").style.display = "flex";
    });
});

function updateGlobalName() {
    const newName = document.getElementById("newNameInput").value;

    if (newName.trim() !== "") {
        // 1. Update the "Database" (LocalStorage)
        // This is the key the Navbar uses on every page!
        localStorage.setItem("name", newName);

        // 2. Update current page UI
        document.getElementById("profileNameDisplay").textContent = newName;
        document.getElementById("navUserName").textContent = newName; 

        alert("Name updated successfully!");
        closeNameModal();
    } else {
        alert("Name cannot be empty.");
    }
}

function closeNameModal() {
    document.getElementById("nameModal").style.display = "none";
}

/* ================== ADVISER EDIT FUNCTIONS ================== */

function openAdviserEditModal() {
    const currentName = localStorage.getItem("name") || "Adviser Name";
    document.getElementById("editAdviserNameInput").value = currentName;
    document.getElementById("adviserEditModal").style.display = "flex";
}

function closeAdviserModal() {
    document.getElementById("adviserEditModal").style.display = "none";
}

function saveAdviserProfile() {
    const newName = document.getElementById("editAdviserNameInput").value;
    
    if (newName.trim() === "") {
        alert("Name cannot be empty.");
        return;
    }

    // 1. Save to LocalStorage
    localStorage.setItem("name", newName);

    // 2. Update UI Elements
    document.getElementById("adviserName").textContent = newName;
    document.getElementById("navUserName").textContent = newName;
    
    alert("Profile updated successfully!");
    closeAdviserModal();
}