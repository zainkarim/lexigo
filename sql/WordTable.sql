create database worddb;
use worddb;
Create Table WordTable(
  WordID int primary key,
  Word varchar(255),
  Definition varchar(255),
  Example varchar(255),
  Tag varchar(255),
  Difficulty varchar(255)
);
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(1, "Destroy", "Put an end to the existence of (something) by damaging or attacking it.", "We need to destroy the ant colony with ant killer powder.", "Verb", "Easy");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(2, "Recalcitrant", "Having an obstinately uncooperative attitude toward authority or discipline.", "Andre was suspended for being recalcitrant toward his teachers.", "Adjective", "Hard");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(3, "Hello", "Used as a greeting or to begin a phone conversation.", "Hello, nice to meet you.", "Exclamation", "Easy");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(4, "Abstain", "Restrain oneself from doing or enjoying something.", "You must abstain from drinking too much alcohol.", "Verb", "Medium");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(5, "Circumvent", "Find a way around (an obstacle).", "I found an alternative path to campus to circumvent the traffic jam in highway.", "Verb", "Medium");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(6, "Ephemeral", "Lasting for a very short time.", "The Covid era tech hiring spree was ephemeral.", "Adjective", "Hard");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(7, "Garrulous", "Excessively talkative, especially on trivial matters.", "We are sick of Frank being garrulous about his car during class discussions.", "Adjective", "Hard");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(8, "Embellish", "Make more attractive, as by adding ornament or color.", "You can embellish the dining room with flowers.", "Verb", "Medium");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(9, "Buy", "Obtain in exchange for payment.", "You would need six dollars to obtain a Big Mac.", "Verb", "Easy");
Insert into WordTable(WordID, Word, Definition, Example, Tag, Difficulty)
Values(10, "Vicissitude", "A change of circumstances or fortune, typically one that is unwelcome or unpleasant.", "Many people struggled to recover from vicissitude of the Great Recession in 2008.", "Noun", "Hard");
