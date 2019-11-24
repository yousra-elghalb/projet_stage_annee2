<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePermissionTable extends Migration {

	public function up()
	{
		Schema::create('permission', function(Blueprint $table) {
			$table->increments('id');
			$table->string('nomModule', 50)->unique();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('permission');
	}
}