const produtosModel = require("../models/produtosModel");
const categoriasModel = require("../models/categoriasModel");

const listarProdutos = async (req,res) => {
    try {
        const produtos = await produtosModel.listarProdutos();

        return res.status(200).json(produtos);
    } catch (erro){
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const listarEstoque = async (req,res) => {
    try {
        const id = req.params.id;

        if(id === null || id === undefined || id < 0 || isNaN(id) || Number.isInteger(id)){
            return res.status(400).json({
                mensagem: "ID inválido, tem que ser um número inteiro positivo."
            });
        };

        const produto = await produtosModel.procurarIdProduto(id);

        if(produto === null || produto === undefined){
            return res.status(404).json({
                mensagem: "ID não existe."
            });
        };

        let situacao = 0;
        const estoque = produto.quantidade_atual;
        const minimo = produto.quantidade_minima;

        if(estoque > minimo){
            situacao = "Estoque normal";
        } else if(estoque <= minimo && estoque > 0){
            situacao = "Estoque baixo";
        } else if(estoque === 0 ){
            situacao = "Sem estoque";
        };

        return res.status(200).json({
            Situação_do_Estoque: situacao
        });
    } catch (erro){
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const procurarIdProduto = async (req,res) => {
    try{
        const id = req.params.id;

        if(id === null || id === undefined || id < 0 || isNaN(id) || Number.isInteger(id)){
            return res.status(400).json({
                mensagem: "ID inválido, tem que ser um número inteiro positivo."
            });
        };

        const produto = await produtosModel.procurarIdProduto(id);

        if(produto === null || produto === undefined){
            return res.status(404).json({
                mensagem: "ID não existe."
            });
        };

        return res.status(200).json(produto);
    } catch (erro){
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarProduto = async (req,res) => {
    try{
        const {nome, descricao, preco, quantidade_atual, quantidade_minima, categorias_id} = req.body;

        if(nome === null || nome.trim().length === 0 || nome === undefined || nome.length > 150){
            return res.status(400).json({
                mensagem: "Nome inválido, não pode estar vazio e nem passar de 150 caracteres."
            });
        };

        if(descricao === null || descricao.trim().length === 0 || descricao === undefined || descricao.length > 300){
            return res.status(400).json({
                mensagem: "Descrição inválida, não pode estar vazio e nem passar de 300 caracteres."
            });
        };

        if(preco === null || preco === undefined || Number.isNaN(preco) || isNaN(preco) || preco <= 0){
            return res.status(400).json({
                mensagem: "Preco inválido, não pode estar vazio e nem menor ou igual a zero."
            });
        };

        if(quantidade_atual === null || quantidade_atual === undefined || Number.isNaN(quantidade_atual) || isNaN(quantidade_atual) || !Number.isInteger(quantidade_atual)){
            return res.status(400).json({
                mensagem: "Quantidade atual inválido, não pode estar vazio e tem que ser um número inteiro positivo."
            });
        };

        if(quantidade_minima === null || quantidade_minima === undefined || Number.isNaN(quantidade_minima) || isNaN(quantidade_minima) || !Number.isInteger(quantidade_minima)){
            return res.status(400).json({
                mensagem: "Quantidade minima inválido, não pode estar vazio e tem que ser um número inteiro positivo."
            });
        };

        const categoria = await categoriasModel.procurarIdCategoria(categorias_id);
        if(categoria === null || categoria === undefined){
            return res.status(404).json({
                mensagem: "Categoria não existe."
            });
        };

        const novoProduto = await produtosModel.cadastrarProduto(nome, descricao, preco, quantidade_atual, quantidade_minima, categorias_id);
        console.log(novoProduto);
        return res.status(201).json({
            id: novoProduto.insertId,
            nome: nome,
            descrição: descricao,
            preço: preco,
            quantidade_atual: quantidade_atual,
            quantidade_minima: quantidade_minima,
            categoria: categoria.nome
        });

    } catch (erro){
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarProduto = async (req,res) => {
    try{
        const id = req.params.id;

        if(id === null || id === undefined || id < 0 || isNaN(id) || Number.isInteger(id)){
            return res.status(400).json({
                mensagem: "ID inválido, tem que ser um número inteiro positivo."
            });
        };

        const produto = await produtosModel.procurarIdProduto(id);

        if(produto === null || produto === undefined){
            return res.status(404).json({
                mensagem: "Produto não existe."
            });
        };

        const {nome, descricao, preco, quantidade_atual, quantidade_minima, categorias_id} = req.body;

        if(nome === null || nome.trim().length === 0 || nome === undefined || nome.length > 150){
            return res.status(400).json({
                mensagem: "Nome inválido, não pode estar vazio e nem passar de 150 caracteres."
            });
        };

        if(descricao === null || descricao.trim().length === 0 || descricao === undefined || descricao.length > 300){
            return res.status(400).json({
                mensagem: "Descrição inválida, não pode estar vazio e nem passar de 300 caracteres."
            });
        };

        if(preco === null || preco === undefined || Number.isNaN(preco) || isNaN(preco) || preco <= 0){
            return res.status(400).json({
                mensagem: "Preco inválido, não pode estar vazio e nem menor ou igual a zero."
            });
        };

        if(quantidade_atual === null || quantidade_atual === undefined || Number.isNaN(quantidade_atual) || isNaN(quantidade_atual) || !Number.isInteger(quantidade_atual)){
            return res.status(400).json({
                mensagem: "Quantidade atual inválido, não pode estar vazio e tem que ser um número inteiro positivo."
            });
        };

        if(quantidade_minima === null || quantidade_minima === undefined || Number.isNaN(quantidade_minima) || isNaN(quantidade_minima) || !Number.isInteger(quantidade_minima)){
            return res.status(400).json({
                mensagem: "Quantidade minima inválido, não pode estar vazio e tem que ser um número inteiro positivo."
            });
        };

        const categoria = await categoriasModel.procurarIdCategoria(categorias_id);
        if(categoria === null || categoria === undefined){
            return res.status(404).json({
                mensagem: "Categoria não existe."
            });
        };

        const produtoAtualizado = await produtosModel.atualizarProduto(id, nome, descricao, preco, quantidade_atual, quantidade_minima, categorias_id);
    return res.status(200).json({
        mensagem: "Produto atualizado com sucesso.",
        produto: produtoAtualizado.id
    });

    } catch (erro){
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarProduto = async (req,res) => {
    try{
        const id = req.params.id;

        if(id === null || id === undefined || id < 0 || isNaN(id) || Number.isInteger(id)){
            return res.status(400).json({
                mensagem: "ID inválido, tem que ser um número inteiro positivo."
            });
        };

        const produto = await produtosModel.procurarIdProduto(id);

        if(produto === null || produto === undefined){
            return res.status(404).json({
                mensagem: "Produto não existe."
            });
        };

        await produtosModel.deletarProduto(id);

        return res.status(200).json({
            mensagem: "Produto deletado com sucesso."
        });

    } catch (erro){
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarProdutos,
    listarEstoque,
    procurarIdProduto,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto
};