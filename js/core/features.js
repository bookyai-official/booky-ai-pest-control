/**
 * features.js
 * Handles the features accordion auto-cycle and manual switching.
 * Each feature is displayed for 3 seconds before advancing to the next.
 */

(function () {
    var TOTAL_FEATURES = 4;
    var INTERVAL_MS    = 6000;
    var currentFeat    = 1;
    var autoTimer      = null;
    var manualPause    = false;
    var manualTimer    = null;
    var MANUAL_PAUSE_MS = 12000; // resume auto-cycle after 12s of no interaction

    /** Switch to a specific feature (1-indexed) */
    function switchFeat(n) {
        currentFeat = n;

        // Update accordion items
        document.querySelectorAll('.feat-accordion-item').forEach(function (el) {
            el.classList.remove('active');
        });
        document.querySelectorAll('.feat-accordion-item[data-feat="' + n + '"]').forEach(function (el) {
            el.classList.add('active');
        });

        // Update visual panels
        document.querySelectorAll('.feat-visual-panel').forEach(function (el) {
            el.classList.remove('active');
        });
        var panel = document.getElementById('feat-visual-' + n);
        if (panel) panel.classList.add('active');
    }

    /** Advance to the next feature, wrapping around */
    function nextFeat() {
        if (!manualPause) {
            currentFeat = currentFeat >= TOTAL_FEATURES ? 1 : currentFeat + 1;
            switchFeat(currentFeat);
        }
    }

    /** Start auto-cycling */
    function startAuto() {
        stopAuto();
        autoTimer = setInterval(nextFeat, INTERVAL_MS);
    }

    /** Stop auto-cycling */
    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    /** Called when user manually clicks a tab — pauses auto for MANUAL_PAUSE_MS */
    function onManualSwitch(n) {
        manualPause = true;
        switchFeat(n);

        // Reset the manual-pause timer
        clearTimeout(manualTimer);
        manualTimer = setTimeout(function () {
            manualPause = false;
        }, MANUAL_PAUSE_MS);
    }

    /** Bind click handlers to every accordion item */
    function bindClicks() {
        document.querySelectorAll('.feat-accordion-item').forEach(function (el) {
            el.addEventListener('click', function () {
                var n = parseInt(el.getAttribute('data-feat'), 10);
                onManualSwitch(n);
            });
        });
    }

    /** Bootstrap everything once DOM is ready */
    function init() {
        // Expose switchFeat globally so inline onclick still works if present
        window.switchFeat = onManualSwitch;

        bindClicks();
        switchFeat(1);   // Ensure step 1 is active on load
        startAuto();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
