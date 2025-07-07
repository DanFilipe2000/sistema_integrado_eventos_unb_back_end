CREATE OR REPLACE VIEW vw_curso_participantes AS
SELECT
  c.Codigo,
  c.Titulo      AS Curso,
  COUNT(p.Matricula) AS TotalParticipantes
FROM Curso c
LEFT JOIN Participantes p ON p.idCurso = c.Codigo
GROUP BY c.Codigo;
