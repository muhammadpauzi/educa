import { copyInviteLinkButton, studentsGroup } from "./elements.js";
import { getSpinnerComponent, getStudentCardComponent, getTextMessageComponent } from "./components.js";
import { copyText } from "./main.js";
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
    studentsGroup.innerHTML = getSpinnerComponent();
    const { students } = await getStudents(classId);
    console.log(students);
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
    const { inviteLinkURL } = await getInviteLink(this.dataset.classid);
    copyText(inviteLinkURL);
});