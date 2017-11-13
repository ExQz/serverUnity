var db = require('../../database');
var Model = {
    // daily
    getAllTaskDaily: function (callback) {
        return db.query("Select * from dailyleaderboard", callback);
    },
    getTaskByIdDaily: function (id, callback) {
        return db.query("select * from dailyleaderboard where id=?", [id], callback);
    },
    addTaskDaily: function (Model, callback) {
        return db.query("Insert into dailyleaderboard values(?,?,?)", [Model.id, Model.nickName, Model.score], callback);
    },
    deleteTaskDaily: function (id, callback) {
        return db.query("delete from dailyleaderboard where id=?", [id], callback);
    },
    updateTaskDaily: function (id, Model, callback) {
        return db.query("update dailyleaderboard set nickName=?, score=? where id=?", [Model.nickName, Model.score, id], callback);
    },

    getUser: function (Model, callback) {
        return db.query("select * from users where nick=?", [Model.nick], callback);
    },

    registerUser: function (Model, key, callback)
    {
        return db.query("Insert into users values(?, ?, ?, ?)", [Model.id, Model.nick, Model.pass, key], callback);
    },

    // weekly

    getAllTaskWeekly: function (callback) {
        return db.query("Select * from dailyleaderboard", callback);
    },
    getTaskByIdWeekly: function (id, callback) {
        return db.query("select * from dailyleaderboard where id=?", [id], callback);
    },
    addTaskWeekly: function (Model, callback) {
        return db.query("Insert into dailyleaderboard values(?,?,?)", [Model.id, Model.nickName, Model.score], callback);
    },
    deleteTaskWeekly: function (id, callback) {
        return db.query("delete from dailyleaderboard where id=?", [id], callback);
    },
    updateTaskWeekly: function (id, Model, callback) {
        return db.query("update dailyleaderboard set nickName=?, score=? where id=?", [Model.nickName, Model.score, id], callback);
    },
    // monthly
    getAllTaskMonthly: function (callback) {
        return db.query("Select * from dailyleaderboard", callback);
    },
    getTaskByIdMonthly: function (id, callback) {
        return db.query("select * from dailyleaderboard where id=?", [id], callback);
    },
    addTaskMonthly: function (Model, callback) {
        return db.query("Insert into dailyleaderboard values(?,?,?)", [Model.id, Model.nickName, Model.score], callback);
    },
    deleteTaskMonthly: function (id, callback) {
        return db.query("delete from dailyleaderboard where id=?", [id], callback);
    },
    updateTaskMonthly: function (id, Model, callback) {
        return db.query("update dailyleaderboard set nickName=?, score=? where id=?", [Model.nickName, Model.score, id], callback);
    },
    /// all time
    getAllTaskAllTime: function (callback) {
        return db.query("Select * from dailyleaderboard", callback);
    },
    getTaskByIdAllTime: function (id, callback) {
        return db.query("select * from dailyleaderboard where id=?", [id], callback);
    },
    addTaskMonthlyAllTime: function (Model, callback) {
        return db.query("Insert into dailyleaderboard values(?,?,?)", [Model.id, Model.nickName, Model.score], callback);
    },
    deleteTaskAllTime: function (id, callback) {
        return db.query("delete from dailyleaderboard where id=?", [id], callback);
    },
    updateTaskAllTime: function (id, Model, callback) {
        return db.query("update dailyleaderboard set nickName=?, score=? where id=?", [Model.nickName, Model.score, id], callback);
    }
};
module.exports = Model;