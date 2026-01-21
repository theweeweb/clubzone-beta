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
    const logoutBtns = document.querySelectorAll(".logout-btn-unified");
    logoutBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "index.html";
        });
    });

    // 6. MOBILE NAVIGATION TOGGLE
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

/* =========================================
   ANNOUNCEMENTS & EVENTS LOGIC
   ========================================= */

// Load Announcements on Startup
document.addEventListener("DOMContentLoaded", () => {
    seedMockAnnouncements(); // Initialize mock data if empty
    loadAnnouncements();
});

// Mock Data Seeder
function seedMockAnnouncements() {
    const existingData = localStorage.getItem("clubzone_announcements");
    
    // Only seed if no data exists
    if (!existingData) {
        const mockData = [
            {
                id: "evt_mock_001",
                title: "Science Club Expo 2024",
                date: "2024-11-15",
                content: "Join us for the annual Science Expo! We need volunteers for booth setup and experiment demonstrations. This is going to be an exciting event for everyone!",
                author: "Science Club President",
                status: "pending" // Adviser needs to approve this
            },
            {
                id: "evt_mock_002",
                title: "Math Olympiad Registration",
                date: "2024-10-20",
                content: "Registration for the district Math Olympiad is now open. Please sign up at the Math Department office by Friday.",
                author: "Math Club President",
                status: "approved" // Already visible to students
            }
        ];
        localStorage.setItem("clubzone_announcements", JSON.stringify(mockData));
    } else {
        // Optional: Ensure at least one pending item exists for testing if user asks
        const data = JSON.parse(existingData);
        const hasPending = data.some(item => item.status === "pending");
        
        if (!hasPending) {
             const newMock = {
                id: "evt_mock_forced_" + Date.now(),
                title: "Pending Event Proposal",
                date: "2024-12-01",
                content: "This is a test event waiting for Adviser approval. Created automatically for demonstration.",
                author: "Demo Officer",
                status: "pending"
            };
            data.push(newMock);
            localStorage.setItem("clubzone_announcements", JSON.stringify(data));
        }
    }
}

function loadAnnouncements() {
    const role = localStorage.getItem("role");
    const announcements = JSON.parse(localStorage.getItem("clubzone_announcements")) || [];

    // Select Containers
    const studentList = document.getElementById("studentAnnouncementsList");
    const officerList = document.getElementById("officerAnnouncementsList");
    const adviserPendingList = document.getElementById("adviserPendingList");
    const adviserAllList = document.getElementById("adviserAllList");

    // Clear existing content (except empty state if we want to handle it manually, but simpler to clear)
    if(studentList) studentList.innerHTML = "";
    if(officerList) officerList.innerHTML = "";
    if(adviserPendingList) adviserPendingList.innerHTML = "";
    if(adviserAllList) adviserAllList.innerHTML = "";

    let hasStudentItems = false;
    let hasOfficerItems = false;
    let hasPendingItems = false;
    let hasAllItems = false;

    // Sort by date (newest first)
    announcements.sort((a, b) => new Date(b.date) - new Date(a.date));

    announcements.forEach(item => {
        const cardHTML = createAnnouncementCard(item, role);

        // STUDENT: Show only approved
        if (role === "student" && item.status === "approved") {
            studentList.innerHTML += cardHTML;
            hasStudentItems = true;
        }

        // OFFICER: Show all (or filter by own club if we had club data). 
        // For now, officers see all to keep track of competition/activity.
        if (role === "officer") {
            officerList.innerHTML += cardHTML;
            hasOfficerItems = true;
        }

        // ADVISER: Split into Pending and All
        if (role === "adviser") {
            if (item.status === "pending") {
                adviserPendingList.innerHTML += cardHTML;
                hasPendingItems = true;
            }
            // Show approved/rejected in the bottom list
            if (item.status !== "pending") {
                adviserAllList.innerHTML += cardHTML;
                hasAllItems = true;
            }
        }
    });

    // Show Empty States if needed
    if (role === "student" && !hasStudentItems) showEmptyState(studentList, "No upcoming events.");
    if (role === "officer" && !hasOfficerItems) showEmptyState(officerList, "No announcements found.");
    if (role === "adviser") {
        if (!hasPendingItems) showEmptyState(adviserPendingList, "No pending approvals.");
        if (!hasAllItems) showEmptyState(adviserAllList, "No history found.");
    }
}

