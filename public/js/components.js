export const getSpinnerComponent = () => {
    return `<div class="py-10">
    <div
        class="loader mx-auto ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"
    ></div>
    </div>`;
}

export const getTextMessageComponent = (message = "", color = "red") => {
    return `<div class="py-10"><p class="text-center text-${color}-500 font-medium">${message}</p></div>`;
}

export const getCardComponent = ({ name, id, room, username }) => {
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