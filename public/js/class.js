import { copyInviteLinkButton } from "./elements.js";
import { copyText } from "./main.js";
import { fetchData } from "./utils.js";

const getInviteLink = async (classId) => {
    const { res, data } = await fetchData({
        url: `/classes/${classId}/invite-link`
    });
    return data;
}

copyInviteLinkButton && copyInviteLinkButton.addEventListener('click', async function () {
    const { inviteLinkURL } = await getInviteLink(this.dataset.classid);
    copyText(inviteLinkURL);
});