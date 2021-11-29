import User from "./user.model";
import Class from "./class.model";

User.hasMany(Class);
Class.belongsTo(User);

[User, Class].map(model => {
    model.sync().then(() => {
        console.log(`${model.name} is created!`);
    })
});

// [User, Class].map(model => {
//     model.sync({ force: true }).then(() => {
//         console.log(`${model.name} is created!`);
//     })
// });

export {
    User, Class
}
