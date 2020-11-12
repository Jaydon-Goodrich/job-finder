const User = require('./User');
const Job = require('./Job')
const PageView = require('./PageViews')





// User.hasMany(PageView, {
//     foreignKey: "user_id"
// });


// User.belongsToMany(Job, {
//     through: PageView,
//     as: 'saved_jobs',
//     foreignKey: 'user_id',
// });

// Job.belongsToMany(User, {
//     through: PageView,
//     as: 'saved_jobs',
//     foreignKey: 'job_id'

// });

// PageView.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// PageView.belongsTo(Job, {
//     foreignKey: 'job_id'
// });



module.exports = {User, Job, PageView};