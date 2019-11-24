<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAccompagneurOffreVoyageTable extends Migration {

	public function up()
	{
		Schema::create('accompagneur_offreVoyage', function(Blueprint $table) {
			$table->bigIncrements('id');
			$table->timestamps();
			$table->bigInteger('offre_voyage_id')->unsigned();
			$table->integer('accompagneur_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('accompagneur_offreVoyage');
	}
}
