const User = require('./User');
const Job = require('./Job')
const Favorite = require('./Favorites')

User.hasMany(Favorite, {
    foreignKey: "user_id"
});

User.belongsToMany(Job, {
    through: Favorite,
    as: 'saved_jobs',
    foreignKey: 'user_id',
});

Job.belongsToMany(User, {
    through: Favorite,
    as: 'saved_jobs'
});

Favorite.belongsTo(User, {
    foreignKey: 'user_id'
});

Favorite.belongsTo(Job, {
    foreignKey: 'job_id'
});

module.exports = {User, Job, Favorite};