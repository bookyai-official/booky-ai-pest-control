document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('siteAnnouncementPopup');
    if (!popup) return;

    const dontShowBtn = popup.querySelector('.dont-show-again');
    const closeBtn = popup.querySelector('.announcement-close');
    const PREF_KEY = 'hide_bookyai_announcement';

    // Show popup if not dismissed
    if (localStorage.getItem(PREF_KEY) !== 'true') {
        // slight delay for animation effect
        setTimeout(() => {
            popup.classList.remove('d-none');
        }, 1000);

        // Auto close after 10 seconds
        setTimeout(() => {
            closePopup();
        }, 11000); // 1s delay + 10s showing
    }

    function closePopup() {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
        popup.style.transition = 'all 0.3s ease';
        setTimeout(() => popup.remove(), 300);
    }

    closeBtn.addEventListener('click', closePopup);

    dontShowBtn.addEventListener('click', function() {
        localStorage.setItem(PREF_KEY, 'true');
        closePopup();
    });
});
