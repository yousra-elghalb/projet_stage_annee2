<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOptionTable extends Migration {

	public function up()
	{
		Schema::create('option', function(Blueprint $table) {
			$table->increments('id');
			$table->string('nom');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('option');
	}
}