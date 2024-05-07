CREATE DATABASE brasilprev

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_de_nascimento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL,
    renda_mensal NUMERIC(10, 2) NOT NULL
);

CREATE TABLE planos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_produto UUID NOT NULL,
    id_cliente UUID NOT NULL,
    aporte NUMERIC(10, 2) NOT NULL,
    data_da_contratacao TIMESTAMP NOT NULL,
    idade_de_aposentadoria INTEGER NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produtos(id),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    saldo NUMERIC(10, 2) DEFAULT 0
);


CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    susep VARCHAR(20) UNIQUE NOT NULL,
    expiracao_de_venda TIMESTAMP NOT NULL,
    valor_minimo_aporte_inicial NUMERIC(10, 2) NOT NULL,
    valor_minimo_aporte_extra NUMERIC(10, 2) NOT NULL,
    idade_de_entrada INTEGER NOT NULL,
    idade_de_saida INTEGER NOT NULL,
    carencia_inicial_de_resgate INTEGER NOT NULL,
    carencia_entre_resgates INTEGER NOT NULL
);

CREATE TABLE aportes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID REFERENCES clientes(id) ON DELETE CASCADE,
    id_plano UUID REFERENCES planos(id) ON DELETE CASCADE,
    aporte NUMERIC(10, 2) NOT NULL
);

CREATE TABLE resgates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_plano UUID REFERENCES planos(id) ON DELETE CASCADE,
    valor_resgate NUMERIC(10, 2) NOT NULL,
    data_do_resgate timestamp without time zone NULL
);
