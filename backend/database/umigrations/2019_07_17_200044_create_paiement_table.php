<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaiementTable extends Migration {

	public function up()
	{
		Schema::create('paiement', function(Blueprint $table) {
			$table->bigIncrements('id');
			$table->float('reste');
			$table->float('totale');
            $table->bigInteger('s_groupe_id')->unsigned()->nullable();
            $table->bigInteger('p_groupe_id')->unsigned()->nullable();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('paiement');
	}
}
