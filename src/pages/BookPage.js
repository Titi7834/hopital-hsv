import React from "react";
import NavBar from "../NavBar";
import AppointmentForm from "../components/AppointmentForm";
import './BookPage.css';

const BookPage = () => {
    return (
        <div className="book-page">
            <NavBar />
            <div className="container">
                <h2>Réserver un rendez-vous</h2>
                <p>Utilisez le formulaire ci-dessous pour prendre rendez-vous avec l'un de nos médecins.</p>
                <AppointmentForm />
            </div>
        </div>
    );
}

export default BookPage;