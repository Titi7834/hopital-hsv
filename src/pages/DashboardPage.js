import React from "react";
import NavBar from "../NavBar";
import HospitalStats from "../components/HospitalStats";
import './DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <NavBar />
            <div className="container">
                <h2>Tableau de bord de l'Hôpital HSV</h2>
                <p className="dashboard-intro">
                    Bienvenue sur le tableau de bord de l'hôpital. Vous trouverez ici un aperçu global des statistiques de notre établissement.
                </p>
                
                <HospitalStats />
                
                <div className="dashboard-section">
                    <h3>Nos médecins</h3>
                    <p>
                        Notre équipe médicale est composée de spécialistes reconnus dans leurs domaines.
                        Chaque médecin s'engage à fournir des soins de la plus haute qualité pour nos patients.
                    </p>
                </div>
                
                <div className="dashboard-section">
                    <h3>Politique de rendez-vous</h3>
                    <p>
                        Les rendez-vous peuvent être pris facilement en ligne via notre système de réservation.
                        Pour annuler ou modifier un rendez-vous, merci de nous contacter au moins 24 heures à l'avance.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;