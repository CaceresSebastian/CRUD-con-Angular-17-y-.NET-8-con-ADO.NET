CREATE DATABASE SebastianCaceres;
go

USE SebastianCaceres;
go

CREATE TABLE TIPO_DOCUMENTO(
    IdTipoDoc INT PRIMARY KEY IDENTITY(1,1),
    Tipo VARCHAR(50)
);
go

CREATE TABLE PERSONAL (
    IdPersonal INT PRIMARY KEY IDENTITY(1,1),
    IdTipoDoc INT,
    NumeroDoc VARCHAR(25),
    ApPaterno VARCHAR(100),
    ApMaterno VARCHAR(100),
    Nombre1 VARCHAR(100),
    Nombre2 VARCHAR(100) DEFAULT '',
    NombreCompleto AS (ApPaterno + ' ' + ApMaterno + ', ' + Nombre1 + ' ' + ISNULL(Nombre2, '')) PERSISTED,
    FechaNac DATE,
    FechaIngreso DATE,
	CONSTRAINT FK_TipoDocumento_PERSONAL_TIPO_DOCUMENTO FOREIGN KEY (IdTipoDoc) REFERENCES TIPO_DOCUMENTO(IdTipoDoc),
	--La fecha de nacimiento es de 18 años en adelante con respecto a fecha acual
	CONSTRAINT CHK_Edad CHECK (DATEADD(YEAR, -18, GETDATE()) >= FechaNac), 
	-- La fecha de ingreso es al menos 18 años después de la fecha de nacimiento
	CONSTRAINT CHK_FechaIngreso CHECK (FechaIngreso >= DATEADD(YEAR, 18, FechaNac)) 
);
go

CREATE TABLE HIJOS (
    IdHijo INT PRIMARY KEY IDENTITY(1,1),
    IdPersonal INT,
    IdTipoDoc INT,
    NumeroDoc VARCHAR(25),
    ApPaterno VARCHAR(100),
    ApMaterno VARCHAR(100),
    Nombre1 VARCHAR(100),
    Nombre2 VARCHAR(100) DEFAULT '',
    NombreCompleto AS (ApPaterno + ' ' + ApMaterno + ', ' + Nombre1 + ' ' + ISNULL(Nombre2, '')) PERSISTED,
    FechaNac DATE,
    CONSTRAINT FK_Personal FOREIGN KEY (IdPersonal) REFERENCES PERSONAL(IdPersonal),
	CONSTRAINT FK_TipoDocumento_HIJOS_TIPO_DOCUMENTO FOREIGN KEY (IdTipoDoc) REFERENCES TIPO_DOCUMENTO(IdTipoDoc)
);
go

INSERT INTO TIPO_DOCUMENTO (Tipo) 
VALUES 
	('DNI'), -- DNI
	('C.EXT'), -- Carné de Extranjería
	('PSPRT'); -- Pasaporte
go

-- PROCEDIMIENTOS ALMACENADOS--
-- INSERTAR PERSONAL
CREATE PROCEDURE proc_InsertarPersonal
    @IdTipoDoc INT,
    @NumeroDoc VARCHAR(25),
    @ApPaterno VARCHAR(100),
    @ApMaterno VARCHAR(100),
    @Nombre1 VARCHAR(100),
    @Nombre2 VARCHAR(100),
    @FechaNac DATE,
    @FechaIngreso DATE
AS
BEGIN
    INSERT INTO PERSONAL (IdTipoDoc, NumeroDoc, ApPaterno, ApMaterno, Nombre1, Nombre2, FechaNac, FechaIngreso)
    VALUES (@IdTipoDoc, @NumeroDoc, @ApPaterno, @ApMaterno, @Nombre1, @Nombre2, @FechaNac, @FechaIngreso);
END;
go

-- LISTAR PERSONAL
CREATE PROCEDURE proc_ListaPersonal
AS
BEGIN
    SELECT * FROM PERSONAL;
END;
go

