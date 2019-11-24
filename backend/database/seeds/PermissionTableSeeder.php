<?php

use Illuminate\Database\Seeder;
use App\models\Permission;

class PermissionTableSeeder extends Seeder
{

    public function run()
    {
        //DB::table('permission')->delete();

        // voyageur
        Permission::create(array(
            'nomModule' => 'voyage'));
        Permission::create(array(
            'nomModule' => 'agence'));
        Permission::create(array(
            'nomModule' => 'offreVoyage'));
        Permission::create(array(
            'nomModule' => 'modalite'));
        Permission::create(array(
            'nomModule' => 'commercial'));
        Permission::create(array(
            'nomModule' => 'accompagnateur'));
        Permission::create(array(
            'nomModule' => 'sousCategorie'));
        Permission::create(array(
            'nomModule' => 'categorie'));
        Permission::create(array(
            'nomModule' => 'voyageur'));
        Permission::create(array(
            'nomModule' => 'pays'));
        Permission::create(array(
            'nomModule' => 'option'));
        Permission::create(array(
            'nomModule' => 'depense'));
        Permission::create(array(
            'nomModule' => 'permission'));
        Permission::create(array(
            'nomModule' => 'ville'));
        Permission::create(array(
            'nomModule' => 'offreVoyageLimited'));
        Permission::create(array(
            'nomModule' => 'pgroupe'));
        Permission::create(array(
            'nomModule' => 'sgroupe'));
        Permission::create(array(
            'nomModule' => 'chauffeur'));
        Permission::create(array(
            'nomModule' => 'societe'));
        Permission::create(array(
            'nomModule' => 'vehicule'));
        Permission::create(array(
            'nomModule' => 'typeVehicule'));
        Permission::create(array(
            'nomModule' => 'marqueVehicule'));
        Permission::create(array(
            'nomModule' => 'facture'));
        Permission::create(array(
            'nomModule' => 'groupeConvention'));
        Permission::create(array(
            'nomModule' => 'hotel'));

    }
}
