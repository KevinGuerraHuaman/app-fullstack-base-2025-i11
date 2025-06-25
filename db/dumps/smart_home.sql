
CREATE DATABASE IF NOT EXISTS smart_home;

USE smart_home;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `Devices` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(128) NOT NULL,
  `tipo` int(11) NOT NULL,
  `valor` decimal(2,1) NOT NULL,
  `iconMate` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `Devices` (`id`, `name`, `description`, `tipo`, `valor`, `iconMate`) VALUES
(1, 'Luz cochera', 'Luz principal con nivel de iluminación', 1, 0.5,'ac_unit'),
(2, 'Cerradura sotano', 'Seguro activo de noche', 0, 1,'toys'),
(3, 'Persiana de sala', 'Control de apertura', 1, 0.3,'local_florist'),
(4, 'Alarma terraza', 'Detección de movimiento', 0, 0,'opacity'),
(5, 'Ventilador de dormitorio', 'Control de velocidad - dormitorio 1', 1, 0.5,'wb_incandescent'),
(6, 'Luz de sala', 'Luz blanca central', 0, 1,'lock');


ALTER TABLE `Devices`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `Devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;


