<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAgenceTable extends Migration
{

    public function up()
    {
        Schema::create('agence', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom', 100)->unique();
            $table->string('logo', 200)->nullable();
            $table->string('fax', 30)->nullable();
            $table->string('adresse', 100)->nullable();
            $table->string('email', 50)->nullable();
            $table->string('tel', 30)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('agence');
    }
}
