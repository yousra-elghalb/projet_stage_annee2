<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMarqueVehiculeTable extends Migration {

	public function up()
	{
		Schema::create('marque_vehicule', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('nom');
		});
	}

	public function down()
	{
		Schema::drop('marque_vehicule');
	}
}