// Create users table
const sql = "CREATE TABLE IF NOT EXISTS `" + process.env.MYSQL_DATABASE + "`.`users` (`id` INT NOT NULL AUTO_INCREMENT, `email` VARCHAR(254) NOT NULL, `username` VARCHAR(45) NOT NULL, `password` VARCHAR(60) NOT NULL, `token` VARCHAR(255), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), UNIQUE INDEX `username_UNIQUE` (`username` ASC), UNIQUE INDEX `email_UNIQUE` (`email` ASC));";

module.exports = sql;
