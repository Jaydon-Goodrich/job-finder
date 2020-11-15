//creates a unique id to attribute to the dom EL
const helpers = {
    create_id: function () {
        const id = Date.now() * Math.random();
        return id;
    }
}

module.exports = helpers;