<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;





class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Récupérer toutes les catégories et types produits
        $categorie = DB::table('categorie')->get();
        $typeproduit = DB::table('typeproduit')->get();
        $offre = DB::table('offre')->get();
        $proprietepropre = DB::table('proprietepropre')->get();
        $ligneproprietepropre = DB::table('ligneproprietepropre')->get();
        $colonnesOffre = DB::getSchemaBuilder()->getColumnListing('offre'); // Récupérer la liste des colonnes de la table offre
        
        
     

        return Inertia::render('Categorie')
        // Passer les données récupérées à la vue
        ->with('categorie', $categorie)
        ->with('typeproduit', $typeproduit)
        ->with('offre', $offre)
        ->with('colonnesOffre', $colonnesOffre)
        ->with('ligneproprietepropre', $ligneproprietepropre)
        ->with('proprietepropre', $proprietepropre);

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */



    public function store(Request $request)

{

    dd($request->all());

    // Afficher un champ spécifique du formulaire
    dd($request->input('nom'));

    // Afficher les fichiers téléchargés
    dd($request->files->all());

    // Définir les règles de validation pour les champs fixes
    $request->validate([
        'prix' =>'required|numeric',
        'description' => 'required|string|max:100',
        'date' => 'required|date',
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
       
    ]);

    // Insérer les données de l'offre dans la table "offres" et recipère l'ID 
    $offreID = DB::table('offre')->insertGetId([
        'prix' => $request->prix,
        'description' => $request->description,
        'Date de disponibilité' => $request->date,
        'date' => now(),
        'idTypeProduit' => $request->Typeproduit, // Ajoutez selectedProductType à la table offre
        'Iduser' => Auth::id(), // Utilisez 'Iduser' comme clé pour l'ID de l'utilisateur

    ]);

    // iniqid = identifiant unique basé sur la date et l'heure actuelles
    
    $photoName = uniqid() . '_' . $request->file('photo')->getClientOriginalName();
    $photoPath = $request->file('photo')->storeAs('public/photos', $photoName);


    $photo = DB::table('photo')->insert([
        'libelle' => $photoPath,
        'idOffre' => $offreID,
    ]);

     // Vérifie si les données du formulaire contiennent une propriété spécifique
if ($request->has('{propriete.libelle}')) {
          
    // Initialise un tableau pour stocker les données à insérer
    $insertData = [];
    
    // Récupérer les propriétés propres à partir de la requête
    $proprietes = $request->input('propriete.libelle');
    
    // Parcours des propriétés propres pour les traiter une par une
    foreach ($proprietes as $libelle) {
        // Stocke les données à insérer dans le tableau $insertData
        $insertData[] = [
            'idOffre' => $offreID, // Remplacez $offreID par l'ID approprié de l'offre
            'idProprietePropre' => $libelle['id'], // Assurez-vous que 'id' est le nom correct du champ ID dans votre modèle de propriété propre
            'valeur' => $request[$libelle['libelle']]
        ];
    }

    // Insérer les données dans la table proprieteoffre
    DB::table('proprieteoffre')->insert($insertData);
}
  // Après avoir traité les données, vous pouvez rediriger l'utilisateur vers une autre page par exemple
  return redirect()->route('categorie.index');
}


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function show(Categorie $categorie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function edit(Categorie $categorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Categorie $categorie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categorie $categorie)
    {
        //
    }
}
