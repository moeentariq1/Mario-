document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('mariaLoggedIn') === 'true';
    
    // Update all insurance sections based on login status
    updateInsuranceInfoSections(isLoggedIn);
    
    // Add event listeners to login buttons
    const loginButtons = document.querySelectorAll('.insurance-info-section .btn-primary');
    loginButtons.forEach(button => {
        button.addEventListener('click', showLoginModal);
    });
    
    // Function to show login modal
    function showLoginModal() {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        
        // Create modal content
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <button class="close-btn"><i class="fas fa-times"></i></button>
                
                <h2 style="margin-bottom: 20px; color: var(--primary);">Insurance Information</h2>
                
                <form id="insurance-login-form">
                    <div class="form-group">
                        <label for="insurance-provider">Select Insurance Provider</label>
                        <select id="insurance-provider" required>
                            <option value="" selected disabled>Choose your provider</option>
                            <option value="aetna">Aetna</option>
                            <option value="bluecross">Blue Cross Blue Shield</option>
                            <option value="cigna">Cigna</option>
                            <option value="united">UnitedHealthcare</option>
                            <option value="medicare">Medicare</option>
                            <option value="medicaid">Medicaid</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="member-id">Member ID</label>
                        <input type="text" id="member-id" placeholder="XXX-XXX-XXXXX" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="group-number">Group Number</label>
                        <input type="text" id="group-number" placeholder="XXXXXXX" required>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button type="submit" class="btn btn-primary">Submit Insurance Information</button>
                    </div>
                </form>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Handle close button
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        });
        
        // Handle clicks outside modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Handle form submission
        const form = modal.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Set logged in state
            localStorage.setItem('mariaLoggedIn', 'true');
            localStorage.setItem('mariaInsuranceProvider', document.getElementById('insurance-provider').value);
            
            // Simulate loading delay
            setTimeout(() => {
                // Close modal
                closeModal(modal);
                
                // Update UI
                updateInsuranceInfoSections(true);
                
                // Show success message
                showToast('Insurance information saved successfully!', 'success');
            }, 1000);
        });
    }
    
    // Function to close modal
    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // Function to update insurance info sections
    function updateInsuranceInfoSections(isLoggedIn) {
        const insuranceSections = document.querySelectorAll('.insurance-info-section');
        
        insuranceSections.forEach(section => {
            if (isLoggedIn) {
                // Show logged in content with dummy insurance prices
                const provider = localStorage.getItem('mariaInsuranceProvider') || 'bluecross';
                const providerName = getProviderFullName(provider);
                
                section.innerHTML = `
                    <h3>With Insurance</h3>
                    <div style="background: rgba(77, 161, 169, 0.1); padding: var(--spacing-3); border-radius: var(--radius-md); margin-bottom: var(--spacing-3);">
                        <div style="display: flex; align-items: center; margin-bottom: var(--spacing-2);">
                            <i class="fas fa-check-circle" style="color: var(--success); margin-right: var(--spacing-2); font-size: 20px;"></i>
                            <strong style="color: var(--primary);">${providerName}</strong>
                        </div>
                        <p style="margin-bottom: var(--spacing-2);">Your estimated cost with insurance:</p>
                        <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--primary); margin-bottom: var(--spacing-2);">$20 - $75</div>
                        <p style="color: var(--text-secondary); font-size: var(--font-size-sm);">*Actual cost may vary based on your specific plan</p>
                    </div>
                    
                    <div class="insurance-savings">
                        <h4 style="margin-bottom: var(--spacing-2);">Potential Savings</h4>
                        <div style="display: flex; align-items: center; margin-bottom: var(--spacing-2);">
                            <span style="background: var(--success); color: white; padding: 2px 8px; border-radius: 12px; font-size: var(--font-size-xs); margin-right: var(--spacing-2);">SAVE</span>
                            <strong>Up to 90% with your insurance</strong>
                        </div>
                        <p style="font-size: var(--font-size-sm); color: var(--text-secondary);">Based on average in-network rates</p>
                    </div>
                    
                    <button class="btn btn-outline" style="margin-top: var(--spacing-3);" id="logout-btn">
                        <i class="fas fa-sign-out-alt"></i> Use Different Insurance
                    </button>
                `;
                
                // Add logout functionality
                const logoutBtn = section.querySelector('#logout-btn');
                logoutBtn.addEventListener('click', function() {
                    localStorage.removeItem('mariaLoggedIn');
                    localStorage.removeItem('mariaInsuranceProvider');
                    updateInsuranceInfoSections(false);
                    showToast('Logged out successfully', 'info');
                });
                
            } else {
                // Show default login content
                section.innerHTML = `
                    <h3>With Insurance</h3>
                    <div class="insurance-message">
                        <i class="fas fa-info-circle"></i>
                        <p>Without your insurance information, Mario can not provide an accurate estimate of your costs when using insurance.</p>
                    </div>
                    <button class="btn btn-primary">Login</button>
                `;
                
                // Add event listener to the new login button
                const loginBtn = section.querySelector('.btn-primary');
                loginBtn.addEventListener('click', showLoginModal);
            }
        });
    }
    
    // Helper function to get full provider name
    function getProviderFullName(providerId) {
        const providers = {
            'aetna': 'Aetna',
            'bluecross': 'Blue Cross Blue Shield',
            'cigna': 'Cigna',
            'united': 'UnitedHealthcare',
            'medicare': 'Medicare',
            'medicaid': 'Medicaid'
        };
        return providers[providerId] || 'Your Insurance';
    }
    
    // Function to show toast notifications
    function showToast(message, type = 'success') {
        // Check if there's already a toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> ${message}`;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
});
