const Usuario = require('../models/Usuario');

module.exports = {

    //lista todos os usuários
    async listUser(req, res){
        const users = await Usuario.findAll({
            order: [['id', 'desc']],
            attributes: ['id', 'nome', 'email']
        });

        return res.json(users);
    },

    //mostra um usuário específico
    async showUser(req, res){
        const { id } = req.params;

        const user = await Usuario.findByPk(id);

        return res.json(user);
    },

    //cadastro de usuário
    async createUser(req, res){
        const { nome , email } = req.body;

        const user = await Usuario.create({
            nome,
            email,
        });

        return res.json(user);
    },

    //atualização de usuário
    async updateUser(req, res){
        const { id } = req.body;

        const user = await Usuario.update(req.body, { where: {
            id: id
            }
        });

        return res.json(user);
    },

    //deleta usuário
    async deleteUser(req, res){
        const { id } = req.params;

        await Usuario.destroy({ where: {
            id: id
            }
        }).then(() => {
            return res.json({message: 'Success'});
        }).catch(() => {
            return res.json({message: 'error'});
        });
    }
};
