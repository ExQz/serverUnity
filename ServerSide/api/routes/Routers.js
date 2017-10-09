var express = require('express');
var router = express.Router();
var Model = require('../models/Model');

router.get('/api/:id?', function (req, res, next)
{
    if (req.params.id) {
        Model.getTaskById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                if (rows < 3)
                {
                    res.sendStatus(404);
                }
                else
                {
                    res.status(200);
                    res.json(rows);
                }
                
            }
        });

    }
    else {
        Model.getAllTask(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }

});
router.post('/api/', function (req, res, next)
{
    Model.addTask(req.body, function (err, count) {
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.status(201);
            res.json(req.body);
            
        }
    });
});

router.delete('/api/:id', function (req, res, next)
{
    Model.deleteTask(req.params.id, function (err, rows) {
        if (err)
        {
            res.json(err);
        }
        else
        {
            if (rows['affectedRows'] === 0) {
                res.sendStatus(404);
            }
            else {
                res.status(200);
                res.json(rows);
            }
            
        }
    });
});

router.put('/api/:id', function (req, res, next) {
    Model.updateTask(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows['affectedRows'] === 0)
            {
                res.sendStatus(404);
            }
            else
            {
                res.status(200);
                res.json(rows);
            }
           
            
            
        }
    });
});

module.exports = router;
