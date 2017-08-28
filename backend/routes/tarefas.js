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



router.put('/:tarefa_id', function (request, response, next) {
    let tarefaId = request.params.tarefa_id;

    let body = request.body;
    let tarefa = {
        titulo: body.titulo,
        descricao: body.descricao
    };

    Tarefa.update(tarefa, {
        where: {
            id: tarefaId
        }
    })
    .then((linhasAfetadas) => {
        if (linhasAfetadas < 1) {
            response.status(404)
                .json({
                    mensagem: 'A tarefa não existe'
                });
            
            return;
        }

        // Encontra a tarefa que acabamos de atualizar
        return Tarefa.findOne({
            where: {
                id: tarefaId
            }
        });
    })
    .then((tarefa) => {
        response.status(200)
            .json(tarefa);
    })
    .catch(next);
});

router.put('/:tarefa_id/concluida', function (request, response, next) {
    let tarefaId = request.params.tarefa_id;
    let tarefa = {
        concluida: true
    };

    Tarefa.update(tarefa, {
        where: {
            id: tarefaId
        }
    })
    .then((linhasAfetadas) => {
        if (linhasAfetadas < 1) {
            response.status(404)
                .json({
                    mensagem: 'A tarefa não existe'
                });
            
            return;
        }

        response.status(204)
            .send();
    })
    .catch(next);
});



router.delete('/:tarefa_id/concluida', function (request, response, next) {
    let tarefaId = request.params.tarefa_id;
    let tarefa = {
        concluida: false
    };

    Tarefa.update(tarefa, {
        where: {
            id: tarefaId
        }
    })
    .then((linhasAfetadas) => {
        if (linhasAfetadas < 1) {
            response.status(404)
                .json({
                    mensagem: 'A tarefa não existe'
                });
            
            return;
        }

        response.status(204)
            .send();
    })
    .catch(next);
});



router.delete('/:tarefa_id', function (request, response, next) {
    let tarefaId = request.params.tarefa_id;

    Tarefa.destroy({
        where: {
            id: tarefaId
        }
    })
    .then((linhasAfetadas) => {
        if (linhasAfetadas < 1) {
            response.status(404)
                .json({
                    mensagem: 'A tarefa não existe'
                });
            
            return;
        }

        response.status(204)
            .send();
    })
    .catch(next);
});

module.exports = router;
