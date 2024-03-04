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
        'idTypeProduit' => $request->selectedProductType, // Ajoutez selectedProductType à la table offre
        'Iduser' => Auth::id(), // Utilisez 'Iduser' comme clé pour l'ID de l'utilisateur

    ]);

    $photoPath = $request->file('photo')->storeAs('public/photos', $request->file('photo')->getClientOriginalName());


    $photo = DB::table('photo')->insert([
        'libelle' => $photoPath,
        'idOffre' => $offreID,
    ]);

    // Insérer les données des propriétés propres dans la table "propriete_offres"
    if ($request->has('proprietePropresFiltrees')) {
        $proprietePropresFiltrees = $request->proprietePropresFiltrees;
    foreach ($proprietePropresFiltrees as $propriete) {
        DB::table('proprieteoffre')->insert([
            'idOffre' => $offreID,
            'idProprietePropre' => $propriete->id,
            'valeur' => $request[$propriete->libelle],
        ]);
    }
    return redirect()->route('categorie.index')->with('success_message', 'Votre ressource a été créée avec succès !');
}

    // Redirection ou réponse appropriée après l'enregistrement
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
