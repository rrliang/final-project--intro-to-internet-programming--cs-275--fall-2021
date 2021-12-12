window.onload = () => {
    const LEFTBUTTON = document.getElementById(`left-button`);
    const RIGHTBUTTON = document.getElementById(`right-button`);
    const PARENT = document.getElementsByClassName(`parent`)[0];
    const MOVE = document.getElementsByClassName(`move`)[0];
    const WIDTH = 580;
    let index = 0;

    let checkSlide = () => {
        if (index > 0 && index < 4) {
            LEFTBUTTON.classList.remove(`hidden`);
            RIGHTBUTTON.classList.remove(`hidden`);
        } else if (index === 0) {
            LEFTBUTTON.classList.add(`hidden`);
        } else if (index === 4){
            RIGHTBUTTON.classList.add(`hidden`);
        }
    };


    let moveImages = (pixelsMoved) => {
        let currentLeft = parseInt((window.getComputedStyle(PARENT)).getPropertyValue(`left`));
        console.log(currentLeft);
        if (currentLeft === 510 || currentLeft === -70 || currentLeft === -650
            || currentLeft === -1230 || currentLeft === -1810 || currentLeft === -1230) {
            console.log(currentLeft);
            MOVE.style.left = currentLeft + pixelsMoved + "px";
            PARENT.classList.add(`move`);
            if (pixelsMoved < 0) {
                index += 1;
            } else {
                index -= 1;
            }
        }
    };

    RIGHTBUTTON.addEventListener(`click`, () => {
        moveImages(-WIDTH);
        checkSlide();
    });

    LEFTBUTTON.addEventListener(`click`, () => {
        moveImages(WIDTH);
        checkSlide();
    });
};
