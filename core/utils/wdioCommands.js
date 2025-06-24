// core/utils/wdioCommands.js
module.exports = () => {
    browser.addCommand(
        'jsClick',
        async function () {
            await browser.execute(el => el.click(), this);
        },
        true
    );

    browser.addCommand(
        'jsScrollToView',
        async function () {
            await browser.execute(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), this);
        },
        true
    );

    browser.addCommand(
        'isScrolledIntoView',
        async function () {
            return await browser.execute(el => {
                const rect = el.getBoundingClientRect(); // Get elements size

                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;

                // Check if it is visible
                const isVerticallyVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
                const isHorizontallyVisible = rect.left >= 0 && rect.right <= viewportWidth;

                // If it is fully visible
                return isVerticallyVisible && isHorizontallyVisible;
            }, this);
        },
        true
    );

    browser.addCommand(
        'jsHover',
        async function () {
            await browser.execute(el => {
                // Simulation of a mouse click 
                const mouseOverEvent = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                });
                el.dispatchEvent(mouseOverEvent);
            }, this);
        },
        true
    );

};