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



router.get('/:tarefa_id', function (request, response, next) {
    let tarefaId = request.params.tarefa_id;

    Tarefa.findOne({
        where: {
            id: tarefaId
        }
    })
    .then((tarefa) => {
        if (!tarefa) {
            response.status(404)
                .json({
                    mensagem: 'A tarefa não existe'
                });
            
            return;
        }

        response.status(200)
            .json(tarefa);
    })
    .catch(next);
});



router.post('/', function (request, response, next) {
    let dataAtual = moment()
        .utc()
        .toDate();

    let tarefa = request.body;
    tarefa.id = null;
    tarefa.data_criacao = dataAtual;
    tarefa.concluida = false;

    Tarefa.create(tarefa)
    .then((tarefa) => {
        response.status(201)
            .json(tarefa);
    })
    .catch(next);
});

module.exports = router;
