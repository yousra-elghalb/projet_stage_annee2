<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCategorieTable extends Migration {

	public function up()
	{
		Schema::create('categorie', function(Blueprint $table) {
			$table->increments('id');
			$table->string('nom', 100);
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('categorie');
	}
}