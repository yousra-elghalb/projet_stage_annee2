<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateHotelTable extends Migration
{

    public function up()
    {
        Schema::create('hotel', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('nom');
            $table->integer('cat');
            $table->enum('formule', array('bb', 'dp', 'pc'));
            $table->string('rib')->nullable();
            $table->string('responsable');
        });
    }

    public function down()
    {
        Schema::drop('hotel');
    }
}
