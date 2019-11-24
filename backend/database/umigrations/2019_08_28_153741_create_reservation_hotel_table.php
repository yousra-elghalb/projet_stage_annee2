<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReservationHotelTable extends Migration {

	public function up()
	{
		Schema::create('reservation_hotel', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('hotel_id')->unsigned();
			$table->bigInteger('offre_voyage_id')->unsigned();
			$table->string('montant');
			$table->boolean('payer')->default(false);
		});
	}

	public function down()
	{
		Schema::drop('reservation_hotel');
	}
}