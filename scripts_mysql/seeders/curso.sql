-- Seeder: cursos da UnB com sigla e habilitação, referência SIGAA/UnB

INSERT IGNORE INTO Curso (Codigo, Titulo, idDepartamento) VALUES
  -- Administração
  (1, 'ADM – Administração – Bacharelado (Diurno)', 25),
  
  -- Ciências Contábeis
  (2, 'CCA – Ciências Contábeis – Bacharelado (Diurno)', 26),
  (3, 'CCA – Ciências Contábeis – Bacharelado (Noturno)', 26),

  -- Ciências Econômicas
  (4, 'ECO – Ciências Econômicas – Bacharelado (Diurno)', 27),

  -- Ciência da Computação / Engenharia de Computação
  (5, 'CIC – Ciência da Computação – Bacharelado (Diurno)', 1),
  (6, 'CIC – Computação – Licenciatura (Noturno)', 1),
  (7, 'CIC – Engenharia de Computação – Bacharelado (Diurno)', 1),

  -- Artes Cênicas
  (8, 'CEN – Artes Cênicas – Licenciatura (Diurno)', 21),
  (9, 'CEN – Artes Cênicas – Licenciatura (Noturno)', 21),
  (10, 'CEN – Artes Cênicas – Interpretação Teatral (Bacharelado)', 21),

  -- Comunicação Social
  (11, 'COM – Comunicação Social – Jornalismo', 23),
  (12, 'COM – Comunicação Social – Publicidade e Propaganda', 23),
  (13, 'COM – Comunicação Social – Audiovisual', 23),
  (14, 'COM – Comunicação Organizacional – Bacharelado', 23),

  -- Enfermagem (Ceilândia)
  (15, 'ENF – Enfermagem', 31),

  -- Engenharia de Software / Engenharia etc. (Gama e Darcy)
  (16, 'ENG – Engenharia de Software', 43),
  (17, 'ENG – Engenharia Eletrônica', 2),
  (18, 'ENG – Engenharia Elétrica', 2),
  (19, 'ENG – Engenharia Mecânica', 3),

  -- Letras / Linguística
  (20, 'LET – Letras', 18),
  (21, 'LET – Letras – (Português/Inglês)', 18),
  (22, 'LIN – Linguística', 19),
  (23, 'LIN – Linguística – Latim', 19),

  -- Música
  (24, 'MUS – Música', 20);