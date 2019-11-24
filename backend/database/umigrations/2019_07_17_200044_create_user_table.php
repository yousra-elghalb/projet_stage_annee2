<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserTable extends Migration {

	public function up()
	{
		Schema::create('user', function(Blueprint $table) {
			$table->increments('id');
			$table->string('email', 50)->unique();
			$table->string('password', 200);
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('user');
	}
}