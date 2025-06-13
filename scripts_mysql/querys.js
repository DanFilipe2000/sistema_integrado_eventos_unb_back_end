const create_db = `
CREATE DATABASE IF NOT EXISTS eventos_db;
USE eventos_db;

CREATE TABLE IF NOT EXISTS Estado (
    Sigla CHAR(2) PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Cidade (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    idEstado CHAR(2) NOT NULL,
    FOREIGN KEY (idEstado) REFERENCES Estado(Sigla)
);

CREATE TABLE IF NOT EXISTS Endereco (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Logradouro VARCHAR(100) NOT NULL,
    Bairro VARCHAR(50) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    CEP CHAR(8) NOT NULL,
    Latitude DECIMAL(9,6),
    Longitude DECIMAL(9,6),
    idCidade INT NOT NULL,
    FOREIGN KEY (idCidade) REFERENCES Cidade(Codigo)
);

CREATE TABLE IF NOT EXISTS Departamento (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Curso (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL,
    idDepartamento INT NOT NULL,
    FOREIGN KEY (idDepartamento) REFERENCES Departamento(Codigo)
);

CREATE TABLE IF NOT EXISTS Participantes (
    Matricula INT PRIMARY KEY AUTO_INCREMENT,
    CPF CHAR(11) NOT NULL,
    Fones VARCHAR(20),
    Nome VARCHAR(100) NOT NULL,
    DataNascimento DATE,
    Email VARCHAR(100),
    idCurso INT,
    FOREIGN KEY (idCurso) REFERENCES Curso(Codigo)
);

CREATE TABLE IF NOT EXISTS Expositor (
    CPF CHAR(11) PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    DataNascimento DATE,
    Fones VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS CategoriaEvento (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Evento (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL,
    DataInicio DATE,
    DataFinal DATE,
    idEndereco INT,
    FOREIGN KEY (idEndereco) REFERENCES Endereco(Codigo)
);

CREATE TABLE IF NOT EXISTS Produto (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Valor DECIMAL(10,2),
    idExpositor CHAR(11) NOT NULL,
    idEvento INT NOT NULL,
    FOREIGN KEY (idExpositor) REFERENCES Expositor(CPF),
    FOREIGN KEY (idEvento) REFERENCES Evento(Codigo)
);

CREATE TABLE IF NOT EXISTS TipoIngresso (
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Rel_Evento_Expositor (
    idEvento INT NOT NULL,
    idExpositor CHAR(11) NOT NULL,
    PRIMARY KEY (idEvento, idExpositor),
    FOREIGN KEY (idEvento) REFERENCES Evento(Codigo),
    FOREIGN KEY (idExpositor) REFERENCES Expositor(CPF)
);

CREATE TABLE IF NOT EXISTS Rel_Evento_CategoriaEvento (
    idEvento INT NOT NULL,
    idCategoria INT NOT NULL,
    PRIMARY KEY (idEvento, idCategoria),
    FOREIGN KEY (idEvento) REFERENCES Evento(Codigo),
    FOREIGN KEY (idCategoria) REFERENCES CategoriaEvento(Codigo)
);

CREATE TABLE IF NOT EXISTS Avaliacao (
    Nota INT,
    Comentario TEXT,
    idParticipante INT NOT NULL,
    idEvento INT NOT NULL,
    PRIMARY KEY (idParticipante, idEvento),
    FOREIGN KEY (idParticipante) REFERENCES Participantes(Matricula),
    FOREIGN KEY (idEvento) REFERENCES Evento(Codigo)
);

CREATE TABLE IF NOT EXISTS Ingresso (
    idParticipante INT NOT NULL,
    idEvento INT NOT NULL,
    idTipoIngresso INT NOT NULL,
    PRIMARY KEY (idParticipante, idEvento, idTipoIngresso),
    FOREIGN KEY (idParticipante) REFERENCES Participantes(Matricula),
    FOREIGN KEY (idEvento) REFERENCES Evento(Codigo),
    FOREIGN KEY (idTipoIngresso) REFERENCES TipoIngresso(Codigo)
);
`;



module.exports = { create_db };