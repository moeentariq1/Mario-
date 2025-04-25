document.addEventListener('DOMContentLoaded', function() {
    console.log('Medicine search script loaded');
    
    // Define medicines that should redirect directly to their detail pages
    const medicineTerms = ['lisinopril', 'atorvastatin', 'metformin', 'aspirin', 'ibuprofen'];
    
    // Get all search buttons and inputs
    const searchButtons = document.querySelectorAll('.search-bar .btn');
    const searchInputs = document.querySelectorAll('.search-bar input');
    
    console.log('Found search buttons:', searchButtons.length);
    console.log('Found search inputs:', searchInputs.length);
    
    // Process search button clicks
    searchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Search button clicked');
            handleSearchRedirect(e, this);
        });
    });
    
    // Also handle pressing Enter in search inputs
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Enter key pressed in search input');
                handleSearchRedirect(e, this.closest('.search-bar').querySelector('.btn'));
            }
        });
        
        // Add direct input monitoring for medicine terms
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const isMedicine = medicineTerms.some(medicine => searchTerm.includes(medicine));
            
            if (isMedicine) {
                console.log('Medicine term detected:', searchTerm);
                input.classList.add('medicine-match');
            } else {
                input.classList.remove('medicine-match');
            }
        });
    });
    
    // Function to handle search redirects
    function handleSearchRedirect(e, buttonElement) {
        try {
            e.preventDefault();
            
            // Get search term from the closest input
            const searchBar = buttonElement.closest('.search-bar');
            const searchInput = searchBar.querySelector('input');
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            console.log('Search term:', searchTerm);
            
            // Check if the search term is a medicine
            const isMedicine = medicineTerms.some(medicine => searchTerm.includes(medicine));
            console.log('Is medicine:', isMedicine);
            
            // Show loading indicator
            buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Store the search term in localStorage for the destination page
            localStorage.setItem('lastSearchTerm', searchTerm);
            
            // Redirect after short delay with more reliable approach
            setTimeout(() => {
                if (isMedicine) {
                    console.log('Redirecting to medicine results page');
                    // Use multiple approaches to ensure redirection works
                    try {
                        window.location.href = 'medicine-results.html';
                        
                        // Fallback: try again with absolute path if the above doesn't work
                        setTimeout(() => {
                            const currentPath = window.location.pathname;
                            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                            window.location.replace(basePath + 'medicine-results.html');
                        }, 100);
                    } catch (redirectError) {
                        console.error('Redirect error:', redirectError);
                        // Last resort - force navigation with a link click
                        const link = document.createElement('a');
                        link.href = 'medicine-results.html';
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                    }
                } else {
                    console.log('Redirecting to regular search results page');
                    window.location.href = 'search-results.html';
                }
            }, 800);
        } catch (error) {
            console.error('Error in handleSearchRedirect:', error);
        }
    }
    
    // Check if we came to this page after a search
    const lastSearchTerm = localStorage.getItem('lastSearchTerm');
    if (lastSearchTerm) {
        console.log('Found previous search:', lastSearchTerm);
        const searchInputs = document.querySelectorAll('.search-bar input');
        searchInputs.forEach(input => {
            input.value = lastSearchTerm;
        });
        
        // Clear the stored search term
        localStorage.removeItem('lastSearchTerm');
    }
});
