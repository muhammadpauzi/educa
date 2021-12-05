import User from "./user.model";
import Class from "./class.model";
import Student from "./student.model";
import Work from "./work.model";

User.hasMany(Class);

Class.belongsTo(User);
Class.hasMany(Student);

Class.hasMany(Work);
Work.belongsTo(Class);

User.hasOne(Student);
Student.belongsTo(Class);
Student.belongsTo(User);

[User, Class, Student, Work].map(model => {
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
    User, Class, Student, Work
}
