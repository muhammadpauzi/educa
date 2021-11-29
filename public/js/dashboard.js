const tabTriggers = document.querySelectorAll('.tab-triggers');
const tabItems = document.querySelectorAll('.tab-items');
const classesGroup = document.getElementById('classes');

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


const cardComponent = ({ name, User, room }) => {
    return `<div class="bg-white border-2 border-gray-200 p-4 rounded-md w-full">
        <div class="mb-5">
            <h2 class="text-2xl text-gray-800 font-bold">
                <a href="" class="text-green-500 hover:underline">${name}</a>
            </h2>
            <h3 class="text-lg text-gray-600">${room}</h3>
        </div>

        <div class="flex space-x-3 items-center">
            <a href="" class="text-md text-sm font-medium text-gray-800">${User.name}</a>
        </div>
    </div>`
}

const getClasses = async () => {
    try {
        const res = await fetch('/classes', { headers: { 'Content-Type': 'application/json' } });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const showClasses = async () => {
    const { classes } = await getClasses();
    let cardComponents = '';
    classes.forEach(_class => {
        cardComponents += cardComponent(_class);
    });
    classesGroup.innerHTML = cardComponents;
}

showClasses();