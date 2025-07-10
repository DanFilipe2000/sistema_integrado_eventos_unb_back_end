CREATE OR REPLACE VIEW vw_inscricoes_simples AS
SELECT
  p.Matricula         AS ParticipanteID,
  p.Nome              AS NomeParticipante,
  p.Email             AS EmailParticipante,

  c.Titulo            AS NomeCurso,
  d.Nome              AS Departamento,

  e.Codigo            AS EventoID,
  e.Titulo            AS NomeEvento,
  e.DataInicio,
  e.DataFinal,

  CONCAT(
    ed.Logradouro, ', nº ', ed.Numero,
    ' – ', ed.Bairro,
    ' | ', city.Nome, '/', st.Sigla
  )                   AS EnderecoEvento,

  ti.Titulo           AS TipoIngresso,

  cat.Titulo          AS CategoriaEvento,
  ex.Nome             AS NomeExpositor

FROM Participantes p

LEFT JOIN Curso c                ON p.idCurso = c.Codigo
LEFT JOIN Departamento d         ON c.idDepartamento = d.Codigo

LEFT JOIN Ingresso i             ON i.idParticipante = p.Matricula
LEFT JOIN Evento e               ON e.Codigo = i.idEvento

LEFT JOIN TipoIngresso ti        ON ti.Codigo = i.idTipoIngresso

LEFT JOIN Endereco ed            ON e.idEndereco = ed.Codigo
LEFT JOIN Cidade city            ON ed.idCidade = city.Codigo
LEFT JOIN Estado st              ON city.idEstado = st.Sigla

LEFT JOIN Rel_Evento_CategoriaEvento rc ON rc.idEvento = e.Codigo
LEFT JOIN CategoriaEvento cat           ON cat.Codigo = rc.idCategoria

LEFT JOIN Rel_Evento_Expositor re       ON re.idEvento = e.Codigo
LEFT JOIN Expositor ex                  ON ex.CPF = re.idExpositor;
