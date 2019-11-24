<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{

    protected $table = 'vehicule';
    protected $guarded = ['id'];
    public $timestamps = true;
    protected $appends = array('type', 'marque', 'societe');

    public function getTypeAttribute()
    {
        return $this->typeVehicule()->get()->first();
    }

    public function getMarqueAttribute()
    {
        return $this->marqueVehicule()->get()->first();
    }

    public function getSocieteAttribute()
    {
        return $this->societe()->get()->first();
    }

    public function typeVehicule()
    {
        return $this->belongsTo('App\models\TypeVehicule');
    }

    public function marqueVehicule()
    {
        return $this->belongsTo('App\models\MarqueVehicule');
    }

    public function societe()
    {
        return $this->belongsTo('App\models\Societe');
    }

}
