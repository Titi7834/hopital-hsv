import React, { useState, useEffect } from 'react';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    specialite: '',
    id_medecin: '',
    date_rdv: ''
  });
  
  const [showForm, setShowForm] = useState(false);
  const [specialites, setSpecialites] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [filteredMedecins, setFilteredMedecins] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Charger les spécialités au chargement du composant
  useEffect(() => {
    const fetchSpecialites = async () => {
      try {
        const response = await fetch('/api/specialites');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des spécialités');
        }
        const data = await response.json();
        setSpecialites(data);
      } catch (error) {
        console.error('Erreur:', error);
        setErrorMessage('Erreur lors du chargement des spécialités');
      }
    };

    const fetchMedecins = async () => {
      try {
        const response = await fetch('/api/medecins');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des médecins');
        }
        const data = await response.json();
        setMedecins(data);
      } catch (error) {
        console.error('Erreur:', error);
        setErrorMessage('Erreur lors du chargement des médecins');
      }
    };

    fetchSpecialites();
    fetchMedecins();
  }, []);

  // Filtrer les médecins par spécialité
  const handleSpecialiteChange = (e) => {
    const specialite = e.target.value;
    setFormData({...formData, specialite, id_medecin: ''});
    
    if (specialite) {
      const filtered = medecins.filter(m => m.specialite === specialite);
      setFilteredMedecins(filtered);
    } else {
      setFilteredMedecins([]);
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    // Vérifier la date
    if (formData.date_rdv) {
      const now = new Date();
      const dt = new Date(formData.date_rdv);
      if (dt < now) {
        setErrorMessage("Vous ne pouvez pas prendre de rendez-vous dans le passé.");
        return;
      }
    }
    
    try {
      // Générer login/mot de passe aléatoires
      const login = `${formData.nom.toLowerCase()}${formData.prenom.toLowerCase()}${Math.floor(Math.random()*10000)}`;
      const mdp = Math.random().toString(36).slice(-8);
      
      // Créer le patient
      const patientResponse = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nom: formData.nom, 
          prenom: formData.prenom, 
          age: formData.age, 
          login, 
          mdp 
        })
      });
      
      if (!patientResponse.ok) {
        throw new Error('Erreur lors de la création du patient');
      }
      
      const patientData = await patientResponse.json();
      
      // Formater la date pour MySQL
      const dateFormatted = new Date(formData.date_rdv)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      
      // Créer le rendez-vous
      const rdvResponse = await fetch('/api/rendezvous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_patient: patientData.id_patient,
          id_medecin: formData.id_medecin,
          date_rdv: dateFormatted
        })
      });
      
      if (!rdvResponse.ok) {
        throw new Error('Erreur lors de la création du rendez-vous');
      }
      
      setSuccessMessage('Rendez-vous pris avec succès !');
      setFormData({
        nom: '',
        prenom: '',
        age: '',
        specialite: '',
        id_medecin: '',
        date_rdv: ''
      });
      setShowForm(false);
      
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage('Une erreur est survenue lors de la prise de rendez-vous.');
    }
  };

  return (
    <div className="appointment-form">
      {!showForm && (
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-show-form"
        >
          Prendre rendez-vous
        </button>
      )}
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      
      {showForm && (
        <form onSubmit={handleSubmit} className="form-rdv">
          <div className="form-group">
            <label>Nom :</label>
            <input 
              type="text" 
              name="nom" 
              value={formData.nom}
              onChange={handleInputChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Prénom :</label>
            <input 
              type="text" 
              name="prenom" 
              value={formData.prenom}
              onChange={handleInputChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Âge :</label>
            <input 
              type="number" 
              name="age" 
              min="0"
              value={formData.age}
              onChange={handleInputChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Spécialité :</label>
            <select 
              name="specialite"
              value={formData.specialite}
              onChange={handleSpecialiteChange}
              required
            >
              <option value="">-- Choisir une spécialité --</option>
              {specialites.map((spe, index) => (
                <option key={index} value={spe}>{spe}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Médecin :</label>
            <select 
              name="id_medecin"
              value={formData.id_medecin}
              onChange={handleInputChange}
              required
              disabled={!formData.specialite}
            >
              <option value="">-- Choisir un médecin --</option>
              {filteredMedecins.map((medecin) => (
                <option key={medecin.id_medecin} value={medecin.id_medecin}>
                  {medecin.nom} {medecin.prenom}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Date & Heure :</label>
            <input 
              type="datetime-local" 
              name="date_rdv"
              value={formData.date_rdv}
              onChange={handleInputChange}
              required 
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Valider le rendez-vous
            </button>
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="btn-cancel"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
