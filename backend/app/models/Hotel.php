<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{

    protected $table = 'hotel';
    public $timestamps = true;
    protected $guarded = ['id'];

    public function offrevoyages()
    {
        return $this->belongsToMany('App\models\OffreVoyage', 'reservation_hotel');
    }

}
