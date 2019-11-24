<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Accompagneur extends Model
{

    protected $table = 'accompagneur';
//    protected $guarded = ['id'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public function offreVoyages()
    {
        return $this->belongsToMany('App\models\OffreVoyage', 'accompagneur_offreVoyage');
    }

}
