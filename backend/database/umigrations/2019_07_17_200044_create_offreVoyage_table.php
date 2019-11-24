<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOffreVoyageTable extends Migration
{

    public function up()
    {
        Schema::create('offreVoyage', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('dateDarrive');
            $table->date('dateDepart');
            $table->string('suffixe');
            $table->enum('statut', array('active', 'complète', 'annulé'));
            $table->boolean('groupe');
            $table->integer('agence_id')->nullable()->unsigned();
            $table->bigInteger('voyage_id')->unsigned();
            $table->string('num_autorisation')->nullable();
            $table->string('num_dossier')->nullable();
            $table->integer('chauffeur_id')->nullable()->unsigned();
            $table->integer('vehicule_id')->unsigned()->nullable();
            $table->float('prixAdulte');
            $table->float('prixEnfant');
            $table->float('prixBebe');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('offreVoyage');
    }
}
