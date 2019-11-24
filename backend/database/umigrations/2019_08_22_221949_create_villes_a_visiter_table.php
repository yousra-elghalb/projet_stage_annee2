<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVillesAVisiterTable extends Migration {

	public function up()
	{
		Schema::create('villes_a_visiter', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->bigInteger('voyage_id')->unsigned();
			$table->integer('ville_depart_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('villes_a_visiter');
	}
}
