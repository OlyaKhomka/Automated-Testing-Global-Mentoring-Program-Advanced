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
        'jsResizeByHandle',
        async function (handleSelector, offsetX, offsetY) {
            const handle = await this.$(handleSelector);
            await browser.execute(
                (h, dx, dy) => {
                    const rect = h.getBoundingClientRect();
                    const startX = rect.left + rect.width / 2;
                    const startY = rect.top + rect.height / 2;

                    function fire(type, x, y) {
                        h.dispatchEvent(new MouseEvent(type, {
                            bubbles: true,
                            cancelable: true,
                            clientX: x,
                            clientY: y
                        }));
                    }

                    fire('mousedown', startX, startY);
                    fire('mousemove', startX + dx, startY + dy);
                    fire('mouseup', startX + dx, startY + dy);
                },
                handle,
                offsetX, offsetY
            );
        },
        true
    );



};