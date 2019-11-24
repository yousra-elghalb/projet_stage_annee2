<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{

    protected $table = 'paiement';
    protected $fillable = [
        'totale',
        'reste'];
    public $timestamps = true;

    public function traites()
    {
        return $this->hasMany('App\models\Traite');
    }

    public function sGroupe()
    {
        return $this->belongsTo('App\models\SGroupe');
    }

    public function pGroupe()
    {
        return $this->belongsTo('App\models\PGroupe');
    }

}
