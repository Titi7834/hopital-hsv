import React, { useState, useEffect } from 'react';

const HospitalStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    specialties: []
  });
  const [doctors, setDoctors] = useState([]);

  // Simulation de chargement des données depuis l'API
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      
      try {
        // Chargement des médecins pour compter le nombre total et les spécialités
        const medecinsResponse = await fetch('/api/medecins');
        
        if (!medecinsResponse.ok) {
          throw new Error('Erreur lors du chargement des médecins');
        }
        
        const medecinsData = await medecinsResponse.json();
        setDoctors(medecinsData);
        
        // Extraction des spécialités uniques
        const specialties = [...new Set(medecinsData.map(doc => doc.specialite))];
        
        // Dans un vrai scénario, on récupérerait aussi les rendez-vous
        // et d'autres statistiques depuis l'API
        
        // Simulation de données pour l'instant
        setTimeout(() => {
          setStats({
            totalDoctors: medecinsData.length,
            totalAppointments: Math.floor(Math.random() * 50),
            specialties: specialties
          });
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Erreur de chargement des statistiques:', error);
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // Fonction pour afficher l'image du médecin avec fallback
  const getDoctorImage = (imageFilename) => {
    return `/doctors/${imageFilename}`;
  };

  if (isLoading) {
    return <div className="loading-spinner">Chargement des statistiques...</div>;
  }

  return (
    <div className="hospital-stats">
      {/* Stats Cards Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Médecins</h3>
          <div className="stat-value">{stats.totalDoctors}</div>
          <p>Professionnels de santé</p>
        </div>
        
        <div className="stat-card">
          <h3>Spécialités</h3>
          <div className="stat-value">{stats.specialties.length}</div>
          <p>Domaines médicaux</p>
        </div>
        
        <div className="stat-card">
          <h3>Rendez-vous</h3>
          <div className="stat-value">{stats.totalAppointments}</div>
          <p>Ce mois-ci</p>
        </div>
      </div>
      
      {/* Two-Column Layout for Specialties and Medical Team */}
      <div className="dashboard-layout">
        <div className="dashboard-row">
          {/* Specialties Column */}
          <div className="dashboard-section specialties-section">
            <h3>Nos spécialités</h3>
            <ul className="specialites-list">
              {stats.specialties.map((specialty, index) => (
                <li key={index}>{specialty}</li>
              ))}
            </ul>
          </div>

          {/* Medical Team Column */}
          <div className="dashboard-section doctors-showcase">
            <h3>Notre équipe médicale</h3>
            <div className="doctors-grid">
              {doctors
                // Shuffle the array and take only the first 3 doctors
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((doctor) => (
                  <div className="doctor-profile" key={doctor.id_medecin}>
                    <img 
                      src={getDoctorImage(doctor.image)} 
                      alt={`Dr. ${doctor.nom} ${doctor.prenom}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/doctors/default.jpg';
                      }}
                    />
                    <div className="doctor-info">
                      <h4>Dr. {doctor.nom} {doctor.prenom}</h4>
                      <p>{doctor.specialite}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalStats;
