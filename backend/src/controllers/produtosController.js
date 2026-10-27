const produtosModel = require("../models/produtosModel");

const listarProdutos = async (req,res) => {
    try {
        const produtos = await produtosModel.listarProdutos();

        res.status(200).json(produtos);
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const procurarIdProduto = async (req,res) => {
    try{
        const id = req.params.id;
        const produto = await produtosModel.procurarIdProduto(id);

        res.status(200).json(produto);
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarProduto = async (req,res) => {
    try{
        
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarProduto = async (req,res) => {
    try{
        
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarProduto = async (req,res) => {
    try{
        
    } catch (erro){
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarProdutos,
    procurarIdProduto,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto
};