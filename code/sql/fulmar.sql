CREATE DATABASE ese
GO
USE ese
GO

CREATE TABLE [dbo].[Documents](
    [DocumentID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
	[FileID] [varchar](1000) NOT NULL,
    [Source] [tinyint] NOT NULL DEFAULT 0,
	[Data] [varchar](max) NULL,
	[MetaData] [varchar](max) NULL,
	[SearchID] [varchar](1500) NOT NULL)
GO
CREATE TABLE [dbo].[DocumentLinkedEntities](
    [EntityID] INT IDENTITY (1, 1) PRIMARY KEY,
	[DocumentID] UNIQUEIDENTIFIER NOT NULL,
    [FileID] [varchar](1000) NOT NULL,
	[Entity] [varchar](255) NOT NULL,
	[Category] [varchar](120) NULL,
	[Classification] [varchar](120) NULL,
	[Type] [varchar](120) NULL,
	[WikipediaID] [varchar](255) NULL,
	[BingID] [varchar](255) NULL,
	[Data] [varchar](max) NULL,
	[MatchesCnt] [int] NULL,
	[SearchID] [varchar](1500) NOT NULL,
    FOREIGN KEY ([DocumentID]) 
        REFERENCES [dbo].[Documents] ([DocumentID]) 
        ON DELETE CASCADE ON UPDATE CASCADE)
GO
CREATE TABLE [dbo].[DocumentKeyPhrases](
    [PhraseID] INT IDENTITY (1, 1) PRIMARY KEY,
	[DocumentID] UNIQUEIDENTIFIER NOT NULL,
    [FileID] [varchar](1000) NOT NULL,
	[Phrase] [varchar](1000) NOT NULL,
	[SearchID] [varchar](1500) NOT NULL,
    FOREIGN KEY ([DocumentID]) 
        REFERENCES [dbo].[Documents] ([DocumentID]) 
        ON DELETE CASCADE ON UPDATE CASCADE)
GO
CREATE TABLE [dbo].[DocumentSentences](
    [SentenceID] INT IDENTITY (1, 1) PRIMARY KEY,
	[DocumentID] UNIQUEIDENTIFIER NOT NULL,
    [FileID] [varchar](1000) NOT NULL,
	[Sentence] [varchar](max) NOT NULL,
	[LineNum] [int] NULL,
	[EntitiesCnt] [int] NULL,
	[EntitiesMatchesCnt] [int] NULL,
	[PhrasesCnt] [int] NULL,
	[SearchID] [varchar](1500) NOT NULL,
    FOREIGN KEY (DocumentID) 
        REFERENCES [dbo].[Documents] ([DocumentID]) 
        ON DELETE CASCADE ON UPDATE CASCADE)
GO
CREATE TABLE [dbo].[DocumentTriplesFTS](
    [TripleID] INT IDENTITY (1, 1) PRIMARY KEY,
	[DocumentID] UNIQUEIDENTIFIER NOT NULL,
    [FileID] [varchar](1000) NOT NULL,
	[S] [varchar](1000) NULL,
	[P] [varchar](1000) NULL,
	[O] [varchar](1000) NULL,
	[LineNum] [int] NULL,
	[Optional] [bit] NULL,
	[SearchID] [varchar](1500) NOT NULL,
    FOREIGN KEY (DocumentID) 
        REFERENCES [dbo].[Documents] ([DocumentID]) 
        ON DELETE CASCADE ON UPDATE CASCADE)
GO
