<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration
{

    public function up()
    {

        Schema::table('voyageur', function (Blueprint $table) {
            $table->foreign('groupe_convention_id')->references('id')->on('groupe_convention')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('sGroupe', function (Blueprint $table) {
            $table->foreign('groupe_convention_id')->references('id')->on('groupe_convention')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
    }

    public function down()
    {
    }
}
