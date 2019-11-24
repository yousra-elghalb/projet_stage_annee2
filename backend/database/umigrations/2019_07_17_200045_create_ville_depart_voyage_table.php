<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVilleDepartVoyageTable extends Migration
{

    public function up()
    {
        Schema::create('ville_depart_voyage', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('ville_depart_id')->unsigned();
            $table->bigInteger('voyage_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::drop('ville_depart_voyage');
    }
}
