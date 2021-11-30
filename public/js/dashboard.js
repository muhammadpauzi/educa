import { getSpinnerComponent, getCardComponent, getTextMessageComponent } from "./components.js";
import { classesGroup } from "./elements.js";
import { fetchData } from "./utils.js";

const getClasses = async () => {
    const { res, data } = await fetchData({
        url: '/classes',
        options: {
            headers: { 'Content-Type': 'application/json' }
        }
    });
    return data;
}

const showClasses = async () => {
    classesGroup.innerHTML = getSpinnerComponent({});
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

// for call in html tag cause type module
window.showClasses = showClasses;

showClasses();