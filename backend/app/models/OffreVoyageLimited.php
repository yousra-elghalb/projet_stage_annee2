<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class OffreVoyageLimited extends Model
{

    protected $table = 'offre_voyage_limited';
    protected $fillable = [
        'offre_voyage_id',
        'commercial_id',
        'nbPlace',
    ];
    public $timestamps = true;

}
