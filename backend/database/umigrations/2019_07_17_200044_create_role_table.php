<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRoleTable extends Migration {

	public function up()
	{
		Schema::create('role', function(Blueprint $table) {
			$table->increments('id');
			$table->string('nom', 20)->unique();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('role');
	}
}