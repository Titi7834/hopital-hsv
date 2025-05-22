import React, { useState, useEffect } from 'react';

const HospitalStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    specialties: []
  });
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const medecinsResponse = await fetch('/api/medecins');
        if (!medecinsResponse.ok) {
          throw new Error('Erreur lors du chargement des médecins');
        }
        const medecinsData = await medecinsResponse.json();
        setDoctors(medecinsData);

        const specialties = [...new Set(medecinsData.map(doc => doc.specialite))];

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

  useEffect(() => {
    if (selectedSpecialty) {
      setFilteredDoctors(doctors.filter(doc => doc.specialite === selectedSpecialty));
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedSpecialty, doctors]);

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
          {/* Specialties Column with filter */}
          <div className="dashboard-section specialties-section">
            <h3>Nos spécialités</h3>
            <ul className="specialites-list">
              {stats.specialties.map((specialty, index) => (
                <li
                  key={index}
                  className={selectedSpecialty === specialty ? "selected-specialty" : ""}
                  style={{
                    cursor: "pointer",
                    fontWeight: selectedSpecialty === specialty ? "bold" : "normal",
                    color: selectedSpecialty === specialty ? "#1a56db" : "#222"
                  }}
                  onClick={() => setSelectedSpecialty(specialty)}
                >
                  {specialty}
                </li>
              ))}
              <li
                style={{
                  cursor: "pointer",
                  fontWeight: !selectedSpecialty ? "bold" : "normal",
                  color: !selectedSpecialty ? "#1a56db" : "#222"
                }}
                onClick={() => setSelectedSpecialty("")}
              >
                Toutes
              </li>
            </ul>
          </div>

          {/* Medical Team Column filtered by specialty */}
          <div className="dashboard-section doctors-showcase">
            <h3>
              {selectedSpecialty
                ? `Médecins en ${selectedSpecialty}`
                : "Notre équipe médicale"}
            </h3>
            <div className="doctors-grid">
              {(selectedSpecialty ? filteredDoctors : doctors
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
              ).map((doctor) => (
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
              {(selectedSpecialty && filteredDoctors.length === 0) && (
                <div style={{ padding: 16 }}>Aucun médecin pour cette spécialité.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalStats;