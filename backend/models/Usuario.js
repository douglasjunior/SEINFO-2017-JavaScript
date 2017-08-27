'use strict';
module.exports = function (sequelize, DataTypes) {
    var Usuario = sequelize.define('usuarios', {
        nome: DataTypes.STRING,
        data_criacao: DataTypes.DATE
    });

    Usuario.associate = function (models) {

    }
    
    return Usuario;
};
