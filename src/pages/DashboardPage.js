import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import HospitalStats from "../components/HospitalStats";
import './DashboardPage.css';

const DashboardPage = () => {
    const [rendezvous, setRendezvous] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [filteredRdv, setFilteredRdv] = useState([]);

    useEffect(() => {
        fetch('/api/rendezvous/all')
            .then(res => res.json())
            .then(data => setRendezvous(data))
            .catch(() => setRendezvous([]));
    }, []);

    useEffect(() => {
        if (patientId.trim() === "") {
            setFilteredRdv([]);
        } else {
            setFilteredRdv(
                rendezvous.filter(rdv => String(rdv.id_patient) === patientId.trim())
            );
        }
    }, [patientId, rendezvous]);

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
                    <h3>Suivi des rendez-vous</h3>
                    <div style={{ marginBottom: 16 }}>
                        <label>
                            Filtrer par ID patient&nbsp;
                            <input
                                type="text"
                                value={patientId}
                                onChange={e => setPatientId(e.target.value)}
                                placeholder="Entrez l'id_patient"
                                style={{ width: 120 }}
                            />
                        </label>
                    </div>
                    {patientId.trim() !== "" && (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>ID Patient</th>
                                    <th>Patient</th>
                                    <th>Médecin</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRdv.length === 0 && (
                                    <tr>
                                        <td colSpan={4}>Aucun rendez-vous trouvé.</td>
                                    </tr>
                                )}
                                {filteredRdv.map((rdv, idx) => (
                                    <tr key={idx}>
                                        <td>{rdv.id_patient}</td>
                                        <td>{rdv.nom_patient} {rdv.prenom_patient}</td>
                                        <td>{rdv.nom_medecin} {rdv.prenom_medecin}</td>
                                        <td>{new Date(rdv.date_rdv).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;