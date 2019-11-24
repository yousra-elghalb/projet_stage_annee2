<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommercialTable extends Migration
{

    public function up()
    {
        Schema::create('commercial', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('nom', 20)->nullable();
            $table->string('prenom', 20)->nullable();
            $table->string('tel', 20)->nullable();
            $table->string('cin', 20)->nullable();
            $table->string('srcImg', 200)->nullable();
            $table->string('email', 50)->nullable();
            $table->boolean('limitedAccess')->default(false);
            $table->integer('user_id')->unsigned();
            $table->integer('agence_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::drop('commercial');
    }
}
