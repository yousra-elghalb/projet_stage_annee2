<?php

use Illuminate\Database\Seeder;
use App\models\Categorie;

class CategorieTableSeeder extends Seeder
{

    public function run()
    {
        //DB::table('categorie')->delete();

        // national
        Categorie::create(array(
            'nom' => 'national'
        ));

        // international
        Categorie::create(array(
            'nom' => 'international'
        ));
    }
}
