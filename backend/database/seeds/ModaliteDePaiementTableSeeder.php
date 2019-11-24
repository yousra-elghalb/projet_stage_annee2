<?php

use Illuminate\Database\Seeder;
use App\models\ModaliteDePaiement;

class ModaliteDePaiementTableSeeder extends Seeder
{

    public function run()
    {
        //DB::table('modaliteDePaiement')->delete();

        // virement
        ModaliteDePaiement::create(array(
            'nom' => 'virement'
        ));

        // espèce
        ModaliteDePaiement::create(array(
            'nom' => 'espèce'
        ));
    }
}
