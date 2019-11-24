<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAccompagneurTable extends Migration
{

    public function up()
    {
        Schema::create('accompagneur', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom', 20);
            $table->string('prenom', 20);
            $table->string('tel', 20);
            $table->string('email', 50)->nullable();
            $table->string('cin', 20);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('accompagneur');
    }
}
