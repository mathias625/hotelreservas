-- CreateTable
CREATE TABLE `Quarto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(10) NOT NULL,
    `tipo` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospede` VARCHAR(100) NOT NULL,
    `data_entrada` DATETIME(3) NOT NULL,
    `data_saida` DATETIME(3) NOT NULL,
    `quarto_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reserva`
ADD CONSTRAINT `Reserva_quarto_id_fkey`
FOREIGN KEY (`quarto_id`)
REFERENCES `Quarto`(`id`)
ON DELETE RESTRICT
ON UPDATE CASCADE;

INSERT INTO `Quarto` (numero, tipo)
VALUES
('101', 'Solteiro'),
('102', 'Casal'),
('103', 'Luxo');

INSERT INTO `Reserva` (hospede, data_entrada, data_saida, quarto_id)
VALUES
('João', '2026-06-15', '2026-06-20', 1),
('Maria', '2026-06-18', '2026-06-22', 2),
('Pedro', '2026-06-25', '2026-06-28', 3);