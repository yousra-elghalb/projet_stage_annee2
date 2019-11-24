<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVoyageurSGroupeTable extends Migration
{

    public function up()
    {
        Schema::create('voyageur_sGroupe', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->bigInteger('voyageur_id')->unsigned();
            $table->bigInteger('s_groupe_id')->unsigned();
            $table->string('srcVisa')->nullable();
            $table->string('ville_depart')->nullable();
        });
    }

    public function down()
    {
        Schema::drop('voyageur_sGroupe');
    }
}
