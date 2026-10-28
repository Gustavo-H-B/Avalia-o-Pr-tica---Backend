const db = require("../config/db");

const listarCategorias = async () => {
    const [categorias] = await db.query(
        "SELECT * FROM categorias;"
    );

    return categorias;
};

const procurarIdCategoria = async (id) => {
    const [categorias] = await db.query(
        "SELECT * FROM categorias WHERE id=?;",
        [id]
    );

    return categorias[0];
};

const cadastrarCategoria = async (nome) => {
    const categoriaCriado = await db.query(
        `INSERT INTO categorias
        (nome)
        values (?);`,
        [nome]
    );
    return categoriaCriado;
};

const atualizarCategoria = async (id, nome) => {
    const categoriaAtualizado = await db.query(
        `Update categorias set 
        nome = ? WHERE id = ?;`,
        [nome, id]
    );
    return categoriaAtualizado;
};

const deletarCategoria = async (id) => {
    const categoria = await db.query(
        `delete from categorias where id = ?;`,
        [id]
    );

    return categoria.affectedRows;
};

module.exports = {
    listarCategorias,
    procurarIdCategoria,
    cadastrarCategoria,
    atualizarCategoria,
    deletarCategoria
};