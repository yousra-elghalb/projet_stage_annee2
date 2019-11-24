<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', "APIControllers\UserController@login");
Route::post('/downloadPieceJoint', "APIControllers\ImagesController@downloadPieceJoint");
Route::get('/logout', "APIControllers\UserController@logout");

Route::get('/test', "APIControllers\AgenceController@findAll");

Route::group(['middleware' => ['auth.jwt']], function () {

    //les ressources du model voyage
    Route::get('/voyage', "APIControllers\VoyageController@findAll")
        ->middleware('permission:voyage,read');
    Route::get('/voyage/{id}', "APIControllers\VoyageController@findById")
        ->middleware('permission:voyage,read');
    Route::get('/voyage/{id}/voyageurs', "APIControllers\VoyageController@findAllVoyageurs")
        ->middleware('permission:voyage,read');
    Route::post('/voyage/{id}/voyageur', "APIControllers\VoyageController@saveVoyageur")
        ->middleware('permission:voyage,edit');
    Route::delete('/voyage/{id}', "APIControllers\VoyageController@delete")
        ->middleware('permission:voyage,delete');
    Route::post('/voyage', "APIControllers\VoyageController@save")
        ->middleware('permission:voyage,edit');
    Route::put('/voyage', "APIControllers\VoyageController@update")
        ->middleware('permission:voyage,edit');


//les ressources du model agence
    Route::get('/agence', "APIControllers\AgenceController@findAll")
        ->middleware('permission:agence,read');
    Route::get('/agence/{id}', "APIControllers\AgenceController@findById")
        ->middleware('permission:agence,read');
    Route::delete('/agence/{id}', "APIControllers\AgenceController@delete")
        ->middleware('permission:agence,delete');
    Route::post('/agence', "APIControllers\AgenceController@save")
        ->middleware('permission:agence,edit');
    Route::put('/agence', "APIControllers\AgenceController@update")
        ->middleware('permission:agence,edit');


    //les ressources du model SGroupe : le groupe d'un offre de voyage (date de depart d'un voyage)
    Route::get('/offreVoyage/{id}/groupe', "APIControllers\SGroupeController@findGroupeByOffreVoyageId")
        ->middleware('permission:sgroupe,read');
    Route::get('/offreVoyage/groupe/{id}', "APIControllers\SGroupeController@findById")
        ->middleware('permission:sgroupe,read');
    Route::post('/offreVoyage/groupe', "APIControllers\SGroupeController@save")
        ->middleware('permission:sgroupe,edit');
    Route::put('/offreVoyage/groupe', "APIControllers\SGroupeController@update")
        ->middleware(['commercial:sgroupe', 'permission:sgroupe,edit']);
    Route::delete('/offreVoyage/groupe/{id}', "APIControllers\SGroupeController@delete")
        ->middleware(['commercial:sgroupe', 'permission:sgroupe,delete']);

    Route::post('/facture', "APIControllers\FactureController@save")
        ->middleware(['permission:facture,edit']);

    //les ressources du model PGroupe : Les Voyageurs d'un offre de voyage (date de depart d'un voyage)
    Route::get('/offreVoyage/{id}/voyageurs', "APIControllers\PGroupeController@findAllByOffreVoyageId")
        ->middleware('permission:pgroupe,read');
    Route::get('/offreVoyage/voyageurs/{id}', "APIControllers\PGroupeController@findById")
        ->middleware('permission:pgroupe,read');
    Route::delete('/offreVoyage/voyageurs/{id}', "APIControllers\PGroupeController@delete")
        ->middleware(['commercial:pgroupe', 'permission:pgroupe,delete']);
    Route::post('/offreVoyage/voyageurs', "APIControllers\PGroupeController@save")
        ->middleware('permission:pgroupe,edit');
    Route::put('/offreVoyage/voyageurs', "APIControllers\PGroupeController@update")
        ->middleware(['commercial:pgroupe', 'permission:pgroupe,edit']);

    //les ressources du model OffreVoyage
    Route::get('/offreVoyage', "APIControllers\OffreVoyageController@findAll")
        ->middleware('permission:offreVoyage,read');

    Route::get('/offreVoyage/{id}', "APIControllers\OffreVoyageController@findById")
        ->middleware('permission:offreVoyage,read');

    Route::get('/commercial/{id}/offreVoyage', "APIControllers\OffreVoyageController@findAllByCommercialId")
        ->middleware(['commercial:commercialExterneOffreVoyage']);

    Route::get('/commercial/{id}/offreVoyage/{idO}', "APIControllers\OffreVoyageController@findByIdByCommercialId")
        ->middleware(['commercial:commercialExterneOffreVoyage']);

    Route::delete('/offreVoyage/{id}', "APIControllers\OffreVoyageController@delete")
        ->middleware('permission:offreVoyage,delete');
    Route::post('/offreVoyage', "APIControllers\OffreVoyageController@save")
        ->middleware('permission:offreVoyage,edit');
    Route::put('/offreVoyage', "APIControllers\OffreVoyageController@update")
        ->middleware('permission:offreVoyage,edit');

//les ressources du model ModaliteDePaiement
    Route::get('/modalite', "APIControllers\ModaliteDePaiementController@findAll")
        ->middleware('permission:modalite,read');
    Route::get('/modalite/{id}', "APIControllers\ModaliteDePaiementController@findById")
        ->middleware('permission:modalite,read');
    Route::delete('/modalite/{id}', "APIControllers\ModaliteDePaiementController@delete")
        ->middleware('permission:modalite,delete');
    Route::post('/modalite', "APIControllers\ModaliteDePaiementController@save")
        ->middleware('permission:modalite,edit');
    Route::put('/modalite', "APIControllers\ModaliteDePaiementController@update")
        ->middleware('permission:modalite,edit');


    //les ressources du model OffreVoyageLimited
    Route::get('/offreVoyage/limited', "APIControllers\OffreVoyageLimitedController@findAll")
        ->middleware('permission:offreVoyageLimited,read');
    Route::get('/offreVoyage/limited/{id}', "APIControllers\OffreVoyageLimitedController@findById")
        ->middleware('permission:offreVoyageLimited,read');
    Route::get('/offreVoyage/{id}/limited/', "APIControllers\OffreVoyageLimitedController@findAllByOffreVoyageId")
        ->middleware('permission:offreVoyageLimited,read');
    Route::delete('/offreVoyage/limited/{id}', "APIControllers\OffreVoyageLimitedController@delete")
        ->middleware('permission:offreVoyageLimited,delete');
    Route::post('/offreVoyage/limited', "APIControllers\OffreVoyageLimitedController@save")
        ->middleware('permission:offreVoyageLimited,edit');
    Route::put('/offreVoyage/limited', "APIControllers\OffreVoyageLimitedController@update")
        ->middleware('permission:offreVoyageLimited,edit');


//les ressources du model Commercial
    Route::get('/commercial', "APIControllers\CommercialController@findAll")
        ->middleware('permission:commercial,read');
    Route::get('/commercial/externe', "APIControllers\CommercialController@findAllCommerciauxExterne")
        ->middleware('permission:commercial,read');
    Route::get('/commercial/{id}', "APIControllers\CommercialController@findById")
        ->middleware('permission:commercial,read');
    Route::get('/commercial/{id}/voyageurs', "APIControllers\CommercialController@findAllVoyageur")
        ->middleware('permission:commercial,read');
    Route::delete('/commercial/{id}', "APIControllers\CommercialController@delete")
        ->middleware('permission:commercial,delete');
    Route::post('/commercial', "APIControllers\CommercialController@save")
        ->middleware('permission:commercial,edit');
    Route::put('/commercial', "APIControllers\CommercialController@update")
        ->middleware('permission:commercial,edit');
    Route::put('/commercial/profile', "APIControllers\CommercialController@updateProfile")
        ->middleware('commercial:profile');
    Route::put('/commercial/changePassword', "APIControllers\UserController@changePassword");


//les ressources du model Accompagnateur
    Route::get('/accompagnateur', "APIControllers\AccompagneurController@findAll")
        ->middleware('permission:accompagnateur,read');
    Route::get('/accompagnateur/{id}', "APIControllers\AccompagneurController@findById")
        ->middleware('permission:accompagnateur,read');
    Route::delete('/accompagnateur/{id}', "APIControllers\AccompagneurController@delete")
        ->middleware('permission:accompagnateur,delete');
    Route::post('/accompagnateur', "APIControllers\AccompagneurController@save")
        ->middleware('permission:accompagnateur,edit');
    Route::put('/accompagnateur', "APIControllers\AccompagneurController@update")
        ->middleware('permission:accompagnateur,edit');


//les ressources du model Role
    Route::get('/role', "APIControllers\RoleController@findAll")
        ->middleware('permission:role,read');
    /*    Route::get('/role/{id}', "APIControllers\RoleController@findById")
            ->middleware('permission:role,read');*/
    Route::delete('/role/{id}', "APIControllers\RoleController@delete")
        ->middleware('permission:role,delete');
    Route::post('/role', "APIControllers\RoleController@save")
        ->middleware('permission:role,edit');
    Route::put('/role', "APIControllers\RoleController@update")
        ->middleware('permission:role,edit');

//les ressources du model SousCategorie
    Route::get('/sousCategorie', "APIControllers\SousCategorieController@findAll")
        ->middleware('permission:sousCategorie,read');
    Route::get('/sousCategorie/{id}', "APIControllers\SousCategorieController@findById")
        ->middleware('permission:sousCategorie,read');
    Route::delete('/sousCategorie/{id}', "APIControllers\SousCategorieController@delete")
        ->middleware('permission:sousCategorie,delete');
    Route::post('/sousCategorie', "APIControllers\SousCategorieController@save")
        ->middleware('permission:sousCategorie,edit');
    Route::put('/sousCategorie', "APIControllers\SousCategorieController@update")
        ->middleware('permission:sousCategorie,edit');


//les ressources du model Categorie
    Route::get('/categorie', "APIControllers\CategorieController@findAll");
    Route::get('/categorie/{id}', "APIControllers\CategorieController@findById")
        ->middleware('permission:categorie,read');
    Route::get('/categorie/{id}/voyages', "APIControllers\CategorieController@findAllVoyages")
        ->middleware('permission:categorie,read');
    Route::delete('/categorie/{id}', "APIControllers\CategorieController@delete")
        ->middleware('permission:categorie,delete');
    Route::post('/categorie', "APIControllers\CategorieController@save")
        ->middleware('permission:categorie,edit');
    Route::put('/categorie', "APIControllers\CategorieController@update")
        ->middleware('permission:categorie,edit');


//les ressources du model Voyageur
    Route::get('/voyageur', "APIControllers\VoyageurController@findAll")
        ->middleware('permission:voyageur,read');
    Route::get('/voyageur/{id}', "APIControllers\VoyageurController@findById")
        ->middleware('permission:voyageur,read');
    Route::get('/voyageur/cin/{cin}', "APIControllers\VoyageurController@findByCin")
        ->middleware('permission:voyageur,read');
    Route::get('/voyageur/{id}/voyages', "APIControllers\VoyageurController@findAllVoyages")
        ->middleware('permission:voyageur,read');
    Route::delete('/voyageur/{id}', "APIControllers\VoyageurController@delete")
        ->middleware('permission:voyageur,delete');
    Route::post('/voyageur', "APIControllers\VoyageurController@save")
        ->middleware('permission:voyageur,edit');
    Route::put('/voyageur', "APIControllers\VoyageurController@update")
        ->middleware('permission:voyageur,edit');

    /*
    //les ressources du model Paiement
        Route::get('/paiement', "APIControllers\PaiementController@findAll")
            ->middleware('permission:paiement,read');
        Route::get('/paiement/{id}', "APIControllers\PaiementController@findById")
            ->middleware('permission:paiement,read');
        Route::get('/paiement/{id}/traites', "APIControllers\PaiementController@findAllTraites")
            ->middleware('permission:paiement,read');
        Route::delete('/paiement/{id}', "APIControllers\PaiementController@delete")
            ->middleware('permission:paiement,delete');
        Route::post('/paiement', "APIControllers\PaiementController@save")
            ->middleware('permission:paiement,edit');
        Route::put('/paiement', "APIControllers\PaiementController@update")
            ->middleware('permission:paiement,edit');*/


    /*//les ressources du model Traite
        Route::get('/traite', "APIControllers\TraiteController@findAll")
            ->middleware('permission:traite,read');
        Route::get('/traite/{id}', "APIControllers\TraiteController@findById")
            ->middleware('permission:traite,read');
        Route::delete('/traite/{id}', "APIControllers\TraiteController@delete")
            ->middleware('permission:traite,delete');
        Route::post('/traite', "APIControllers\TraiteController@save")
            ->middleware('permission:traite,edit');
        Route::put('/traite', "APIControllers\TraiteController@update")
            ->middleware('permission:traite,edit');*/


//les ressources du model Pays
    Route::get('/pays', "APIControllers\PaysController@findAll")
        ->middleware('permission:pays,read');
    Route::get('/pays/{id}', "APIControllers\PaysController@findById")
        ->middleware('permission:pays,read');
    Route::delete('/pays/{id}', "APIControllers\PaysController@delete")
        ->middleware('permission:pays,delete');
    Route::post('/pays', "APIControllers\PaysController@save")
        ->middleware('permission:pays,edit');
    Route::put('/pays', "APIControllers\PaysController@update")
        ->middleware('permission:pays,edit');

    //les ressources du model Option
    Route::get('/option', "APIControllers\OptionController@findAll")
        ->middleware('permission:option,read');
    Route::get('/option/{id}', "APIControllers\OptionController@findById")
        ->middleware('permission:option,read');
    Route::delete('/option/{id}', "APIControllers\OptionController@delete")
        ->middleware('permission:option,delete');
    Route::post('/option', "APIControllers\OptionController@save")
        ->middleware('permission:option,edit');
    Route::put('/option', "APIControllers\OptionController@update")
        ->middleware('permission:option,edit');

    //les ressources du model Depense
    Route::get('/depense', "APIControllers\DepenseController@findAll")
        ->middleware('permission:depense,read');
    Route::get('/depense/{id}', "APIControllers\DepenseController@findById")
        ->middleware('permission:depense,read');
    Route::delete('/depense/{id}', "APIControllers\DepenseController@delete")
        ->middleware('permission:depense,delete');
    Route::post('/depense', "APIControllers\DepenseController@save")
        ->middleware('permission:depense,edit');
    Route::put('/depense', "APIControllers\DepenseController@update")
        ->middleware('permission:depense,edit');


//les ressources du model Permission
    Route::get('/permission', "APIControllers\PermissionController@findAll")/*->middleware('permission:permission,read')*/
    ;
    Route::get('/permission/{id}', "APIControllers\PermissionController@findById")/*->middleware('permission:permission,read')*/
    ;


//les ressources du model Ville
    Route::middleware('permission:ville,read')->get('/ville', "APIControllers\VilleController@findAll")
        ->middleware('permission:ville,read');
    Route::get('/ville/{id}', "APIControllers\VilleController@findById")
        ->middleware('permission:ville,read');
    Route::delete('/ville/{id}', "APIControllers\VilleController@delete")
        ->middleware('permission:ville,delete');

    Route::post('/ville', "APIControllers\VilleController@save")
        ->middleware('permission:ville,edit');

    Route::put('/ville', "APIControllers\VilleController@update")
        ->middleware('permission:ville,edit');

//les ressources du model Chauffeur
    Route::get('/chauffeur', "APIControllers\ChauffeurController@findAll")
        ->middleware('permission:chauffeur,read');
    Route::get('/chauffeur/{id}', "APIControllers\ChauffeurController@findById")
        ->middleware('permission:chauffeur,read');
    Route::delete('/chauffeur/{id}', "APIControllers\ChauffeurController@delete")
        ->middleware('permission:chauffeur,delete');
    Route::post('/chauffeur', "APIControllers\ChauffeurController@save")
        ->middleware('permission:chauffeur,edit');
    Route::put('/chauffeur', "APIControllers\ChauffeurController@update")
        ->middleware('permission:chauffeur,edit');


    //les ressources du model Societe
    Route::get('/societe', "APIControllers\SocieteController@findAll")
        ->middleware('permission:societe,read');
    Route::get('/societe/{id}', "APIControllers\SocieteController@findById")
        ->middleware('permission:societe,read');
    Route::delete('/societe/{id}', "APIControllers\SocieteController@delete")
        ->middleware('permission:societe,delete');
    Route::post('/societe', "APIControllers\SocieteController@save")
        ->middleware('permission:societe,edit');
    Route::put('/societe', "APIControllers\SocieteController@update")
        ->middleware('permission:societe,edit');
    //les ressources du model Vehicule
    Route::get('/vehicule', "APIControllers\VehiculeController@findAll")
        ->middleware('permission:vehicule,read');
    Route::get('/vehicule/{id}', "APIControllers\VehiculeController@findById")
        ->middleware('permission:vehicule,read');
    Route::delete('/vehicule/{id}', "APIControllers\VehiculeController@delete")
        ->middleware('permission:vehicule,delete');
    Route::post('/vehicule', "APIControllers\VehiculeController@save")
        ->middleware('permission:vehicule,edit');
    Route::put('/vehicule', "APIControllers\VehiculeController@update")
        ->middleware('permission:vehicule,edit');

    //les ressources du model TypeVehicule
    Route::get('/typeVehicule', "APIControllers\TypeVehiculeController@findAll")
        ->middleware('permission:typeVehicule,read');
    Route::get('/typeVehicule/{id}', "APIControllers\TypeVehiculeController@findById")
        ->middleware('permission:typeVehicule,read');
    Route::delete('/typeVehicule/{id}', "APIControllers\TypeVehiculeController@delete")
        ->middleware('permission:typeVehicule,delete');
    Route::post('/typeVehicule', "APIControllers\TypeVehiculeController@save")
        ->middleware('permission:typeVehicule,edit');
    Route::put('/typeVehicule', "APIControllers\TypeVehiculeController@update")
        ->middleware('permission:typeVehicule,edit');

    //les ressources du model MarqueVehicule
    Route::get('/marqueVehicule', "APIControllers\MarqueVehiculeController@findAll")
        ->middleware('permission:marqueVehicule,read');
    Route::get('/marqueVehicule/{id}', "APIControllers\MarqueVehiculeController@findById")
        ->middleware('permission:marqueVehicule,read');
    Route::delete('/marqueVehicule/{id}', "APIControllers\MarqueVehiculeController@delete")
        ->middleware('permission:marqueVehicule,delete');
    Route::post('/marqueVehicule', "APIControllers\MarqueVehiculeController@save")
        ->middleware('permission:marqueVehicule,edit');
    Route::put('/marqueVehicule', "APIControllers\MarqueVehiculeController@update")
        ->middleware('permission:marqueVehicule,edit');


    //les ressources du model GroupeConvention
    Route::get('/groupeConvention', "APIControllers\GroupeConventionController@findAll")
        ->middleware('permission:groupeConvention,read');
    Route::get('/groupeConvention/{id}', "APIControllers\GroupeConventionController@findById")
        ->middleware('permission:groupeConvention,read');
    Route::delete('/groupeConvention/{id}', "APIControllers\GroupeConventionController@delete")
        ->middleware('permission:groupeConvention,delete');
    Route::post('/groupeConvention', "APIControllers\GroupeConventionController@save")
        ->middleware('permission:groupeConvention,edit');
    Route::put('/groupeConvention', "APIControllers\GroupeConventionController@update")
        ->middleware('permission:groupeConvention,edit');

    //les ressources du model Hotel
    Route::get('/hotel', "APIControllers\HotelController@findAll")
        ->middleware('permission:hotel,read');
    Route::get('/hotel/{id}', "APIControllers\HotelController@findById")
        ->middleware('permission:hotel,read');
    Route::delete('/hotel/{id}', "APIControllers\HotelController@delete")
        ->middleware('permission:hotel,delete');
    Route::post('/hotel', "APIControllers\HotelController@save")
        ->middleware('permission:hotel,edit');
    Route::put('/hotel', "APIControllers\HotelController@update")
        ->middleware('permission:hotel,edit');


});
