<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;




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
        

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
