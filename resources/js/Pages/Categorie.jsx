import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Poster(props) {
    const { categorie, typeproduit } = props; 

    // State pour stocker la catégorie sélectionnée
    const [selectedCategory, setSelectedCategory] = useState('');
    
    // State pour stocker le type de produit sélectionné
    const [selectedProductType, setSelectedProductType] = useState('');

    // Fonction pour gérer le changement de catégorie
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Fonction pour gérer le changement de type de produit
    const handleProductTypeChange = (event) => {
        setSelectedProductType(event.target.value);
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Choisir</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">Choisir une catégorie :</h3>
                            <select
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleCategoryChange}
                                value={selectedCategory}
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {categorie.map(categorie => (
                                    <option key={categorie.id} value={categorie.id}>{categorie.libelle}</option>
                                ))}
                            </select>
                            {selectedCategory && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold mb-4">Choisir un type de produit :</h3>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={handleProductTypeChange}
                                        value={selectedProductType}
                                    >
                                        <option value="">Sélectionner un type de produit</option>
                                        {/* Lister les produits + ternaire qui vérifie qu'il s'agit bien de l'id de selectedCategiry */}
                                        {typeproduit.map(produit => (
                                            produit.idCategorie === parseInt(selectedCategory) ? (
                                            <option key={produit.id} value={produit.libelle}>{produit.libelle}</option> ) : null
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="mt-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    style={{ marginBottom: '20px' }}
                                >
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}