var express = require('express');
var router = express.Router();
var Model = require('../models/Model');
var jwt = require('jsonwebtoken');

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
            res.location('localhost:3000/api/' + count['insertId']);
            res.status(201);
            res.json(req.body);
            
        }
    });
});

router.delete('/api/:id', ensureToken, function (req, res, next)
{
    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            Model.deleteTask(req.params.id, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    if (rows['affectedRows'] === 0) {
                        res.sendStatus(404);
                    }
                    else {
                        res.status(200);
                        res.json(rows);
                    }

                }
            });
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

router.post('/api/login', function (req, res) {
    const user = { id: 3 };
    const token = jwt.sign({ user: user.id }, 'my_secret_key');
    res.json({
        token: token
    });
});


function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;
