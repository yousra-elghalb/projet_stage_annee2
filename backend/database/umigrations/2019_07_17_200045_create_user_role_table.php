<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserRoleTable extends Migration {

	public function up()
	{
		Schema::create('user_role', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('user_id')->unsigned();
			$table->integer('role_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('user_role');
	}
}