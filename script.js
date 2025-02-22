document.addEventListener('DOMContentLoaded', () => {

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

    function showError(message) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const originalUrl = document.getElementById('originalUrl').value;
        const shortUrlInput = document.getElementById('shortUrlInput');
        const result = document.getElementById('result');

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

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const urlInput = document.getElementById('originalUrl');
    urlInput.addEventListener('input', () => {
        if (urlInput.validity.typeMismatch || urlInput.validity.patternMismatch) {
            errorMessage.textContent = 'Please enter a valid URL starting with http:// or https://';
        } else {
            errorMessage.textContent = '';
        }
    });
});