<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class ReservationHotel extends Model
{

    protected $table = 'reservation_hotel';
    protected $casts = [
        'payer' => 'boolean',
    ];
    public $timestamps = true;

    public function hotel()
    {
        return $this->belongsTo('App\models\Hotel');
    }

    public function offreVoyage()
    {
        return $this->belongsTo('App\models\OffreVoyage');
    }

}
