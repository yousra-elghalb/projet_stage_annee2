<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateChauffeurTable extends Migration {

	public function up()
	{
		Schema::create('chauffeur', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('nom');
			$table->string('prenom');
			$table->string('tel', 20);
			$table->string('email', 50);
			$table->string('cin', 20);
		});
	}

	public function down()
	{
		Schema::drop('chauffeur');
	}
}