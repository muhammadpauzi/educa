const tabTriggers = document.querySelectorAll('.tab-triggers');
const tabItems = document.querySelectorAll('.tab-items');

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
})