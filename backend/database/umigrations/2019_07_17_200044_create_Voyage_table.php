<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVoyageTable extends Migration
{

    public function up()
    {
        Schema::create('Voyage', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom', 500);
            $table->string('lien', 300)->nullable();
            $table->float('prixAdulte');
            $table->float('prixEnfant');
            $table->float('prixBebe');
            $table->integer('minPlace');
            $table->integer('maxPlace');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->integer('categorie_id')->unsigned()->nullable();
            $table->integer('sous_categorie_id')->unsigned()->nullable();
        });
    }

    public function down()
    {
        Schema::drop('Voyage');
    }
}
