<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateModaliteDePaiementTable extends Migration {

	public function up()
	{
		Schema::create('modaliteDePaiement', function(Blueprint $table) {
			$table->increments('id');
			$table->string('nom', 40)->unique();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('modaliteDePaiement');
	}
}