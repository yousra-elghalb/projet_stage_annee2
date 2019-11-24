<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class MarqueVehicule extends Model
{

    protected $table = 'marque_vehicule';
    protected $guarded = ['id'];
    public $timestamps = true;

}
