const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const main_screen = $('.main_screen');
const recent_screen = $('.recent');

const buttonConstants = ['mc', 'm+', 'm-', 'mr', 'C', 'x', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '%', '0', ','];
const calcButtons = $('.button');


const createNewButton = (id, content) => {
    const newButton = document.createElement('button');
    newButton.id = id;
    newButton.textContent = content || buttonConstants[id];
    if (content === '=') {
        newButton.classList.add('button_extending', 'button_equal');
    }

    newButton.onclick = () => {
        if (newButton.textContent === buttonConstants.at(19)) {
            calc();
            return;
        }
        if (newButton.textContent === buttonConstants.at(5)) {
            main_screen.textContent = main_screen.textContent.slice(0, -1);
            return;
        }
        if (newButton.textContent === buttonConstants.at(4)) {
            main_screen.textContent = '';
            recent_screen.textContent = '';
            return;
        }
        main_screen.textContent += newButton.textContent;
    }
    return newButton;
}
const reset_result = () => {
    if (recent_screen.classList.contains('transition_result')) {
        recent_screen.classList.remove('transition_result');
        recent_screen.classList.add('recent');
    }
}

const reset_main = () => {
    if (main_screen.classList.contains('transition_main')) {
        main_screen.classList.remove('transition_main');
        main_screen.classList.add('main_screen');
    }
}

const calc = () => {
    const result = eval(main_screen.textContent.replace(/,/g, '.'));
    recent_screen.textContent = main_screen.textContent;
    main_screen.textContent = result;
    recent_screen.classList.remove('recent');
    recent_screen.classList.add('transition_result');
    main_screen.classList.add('transition_main');
    setTimeout(() => {
        reset_result();
        reset_main();
    }, 500);
}

const allButtons = buttonConstants.map((_, i) => createNewButton(i, _));
allButtons.forEach(button => calcButtons.appendChild(button));