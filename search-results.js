document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Tab functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId + '-content').classList.add('active');
        });
    });
    
    // View Toggle
    const listViewBtn = document.getElementById('list-view-btn');
    const mapViewBtn = document.getElementById('map-view-btn');
    const mapView = document.getElementById('map-view');
    const resultsGrids = document.querySelectorAll('.results-grid');
    
    listViewBtn.addEventListener('click', function() {
        listViewBtn.classList.add('active');
        mapViewBtn.classList.remove('active');
        mapView.style.display = 'none';
        resultsGrids.forEach(grid => {
            grid.style.display = 'grid';
        });
    });
    
    mapViewBtn.addEventListener('click', function() {
        mapViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        mapView.style.display = 'flex';
        resultsGrids.forEach(grid => {
            grid.style.display = 'none';
        });
    });
    
    // Filter functionality
    const distanceSlider = document.getElementById('distance-filter');
    const distanceValue = distanceSlider.nextElementSibling;
    
    distanceSlider.addEventListener('input', function() {
        distanceValue.textContent = this.value + ' miles';
        filterResults();
    });
    
    // Additional filters
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const ratingFilter = document.getElementById('rating-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const sortOptions = document.getElementById('sort-options');
    
    [priceMin, priceMax, ratingFilter, availabilityFilter].forEach(filter => {
        filter.addEventListener('change', filterResults);
    });
    
    sortOptions.addEventListener('change', sortResults);
    
    // Function to filter results
    function filterResults() {
        const resultsContainer = document.getElementById('results-container');
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Generate new filtered results
        generateSampleResults(resultsContainer);
        
        // Show toast notification for filters
        showToast('Results filtered successfully');
    }
    
    // Function to sort results
    function sortResults() {
        const sortBy = sortOptions.value;
        const resultsContainer = document.getElementById('results-container');
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Generate new sorted results
        generateSampleResults(resultsContainer, sortBy);
        
        // Show toast notification for sorting
        showToast('Results sorted by ' + sortBy.replace('-', ' '));
    }
    
    // Function to show toast notifications
    function showToast(message, type = 'success') {
        // Remove any existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => {
            document.body.removeChild(toast);
        });
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>${message}`;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }, 100);
    }
    
    // Generate sample search results
    function generateSampleResults(container, sortBy = 'recommended') {
        // Sample result data
        const results = [
            {
                title: 'Brain MRI',
                provider: 'City Imaging Center',
                distance: 2.4,
                rating: 4.5,
                reviews: 208,
                insurancePrice: 350,
                cashPrice: 1200,
                savings: 71
            },
            {
                title: 'MRI Scan Without Contrast',
                provider: 'Westside Radiology',
                distance: 1.8,
                rating: 4.2,
                reviews: 156,
                insurancePrice: 400,
                cashPrice: 950,
                savings: 58
            },
            {
                title: 'Knee MRI',
                provider: 'Advanced Medical Imaging',
                distance: 3.5,
                rating: 4.8,
                reviews: 302,
                insurancePrice: 320,
                cashPrice: 1100,
                savings: 71
            },
            {
                title: 'Full Body MRI',
                provider: 'Premium Diagnostic Center',
                distance: 4.2,
                rating: 4.7,
                reviews: 189,
                insurancePrice: 800,
                cashPrice: 2500,
                savings: 68
            },
            {
                title: 'MRI with Contrast',
                provider: 'University Hospital',
                distance: 5.6,
                rating: 4.9,
                reviews: 412,
                insurancePrice: 600,
                cashPrice: 1800,
                savings: 67
            },
            {
                title: 'Chest MRI',
                provider: 'Downtown Imaging',
                distance: 0.8,
                rating: 3.9,
                reviews: 97,
                insurancePrice: 450,
                cashPrice: 1300,
                savings: 65
            }
        ];
        
        // Sort results based on selected option
        if (sortBy === 'price-low') {
            results.sort((a, b) => a.insurancePrice - b.insurancePrice);
        } else if (sortBy === 'price-high') {
            results.sort((a, b) => b.insurancePrice - a.insurancePrice);
        } else if (sortBy === 'distance') {
            results.sort((a, b) => a.distance - b.distance);
        } else if (sortBy === 'rating') {
            results.sort((a, b) => b.rating - a.rating);
        }
        
        // Apply filters
        const distanceValue = parseInt(document.getElementById('distance-filter').value);
        const minPrice = parseInt(document.getElementById('price-min').value) || 0;
        const maxPrice = parseInt(document.getElementById('price-max').value) || 10000;
        const minRating = parseInt(document.getElementById('rating-filter').value) || 0;
        
        const filteredResults = results.filter(result => {
            return (
                result.distance <= distanceValue &&
                result.insurancePrice >= minPrice &&
                result.insurancePrice <= maxPrice &&
                result.rating >= minRating
            );
        });
        
        // Add results to container
        filteredResults.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.innerHTML = `
                <span class="savings-badge">Save ${result.savings}%</span>
                <div class="card-header">
                    <h3>${result.title}</h3>
                    <span class="distance">${result.distance} miles</span>
                </div>
                <div class="provider">${result.provider}</div>
                <div class="rating">
                    ${getStarRating(result.rating)}
                    <span>${result.rating} (${result.reviews})</span>
                </div>
                <div class="price-comparison">
                    <div class="price-option insurance">
                        <div class="price-label">Insurance</div>
                        <div class="price-value">$${result.insurancePrice}</div>
                    </div>
                    <div class="price-option cash">
                        <div class="price-label">Cash Pay</div>
                        <div class="price-value">$${result.cashPrice - 100} <span class="price-original">$${result.cashPrice}</span></div>
                    </div>
                </div>
                <button class="btn btn-primary full-width" style="margin-top: var(--spacing-3);">Book Appointment</button>
            `;
            container.appendChild(resultCard);
        });
        
        // Update results count
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            resultsCount.textContent = `${filteredResults.length} results for "MRI scan"`;
        }
        
        // If no results, show message
        if (filteredResults.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search"></i>
                <p>No results found for your search criteria.</p>
                <p>Try adjusting your filters or search terms.</p>
            `;
            container.appendChild(noResults);
        }
    }
    
    // Helper function to generate star ratings
    function getStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    // Generate initial results
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        generateSampleResults(resultsContainer);
    }
    
    // Handle search form submissions
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Search updated');
        filterResults();
    });
    
    // Handle suggestion tag clicks
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-bar input');
            searchInput.value = this.textContent;
            showToast(`Searching for "${this.textContent}"`);
            filterResults();
        });
    });
    
    // Voice search functionality
    const voiceSearchButton = document.querySelector('.voice-search');
    if (voiceSearchButton) {
        voiceSearchButton.addEventListener('click', function() {
            if ('webkitSpeechRecognition' in window) {
                showToast('Listening...', 'info');
                
                // In a real implementation, this would use the Web Speech API
                // For demo purposes, we'll simulate it
                setTimeout(() => {
                    const searchInput = document.querySelector('.search-bar input');
                    searchInput.value = 'Brain MRI scan';
                    showToast('Voice search: "Brain MRI scan"');
                    filterResults();
                }, 2000);
            } else {
                showToast('Voice search not supported in this browser', 'error');
            }
        });
    }
});
