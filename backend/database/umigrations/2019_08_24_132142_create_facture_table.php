<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFactureTable extends Migration
{

    public function up()
    {
        Schema::create('facture', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('num', 30)->unique()->nullable();
            $table->string('nom_groupe')->nullable();
            $table->string('nom_voyageur')->nullable();
            $table->string('cin')->nullable();
            $table->string('ice')->nullable();
            $table->string('ref')->nullable();
            $table->text('desi')->nullable();
            $table->float('ttc')->nullable();
            $table->bigInteger('traite_id')->unsigned()->nullable();
        });
    }

    public function down()
    {
        Schema::drop('facture');
    }
}
