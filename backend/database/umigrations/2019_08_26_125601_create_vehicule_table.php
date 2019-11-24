<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeTable extends Migration {

	public function up()
	{
		Schema::create('vehicule', function(Blueprint $table) {
			$table->increments('id');
			$table->string('immatriculation')->nullable();
			$table->integer('place');
			$table->date('date_ex_assurance');
			$table->integer('type_vehicule_id')->unsigned();
			$table->timestamps();
			$table->integer('marque_vehicule_id')->unsigned();
			$table->integer('societe_id')->unsigned()->nullable();
		});
	}

	public function down()
	{
		Schema::drop('vehicule');
	}
}