<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class TypeVehicule extends Model 
{

    protected $table = 'type_vehicule';
    protected $guarded = ['id'];

    public $timestamps = true;

}
