const burgerButton = document.querySelector(".burger-button");
burgerButton.addEventListener('click', toggleNavVisibility);
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(navLink => navLink.addEventListener('click', disableNavVisibility));

function disableNavVisibility() {
    const nav = document.querySelector("nav");
    if (nav.classList.contains("visible")) {
        card.classList.remove("visible");
    }
    document.body.style.overflow = '';
}

function toggleNavVisibility() {
    const nav = document.querySelector("nav");
    nav.classList.toggle('visible');
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
}

const radioButtons = document.querySelectorAll(".services-buttons button");
radioButtons.forEach(button => button.addEventListener('click', toggleCardsBlur));

const cardsInfo = {
    garden: {
        buttonId: 'garden-button',
        isSelected: false
    },
    lawn: {
        buttonId: 'lawn-button',
        isSelected: false
    },
    planting: {
        buttonId: 'planting-button',
        isSelected: false
    }
};

function toggleCardsBlur() {
    const currentCard = Object.values(cardsInfo).find(cardInfo => cardInfo.buttonId == this.id);

    if (Object.values(cardsInfo).reduce((count, card) => count += card.isSelected ? 1 : 0, 0) == 2
        && !currentCard.isSelected) {
        return;
    }

    currentCard.isSelected = !currentCard.isSelected;
    this.classList.toggle('checked');

    if (Object.values(cardsInfo).every(card => card.isSelected == false)) {
        unblurAllCards();
        return;
    }

    for (let cardName in cardsInfo) {
        if (cardsInfo[cardName].isSelected) {
            const cardsToUnblur = document.querySelectorAll(`figure.${cardName}`);
            for (let card of cardsToUnblur) {
                if (card.classList.contains("blurred")) {
                    card.classList.remove("blurred");
                }
            }
        } else {
            const cardsToBlur = document.querySelectorAll(`figure.${cardName}`);
            for (let card of cardsToBlur) {
                if (!card.classList.contains("blurred")) {
                    card.classList.add("blurred");
                }
            }
        }
    }
}

function unblurAllCards() {
    const cards = document.querySelectorAll('figure');
    for (let card of cards) {
        if (card.classList.contains("blurred")) {
            card.classList.remove("blurred");
        }
    }
}

const priceItemButtons = document.querySelectorAll('.price-item-button');
priceItemButtons.forEach(button => button.addEventListener('click', event => event.stopPropagation()));
const priceItems = document.querySelectorAll(".price-item");
priceItems.forEach(priceItem => priceItem.addEventListener('click', openPriceItem));

function openPriceItem() {
    const priceItemsToClose = document.querySelectorAll(`.price-item:not(#${this.id})`);
    for (let priceItem of priceItemsToClose) {
        if (priceItem.classList.contains('opened')) {
            priceItem.classList.remove('opened');
        }
    }

    this.classList.toggle('opened');
}

const contactsCity = document.querySelector('.contacts-city');
contactsCity.addEventListener('click', openContactsCitySelect);
const contactsCityItems = document.querySelectorAll('.contacts-city-dropdown li');
contactsCityItems.forEach(item => item.addEventListener('click', selectCity));

function openContactsCitySelect() {
    this.classList.toggle('opened');
}

function selectCity() {
    const selectedCity = this.querySelector('p').textContent;
    document.querySelector('span.city').textContent = selectedCity;
    fillInContactData(selectedCity);
    if (!contactsCity.classList.contains('selected')) {
        contactsCity.classList.add('selected');
    }

    const contactsSection = contactsCity.parentElement;
    if (!contactsSection.classList.contains('hide-background')) {
        contactsSection.classList.add('hide-background')
    }
}

function fillInContactData(selectedCity) {
    const cityInfos = [
        {
            city: 'Canandaigua, NY',
            phone: '+1 585 393 0001',
            address: '151 Charlotte Street'
        },
        {
            city: 'New York City',
            phone: '+1 212 456 0002',
            address: '9 East 91st Street'
        },
        {
            city: 'Yonkers, NY',
            phone: '+1 914 678 0003',
            address: '511 Warburton Ave'
        },
        {
            city: 'Sherrill, NY',
            phone: '+1 315 908 0004',
            address: '14 WEST Noyes BLVD'
        }
    ];

    const selectedCityInfo = cityInfos.find(cityInfo => cityInfo.city == selectedCity);
    document.querySelector('#contact-info-city').textContent = selectedCityInfo.city;
    document.querySelector('#contact-info-phone').textContent = selectedCityInfo.phone;
    document.querySelector('#contact-info-address').textContent = selectedCityInfo.address;
}

console.log(`
1. При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50
    - При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20
    - Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20
    - Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10

2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50
    - При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25
    - Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25

3. В разделе contacts реализован select с выбором городов +25
    - В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15
    - При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10

Итоговая оценка: 100 баллов.`);