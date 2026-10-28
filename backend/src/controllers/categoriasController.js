const categoriasModel = require("../models/categoriasModel");

const listarCategorias = async (req,res) => {
    try {
        const categorias = await categoriasModel.listarCategorias();

        res.status(200).json(categorias);
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const procurarIdCategoria = async (req,res) => {
    try{
        const id = req.params.id;

        if(id === null || id === undefined || id < 0 || isNaN(id) || Number.isInteger(id)){
            res.status(400).json({
                mensagem: "ID inválido, tem que ser um número inteiro positivo."
            });
        };

        const categoria = await categoriasModel.procurarIdCategoria(id);

        if(categoria === null || categoria === undefined){
            res.status(404).json({
                mensagem: "ID não existe."
            });
        };

        res.status(200).json(categoria);
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarCategoria = async (req,res) => {
    try{
        const {nome} = req.body;

        if(nome === null || nome.trim().length === 0 || nome === undefined || nome.length > 150){
            res.status(400).json({
                mensagem: "Nome inválido, não pode estar vazio e nem passar de 150 caracteres."
            });
        };

        const novaCategoria = await categoriasModel.cadastrarCategoria(nome);
        res.status(201).json({
            mensagem: `Categoria cadastrada com sucesso.`,
            id: novaCategoria.insertId,
            categoria: nome
        });

    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarCategoria = async (req,res) => {
    try{
        const id = req.params.id;

        if(id === null || id === undefined || id < 0 || isNaN(id) || Number.isInteger(id)){
            res.status(400).json({
                mensagem: "ID inválido, tem que ser um número inteiro positivo."
            });
        };

        const categoria = await categoriasModel.procurarIdCategoria(id);

        if(categoria === null || categoria === undefined){
            res.status(404).json({
                mensagem: "ID não existe."
            });
        };

        const {nome} = req.body;

        if(nome === null || nome.trim().length === 0 || nome === undefined || nome.length > 150){
            res.status(400).json({
                mensagem: "Nome inválido, não pode estar vazio e nem passar de 150 caracteres."
            });
        };

        const categoriaAtualizada = await categoriasModel.atualizarCategoria(id,nome);
        res.status(201).json({
            mensagem: `Categoria atualizada com sucesso.`,
            id: categoriaAtualizada.id,
            categoria: nome
        });

    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarCategoria = async (req,res) => {
    try{
        const id = req.params.id;

        if(id === null || id === undefined || id < 0 || isNaN(id) || Number.isInteger(id)){
            res.status(400).json({
                mensagem: "ID inválido, tem que ser um número inteiro positivo."
            });
        };

        const categoria = await categoriasModel.procurarIdCategoria(id);

        if(categoria === null || categoria === undefined){
            res.status(404).json({
                mensagem: "ID não existe."
            });
        };

        await categoriasModel.deletarCategoria(id);

        res.status(200).json({
            mensagem: "Categoria deletada com sucesso."
        });
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarCategorias,
    procurarIdCategoria,
    cadastrarCategoria,
    atualizarCategoria,
    deletarCategoria
};