-- OBTENER PERSONAL
CREATE PROCEDURE proc_ObtenerPersonal
    @IdPersonal INT
AS
BEGIN
    SELECT * FROM PERSONAL WHERE IdPersonal = @IdPersonal;
END;
go

-- ACTUALIZAR PERSONAL
CREATE PROCEDURE proc_ActualizarPersonal
    @IdPersonal INT,
    @IdTipoDoc INT,
    @NumeroDoc VARCHAR(25),
    @ApPaterno VARCHAR(100),
    @ApMaterno VARCHAR(100),
    @Nombre1 VARCHAR(100),
    @Nombre2 VARCHAR(100),
    @FechaNac DATE,
    @FechaIngreso DATE
AS
BEGIN
    UPDATE PERSONAL
    SET IdTipoDoc = @IdTipoDoc,
        NumeroDoc = @NumeroDoc,
        ApPaterno = @ApPaterno,
        ApMaterno = @ApMaterno,
        Nombre1 = @Nombre1,
        Nombre2 = @Nombre2,
        FechaNac = @FechaNac,
        FechaIngreso = @FechaIngreso
    WHERE IdPersonal = @IdPersonal;
END;
go

--ELIMINAR PERSONAL
CREATE PROCEDURE proc_EliminarPersonal
    @IdPersonal INT
AS
BEGIN
    DELETE FROM PERSONAL WHERE IdPersonal = @IdPersonal;
END;
go

-- INSERTAR HIJO--
CREATE PROCEDURE proc_InsertarHijo
    @IdPersonal INT,
    @IdTipoDoc INT,
    @NumeroDoc VARCHAR(25),
    @ApPaterno VARCHAR(100),
    @ApMaterno VARCHAR(100),
    @Nombre1 VARCHAR(100),
    @Nombre2 VARCHAR(100),
    @FechaNac DATE
AS
BEGIN
    INSERT INTO HIJOS (IdPersonal, IdTipoDoc, NumeroDoc, ApPaterno, ApMaterno, Nombre1, Nombre2, FechaNac)
    VALUES (@IdPersonal, @IdTipoDoc, @NumeroDoc, @ApPaterno, @ApMaterno, @Nombre1, @Nombre2, @FechaNac);
END;
go

-- LISTAR HIJOS
CREATE PROCEDURE proc_ListarHijos
    @IdPersonal INT
AS
BEGIN
    SELECT * 
    FROM HIJOS 
    WHERE IdPersonal = @IdPersonal;
END;
go

-- OBTENER HIJO
CREATE PROCEDURE proc_ObtenerHijo
    @IdHijo INT
AS
BEGIN
    SELECT * FROM HIJOS WHERE IdHijo = @IdHijo;
END;
go

-- ACTUALIZAR HIJOS
CREATE PROCEDURE proc_ActualizarHijo
    @IdHijo INT,
    @IdPersonal INT,
    @IdTipoDoc INT,
    @NumeroDoc VARCHAR(25),
    @ApPaterno VARCHAR(100),
    @ApMaterno VARCHAR(100),
    @Nombre1 VARCHAR(100),
    @Nombre2 VARCHAR(100),
    @FechaNac DATE
AS
BEGIN
    UPDATE HIJOS
    SET IdPersonal = @IdPersonal,
        IdTipoDoc = @IdTipoDoc,
        NumeroDoc = @NumeroDoc,
        ApPaterno = @ApPaterno,
        ApMaterno = @ApMaterno,
        Nombre1 = @Nombre1,
        Nombre2 = @Nombre2,
        FechaNac = @FechaNac
    WHERE IdHijo = @IdHijo;
END;
go

-- ELIMINAR HIJO
CREATE PROCEDURE proc_EliminarHijo
    @IdHijo INT
AS
BEGIN
    DELETE FROM HIJOS WHERE IdHijo = @IdHijo;
END;
go

SELECT * FROM TIPO_DOCUMENTO;
SELECT * FROM PERSONAL;
SELECT * FROM HIJOS;
