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
});

// Modal Functions
function openRegForm() { document.getElementById("regModal").style.display = "flex"; }
function closeRegForm() { document.getElementById("regModal").style.display = "none"; }
function submitRegistration() {
    alert("Registration Submitted Successfully!");
    closeRegForm();
}