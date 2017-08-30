'use strict';
module.exports = function (sequelize, DataTypes) {
    var Tarefa = sequelize.define('tarefas', {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        data_criacao: DataTypes.DATE,
        concluida: DataTypes.BOOLEAN,
    });

    Tarefa.associate = function (models) {

    }

    return Tarefa;
};
