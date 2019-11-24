<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTypeVehiculeTable extends Migration {

	public function up()
	{
		Schema::create('type_vehicule', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('nom');
		});
	}

	public function down()
	{
		Schema::drop('type_vehicule');
	}
}