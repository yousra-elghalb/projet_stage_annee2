<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTraiteTable extends Migration {

	public function up()
	{
		Schema::create('traite', function(Blueprint $table) {
			$table->bigIncrements('id');
			$table->float('montant');
			$table->datetime('date');
			$table->string('pieceJointe', 200);
			$table->bigInteger('paiement_id')->unsigned();
			$table->integer('modaliteDePaiement_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('traite');
	}
}