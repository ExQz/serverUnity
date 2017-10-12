var db = require('../../database');
var Model = {
    getAllTask: function (callback) {
        return db.query("Select * from dailyleaderboard", callback);
    },
    getTaskById: function (id, callback) {
        return db.query("select * from dailyleaderboard where id=?", [id], callback);
    },
    addTask: function (Model, callback) {
        return db.query("Insert into dailyleaderboard values(?,?,?)", [Model.id, Model.nickName, Model.score], callback);
    },
    deleteTask: function (id, callback)
    {
        return db.query("delete from dailyleaderboard where id=?", [id], callback);
    },
    updateTask: function (id, Model, callback)
    {
        return db.query("update dailyleaderboard set nickName=?, score=? where id=?", [Model.nickName, Model.score, id], callback);
    }

};
module.exports = Model;