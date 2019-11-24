<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCategorieSousCategoriesTable extends Migration {

	public function up()
	{
		Schema::create('categorie_sous_categories', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('categorie_id')->unsigned();
			$table->integer('sous_categorie_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('categorie_sous_categories');
	}
}