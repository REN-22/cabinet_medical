-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 25 nov. 2021 à 10:39
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cabinet`
--

-- --------------------------------------------------------

--
-- Structure de la table `Medecin`
--

DROP TABLE IF EXISTS `Medecin`;
CREATE TABLE IF NOT EXISTS `Medecin` (
  `id_medecin` int(11) NOT NULL AUTO_INCREMENT,
  `civilite` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `nom` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `prenom` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id_medecin`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Déchargement des données de la table `Medecin`
--

-- --------------------------------------------------------

--
-- Structure de la table `Usager`
--

DROP TABLE IF EXISTS `Usager`;
CREATE TABLE IF NOT EXISTS `Usager` (
  `id_usager` int(11) NOT NULL AUTO_INCREMENT,
  `numero_securite_sociale` int(11) DEFAULT NULL,
  `civilite` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `nom` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `prenom` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `adresse` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `lieu_naissance` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `ville` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `code_postal` char(5) COLLATE latin1_bin DEFAULT NULL,
  `id_medecin_traitant` int(11) DEFAULT NULL,
  `id_medecin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usager`),
  FOREIGN KEY (`id_medecin`) REFERENCES `Medecin` (`id_medecin`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Déchargement des données de la table `Usager`
--

-- --------------------------------------------------------

--
-- Structure de la table `Rendez_vous`
--

DROP TABLE IF EXISTS `Rendez_vous`;
CREATE TABLE IF NOT EXISTS `Rendez_vous` (
  `id_usager` int(11) NOT NULL,
  `id_medecin` int(11) NOT NULL,
  `id_rdv` int(11) NOT NULL AUTO_INCREMENT,
  `date_RV` date NOT NULL,
  `heure_RV` time NOT NULL,
  `duree` time DEFAULT NULL,
  PRIMARY KEY (`id_rdv`),
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
