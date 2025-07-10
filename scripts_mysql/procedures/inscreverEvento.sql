DROP PROCEDURE IF EXISTS sp_CadastrarEventoCompleto;

CREATE PROCEDURE sp_CadastrarEventoCompleto(
    IN p_Titulo        VARCHAR(100),
    IN p_DataInicio    DATE,
    IN p_DataFinal     DATE,
    IN p_Foto_b64      VARCHAR(255),
    IN p_idEndereco    INT,
    IN p_Categorias    TEXT,    -- ex.: '1,3,5'
    IN p_Expositores   TEXT     -- ex.: '12345678901,10987654321'
)
BEGIN
    DECLARE v_eventoId   INT;
    DECLARE v_item       VARCHAR(20);
    DECLARE v_pos        INT;

    -- tratador de erro: em caso de falha, faz rollback  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- 1) insere o evento  
    INSERT INTO Evento (Titulo, DataInicio, DataFinal, Foto_b64, idEndereco)
    VALUES (p_Titulo, p_DataInicio, p_DataFinal, p_Foto_b64, p_idEndereco);

    SET v_eventoId = LAST_INSERT_ID();

    -- 2) percorre lista de categorias  
    WHILE CHAR_LENGTH(TRIM(p_Categorias)) > 0 DO
        SET v_pos = LOCATE(',', p_Categorias);
        IF v_pos > 0 THEN
            SET v_item = LEFT(p_Categorias, v_pos-1);
            SET p_Categorias = SUBSTRING(p_Categorias, v_pos+1);
        ELSE
            SET v_item = p_Categorias;
            SET p_Categorias = '';
        END IF;
        INSERT IGNORE INTO Rel_Evento_CategoriaEvento
            (idEvento, idCategoria) VALUES (v_eventoId, CAST(v_item AS UNSIGNED));
    END WHILE;

    -- 3) percorre lista de expositores  
    WHILE CHAR_LENGTH(TRIM(p_Expositores)) > 0 DO
        SET v_pos = LOCATE(',', p_Expositores);
        IF v_pos > 0 THEN
            SET v_item = LEFT(p_Expositores, v_pos-1);
            SET p_Expositores = SUBSTRING(p_Expositores, v_pos+1);
        ELSE
            SET v_item = p_Expositores;
            SET p_Expositores = '';
        END IF;
        INSERT IGNORE INTO Rel_Evento_Expositor
            (idEvento, idExpositor) VALUES (v_eventoId, v_item);
    END WHILE;

    COMMIT;

    -- devolve o código do evento recém-criado  
    SELECT v_eventoId AS NovoEvento;
END

;

/* 
CALL sp_CadastrarEventoCompleto(
  'Evento de Teste',
  '2025-08-10',
  '2025-08-12',
  '',                  -- sem foto
  1,                   -- idEndereco (ajuste conforme o seu)
  '1,3,5',             -- ids de categorias existentes
  '12345678901,23456789012,34567890123,45678901234,56789012345'
);
*/