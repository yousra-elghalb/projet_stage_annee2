<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVoyageurPGroupeTable extends Migration
{

    public function up()
    {
        Schema::create('voyageur_pGroupe', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->bigInteger('voyageur_id')->unsigned();
            $table->bigInteger('p_groupe_id')->unsigned();
            $table->string('srcVisa')->nullable();
        });
    }

    public function down()
    {
        Schema::drop('voyageur_pGroupe');
    }
}
