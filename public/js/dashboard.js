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


const getSpinnerComponent = () => {
    return `<div class="py-10">
    <div
        class="loader mx-auto ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"
    ></div>
    </div>`;
}

const getTextMessageComponent = (message = "", color = "red") => {
    return `<div class="py-10"><p class="text-center text-${color}-500 font-medium">${message}</p></div>`;
}

const getCardComponent = ({ name, id, room, username }) => {
    return `<div class="bg-white border-2 border-gray-200 p-4 rounded-md w-full">
        <div class="mb-5">
            <h2 class="text-xl text-gray-800 font-medium">
                <a href="/classes/${id}" class="text-green-500 hover:underline">${name}</a>
            </h2>
            <h3 class="text-lg text-gray-600">${room}</h3>
        </div>

        <div class="flex space-x-3 items-center">
            <a href="" class="text-md text-sm font-medium text-gray-800">${username}</a>
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
    classesGroup.innerHTML = getSpinnerComponent();
    const { user } = await getClasses();
    if (user.Classes.length > 0) {
        let cardComponents = '';
        user.Classes.forEach(_class => {
            cardComponents += getCardComponent({ ..._class, username: user.name });
        });
        classesGroup.innerHTML = cardComponents;
    } else {
        classesGroup.innerHTML = getTextMessageComponent('Classes does not exist.');
    }
}

showClasses();