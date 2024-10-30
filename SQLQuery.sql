CREATE DATABASE AuditTask;

USE AuditTask;

-- Create the User table
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);

-- Create the Department table
CREATE TABLE Department (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);

-- Create the Employee table 
CREATE TABLE Employee (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Position NVARCHAR(100) NOT NULL,
    DepartmentId INT,
    FOREIGN KEY (DepartmentId) REFERENCES Department(Id),
	IsDeleted BIT NOT NULL DEFAULT 0
);

-- Create the Audit table
CREATE TABLE Audit (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Action NVARCHAR(50) NOT NULL,
    EmployeeName NVARCHAR(100) NOT NULL,
    EmployeeId INT,
    UserId INT,
    Timestamp DATETIME NOT NULL,
    FOREIGN KEY (EmployeeId) REFERENCES Employee(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

