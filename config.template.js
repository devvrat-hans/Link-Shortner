/**
 * URL Shortener Configuration Template
 * 
 * Setup Instructions:
 * 1. Copy this file and rename it to 'config.js'
 * 2. Replace 'YOUR_API_KEY_HERE' with your actual TinyURL API key
 * 3. Keep config.js in .gitignore to protect your API key
 * 
 * Get your API key from: https://tinyurl.com/app/settings/api
 */

const config = {
    // TinyURL API endpoint
    API_BASE_URL: 'https://api.tinyurl.com/create',
    
    // Your TinyURL API key
    TINY_URL_API_KEY: 'uNbQ0M2guvqPxMrlubzAwDMT5UYvYZ06jjjRlSXCOF005weIdJIkxjyAzQwA',
    
    // API request timeout in milliseconds
    REQUEST_TIMEOUT: 5000,
    
    // Maximum URL length allowed
    MAX_URL_LENGTH: 2048,
    
    // API version
    API_VERSION: 'v1'
};