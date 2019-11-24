<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOffreVoyageLimitedTable extends Migration
{

    public function up()
    {
        Schema::create('offre_voyage_limited', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('offre_voyage_id')->unsigned();
            $table->integer('commercial_id')->unsigned();
            $table->integer('nbPlace');
            $table->datetime('optionalDate');
            $table->boolean('visible')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('offre_voyage_limited');
    }
}
