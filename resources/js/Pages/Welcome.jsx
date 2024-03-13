import React from 'react';
import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import '../../css/styles.css';




const Produit = ({ offres }) => {
    return (
        <div className="produit-container">
            {offres.map((offre) => (
                <div key={offre.id} className="produit-card">
                    <div className="produit-photo">
                        {offre.photos && offre.photos.map((photo, index) => (
                            <img key={index} src={photo.chemin} alt={`Photo ${index}`} />
                        ))}
                    </div>
                    <div className="produit-details">
                        <h2 className="produit-description">{offre.Description}</h2>
                        <p className="produit-prix">{offre.Prix} €</p>
                        <p className="produit-date">Date de disponibilité: {offre['Date de disponibilité']}</p>
                         {/* Parcourir offre.proprietePropre qui contient le libelle de proprietepropre et la valeur de proprieteoffre*/}
                        {offre.proprietePropres && offre.proprietePropres.map((propriete, index) => (
                            <p key={index}><strong>{propriete.libelle}:</strong> {propriete.valeur}</p>
                        ))}
                        <button className="commander-btn">Commander</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />

            {/* Menu en haut */}
            <header className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {/* Logo ou titre du site */}
                                <ApplicationLogo />
                            </div>
                        </div>
                        <div className="hidden md:block">
                            {/* Liens de navigation */}
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    href={route('dashboard')}
                                    className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Mon Compte
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Se connecter
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Contenu de la page */}
            <div className="min-h-screen bg-dots-darker bg-center bg-white selection:bg-red-500 selection:text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-3xl font-bold text-center mb-8">Tous les produits</h1>

                    
                    <Produit offres={props.offres}  />
                    
                    
                </div>
            </div>

            {/* Pied de page */}
            <footer className="bg-white border-t border-gray-100 dark:bg-gray-800 dark:border-gray-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">Made with love &#10084;</p>
                </div>
            </footer>
        </>
    );
}