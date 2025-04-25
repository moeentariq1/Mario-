document.addEventListener('DOMContentLoaded', function() {
    // Check if we have a hash indicating we should show the medicine tab
    if (window.location.hash === '#medicine-tab') {
        // Remove the hash to avoid issues with scrolling
        history.replaceState(null, null, ' ');
        
        // Find the medicine tab and click it to activate
        const medicineTab = document.querySelector('.category-tab[data-tab="medicine"]');
        if (medicineTab) {
            setTimeout(() => {
                medicineTab.click();
            }, 100);
        }
    }
});
