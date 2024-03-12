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

     //dd($request->all());


    // Définir les règles de validation pour les champs fixes
    $request->validate([
        'prix' =>'required|numeric',
        'description' => 'required|string|max:500',
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


 
   // Partie pour le stockage des données dans la table proprieteoffre
   foreach ($request->all() as $key => $value) {
    // Vérifier si la clé commence par 'propriete_'
    if (strpos($key, 'propriete_') === 0) {
        // Extraire l'ID de la propriété de la clé
        $idPropriete = str_replace('propriete_', '', $key);

        // Insérer les données dans la table proprieteoffre
        DB::table('proprieteoffre')->insert([
            'idOffre' => $offreID,
            'idProprietePropre' => $idPropriete,
            'valeur' => $value,
        ]);
    }
   }
   return redirect()->route('success')->with('success', 'Votre formulaire a été enregistré avec succès !');
}




    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function show(Categorie $categorie)
    {
        // Récupérer toutes les offres avec leurs photos associées
        $offres = DB::table('offre')->get();
        
        $photosByOffreId = DB::table('photo')
            ->join('offre', 'photo.idOffre', '=', 'offre.id')
            ->select('offre.id as offre_id', 'photo.libelle')
            ->get()
            ->groupBy('offre_id');
    
        // Ajouter les chemins complets des photos associées à chaque offre
        foreach ($offres as $offre) {
            $offre->photos = $photosByOffreId[$offre->id] ?? [];
            
            foreach ($offre->photos as $photo) {
                $photo->chemin_photo = asset('public/photos/' . $photo->libelle);
            }
        }
    

        // Utiliser dd() pour afficher les données passées à la vue
        //dd($offres);
    
        // Passer les données à la vue
        return inertia('Welcome')
            ->with('offres', $offres);
    }
     /* Show the form for editing the specified resource.
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
