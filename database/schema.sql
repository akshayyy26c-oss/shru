
IF DB_ID(N'angry_bird_db') IS NULL
    CREATE DATABASE angry_bird_db;
GO

USE angry_bird_db;
GO

-- =================================
-- QUESTIONS TABLE
-- =================================

IF OBJECT_ID(N'dbo.questions', N'U') IS NULL
CREATE TABLE dbo.questions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    question NVARCHAR(MAX) NOT NULL,
    yes_response NVARCHAR(255) NOT NULL,
    no_response NVARCHAR(255) NOT NULL,
    is_active BIT NOT NULL CONSTRAINT df_questions_is_active DEFAULT (1),
    created_at DATETIME2 NOT NULL CONSTRAINT df_questions_created_at DEFAULT (SYSDATETIME())
);

-- =================================
-- JOKES TABLE
-- =================================

IF OBJECT_ID(N'dbo.jokes', N'U') IS NULL
CREATE TABLE dbo.jokes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    joke NVARCHAR(MAX) NOT NULL,
    is_active BIT NOT NULL CONSTRAINT df_jokes_is_active DEFAULT (1),
    created_at DATETIME2 NOT NULL CONSTRAINT df_jokes_created_at DEFAULT (SYSDATETIME())
);

-- =================================
-- RESPONSES TABLE
-- =================================

IF OBJECT_ID(N'dbo.responses', N'U') IS NULL
CREATE TABLE dbo.responses (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,

    question_id INT NOT NULL,

    answer VARCHAR(3) NOT NULL CONSTRAINT ck_responses_answer CHECK (answer IN ('yes', 'no')),

    created_at DATETIME2 NOT NULL CONSTRAINT df_responses_created_at DEFAULT (SYSDATETIME()),

    CONSTRAINT fk_question
        FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON UPDATE CASCADE
);

-- =================================
-- INSERT QUESTIONS
-- =================================

IF NOT EXISTS (SELECT 1 FROM dbo.questions WHERE id = 1)
    SET IDENTITY_INSERT dbo.questions ON;

INSERT INTO dbo.questions
(id, question, yes_response, no_response)
SELECT seed.id, seed.question, seed.yes_response, seed.no_response
FROM (
SELECT
    1,
    'Do you want me to stop caring about you?',
    'Good! Because that is not happening anyway.',
    'Too late! Caring mode is permanently activated.'
UNION ALL SELECT
    2,
    'Would you like to come with me on the bus today?',
    'Bus journey officially saved!',
    'Even the bus is waiting for you!'
UNION ALL SELECT
    3,
    'Can we forget this fight and start smiling again?',
    'That is the answer I was waiting for!',
    'Friendship is too precious to give up!'
) AS seed(id, question, yes_response, no_response)
WHERE NOT EXISTS (SELECT 1 FROM dbo.questions q WHERE q.id = seed.id);

SET IDENTITY_INSERT dbo.questions OFF;

-- =================================
-- INSERT JOKES
-- =================================

INSERT INTO dbo.jokes (joke)
SELECT seed.joke
FROM (VALUES
(
    N'Are you WiFi? Because I feel disconnected when you are angry. 😂'
),
(
    N'Warning! Excessive anger detected. Restarting friendship.exe... 🤣'
)) AS seed(joke)
WHERE NOT EXISTS (SELECT 1 FROM dbo.jokes j WHERE j.joke = seed.joke);

-- =================================
-- VERIFY DATABASE
-- =================================

SELECT * FROM dbo.questions;
SELECT * FROM dbo.jokes;
SELECT * FROM dbo.responses;
