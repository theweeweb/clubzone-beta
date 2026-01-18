document.addEventListener("DOMContentLoaded", () => {
    // 1. SYNC NAVBAR
    const role = localStorage.getItem("role") || "student";
    const name = localStorage.getItem("name") || "Guest User";

    document.getElementById("navUserName").textContent = name;
    const roleBadge = document.getElementById("navUserRole");
    roleBadge.textContent = role.toUpperCase();
    roleBadge.className = "badge " + role.toLowerCase();

    // 2. ROLE-BASED UI LOGIC
    const joinBtns = document.querySelectorAll(".join-btn");
    const editBtns = document.querySelectorAll(".edit-btn");
    const bannerText = document.getElementById("bannerText");

    if (role === "student") {
        joinBtns.forEach(btn => btn.style.display = "block");
        bannerText.textContent = "Find a club you love and click Register to join the community!";
    } else if (role === "adviser") {
        editBtns.forEach(btn => btn.style.display = "block");
        bannerText.textContent = "As an Adviser, you can update club categories and manage organizations.";
    }

    // 3. EVENT LISTENERS
    joinBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            alert("Application sent! Your request is now pending review by the club adviser.");
        });
    });

    editBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = e.target.closest(".club-card");
            const clubName = card.querySelector(".club-title").textContent;
            
            document.getElementById("editingClubName").textContent = clubName;
            document.getElementById("editClubCategoryInput").value = card.querySelector(".category").textContent;
            document.getElementById("editClubModal").style.display = "flex";
        });
    });

    // Logout logic
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });
});

// Modal Actions
function closeModal() {
    document.getElementById("editClubModal").style.display = "none";
}

function saveClubChange() {
    const newValue = document.getElementById("editClubCategoryInput").value;
    alert("Saved category as: " + newValue);
    closeModal();
}