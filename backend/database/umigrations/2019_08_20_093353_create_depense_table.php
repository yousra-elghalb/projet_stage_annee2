<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDepenseTable extends Migration {

	public function up()
	{
		Schema::create('depense', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('nom');
		});
	}

	public function down()
	{
		Schema::drop('depense');
	}
}