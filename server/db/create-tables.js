module.exports = {
	sql: () => {
		return {
			"users": "CREATE TABLE IF NOT EXISTS `" + process.env.MYSQL_DATABASE + "`.`users` (`id` INT NOT NULL AUTO_INCREMENT, `email` VARCHAR(254) NOT NULL, `username` VARCHAR(45) NOT NULL, `password` VARCHAR(60) NOT NULL, `token` VARCHAR(255), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), UNIQUE INDEX `username_UNIQUE` (`username` ASC), UNIQUE INDEX `email_UNIQUE` (`email` ASC));",

			"dishes": "CREATE TABLE IF NOT EXISTS `" + process.env.MYSQL_DATABASE + "`.`dishes` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL, `recipe` MEDIUMTEXT NOT NULL, `image` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC));",

			"ingredients_in_dish": "CREATE TABLE IF NOT EXISTS `" + process.env.MYSQL_DATABASE + "`.`ingredients_in_dish` (`id` INT NOT NULL AUTO_INCREMENT, `dish_id` INT NOT NULL, `amount` INT UNSIGNED NOT NULL, `unit` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC));",

			"ingredients": "CREATE TABLE IF NOT EXISTS `" + process.env.MYSQL_DATABASE + "`.`ingredients` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL, `calories` INT UNSIGNED NOT NULL, `calories_unit` VARCHAR(45) NOT NULL, `fat` INT UNSIGNED NOT NULL, `fat_unit` VARCHAR(45) NOT NULL, `protein` INT UNSIGNED NOT NULL, `protein_unit` VARCHAR(45) NOT NULL, `carbohydrates` INT UNSIGNED NOT NULL, `carbohydrates_unit` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`),  UNIQUE INDEX `name_UNIQUE` (`name` ASC), UNIQUE INDEX `id_UNIQUE` (`id` ASC));"
		};
	}
};
