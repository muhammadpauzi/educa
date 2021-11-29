import { getSpinnerComponent, getCardComponent, getTextMessageComponent } from "./components.js";
import { classesGroup } from "./elements.js";

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