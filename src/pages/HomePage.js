import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Phone, Calendar, Search, User, Menu, X, ChevronRight, ChevronDown, Heart, ArrowRight } from 'lucide-react';
import './HomePage.css';
import NavBar from '../NavBar';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    navigate('/book');
  };

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="nav">
        <div className="navContent">
          <div className="logo">Hôpital HSV</div>
          {/* Mobile menu button */}
          <div className="menuButton md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* Desktop Navigation */}
          <NavBar />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="heroContent">
          <div className="heroText">
            <h1 className="heroTitle">Votre santé est notre priorité</h1>
            <p className="heroDescription">
              L'Hôpital HSV est dédié à fournir des soins de santé exceptionnels avec compassion et expertise. Notre équipe de professionnels qualifiés est là pour vous accompagner.
            </p>
          </div>
          <div className="heroImage">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.4582864243516!2d2.268027676171527!3d49.00186559059939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e667ea03fff2e5%3A0x1178243bf7fa1007!2sH%C3%B4pital%20Simone%20Veil!5e0!3m2!1sfr!2sfr!4v1747822703382!5m2!1sfr!2sfr" width="648" height="300" allowFullScreen={true}></iframe>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services">
        <div className="textCenter">
          <h2 className="sectionTitle">Nos services médicaux</h2>
          <p className="sectionDescription">Des soins complets adaptés à tous vos besoins de santé</p>
        </div>
        <div className="gridContainer">
          {[
            { icon: <Heart size={32} className="serviceIcon" />, title: "Cardiologie", desc: "Soins spécialisés pour la santé de votre cœur par nos cardiologues experts." },
            { icon: <User size={32} className="serviceIcon" />, title: "Pédiatrie", desc: "Soins attentionnés et adaptés pour la santé de vos enfants." },
            { icon: <Heart size={32} className="serviceIcon" />, title: "Neurologie", desc: "Traitement avancé des troubles du système nerveux." },
            { icon: <User size={32} className="serviceIcon" />, title: "Urgences", desc: "Soins d'urgence disponibles 24h/24 et 7j/7." }
          ].map((service, index) => (
            <div key={index} className="serviceCard">
              <div>{service.icon}</div>
              <h3 className="serviceTitle">{service.title}</h3>
              <p className="serviceDescription">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq">
        <div className="faqContainer">
          <div className="textCenter">
            <h2 className="sectionTitle">Questions fréquentes</h2>
            <p className="sectionDescription">Réponses aux questions les plus courantes</p>
          </div>
          {[
            { question: "Comment prendre rendez-vous?", answer: "Vous pouvez prendre rendez-vous en ligne via notre portail patient, par téléphone au 01 23 45 67 89, ou directement à l'accueil de l'hôpital." },
            { question: "Quels documents apporter lors de ma visite?", answer: "Veuillez apporter votre pièce d'identité, votre carte vitale, votre attestation de mutuelle, ainsi que tous documents médicaux pertinents." },
            { question: "Comment accéder à mon dossier médical?", answer: "Vous pouvez accéder à votre dossier médical via notre portail patient sécurisé ou en faire la demande écrite auprès de notre service des archives médicales." },
            { question: "Quelle est la politique de visite?", answer: "Les visites sont autorisées de 14h à 20h tous les jours. Les modalités peuvent varier selon les services." }
          ].map((faq, index) => (
            <div key={index} className="faqItem">
              <button className="faqQuestion">
                {faq.question}
                <ChevronDown size={20} className="faqIcon" />
              </button>
              <div className="faqAnswer">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footerGrid">
          <div>
            <div className="footerLogo">Hôpital HSV</div>
            <div className="footerDescription">Votre santé, notre priorité depuis plus de 30 ans.</div>
          </div>
          <div>
            <div className="columnTitle">Nos services</div>
            <ul className="footerList">
              <li className="footerListItem"><a className="footerLink">Cardiologie</a></li>
              <li className="footerListItem"><a className="footerLink">Neurologie</a></li>
              <li className="footerListItem"><a className="footerLink">Pédiatrie</a></li>
              <li className="footerListItem"><a className="footerLink">Urgences</a></li>
            </ul>
          </div>
          <div>
            <div className="columnTitle">Contact</div>
            <div className="contactItem">
              <MapPin size={20} className="contactIcon" />
              <span className="contactText">14 Rue de Saint-Prix<br />95600 Eaubonne France</span>
            </div>
            <div className="contactItem">
              <Phone size={20} className="contactIcon" />
              <span className="contactText">01 23 45 67 89</span>
            </div>
            <div className="contactItem">
              <ArrowRight size={20} className="contactIcon" />
              <span className="contactText">contact@hopital-hsv.fr</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}