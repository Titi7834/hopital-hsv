import React, { useState, useEffect } from 'react';

const HospitalStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    specialties: []
  });

  // Simulation de chargement des données depuis l'API
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      
      try {
        // Chargement des médecins pour compter le nombre total et les spécialités        const medecinsResponse = await fetch('/api/medecins');
        
        if (!medecinsResponse.ok) {
          throw new Error('Erreur lors du chargement des médecins');
        }
        
        const medecinsData = await medecinsResponse.json();
        
        // Dans un vrai scénario, on récupérerait aussi les rendez-vous
        // et d'autres statistiques depuis l'API
        
        // Simulation de données pour l'instant
        setTimeout(() => {
          setStats({
            totalDoctors: 3, // Selon les données insérées dans initSql
            totalAppointments: Math.floor(Math.random() * 50),
            specialties: ['Cardiologie', 'Dermatologie', 'Généraliste']
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

  if (isLoading) {
    return <div className="loading-spinner">Chargement des statistiques...</div>;
  }

  return (
    <div className="hospital-stats">
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
      
      <div className="specialties-section">
        <h3>Nos spécialités</h3>
        <ul className="specialties-list">
          {stats.specialties.map((specialty, index) => (
            <li key={index}>{specialty}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HospitalStats;
