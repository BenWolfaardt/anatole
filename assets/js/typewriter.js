// Typewriter effect for descriptions
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (!typewriterElement) return;
    
    // Get descriptions from data attribute
    const descriptionsData = typewriterElement.getAttribute('data-descriptions');
    if (!descriptionsData) return;
    
    let descriptions;
    try {
        descriptions = JSON.parse(descriptionsData);
    } catch (e) {
        console.error('Failed to parse descriptions:', e);
        return;
    }
    
    if (!descriptions || descriptions.length === 0) return;
    
    let currentIndex = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    const typeSpeed = 60; // Speed of typing (ms)
    const deleteSpeed = 40; // Speed of deleting (ms)
    const pauseTime = 1000; // Pause at end of phrase (ms)
    
    function typeWriter() {
        const currentDescription = descriptions[currentIndex];
        
        if (isDeleting) {
            // Remove one character - show progressively shorter text
            currentChar--;
            const displayText = currentDescription.substring(0, currentChar);
            typewriterElement.innerHTML = displayText + '<span class="typewriter-cursor">|</span>';
            
            if (currentChar === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % descriptions.length;
                setTimeout(typeWriter, typeSpeed);
            } else {
                setTimeout(typeWriter, deleteSpeed);
            }
        } else {
            // Add one character - show progressively longer text
            currentChar++;
            const displayText = currentDescription.substring(0, currentChar);
            typewriterElement.innerHTML = displayText + '<span class="typewriter-cursor">|</span>';
            
            if (currentChar === currentDescription.length) {
                // Finished typing current phrase, pause then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, pauseTime);
            } else {
                setTimeout(typeWriter, typeSpeed);
            }
        }
    }
    
    // Start the typewriter effect
    typeWriter();
});