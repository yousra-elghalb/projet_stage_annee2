<?php

use Illuminate\Database\Seeder;
use App\models\Pays;

class PaysTableSeeder extends Seeder {

	public function run()
	{
		//DB::table('pays')->delete();

		// maroc
		Pays::create(array(
				'nom' => 'maroc'
			));
	}
}