window.onload = () => {
    const LEFTBUTTON = document.getElementById(`left-button`);
    const RIGHTBUTTON = document.getElementById(`right-button`);
    const PARENT = document.getElementsByClassName(`parent`)[0];
    const MOVE = document.getElementsByClassName(`move`)[0];
    const WIDTH = 580;
    let index = 0;

    let checkSlide = () => {
        console.log(index);
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
        MOVE.style.left = currentLeft + pixelsMoved + "px";
        PARENT.classList.add(`move`);
    };

    RIGHTBUTTON.addEventListener(`click`, () => {
        moveImages(-WIDTH);
        index += 1;
        checkSlide();
    });

    LEFTBUTTON.addEventListener(`click`, () => {
        moveImages(WIDTH);
        index -= 1;
        checkSlide();
    });
};
