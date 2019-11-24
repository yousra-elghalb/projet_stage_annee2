<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePGroupeTable extends Migration
{

    public function up()
    {
        Schema::create('pGroupe', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->enum('etat', array('validé', 'en attente', 'annulé', 'reporté'));
            $table->enum('type', array('amicale', 'familiale'));
            $table->integer('ville_id');
            $table->bigInteger('offre_voyage_id')->unsigned();
            $table->float('reduction')->unsigned();
            $table->timestamps();
            $table->integer('commercial_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::drop('pGroupe');
    }
}
