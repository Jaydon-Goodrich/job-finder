const User = require('./User');
const Job = require('./Job')
const PageView = require('./PageViews')

User.hasMany(PageView)

Job.hasMany(PageView)

User.belongsToMany(Job, {
    through: PageView,
    as: "JobViews",
    foreignKey: 'user_id'
})

Job.belongsToMany(User, {
    through: PageView,
    as: "UserViews",
    foreignKey: 'job_id'
})

module.exports = {User, Job, PageView};