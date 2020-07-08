CREATE TABLE `projetofinal`.`lojas` ( 
`id` INT NOT NULL AUTO_INCREMENT , 
`nome` VARCHAR(50) NOT NULL , 
`telefone` VARCHAR(50) NOT NULL , 
`cep` VARCHAR(12) NOT NULL , 
`endereco` VARCHAR(100) NOT NULL , 
`bairro` VARCHAR(100) NOT NULL , 
`complemento` VARCHAR(100) NOT NULL , 
`numero` VARCHAR(20) NOT NULL , 
`cidade` VARCHAR(50) NOT NULL , 
`estado` VARCHAR(50) NOT NULL , 
PRIMARY KEY (`id`))

CREATE TABLE `projetofinal`.`produtos` ( 
`id` INT NOT NULL AUTO_INCREMENT , 
`loja_id` INT NOT NULL , 
`nome` VARCHAR(100) NOT NULL , 
`quantidade` DOUBLE NOT NULL , 
`preco` DECIMAL NOT NULL , 
PRIMARY KEY (`id`))

ALTER TABLE `produtos` ADD CONSTRAINT `Constraint_Loja_id` 
FOREIGN KEY (`loja_id`) REFERENCES `lojas`(`id`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;