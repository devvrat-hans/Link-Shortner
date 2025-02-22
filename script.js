document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('shortenForm');
    const submitBtn = document.getElementById('submitBtn');
    const buttonText = submitBtn.querySelector('.button-text');
    const loader = submitBtn.querySelector('.loader');
    const copyBtn = document.getElementById('copyBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    const errorMessage = document.getElementById('errorMessage');
    const twitterShare = document.getElementById('twitterShare');
    const facebookShare = document.getElementById('facebookShare');
    const modal = document.getElementById('errorModal');
    const modalMessage = document.getElementById('modalErrorMessage');
    const closeModal = document.querySelector('.close-modal');

    // URL Shortening Function
    async function shortenUrl(url) {
        const apiUrl = config.API_BASE_URL;
        const apiKey = config.TINY_URL_API_KEY;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }

            const data = await response.json();
            return data.data.tiny_url;
        } catch (error) {
            throw new Error('Failed to shorten URL: ' + error.message);
        }
    }

    // Copy to Clipboard Function
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            copyFeedback.textContent = 'Copied to clipboard!';
            copyFeedback.style.color = 'var(--success-color)';
            setTimeout(() => {
                copyFeedback.textContent = '';
            }, 2000);
        } catch (err) {
            showError('Failed to copy to clipboard');
        }
    }

    // Show Error Function
    function showError(message) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }

    // Event Listeners
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const originalUrl = document.getElementById('originalUrl').value;
        const shortUrlInput = document.getElementById('shortUrlInput');
        const result = document.getElementById('result');

        // Show loading state
        buttonText.style.display = 'none';
        loader.style.display = 'block';
        submitBtn.disabled = true;
        errorMessage.textContent = '';

        try {
            const shortUrl = await shortenUrl(originalUrl);
            shortUrlInput.value = shortUrl;
            result.style.display = 'block';
        } catch (error) {
            showError(error.message);
        } finally {
            // Reset button state
            buttonText.style.display = 'block';
            loader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    copyBtn.addEventListener('click', () => {
        const shortUrl = document.getElementById('shortUrlInput').value;
        if (shortUrl) {
            copyToClipboard(shortUrl);
        }
    });

    // Social Share Buttons
    twitterShare.addEventListener('click', () => {
        const shortUrl = document.getElementById('shortUrlInput').value;
        if (shortUrl) {
            const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}&text=Check out this link:`;
            window.open(twitterUrl, '_blank');
        }
    });

    facebookShare.addEventListener('click', () => {
        const shortUrl = document.getElementById('shortUrlInput').value;
        if (shortUrl) {
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortUrl)}`;
            window.open(facebookUrl, '_blank');
        }
    });

    // Modal Close Button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close Modal on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // URL Validation
    const urlInput = document.getElementById('originalUrl');
    urlInput.addEventListener('input', () => {
        if (urlInput.validity.typeMismatch || urlInput.validity.patternMismatch) {
            errorMessage.textContent = 'Please enter a valid URL starting with http:// or https://';
        } else {
            errorMessage.textContent = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.classList.add('fade-in');
        }, 1500);
    });
});