DROP DATABASE organiza_comercial;

CREATE DATABASE organiza_comercial;
USE organiza_comercial;

CREATE TABLE categorias(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL
  );

CREATE TABLE produtos(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  descricao VARCHAR(300) NOT NULL,
  preco DOUBLE NOT NULL,
  quantidade_atual INT NOT NULL,
  quantidade_minima INT NOT NULL,
  categorias_id INT NOT NULL,
  FOREIGN KEY (categorias_id) REFERENCES categorias (id) ON DELETE CASCADE
);

INSERT INTO categorias (nome)
values ("limpeza"),
("tecnologia"),
("brinquedos");

INSERT INTO produtos (nome, descricao, preco, quantidade_atual, quantidade_minima, categorias_id)
values ("Sabonete","Usado para se lavar durante o banho.", 3.99, 67, 10, 1),
("NOKIA TIJOLÃO","Multitarefas...", 99.99, 10, 1, 2),
("Sapinho de Pelúcia","Um sapinho de pelúcia...", 10.01, 100, 50, 3);

SELECT * FROM categorias;