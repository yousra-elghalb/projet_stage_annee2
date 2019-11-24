<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVilleDepartTable extends Migration {

	public function up()
	{
		Schema::create('villeDepart', function(Blueprint $table) {
			$table->increments('id');
			$table->string('nom');
			$table->timestamps();
			$table->integer('pays_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('villeDepart');
	}
}