<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGroupeConventionTable extends Migration {

	public function up()
	{
		Schema::create('groupe_convention', function(Blueprint $table) {
			$table->bigIncrements('id');
			$table->enum('type', array('famille', 'societe'));
			$table->string('nom')->nullable();
			$table->string('raisonSociale')->nullable();
			$table->string('ice')->nullable();
			$table->string('responsable')->nullable();
			$table->string('tel', 20)->nullable();
			$table->string('adresse')->nullable();
			$table->integer('taille')->nullable();
			$table->float('reduction');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('groupe_convention');
	}
}