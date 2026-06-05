/**
 * BOOKY AI — Solution Section Timer Logic
 * Handles auto-cycling of expanding cards with progress bar synchronization.
 */

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.sol-exp-card');
    const container = document.querySelector('.sol-exp-container');
    if (!cards.length || !container) return;

    let currentIndex = 0;
    let timerDuration = 5000; // 5 seconds per card
    let startTime;
    let animationFrame;
    let isPaused = false;

    // Guard: Disable for Mobile
    if (window.innerWidth <= 991) {
        cards.forEach(card => card.classList.add('active'));
        return;
    }

    /**
     * Updates the progress bar for the active card
     */
    function updateProgress() {
        if (isPaused) return;

        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min((elapsed / timerDuration) * 100, 100);

        const activeCard = cards[currentIndex];
        const timerBar = activeCard.querySelector('.sol-exp-timer');

        if (timerBar) {
            // Check if mobile (stacked) or desktop
            if (window.innerWidth <= 991) {
                timerBar.style.width = `${progress}%`;
                timerBar.style.height = '4px';
            } else {
                timerBar.style.height = `${progress}%`;
                timerBar.style.width = '4px';
            }
        }

        if (progress < 100) {
            animationFrame = requestAnimationFrame(updateProgress);
        } else {
            nextCard();
        }
    }

    /**
     * Switches to a specific card by index
     */
    function setActiveCard(index) {
        // Reset all cards
        cards.forEach(card => {
            card.classList.remove('active');
            const bar = card.querySelector('.sol-exp-timer');
            if (bar) {
                bar.style.height = '0';
                bar.style.width = '0';
            }
        });

        // Set new active card
        currentIndex = index;
        cards[currentIndex].classList.add('active');

        // Reset timer
        resetTimer();
    }

    function nextCard() {
        const nextIndex = (currentIndex + 1) % cards.length;
        setActiveCard(nextIndex);
    }

    function resetTimer() {
        cancelAnimationFrame(animationFrame);
        startTime = Date.now();
        updateProgress();
    }

    // --- Event Listeners ---

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (currentIndex !== index) {
                setActiveCard(index);
            }
        });

        // Optional: Pause on hover
        card.addEventListener('mouseenter', () => { isPaused = true; });
        card.addEventListener('mouseleave', () => { 
            isPaused = false; 
            // Adjust startTime to account for pause duration if needed, 
            // but simple reset often feels better for UX
            startTime = Date.now() - (parseFloat(card.querySelector('.sol-exp-timer').style.height || 0) / 100 * timerDuration);
            updateProgress();
        });
    });

    // Initialize first card
    setActiveCard(0);
});