function createAnnouncementCard(item, role) {
    let badgeClass = "";
    if (item.status === "pending") badgeClass = "status-pending";
    else if (item.status === "approved") badgeClass = "status-approved";
    else badgeClass = "status-rejected";

    let actions = "";
    
    // Adviser Actions
    if (role === "adviser" && item.status === "pending") {
        actions = `
            <div class="action-btns">
                <button onclick="updateStatus('${item.id}', 'approved')" class="btn-sm btn-approve"><i class="fas fa-check"></i> Approve</button>
                <button onclick="updateStatus('${item.id}', 'rejected')" class="btn-sm btn-reject"><i class="fas fa-times"></i> Reject</button>
            </div>
        `;
    }

    // Officer Actions (Can edit pending items)
    // Checking if current user is author would be better, but simplified for now.
    const currentName = localStorage.getItem("name");
    if (role === "officer" && item.author === currentName && item.status === "pending") {
        actions = `
             <div class="action-btns">
                <button onclick="editAnnouncement('${item.id}')" class="btn-sm btn-edit"><i class="fas fa-edit"></i> Edit</button>
            </div>
        `;
    }

    return `
        <div class="announcement-card">
            <div class="announcement-header">
                <div>
                    <h4 class="announcement-title">${item.title}</h4>
                    <span class="announcement-date"><i class="far fa-calendar-alt"></i> ${item.date}</span>
                </div>
                <span class="status-badge ${badgeClass}">${item.status}</span>
            </div>
            <p class="announcement-body">${item.content}</p>
            <div class="announcement-footer">
                <span>By: <strong>${item.author}</strong></span>
                ${actions}
            </div>
        </div>
    `;
}

function showEmptyState(container, message) {
    container.innerHTML = `<p class="empty-state">${message}</p>`;
}

/* ================== CRUD OPERATIONS ================== */

function openAnnouncementModal() {
    document.getElementById("announcementModal").style.display = "flex";
    // Clear form
    document.getElementById("announcementTitle").value = "";
    document.getElementById("announcementDate").value = "";
    document.getElementById("announcementContent").value = "";
    document.getElementById("editAnnouncementId").value = "";
}

function closeAnnouncementModal() {
    document.getElementById("announcementModal").style.display = "none";
}

function saveAnnouncement() {
    const title = document.getElementById("announcementTitle").value;
    const date = document.getElementById("announcementDate").value;
    const content = document.getElementById("announcementContent").value;
    const editId = document.getElementById("editAnnouncementId").value;
    
    if (!title || !date || !content) {
        alert("Please fill in all fields.");
        return;
    }

    const announcements = JSON.parse(localStorage.getItem("clubzone_announcements")) || [];

    if (editId) {
        // Edit Mode
        const index = announcements.findIndex(a => a.id === editId);
        if (index !== -1) {
            announcements[index].title = title;
            announcements[index].date = date;
            announcements[index].content = content;
            announcements[index].status = "pending"; // Reset to pending on edit
        }
    } else {
        // Create Mode
        const newAnnouncement = {
            id: "evt_" + Date.now(),
            title: title,
            date: date,
            content: content,
            author: localStorage.getItem("name") || "Officer",
            status: "pending" // Default status
        };
        announcements.push(newAnnouncement);
    }

    localStorage.setItem("clubzone_announcements", JSON.stringify(announcements));
    closeAnnouncementModal();
    loadAnnouncements(); // Refresh UI
    alert("Announcement submitted successfully!");
}

function editAnnouncement(id) {
    const announcements = JSON.parse(localStorage.getItem("clubzone_announcements")) || [];
    const item = announcements.find(a => a.id === id);
    
    if (item) {
        document.getElementById("announcementTitle").value = item.title;
        document.getElementById("announcementDate").value = item.date;
        document.getElementById("announcementContent").value = item.content;
        document.getElementById("editAnnouncementId").value = item.id;
        
        document.getElementById("announcementModal").style.display = "flex";
    }
}

function updateStatus(id, newStatus) {
    if (!confirm(`Are you sure you want to ${newStatus} this event?`)) return;

    const announcements = JSON.parse(localStorage.getItem("clubzone_announcements")) || [];
    const index = announcements.findIndex(a => a.id === id);

    if (index !== -1) {
        announcements[index].status = newStatus;
        localStorage.setItem("clubzone_announcements", JSON.stringify(announcements));
        loadAnnouncements();
    }
}