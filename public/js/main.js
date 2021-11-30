import { getNotificationComponent } from './components.js';
import { hideNotif, notifGroup, tabItems, tabTriggers } from './elements.js';

tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
        // handle style of tab triggers
        tabTriggers.forEach(trigger => {
            trigger.classList.remove('border-green-500');
            trigger.classList.add('hover:border-green-200');
        });
        this.classList.add('border-green-500');
        this.classList.remove('hover:border-green-200');
        // handle tab items
        tabItems.forEach(item => {
            const tabItem = document.querySelector(this.dataset.target);
            item.style.display = 'none';
            tabItem.style.display = 'block';
        })
    });
});

hideNotif && hideNotif.addEventListener('click', function () {
    document.querySelector(this.dataset.target).remove();
});

export const copyText = (TextToCopy) => {
    var TempText = document.createElement("input");
    TempText.value = TextToCopy;
    document.body.appendChild(TempText);
    TempText.select();

    document.execCommand("copy");
    document.body.removeChild(TempText);

    alert("Copied!");
}

export const showNotification = (data = {}) => {
    notifGroup.innerHTML = getNotificationComponent(data);
}
