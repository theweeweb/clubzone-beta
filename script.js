function editAnnouncement(announcementId) {
    // Select the announcement element
    var announcement = document.getElementById(announcementId);

    // Change the title and event name to input fields for editing
    var title = announcement.querySelector('.title');
    var eventName = announcement.querySelector('.event-name');
    
    // Create input fields for editing
    title.innerHTML = '<input type="text" value="' + title.innerHTML + '" class="edit-input">';
    eventName.innerHTML = '<input type="text" value="' + eventName.innerHTML.replace('Event: ', '') + '" class="edit-input">';
    
    // Change button to 'Save' button
    var button = announcement.querySelector('.edit-button');
    button.innerHTML = 'Save';
    button.setAttribute('onclick', 'saveAnnouncement("' + announcementId + '")');
}

function saveAnnouncement(announcementId) {
    // Get the edited values
    var announcement = document.getElementById(announcementId);
    var title = announcement.querySelector('.title input').value;
    var eventName = announcement.querySelector('.event-name input').value;

    // Update the poster with the new values
    announcement.querySelector('.title').innerHTML = title;
    announcement.querySelector('.event-name').innerHTML = 'Event: ' + eventName;

    // Change button back to 'Edit'
    var button = announcement.querySelector('.edit-button');
    button.innerHTML = 'Edit';
    button.setAttribute('onclick', 'editAnnouncement("' + announcementId + '")');
}