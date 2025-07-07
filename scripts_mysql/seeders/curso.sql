-- Seeder: cursos da UnB com sigla e habilitação, referência SIGAA/UnB

INSERT INTO Curso (Titulo, idDepartamento) VALUES
  -- Administração
  ('ADM – Administração – Bacharelado (Diurno)', 25),
  ('ADM – Administração – Bacharelado (Noturno)', 25),

  -- Ciências Contábeis
  ('CCA – Ciências Contábeis – Bacharelado (Diurno)', 26),
  ('CCA – Ciências Contábeis – Bacharelado (Noturno)', 26),

  -- Ciências Econômicas
  ('ECO – Ciências Econômicas – Bacharelado (Diurno)', 27),

  -- Ciência da Computação / Engenharia de Computação
  ('CIC – Ciência da Computação – Bacharelado (Diurno)', 1),
  ('CIC – Computação – Licenciatura (Noturno)', 1),
  ('CIC – Engenharia de Computação – Bacharelado (Diurno)', 1),

  -- Artes Cênicas
  ('CEN – Artes Cênicas – Licenciatura (Diurno)', 21),
  ('CEN – Artes Cênicas – Licenciatura (Noturno)', 21),
  ('CEN – Artes Cênicas – Interpretação Teatral (Bacharelado)', 21),

  -- Comunicação Social
  ('COM – Comunicação Social – Jornalismo', 23),
  ('COM – Comunicação Social – Publicidade e Propaganda', 23),
  ('COM – Comunicação Social – Audiovisual', 23),
  ('COM – Comunicação Organizacional – Bacharelado', 23),

  -- Enfermagem (Ceilândia)
  ('ENF – Enfermagem', 31),

  -- Engenharia de Software / Engenharia etc. (Gama e Darcy)
  ('ENG – Engenharia de Software', 43),
  ('ENG – Engenharia Eletrônica', 2),
  ('ENG – Engenharia Elétrica', 2),
  ('ENG – Engenharia Mecânica', 3),

  -- Letras / Linguística
  ('LET – Letras', 18),
  ('LET – Letras – (Português/Inglês)', 18),
  ('LIN – Linguística', 19),
  ('LIN – Linguística – Latim', 19),

  -- Música
  ('MUS – Música', 20);