const moment = require('moment');
const helper = {};

helper.format = created_at => {
    return moment(created_at).startOf('minute').fromNow();
}

module.exports = helper;