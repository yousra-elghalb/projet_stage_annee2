<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOptionPgroupeTable extends Migration {

	public function up()
	{
		Schema::create('option_pgroupe', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('option_id')->unsigned();
			$table->bigInteger('p_groupe_id')->unsigned();
			$table->float('prix');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('option_pgroupe');
	}
}
