CREATE OR REPLACE VIEW vw_expositor_produtos AS
SELECT
  ex.CPF,
  ex.Nome        AS Expositor,
  COUNT(pr.Codigo) AS TotalProdutos
FROM Expositor ex
LEFT JOIN Produto pr ON pr.idExpositor = ex.CPF
GROUP BY ex.CPF;
