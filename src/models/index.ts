import User from "./user.model";
import Class from "./class.model";
import Student from "./student.model";

User.hasMany(Class);

Class.belongsTo(User);
Class.hasMany(Student);

User.hasOne(Student);
Student.belongsTo(Class);
Student.belongsTo(User);

[User, Class, Student].map(model => {
    model.sync().then(() => {
        console.log(`${model.name} table is created!`);
    })
});

// [User, Class, Student].map(model => {
//     model.sync({ force: true }).then(() => {
//         console.log(`${model.name} table is created!`);
//     })
// });

export {
    User, Class, Student
}
