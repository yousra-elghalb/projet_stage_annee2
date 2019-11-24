<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOptionSgroupeTable extends Migration {

	public function up()
	{
		Schema::create('option_sgroupe', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('option_id')->unsigned();
			$table->bigInteger('s_groupe_id')->unsigned();
			$table->float('prix');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('option_sgroupe');
	}
}
