document.addEventListener('DOMContentLoaded', function() {
    // Hardcoded medicine names that trigger redirect to medicine tab
    const targetMedicines = ['advil', 'tylenol', 'lipitor', 'zoloft', 'ibuprofen', 'aspirin', 'atorvastatin'];
    
    // Initialize search functionality
    initializeSearchFunctionality();
    
    // Add a global event listener to reinitialize after dynamic content changes
    document.addEventListener('contentUpdated', initializeSearchFunctionality);
    
    // Function to initialize all search functionality
    function initializeSearchFunctionality() {
        console.log('Initializing search functionality');
        
        // Find all search inputs and buttons
        const searchInputs = document.querySelectorAll('.search-bar input');
        const searchButtons = document.querySelectorAll('.search-bar .btn');
        
        // Process search button clicks
        searchButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.removeEventListener('click', handleButtonClick);
            button.addEventListener('click', handleButtonClick);
        });
        
        // Handle pressing Enter in search inputs
        searchInputs.forEach(input => {
            // Remove existing listeners to prevent duplicates
            input.removeEventListener('keypress', handleKeyPress);
            input.addEventListener('keypress', handleKeyPress);
            
            // Remove existing input listeners
            input.removeEventListener('input', handleInput);
            input.addEventListener('input', handleInput);
        });
    }
    
    // Event handler functions (defined once, reused for all listeners)
    function handleButtonClick(e) {
        const searchBar = this.closest('.search-bar');
        const searchInput = searchBar.querySelector('input');
        processSearch(e, searchInput.value);
    }
    
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            processSearch(e, this.value);
        }
    }
    
    function handleInput() {
        const searchTerm = this.value.toLowerCase().trim();
        const isMedicine = targetMedicines.some(medicine => searchTerm.includes(medicine));
        
        if (isMedicine) {
            this.classList.add('medicine-match');
        } else {
            this.classList.remove('medicine-match');
        }
    }
    
    // Function to process search term and redirect if it matches our targets
    function processSearch(e, searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        // Check if search includes any of our hardcoded medicines
        const isMedicine = targetMedicines.some(medicine => searchTerm.includes(medicine));
        
        console.log('Processing search:', searchTerm, 'Is medicine:', isMedicine);
        
        if (isMedicine) {
            e.preventDefault();
            
            // Store search term to display in results
            localStorage.setItem('lastSearchTerm', searchTerm);
            
            // Redirect to search results with medicine tab hash
            window.location.href = 'search-results.html#medicine-tab';
        } else {
            // For non-medicine searches, ensure default behavior works
            // Only prevent default if we're handling it ourselves
            const isSubmitEvent = e.type === 'submit';
            
            if (!isSubmitEvent) {
                e.preventDefault();
                // Store search term
                localStorage.setItem('lastSearchTerm', searchTerm);
                // Redirect to regular search results
                window.location.href = 'search-results.html';
            }
        }
    }
    
    // Look for any login/signup form submissions to reinitialize after authentication
    const authForms = document.querySelectorAll('#login-form, #signup-form, #insurance-login-form');
    authForms.forEach(form => {
        form.addEventListener('submit', function() {
            // Schedule reinitialization after page updates
            setTimeout(initializeSearchFunctionality, 500);
        });
    });
    
    // Also check for login status changes
    window.addEventListener('storage', function(e) {
        // If login status changed in localStorage
        if (e.key === 'mariaLoggedIn') {
            setTimeout(initializeSearchFunctionality, 500);
        }
    });
});
