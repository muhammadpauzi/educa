export const tabTriggers = document.querySelectorAll('.tab-triggers');
export const tabItems = document.querySelectorAll('.tab-items');
export const classesGroup = document.getElementById('classes');
export const followedClassesGroup = document.getElementById('followedClasses');
export const studentsGroup = document.getElementById('students');
export const worksGroup = document.getElementById('works');
export const hideNotif = document.getElementById('hideNotif');
export const parentClass = document.getElementById('parentClass');
export const copyInviteLinkButton = document.getElementById('copyInviteLinkButton');
export const copyClassCodeButton = document.getElementById('copyClassCodeButton');
export const copyCodeButton = document.getElementById('copyCodeButton');
export const notifGroup = document.getElementById('notifGroup');
export const updateClassCodeButton = document.getElementById('updateClassCodeButton');

export const updateElementWithID = (element) => {
    const { id } = element;
    const existsElement = document.getElementById(id);
    if (!existsElement)
        return false;
    element = existsElement;
    return true;
}