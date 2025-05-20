import React from "react";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home-page">
            <NavBar />
            <div className="hero-section">
                <div className="container">
                    <h1>Bienvenue à l'Hôpital HSV</h1>
                    <p className="hero-text">
                        Votre santé est notre priorité. Des soins médicaux d'excellence accessibles à tous.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/book" className="btn-primary">Prendre rendez-vous</Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="features-section">
                    <h2>Nos Services</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Cardiologie</h3>
                            <p>Consultations et suivi des maladies cardiovasculaires par nos spécialistes.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Dermatologie</h3>
                            <p>Traitement des affections cutanées et conseils pour une peau saine.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Médecine Générale</h3>
                            <p>Consultation pour tous types de problèmes médicaux et orientation vers des spécialistes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;