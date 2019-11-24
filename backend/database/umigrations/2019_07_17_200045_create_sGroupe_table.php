<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSGroupeTable extends Migration
{

    public function up()
    {
        Schema::create('sGroupe', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('groupe_convention_id')->unsigned();
            $table->enum('etat', array('validé', 'en attente', 'annulé', 'reporté'));
            $table->bigInteger('offre_voyage_id')->unsigned();
            $table->float('reduction')->unsigned();
            $table->timestamps();
            $table->integer('commercial_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::drop('sGroupe');
    }
}
