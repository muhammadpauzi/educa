import User from "./user.model";

[User].map(model => {
    model.sync().then(() => {
        console.log(`${model.name} is created!`);
    })
});

// [User].map(model => {
//     model.sync({ force: true }).then(() => {
//         console.log(`${model.name} is created!`);
//     })
// });

export {
    User
}
