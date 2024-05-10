import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';



export function Formulaire({ colonnes, proprietepropre, ligneproprietepropre, selectedProductType }) {


    const { data, setData, post, processing, reset, errors} = useForm({
        prix : '',
        description : '',
        date: '',
        Typeproduit: selectedProductType,


        


    });

        // L'effet est déclenché chaque fois que la valeur de selectedProductType change

    useEffect(() => {
        setData('Typeproduit', selectedProductType);
    }, [selectedProductType]
    );



    



    // Envoyer les données data recueilli au controller laravel
    const submitForm =  (e) => {
        e.preventDefault();
        post(route('categorie.store'), data)
        .then(() => {
            reset();
        })
    } ;



    // Index des colonnes pour la vue
    const prix = 4;
    const description = 3;
    const dispo = 5;

    

   // Filtrer les lignes de la table ligneproprietepropre pour obtenir celles qui correspondent à un certain critère (creation nouveau tableau)
const lignesFiltrees = ligneproprietepropre.filter(ligne => ligne.idTypeProduit === parseInt(selectedProductType));



// Filtrer les propriétés propres en fonction des lignes filtrées / some est un boolen
const proprietePropresFiltrees = proprietepropre.filter(prop => lignesFiltrees.some(ligne => ligne.idProprietePropre === prop.id));



 // Affichage du formulaire avec les propriétés propres filtrées
 return (
     <div className="bg-white p-6 rounded shadow border border-blue-500">
         <h2 className="text-blue-500 text-5xl font-bold mb-4 text-center">Publication</h2>
         <form onSubmit={submitForm}>
      

         {/* Si il s'agit du produit "sols"*/}
         <div>

             {parseInt(selectedProductType) === 5 && (
                <>
                {/* On affiche sur le champs de l'index 1 une description et pas dans l'autre*/}
               {proprietePropresFiltrees.map((propriete, index) => (
                    <div key={propriete.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">{index === 1 ? `${propriete.libelle} (Lino, Moquette ou Parquets)` : propriete.libelle} :</label>
                        <input
                            type="text"
                            name={`propriete_${propriete.id}`} 
                            value={data[`propriete_${propriete.id}`]} 
                            onChange={(e) => setData(`propriete_${propriete.id}`, e.target.value)} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={propriete.libelle}
                        />
                    </div>
                ))}
            </>
        
        )}

         {/* Si il s'agit du produit "feuille de décor"*/}
         {parseInt(selectedProductType) === 3 && (
    <>
        {/* On affiche sur le champ de l'index 3 une description différente */}
        {proprietePropresFiltrees.map((propriete, index) => (
            <div key={propriete.id}>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                    {index === 3 ? (
                        <span>
                            {propriete.libelle} 
                            <span style={{ fontStyle: 'italic' }}> (Toilé + peinture, Papier-peint, Béton, Fausses briques en polystyrène)</span>
                        </span>
                    ) : (
                        propriete.libelle
                    )}
                    :
                </label>
                <input
                    type="text"
                    name={`propriete_${propriete.id}`} 
                    value={data[`propriete_${propriete.id}`]} 
                    onChange={(e) => setData(`propriete_${propriete.id}`, e.target.value)} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={propriete.libelle}
                />
            </div>
             
        ))}
       

    </>
   
)}



            {/* Si le tableau propretePropreFIltree a un element et si cela ne s'agit pas de l'id 5 qui est "sols"*/}
            {proprietePropresFiltrees.length > 0 && parseInt(selectedProductType)  !== 5 && parseInt(selectedProductType)  !== 3 &&(
                <>
                    {proprietePropresFiltrees.map(propriete => (
                        <div key={propriete.id}>
                            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">{propriete.libelle} :</label>          
                            <input
                                type="text"
                                name={`propriete_${propriete.id}`} 
                                value={data[`propriete_${propriete.id}`]} 
                                onChange={(e) => setData(`propriete_${propriete.id}`, e.target.value)} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={propriete.libelle}
                            />
                             
                        </div>
                    ))}
                </>
            )}
               
               <div className="mb-4 mt-4">
                    <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">
                        Photo :
                    </label>
                    <input
        type="file"
        name="photo"
        onChange={(e) => setData('photo', e.target.files[0])} // Utilisez e.target.files pour obtenir les fichiers sélectionnés
        accept="image/*"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
   
</div>
    
                {/* Champ pour le prix */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">{colonnes[prix]} :</label>
                    <input
                        type="number"
                        name="prix"
                        value= {data.prix}
                        onChange={(e) => setData('prix', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={colonnes[prix]}
                    />
                </div>
    
                {/* Champ pour la description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">{colonnes[description]} :</label>
                    <textarea
                        value= {data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        name="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={colonnes[description]}
                    ></textarea>
                </div>
    
                {/* Champ pour la disponibilité */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">{colonnes[dispo]} :</label>
                    <input
                        type="date"
                        name="date"
                        value= {data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={colonnes[dispo]}
                    />
                </div>
    
                {/* Bouton Soumettre */}
                <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
>
    Soumettre
</button>
</div>
</form>
</div>


)};
export default function Poster(props) {
    const { categorie, typeproduit, colonnesOffre, ligneproprietepropre, proprietepropre } = props;

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProductType, setSelectedProductType] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

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
                                        {typeproduit.map(produit => (
                                            produit.idCategorie === parseInt(selectedCategory) ? (
                                                <option key={produit.id} value={produit.id}>{produit.libelle}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-2 border-white-800" />
            {selectedProductType && (
                <div className="max-w-md mx-auto">
<Formulaire colonnes={colonnesOffre} proprietepropre={proprietepropre} ligneproprietepropre={ligneproprietepropre} selectedProductType={selectedProductType}  />
                </div>
            )}
<div className="mt-6 bg-gray-400 h-10"></div>
            <div className="mt-10 text-center">Made with love &#10084;</div>
        </AuthenticatedLayout>

      

    );
   
}