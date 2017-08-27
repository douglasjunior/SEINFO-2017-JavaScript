const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');

const {
    Tarefa
} = require('../models');

router.get('/', function (request, response, next) {
    let where = {};
    let query = request.query;
    if (query.titulo) {
        where.titulo = {
            $like: `%${query.titulo}%`
        };
    }

    Tarefa.findAndCountAll({
        where: where,
        order: [
            ['id', 'DESC']
        ]
    })
    .then((tarefas) => {
        response.status(200)
            .json({
                total: tarefas.count,
                dados: tarefas.rows
            });
    })
    .catch((ex) => {
        next(ex);
    });
});

module.exports = router;
