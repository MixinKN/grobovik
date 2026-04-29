export function dropdown(containerSelector = '.header__black-widgets-item') {
    // Находим все контейнеры с дропдаунами
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
        const button = container.querySelector('.header__black-currency');
        const menu = container.querySelector('.dropdown__content');

        if (!button || !menu) return;

        // Убираем старые обработчики, если они есть
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener('click', (event) => {
            event.stopPropagation();

            // Закрываем другие меню
            document.querySelectorAll('.dropdown__content.show').forEach(openMenu => {
                if (openMenu !== menu) {
                    openMenu.classList.remove('show');
                }
            });

            menu.classList.toggle('show');
        });
    });

    // Обработчик закрытия по клику вне
    document.removeEventListener('click', closeAllMenus);
    document.addEventListener('click', closeAllMenus);
}

function closeAllMenus() {
    document.querySelectorAll('.dropdown__content.show').forEach(menu => {
        menu.classList.remove('show');
    });
}