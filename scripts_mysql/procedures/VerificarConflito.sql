DROP PROCEDURE IF EXISTS sp_InscreverConflitoData;

CREATE PROCEDURE sp_InscreverConflitoData(
  IN  p_matricula      INT,
  IN  p_evento         INT,
  IN  p_tipo_ingresso  INT,
  OUT p_mensagem       VARCHAR(255)
)
proc_end: BEGIN
  DECLARE v_dataInicio   DATE;
  DECLARE v_dataFinal    DATE;
  DECLARE v_conflito     INT DEFAULT 0;

  
  IF NOT EXISTS (SELECT 1 FROM Participantes WHERE Matricula   = p_matricula) THEN
    SET p_mensagem = 'Participante não encontrado.'; LEAVE proc_end;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM Evento        WHERE Codigo      = p_evento) THEN
    SET p_mensagem = 'Evento não encontrado.';    LEAVE proc_end;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM TipoIngresso  WHERE Codigo      = p_tipo_ingresso) THEN
    SET p_mensagem = 'Tipo de ingresso inválido.'; LEAVE proc_end;
  END IF;

  
  SELECT DataInicio, DataFinal
    INTO v_dataInicio, v_dataFinal
    FROM Evento
   WHERE Codigo = p_evento;

  
  IF EXISTS (
    SELECT 1 FROM Ingresso
     WHERE idParticipante = p_matricula
       AND idEvento        = p_evento
  ) THEN
    SET p_mensagem = 'Já inscrito neste evento.'; LEAVE proc_end;
  END IF;

  
  SELECT COUNT(*) INTO v_conflito
    FROM Ingresso i
    JOIN Evento e2 ON e2.Codigo = i.idEvento
   WHERE i.idParticipante = p_matricula
     AND (
      
       (v_dataInicio BETWEEN e2.DataInicio AND e2.DataFinal)
       OR
       (v_dataFinal  BETWEEN e2.DataInicio AND e2.DataFinal)
       OR
       (e2.DataInicio BETWEEN v_dataInicio AND v_dataFinal)
     );

  SELECT COUNT(*) INTO v_conflito
FROM Ingresso i
JOIN Evento e2 ON e2.Codigo = i.idEvento
WHERE i.idParticipante = p_matricula
  AND (
    (v_dataInicio <= e2.DataFinal AND v_dataFinal >= e2.DataInicio)
  );


  
  INSERT INTO Ingresso (idParticipante, idEvento, idTipoIngresso)
  VALUES (p_matricula, p_evento, p_tipo_ingresso);

  SET p_mensagem = 'Inscrição realizada com sucesso.';
END ;

/*
  SET @msg := '';

CALL sp_InscreverConflitoData(
  111111,  -- p_matricula
  6,     -- p_evento
  1,     -- p_tipo_ingresso
  @msg   -- p_mensagem OUT
);

SELECT @msg AS mensagem;
*/