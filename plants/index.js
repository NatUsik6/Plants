const burgerButton = document.querySelector(".burger-button");
burgerButton.addEventListener('click', toggleNavVisibility);
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(navLink => navLink.addEventListener('click', toggleNavVisibility));

function toggleNavVisibility() {
    const nav = document.querySelector("nav");
    nav.classList.toggle('visible');
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
}

console.log(`
1. Вёрстка соответствует макету. Ширина экрана 768px +24
    блок <header> +2
    секция welcome +3
    секция about +4
    секция service +4
    секция prices +4
    секция contacts +4
    блок <footer> + 3
2. Вёрстка соответствует макету. Ширина экрана 380px +24
    блок <header> +2
    секция welcome +3
    секция about +4
    секция service +4
    секция prices +4
    секция contacts +4
    блок <footer> + 3
3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
    нет полосы прокрутки при ширине страницы от 1440рх до 380px +7
    нет полосы прокрутки при ширине страницы от 380px до 320рх +8
4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22
    при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2
    при нажатии на бургер-иконку плавно появляется адаптивное меню +4
    адаптивное меню соответствует цветовой схеме макета +4
    при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
    ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4
    при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4

Итоговая оценка: 75 баллов.`);