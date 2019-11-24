<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVoyageurTable extends Migration
{

    public function up()
    {
        Schema::create('voyageur', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom', 20);
            $table->string('prenom', 20);
            $table->enum('sexe', array('homme', 'femme'));
            $table->string('tel', 20);
            $table->enum('stadeVie', array('adulte', 'enfant', 'bébé'));
            $table->string('email', 50)->nullable();;
            $table->string('cin', 20);
            $table->boolean('fidele')->default(false);
            $table->boolean('black')->default(false);
            $table->integer('nb_voyage')->default(0);
            $table->string('numPasseport', 40)->nullable();;
//			$table->string('srcVisa', 100)->nullable();
            $table->date('dateExpiration')->nullable();;
            $table->bigInteger('groupe_convention_id')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('voyageur');
    }
}
