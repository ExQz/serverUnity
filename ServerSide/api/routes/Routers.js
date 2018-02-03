var express = require('express');
var router = express.Router();
var Model = require('../models/Model');
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");

router.get('/api/daily/:id?', function (req, res, next) {
    if (req.params.id) {
        Model.getTaskByIdDaily(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                if (rows < 3) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200);
                    res.json(rows);
                }

            }
        });

    }
    else {
        Model.getAllTaskDaily(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }

});
router.post('/api/daily/', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.addTaskDaily(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.location('localhost:3000/api/' + count['insertId']);
            res.status(201);
            res.json(req.body);

        }
    });
    }
    });
});

router.delete('/api/daily/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.deleteTaskDaily(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(rows);
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

router.put('/api/daily/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.updateTaskDaily(req.params.id, req.body, function (err, rows) {
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

router.post('/api/login', function (req, res) {
    Model.getUser(req.body, function (err, rows) {
        if (err) {
            res.json({
                message: "Fail to login"
            })
        }
        else {
            if (rows[0]['password'] === req.body.pass) {
                const id = rows[0]['id'];
                console.log('id ' + id);
                const key = rows[0]['secret_key'];
                console.log('key ' + key);
                const token = jwt.sign({ user: rows[0]['id'] }, rows[0]['secret_key']);
                res.json({

                    token: token
                });
            }
            else {
                res.json(403, 'Fail to login wrong password');
            }
        }
    });

});

router.post('/api/register', function (req, res) {
    var key = randomstring.generate(32);

    Model.registerUser(req.body, key, function (err, callback) {
        if (err) {
            res.json(403, 'Registracion fail');
        }
        else {
            res.status(200);
            res.json({
                secret_key: key
            });
        }
    });
});


 //weekly
router.get('/api/weekly/:id?', function (req, res, next) {
    if (req.params.id) {
        Model.getTaskByIdWeekly(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                if (rows < 3) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200);
                    res.json(rows);
                }

            }
        });

    }
    else {
        Model.getAllTaskWeekly(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }

});
router.post('/api/weekly/', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.addTaskWeekly(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.location('localhost:3000/api/' + count['insertId']);
            res.status(201);
            res.json(req.body);

        }
    });
    }
    });
});

router.delete('/api/weekly/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.deleteTaskWeekly(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(rows);
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

router.put('/api/weekly/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.updateTaskWeekly(req.params.id, req.body, function (err, rows) {
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
//monthly
router.get('/api/monthly/:id?', function (req, res, next) {
    if (req.params.id) {
        Model.getTaskByIdMonthly(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                if (rows < 3) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200);
                    res.json(rows);
                }

            }
        });

    }
    else {
        Model.getAllTaskMonthly(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }

});
router.post('/api/monthly/', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.addTaskMonthly(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.location('localhost:3000/api/' + count['insertId']);
            res.status(201);
            res.json(req.body);

        }
    });
    }
    });
});

router.delete('/api/monthly/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.deleteTaskMonthly(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(rows);
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

router.put('/api/monthly/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.updateTaskMonthly(req.params.id, req.body, function (err, rows) {
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
 //all time
router.get('/api/alltime/:id?', function (req, res, next) {
    if (req.params.id) {
        Model.getTaskByIdAllTime(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                if (rows < 3) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200);
                    res.json(rows);
                }

            }
        });

    }
    else {
        Model.getAllTaskAllTime(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }

});
router.post('/api/alltime/', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.addTaskAllTime(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.location('localhost:3000/api/' + count['insertId']);
            res.status(201);
            res.json(req.body);

        }
    });
    }
    });
});

router.delete('/api/alltime/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.deleteTaskAllTime(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(rows);
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

router.put('/api/alltime/:id', ensureToken, function (req, res, next) {
    jwt.verify(req.token, req.header('secret_key'), function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
    Model.updateTaskAllTime(req.params.id, req.body, function (err, rows) {
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
