import { copyClassCodeButton, copyInviteLinkButton, hideNotif, studentsGroup, updateClassCodeButton, updateElementWithID } from "./elements.js";
import { getSpinnerComponent, getStudentCardComponent, getTextMessageComponent } from "./components.js";
import { copyText, showNotification } from "./main.js";
import { fetchData } from "./utils.js";

const getInviteLink = async (classId) => {
    const { res, data } = await fetchData({
        url: `/classes/${classId}/invite-link`
    });
    return data;
}

const getStudents = async (classId) => {
    const { res, data } = await fetchData({
        url: `/classes/${classId}/students`,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
    return data;
}

const showStudents = async (classId) => {
    studentsGroup.innerHTML = getSpinnerComponent({});
    const { students } = await getStudents(classId);
    if (students.length > 0) {
        let studentCardComponents = '';
        students.forEach(student => {
            studentCardComponents += getStudentCardComponent(student.User);
        });
        studentsGroup.innerHTML = studentCardComponents;
    } else {
        studentsGroup.innerHTML = getTextMessageComponent('Students does not exist.');
    }
}

// for call in html tag cause type module
window.showStudents = showStudents;

copyInviteLinkButton && copyInviteLinkButton.addEventListener('click', async function () {
    const initialTextContent = this.textContent;
    this.innerHTML = getSpinnerComponent({ isSmall: true, noPadding: true });
    const { inviteLinkURL } = await getInviteLink(this.dataset.classid);
    this.textContent = initialTextContent;
    copyText(inviteLinkURL);
});

copyClassCodeButton && copyClassCodeButton.addEventListener('click', async function () {
    const initialTextContent = this.textContent;
    this.innerHTML = getSpinnerComponent({ isSmall: true, noPadding: true });
    const { code } = await getInviteLink(this.dataset.classid);
    this.textContent = initialTextContent;
    copyText(code);
});

const updateClassCode = async (classId) => {
    const { res, data } = await fetchData({
        url: `/classes/${classId}/code`,
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
    return { res, data };
}

updateClassCodeButton && updateClassCodeButton.addEventListener('click', async function () {
    const initialTextContent = this.textContent;
    this.innerHTML = getSpinnerComponent({ isSmall: true, noPadding: true });
    const { res, data } = await updateClassCode(this.dataset.classid);
    showNotification({ message: data.message, type: res.status == 200 ? 'success' : 'error' });
    this.textContent = initialTextContent;
});