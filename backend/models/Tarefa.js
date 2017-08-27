'use strict';
module.exports = function (sequelize, DataTypes) {
    var Tarefa = sequelize.define('tarefas', {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        data_criacao: DataTypes.DATE,
        concluida: DataTypes.BOOLEAN,
        usuario_id: DataTypes.INTEGER
    });

    Tarefa.associate = function (models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Tarefa.belongsTo(models.Usuario, {
            onDelete: "NO ACTION",
            foreignKey: {
                allowNull: true
            }
        });
    }

    return Tarefa;
};
