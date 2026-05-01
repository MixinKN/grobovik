export function dropdown(containerSelector = '.dropdown--wrapper') {
    // Находим все контейнеры с дропдаунами
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
        const button = container.querySelector('.dropdown--button');
        const menu = container.querySelector('.dropdown__content');

        if (!button || !menu) return;

        // Проверяем, нужен ли hover (если у контейнера есть класс hover-trigger)
        const isHoverEnabled = container.classList.contains('hover-trigger');

        // Убираем старые обработчики, если они есть
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Получаем актуальный меню после замены
        const newMenu = container.querySelector('.dropdown__content');

        if (isHoverEnabled) {
            // Hover логика
            let hoverTimeout;

            const showMenu = () => {
                clearTimeout(hoverTimeout);

                // Закрываем другие меню
                document.querySelectorAll('.dropdown__content.show').forEach(openMenu => {
                    if (openMenu !== newMenu) {
                        openMenu.classList.remove('show');
                    }
                });

                newMenu.classList.add('show');
            };

            const hideMenu = () => {
                hoverTimeout = setTimeout(() => {
                    newMenu.classList.remove('show');
                }, 150); // небольшая задержка для удобства
            };

            // Добавляем обработчики наведения на кнопку и меню
            newButton.addEventListener('mouseenter', showMenu);
            newButton.addEventListener('mouseleave', hideMenu);
            newMenu.addEventListener('mouseenter', showMenu);
            newMenu.addEventListener('mouseleave', hideMenu);

        } else {
            // Click логика (по умолчанию)
            newButton.addEventListener('click', (event) => {
                event.stopPropagation();

                // Закрываем другие меню
                document.querySelectorAll('.dropdown__content.show').forEach(openMenu => {
                    if (openMenu !== newMenu) {
                        openMenu.classList.remove('show');
                    }
                });

                newMenu.classList.toggle('show');
            });
        }
    });

    // Обработчик закрытия по клику вне (только для click-режима)
    document.removeEventListener('click', closeAllMenus);
    document.addEventListener('click', closeAllMenus);
}

function closeAllMenus() {
    document.querySelectorAll('.dropdown__content.show').forEach(menu => {
        // Закрываем только меню, которые не находятся в hover-режиме
        const container = menu.closest('.dropdown--wrapper');
        if (!container || !container.classList.contains('hover-trigger')) {
            menu.classList.remove('show');
        }
    });
}