const db = require("../config/db");

const listarProdutos = async () => {
    const [produtos] = await db.query(
        "SELECT * FROM produtos;"
    );

    return produtos;
};

const procurarIdProduto = async (id) => {
    const [produtos] = await db.query(
        "SELECT * FROM produtos WHERE id=?;",
        [id]
    );

    return produtos[0];
};

const cadastrarProduto = async (nome, descricao, preco, quantidade_atual, quantidade_minima,categorias_id) => {
    const [produtoCriado] = await db.query(
        `INSERT INTO produtos
        (nome, descricao, preco, quantidade_atual, quantidade_minima,categorias_id)
        values (?, ?, ?, ?, ?, ?);`,
        [nome, descricao, preco, quantidade_atual, quantidade_minima,categorias_id]
    );
    return produtoCriado;
};

const atualizarProduto = async (id, nome, descricao, preco, quantidade_atual, quantidade_minima,categorias_id) => {
    const produtoAtualizado = await db.query(
        `Update produtos set 
        nome = ?, descricao = ?, preco = ?, 
        quantidade_atual = ?, quantidade_minima = ?, categorias_id = ?
        WHERE id = ?;`,
        [nome, descricao, preco, quantidade_atual, quantidade_minima,categorias_id, id]
    );
    return produtoAtualizado;
};

const deletarProduto = async (id) => {
    const produto = await db.query(
        `delete from produtos where id = ?;`,
        [id]
    );

    return produto.affectedRows;
};

module.exports = {
    listarProdutos,
    procurarIdProduto,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto
};