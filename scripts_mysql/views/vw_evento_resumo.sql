CREATE OR REPLACE VIEW vw_evento_resumo AS
SELECT
  e.Codigo                  AS EventoCodigo,
  e.Titulo                  AS TituloEvento,
  e.DataInicio,
  e.DataFinal,
  -- Endereço do evento
  CONCAT(
    ed.Logradouro, ', nº ', ed.Numero,
    ' – ', ed.Bairro,
    ' | ', c.Nome, '/', est.Sigla
  )                         AS EnderecoCompleto,
  -- Ingressos vendidos para este evento
  (SELECT COUNT(*) 
     FROM Ingresso i 
    WHERE i.idEvento = e.Codigo
  )                         AS TotalIngressos,
  -- Expositores cadastrados no evento
  (SELECT COUNT(*) 
     FROM Rel_Evento_Expositor re 
    WHERE re.idEvento = e.Codigo
  )                         AS TotalExpositores,
  -- Média e total de avaliações
  ROUND(
    (SELECT AVG(a.Nota) 
       FROM Avaliacao a 
      WHERE a.idEvento = e.Codigo
    ), 2
  )                         AS MediaAvaliacao,
  (SELECT COUNT(*) 
     FROM Avaliacao a 
    WHERE a.idEvento = e.Codigo
  )                         AS TotalAvaliacoes,
  -- Produtos vinculados ao evento
  (SELECT COUNT(*) 
     FROM Produto p 
    WHERE p.idEvento = e.Codigo
  )                         AS TotalProdutos,
  -- Categorias associadas
  (SELECT COUNT(*) 
     FROM Rel_Evento_CategoriaEvento rc 
    WHERE rc.idEvento = e.Codigo
  )                         AS TotalCategorias
FROM Evento e
  JOIN Endereco ed ON e.idEndereco = ed.Codigo
  JOIN Cidade    c  ON ed.idCidade   = c.Codigo
  JOIN Estado    est ON c.idEstado    = est.Sigla;


select * from vw_evento_resumo