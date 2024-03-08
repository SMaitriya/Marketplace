import React from 'react';
import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';


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
                                    Accueil
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
            <div className="min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Contenu de la page (votre contenu de produits) */}
                    <div className="text-center text-6xl text-gray-500 dark:text-blue-400">
                        {/* Vous pouvez remplacer cette section par le code qui affiche vos produits */}
                        FIN DE DECHETS
                    </div>
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
