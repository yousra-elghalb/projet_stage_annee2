<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{

    protected $table = 'facture';
    protected $guarded = ['id'];
    public $timestamps = true;

    public function traite()
    {
        return $this->belongsTo('App\models\Traite');
    }


}
