import React, { useState, useEffect, useRef } from 'react';

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
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordRef = useRef(null);

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
    setSelectedDoctor(null);
    
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
    
    // Si c'est le médecin qui a changé, mettre à jour selectedDoctor
    if (name === 'id_medecin' && value) {
      const doctor = medecins.find(m => m.id_medecin.toString() === value);
      setSelectedDoctor(doctor);
    } else if (name === 'id_medecin' && !value) {
      setSelectedDoctor(null);
    }
  };

  // Fonction pour copier le mot de passe
  const copyPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      // Désélectionner pour éviter le focus bleu
      window.getSelection().removeAllRanges();
      
      // Feedback temporaire
      const originalText = document.getElementById('copy-btn').innerText;
      document.getElementById('copy-btn').innerText = 'Copié !';
      setTimeout(() => {
        document.getElementById('copy-btn').innerText = originalText;
      }, 2000);
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setCredentials(null);
    
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
          date_rdv: dateFormatted,
          mdp : mdp,
          login : login,
          age : formData.age,
          id_medecin : formData.id_medecin,
          nom : formData.nom,
          prenom : formData.prenom
        })
      });
      
      if (!rdvResponse.ok) {
        throw new Error('Erreur lors de la création du rendez-vous');
      }
      
      // Stockage des credentials pour affichage
      setCredentials({ login, mdp });
      
      setSuccessMessage('Rendez-vous pris avec succès ! Veuillez conserver vos identifiants ci-dessous pour accéder à votre espace patient.');
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

  // Fonction pour afficher l'image du médecin avec fallback
  const getDoctorImage = (imageFilename) => {
    try {
      return `/doctors/${imageFilename}`;
    } catch (error) {
      return '/doctors/default.jpg';
    }
  };

  return (
    <div className="appointment-form">
      {!showForm && !credentials && (
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
      
      {credentials && (
        <div className="credentials-card">
          <h3>Vos identifiants</h3>
          <p className="credentials-info">
            Conservez précieusement ces informations pour vous connecter à votre espace patient.
          </p>
          
          <div className="credential-item">
            <label>Identifiant :</label>
            <div className="credential-value">{credentials.login}</div>
          </div>
          
          <div className="credential-item">
            <label>Mot de passe :</label>
            <div className="password-container">
              <input 
                ref={passwordRef}
                type={passwordVisible ? "text" : "password"} 
                readOnly 
                value={credentials.mdp} 
                className="credential-value password-field"
              />
              <button 
                type="button" 
                className="btn-toggle-password" 
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Masquer" : "Afficher"}
              </button>
              <button 
                id="copy-btn"
                type="button" 
                className="btn-copy-password" 
                onClick={copyPassword}
              >
                Copier
              </button>
            </div>
          </div>
          
          <div className="credentials-actions">
            <button 
              onClick={() => {
                setCredentials(null);
                setShowForm(false);
                setSuccessMessage('');
              }} 
              className="btn-credentials-done"
            >
              J'ai sauvegardé mes identifiants
            </button>
            <button 
              onClick={() => setShowForm(true)} 
              className="btn-new-appointment"
            >
              Prendre un autre rendez-vous
            </button>
          </div>
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
          
          <div className="form-section">
            <div className="form-group doctor-selection">
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
            
            {selectedDoctor && (
              <div className="doctor-card">
                <img 
                  src={getDoctorImage(selectedDoctor.image)} 
                  alt={`Dr. ${selectedDoctor.nom} ${selectedDoctor.prenom}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/doctors/default.jpg';
                  }}
                />
                <div className="doctor-info">
                  <h4>Dr. {selectedDoctor.nom} {selectedDoctor.prenom}</h4>
                  <p>{selectedDoctor.specialite}</p>
                </div>
              </div>
            )}
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
