DROP PROCEDURE IF EXISTS InscreverParticipanteEvento;

CREATE PROCEDURE InscreverParticipanteEvento (
    IN p_matricula INT,
    IN p_evento INT,
    IN p_tipo_ingresso INT,
    OUT p_mensagem VARCHAR(255)
)
proc_end: BEGIN
    DECLARE v_participante_existente INT DEFAULT 0;
    DECLARE v_evento_existente INT DEFAULT 0;
    DECLARE v_tipo_ingresso_existente INT DEFAULT 0;
    DECLARE v_ja_inscrito INT DEFAULT 0;

    SELECT COUNT(*) INTO v_participante_existente
    FROM Participantes
    WHERE Matricula = p_matricula;

    IF v_participante_existente = 0 THEN
        SET p_mensagem = 'Participante não encontrado.';
        LEAVE proc_end;
    END IF;

    SELECT COUNT(*) INTO v_evento_existente
    FROM Evento
    WHERE Codigo = p_evento;

    IF v_evento_existente = 0 THEN
        SET p_mensagem = 'Evento não encontrado.';
        LEAVE proc_end;
    END IF;

    SELECT COUNT(*) INTO v_tipo_ingresso_existente
    FROM TipoIngresso
    WHERE Codigo = p_tipo_ingresso;

    IF v_tipo_ingresso_existente = 0 THEN
        SET p_mensagem = 'Tipo de ingresso inválido.';
        LEAVE proc_end;
    END IF;

    SELECT COUNT(*) INTO v_ja_inscrito
    FROM Ingresso
    WHERE idParticipante = p_matricula AND idEvento = p_evento;

    IF v_ja_inscrito > 0 THEN
        SET p_mensagem = 'Participante já está inscrito neste evento.';
        LEAVE proc_end;
    END IF;

    INSERT INTO Ingresso (idParticipante, idEvento, idTipoIngresso)
    VALUES (p_matricula, p_evento, p_tipo_ingresso);

    SET p_mensagem = 'Inscrição realizada com sucesso.';

END;