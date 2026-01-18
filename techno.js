document.addEventListener("DOMContentLoaded", () => {
    // 1. SYNC NAVBAR DATA
    const role = localStorage.getItem("role") || "student";
    const name = localStorage.getItem("name") || "Guest User";

    document.getElementById("navUserName").textContent = name;
    const roleBadge = document.getElementById("navUserRole");
    roleBadge.textContent = role.toUpperCase();
    roleBadge.className = "badge " + role.toLowerCase();

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });

    // 2. ROLE-BASED UI BUTTONS
    if (role === "student") {
        document.getElementById("registerBtn").style.display = "flex";
    } else if (role === "officer") {
        document.getElementById("addActivityBtn").style.display = "flex";
    } else if (role === "adviser") {
        document.getElementById("adviserEditBtn").style.display = "flex";
        document.getElementById("addActivityBtn").style.display = "flex";
    }

    displayActivities();
});

// INITIAL DATA
let activities = JSON.parse(localStorage.getItem("clubActivities")) || [
    { id: 1, title: "Web Dev Workshop", date: "Feb 2026", status: "approved" },
    { id: 2, title: "AI Seminar", date: "March 2026", status: "pending" }
];

function displayActivities() {
    const role = localStorage.getItem("role");
    const list = document.getElementById("upcomingList");
    list.innerHTML = "";

    activities.forEach(act => {
        if (role === "student" && act.status !== "approved") return;

        const item = document.createElement("div");
        item.className = "event-item";
        item.innerHTML = `
            <div class="event-info">
                <h4>${act.title} ${act.status === 'pending' ? '<span class="not-final-tag">Pending</span>' : ''}</h4>
                <p><i class="fas fa-calendar-alt"></i> ${act.date}</p>
            </div>
            <div class="action-area">
                ${role === "adviser" && act.status === "pending" 
                    ? `<button class="approve-btn" onclick="approveActivity(${act.id})">Approve</button>` 
                    : `<span class="teaser-tag">${act.status === 'approved' ? 'Official' : 'Proposal'}</span>`}
            </div>
        `;
        list.appendChild(item);
    });
}

function approveActivity(id) {
    activities = activities.map(act => {
        if (act.id === id) {
            act.status = "approved";
            let globalEvents = JSON.parse(localStorage.getItem("bulletinEvents")) || [];
            globalEvents.push({ title: act.title, club: "Technophile Club" });
            localStorage.setItem("bulletinEvents", JSON.stringify(globalEvents));
        }
        return act;
    });
    localStorage.setItem("clubActivities", JSON.stringify(activities));
    alert("Approved! This event is now live on the Bulletin.");
    displayActivities();
}

function submitActivity() {
    const title = document.getElementById("newActivityTitle").value;
    const date = document.getElementById("newActivityDate").value;
    if(!title || !date) return alert("Please fill all fields");

    activities.push({ id: Date.now(), title, date, status: "pending" });
    localStorage.setItem("clubActivities", JSON.stringify(activities));
    alert("Proposal submitted to Adviser!");
    closeModals();
    displayActivities();
}

// Modal Handlers
document.getElementById("adviserEditBtn")?.addEventListener("click", () => {
    document.getElementById("editClubTitleInput").value = document.getElementById("clubName").textContent;
    document.getElementById("editClubDescInput").value = document.getElementById("clubDesc").textContent;
    document.getElementById("editClubModal").style.display = "flex";
});

document.getElementById("addActivityBtn")?.addEventListener("click", () => {
    document.getElementById("addActivityModal").style.display = "flex";
});

function closeModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.style.display = "none");
}

function saveClubDetails() {
    document.getElementById("clubName").textContent = document.getElementById("editClubTitleInput").value;
    document.getElementById("clubDesc").textContent = document.getElementById("editClubDescInput").value;
    closeModals();
    alert("Club details updated!");
}