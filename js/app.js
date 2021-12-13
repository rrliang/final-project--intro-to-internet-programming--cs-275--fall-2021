window.onload = () => {
    const LEFTBUTTON = document.getElementById(`left-button`);
    const RIGHTBUTTON = document.getElementById(`right-button`);
    const PARENT = document.getElementsByClassName(`all-slides`)[0];
    let width = 0;
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

    RIGHTBUTTON.addEventListener(`click`, () => {
        width -= 639;
        PARENT.style.transform = `translate(`+width+`px)`;
        index += 1;
        checkSlide();
    });

    LEFTBUTTON.addEventListener(`click`, () => {
        width += 639;
        PARENT.style.transform = `translate(`+width+`px)`;
        index -= 1;
        checkSlide();
    });

    document.addEventListener(`keydown`, (e) => {
        if (e.key === `ArrowRight` && !RIGHTBUTTON.classList.contains(`hidden`)) {
            RIGHTBUTTON.click();
        } else if (e.key === `ArrowLeft` && !LEFTBUTTON.classList.contains(
            `hidden`)) {
            LEFTBUTTON.click();
        }
    });
};
