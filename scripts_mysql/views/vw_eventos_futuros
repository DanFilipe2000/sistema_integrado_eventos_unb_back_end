CREATE OR REPLACE VIEW vw_eventos_futuros AS
SELECT
  Codigo,
  Titulo,
  DataInicio,
  DataFinal
FROM Evento
WHERE DataInicio > CURRENT_DATE();