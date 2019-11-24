<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSousCategorieTable extends Migration {

	public function up()
	{
		Schema::create('sous_categorie', function(Blueprint $table) {
			$table->increments('id');
			$table->string('nom');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('sous_categorie');
	}
}