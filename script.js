document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    //theme
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
    
    // Modal Handling
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const authModal = document.getElementById('auth-modal');
    const insuranceModal = document.getElementById('insurance-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    
    function openModal(modal) {
        modal.style.display = 'flex';
        // Short timeout to ensure display is applied before opacity transition
        setTimeout(function() {
            modal.style.opacity = '1';
        }, 10);
    }
    
    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(function() {
            modal.style.display = 'none';
        }, 300); // Match the CSS transition time
    }
    
    loginBtn.addEventListener('click', function() {
        openModal(authModal);
        document.querySelector('[data-tab="login"]').click();
    });
    
    signupBtn.addEventListener('click', function() {
        openModal(authModal);
        document.querySelector('[data-tab="signup"]').click();
    });
    
    // Handle closing of modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabContentId = this.getAttribute('data-tab') + '-content';
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            document.getElementById(tabContentId).classList.remove('hidden');
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form Submission Prevention (for demo purposes)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show insurance modal after login/signup (for demo)
            if (form.closest('#login-content') || form.closest('#signup-content')) {
                closeModal(authModal);
                setTimeout(() => {
                    openModal(insuranceModal);
                    // Fill with dummy data when opened
                    populateDummyInsuranceData();
                }, 300);
            }
            
            // Handle insurance form submission (move to next step without validation)
            if (form.closest('.insurance-modal')) {
                closeModal(insuranceModal);
                // Here you would typically go to step 3
                // But since we don't have that modal, we'll just show a success message
                alert('Successfully saved insurance information!');
            }
        });
    });
    
    // Simulate Search Autocomplete Effect
    const searchInputs = document.querySelectorAll('.search-bar input');
    const suggestionItems = document.querySelectorAll('.suggestion-item:not(.blur-item)');
    
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const suggestions = this.closest('.autocomplete-demo')?.querySelector('.suggestions');
            if (suggestions) {
                suggestions.style.display = 'block';
            }
        });
        
        // Add typing effect
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                const suggestions = this.closest('.autocomplete-demo')?.querySelector('.suggestions');
                if (suggestions) {
                    suggestions.style.display = 'block';
                }
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.autocomplete-demo')) {
                const suggestions = document.querySelectorAll('.suggestions');
                suggestions.forEach(s => {
                    s.style.display = 'none';
                });
            }
        });
    });
    
    suggestionItems.forEach(item => {
        item.addEventListener('click', function() {
            openModal(authModal);
            document.querySelector('[data-tab="login"]').click();
        });
    });
    
    // Calendar Available Days Interaction
    const availableDays = document.querySelectorAll('.day.available');
    
    availableDays.forEach(day => {
        day.addEventListener('click', function() {
            openModal(authModal);
            document.querySelector('[data-tab="login"]').click();
        });
    });
    
    // Price Card Hover Animation and Click
    const priceCards = document.querySelectorAll('.price-card');
    
    priceCards.forEach(card => {
        card.addEventListener('click', function() {
            openModal(authModal);
            document.querySelector('[data-tab="login"]').click();
        });
    });
    
    // Login prompt buttons
    const loginPromptButtons = document.querySelectorAll('.login-prompt .btn');
    
    loginPromptButtons.forEach(button => {
        button.addEventListener('click', function() {
            openModal(authModal);
            document.querySelector('[data-tab="login"]').click();
        });
    });
    
    // Calendar login button
    const calendarLoginButton = document.querySelector('.calendar-footer .btn');
    
    if (calendarLoginButton) {
        calendarLoginButton.addEventListener('click', function() {
            openModal(authModal);
            document.querySelector('[data-tab="login"]').click();
        });
    }
    
    // Add active state to the current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Add intersection observer for animations
    const fadeElements = document.querySelectorAll('.price-card, .upload-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Simulate loading states on search
    const searchButtons = document.querySelectorAll('.search-bar .btn');
    
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                this.innerHTML = 'Search';
                openModal(authModal);
            }, 1000);
        });
    });
    
    // Add insurance dropdown to search bar
    const searchBars = document.querySelectorAll('.search-bar');
    searchBars.forEach(searchBar => {
        // Skip if it already has a dropdown or if we're on the landing page
        if (searchBar.querySelector('.insurance-dropdown') || window.location.pathname.includes('index.html')) return;
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'insurance-dropdown';
        dropdown.innerHTML = `
            <select aria-label="Select insurance">
                <option value="" selected>Select Insurance</option>
                <option value="aetna">Aetna</option>
                <option value="bluecross">Blue Cross Blue Shield</option>
                <option value="cigna">Cigna</option>
                <option value="united">UnitedHealthcare</option>
                <option value="kaiser">Kaiser Permanente</option>
                <option value="medicare">Medicare</option>
                <option value="medicaid">Medicaid</option>
            </select>
        `;
        
        // Insert before the button
        const button = searchBar.querySelector('button');
        if (button) {
            searchBar.insertBefore(dropdown, button);
        } else {
            searchBar.appendChild(dropdown);
        }
    });
    
    // Populate dummy data for insurance form
    function populateDummyInsuranceData() {
        // Set a default insurance provider
        const insuranceProviderSelect = document.getElementById('insurance-provider');
        if (insuranceProviderSelect) {
            insuranceProviderSelect.value = 'bluecross';
        }
        
        // Fill member ID and group number with dummy data
        const memberId = document.getElementById('member-id');
        const groupNumber = document.getElementById('group-number');
        
        if (memberId) memberId.value = 'XYZ-123456789';
        if (groupNumber) groupNumber.value = 'G9876543';
        
        // Remove any validation for picture uploads
        const uploadButtons = document.querySelectorAll('.upload-card .btn');
        uploadButtons.forEach(btn => {
            btn.classList.add('success');
            btn.innerHTML = '<i class="fas fa-check"></i> Completed';
        });
    }
    
    // Fix navigation between modals
    function setupModalNavigation() {
        // Fix the back button in insurance modal
        const backButton = document.querySelector('#insurance-modal .form-buttons .btn-text');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal(document.getElementById('insurance-modal'));
                setTimeout(() => {
                    openModal(document.getElementById('auth-modal'));
                    document.querySelector('[data-tab="login"]').click();
                }, 300);
            });
        }
        
        // Fix continue buttons in login/signup forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Login and signup forms
                if (form.closest('#login-content') || form.closest('#signup-content')) {
                    closeModal(document.getElementById('auth-modal'));
                    setTimeout(() => {
                        openModal(document.getElementById('insurance-modal'));
                        populateDummyInsuranceData();
                    }, 300);
                }
                
                // Insurance form - fix selector to use ID instead of class
                if (form.closest('#insurance-modal')) {
                    closeModal(document.getElementById('insurance-modal'));
                    alert('Successfully saved insurance information!');
                }
            });
        });
    }
    
    // Create the user info modal for step 3
    function createUserInfoModal() {
        // Skip if already exists
        if (document.getElementById('user-info-modal')) return;
        
        const userInfoModal = document.createElement('div');
        userInfoModal.id = 'user-info-modal';
        userInfoModal.className = 'modal';
        
        userInfoModal.innerHTML = `
            <div class="modal-content">
                <button class="close-btn"><i class="fas fa-times"></i></button>
                
                <div class="progress-bar">
                    <div class="progress" style="width: 100%;"></div>
                    <div class="steps">
                        <div class="step complete">1</div>
                        <div class="step complete">2</div>
                        <div class="step active">3</div>
                    </div>
                    <div class="step-label">Step 3 of 3: Communication Preferences</div>
                </div>
                
                <form id="user-info-form">
                    <div class="form-group">
                        <label for="user-phone">Phone Number</label>
                        <input type="tel" id="user-phone" placeholder="(123) 456-7890" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="user-dob">Date of Birth</label>
                        <input type="date" id="user-dob" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Communication Preferences</label>
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" id="email-pref" checked> Email
                            </label>
                            <label>
                                <input type="checkbox" id="sms-pref"> SMS
                            </label>
                            <label>
                                <input type="checkbox" id="phone-pref"> Phone Call
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Subscribe to:</label>
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" id="newsletter" checked> Health Newsletter
                            </label>
                            <label>
                                <input type="checkbox" id="promotions"> Promotions & Discounts
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-buttons">
                        <button type="button" class="btn btn-text" id="back-to-insurance">Back</button>
                        <button type="submit" class="btn btn-primary">Complete Sign Up</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(userInfoModal);
        
        // Set up event listeners for the new modal
        const closeBtn = userInfoModal.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            closeModal(userInfoModal);
        });
        
        const backBtn = userInfoModal.querySelector('#back-to-insurance');
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(userInfoModal);
            setTimeout(() => {
                openModal(document.getElementById('insurance-modal'));
            }, 300);
        });
        
        const form = userInfoModal.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state on button
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate processing delay
            setTimeout(() => {
                closeModal(userInfoModal);
                
                // Show success message before redirecting
                const successToast = document.createElement('div');
                successToast.className = 'toast success';
                successToast.innerHTML = '<i class="fas fa-check-circle"></i> Account created successfully!';
                document.body.appendChild(successToast);
                
                // Show toast
                setTimeout(() => {
                    successToast.classList.add('show');
                    
                    // Redirect after success message
                    setTimeout(() => {
                        window.location.href = 'search-results.html';
                    }, 1500);
                }, 100);
            }, 1000);
        });
    }
    
    // Modify form submission to handle the 3-step flow
    function updateFormSubmissions() {
        // Update insurance form submission to go to step 3
        const insuranceForm = document.querySelector('#insurance-modal form');
        if (insuranceForm) {
            // Remove existing listeners
            const newInsuranceForm = insuranceForm.cloneNode(true);
            insuranceForm.parentNode.replaceChild(newInsuranceForm, insuranceForm);
            
            newInsuranceForm.addEventListener('submit', function(e) {
                e.preventDefault();
                closeModal(document.getElementById('insurance-modal'));
                setTimeout(() => {
                    openModal(document.getElementById('user-info-modal'));
                }, 300);
            });
        }
        
        // Update search buttons to redirect to search results
        const searchButtons = document.querySelectorAll('.search-bar .btn');
        searchButtons.forEach(button => {
            // Remove existing listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                setTimeout(() => {
                    window.location.href = 'search-results.html';
                }, 1000);
            });
        });
    }
    
    // Run after setupModalNavigation to override its event listeners
    function enhanceModalNavigation() {
        // Fix navigation for insurance modal
        const backButton = document.querySelector('#insurance-modal .form-buttons .btn-text');
        if (backButton) {
            // Clear existing listeners
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
            
            newBackButton.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal(document.getElementById('insurance-modal'));
                setTimeout(() => {
                    openModal(document.getElementById('auth-modal'));
                    document.querySelector('[data-tab="login"]').click();
                }, 300);
            });
        }
        
        // Update progress bar in insurance modal to show 3 steps
        const progressBarSteps = document.querySelector('#insurance-modal .steps');
        if (progressBarSteps) {
            progressBarSteps.innerHTML = `
                <div class="step complete">1</div>
                <div class="step active">2</div>
                <div class="step">3</div>
            `;
        }
        
        const progressBarLabel = document.querySelector('#insurance-modal .step-label');
        if (progressBarLabel) {
            progressBarLabel.textContent = 'Step 2 of 3: Insurance Information';
        }
        
        // Update form submissions for the 3-step flow
        updateFormSubmissions();
    }
    
    // Initialize page (to handle direct access to sections via URL hash)
    function initPage() {
        const hash = window.location.hash;
        if (hash) {
            // Scroll to the section after a short delay to ensure page is loaded
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
        
        // Replace "HealthMarket" with "mario" (would normally do this in HTML)
        document.querySelectorAll('.logo h1, .auth-header h1, footer h3').forEach(el => {
            if (el.textContent === 'HealthMarket') {
                el.textContent = 'mario';
            }
        });
        
        // Initialize modal navigation
        setupModalNavigation();
        
        // Create the final user info modal for step 3
        createUserInfoModal();
    }
    
    initPage();
    
    // Call after initPage to override setupModalNavigation
    enhanceModalNavigation();
    
    // Modify the login form handling
    const loginForm = document.querySelector('#login-content form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Redirect directly to search results
            setTimeout(() => {
                window.location.href = 'search-results.html';
            }, 1000);
        });
    }
});
