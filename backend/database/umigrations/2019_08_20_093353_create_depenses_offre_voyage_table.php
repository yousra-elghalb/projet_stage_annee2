<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDepensesOffreVoyageTable extends Migration
{

    public function up()
    {
        Schema::create('depenses_offre_voyage', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->float('prix');
            $table->bigInteger('offre_voyage_id')->unsigned();
            $table->integer('depense_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::drop('depenses_offre_voyage');
    }
}
