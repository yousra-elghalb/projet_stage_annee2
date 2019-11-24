<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class PGroupe extends Model
{

    protected $table = 'pGroupe';
    public $timestamps = true;
    protected $appends = array('voyageurs', 'ville', 'options');

    public function getVoyageursAttribute()
    {
        return $this->voyageurs()->get();
    }

    public function getOptionsAttribute()
    {
        return $this->options()->get();
    }


    public function getVilleAttribute()
    {
        return $this->ville()->first();
    }

    public function offreVoyage()
    {
        return $this->belongsTo('App\models\OffreVoyage');
    }

    public function voyageurs()
    {
        return $this->belongsToMany('App\models\Voyageur', 'voyageur_pGroupe');
    }

    public function commercial()
    {
        return $this->belongsTo('App\models\Commercial');
    }

    public function paiement()
    {
        return $this->hasOne('App\models\Paiement');
    }

    public function options()
    {
        return $this->belongsToMany('App\models\Option', 'option_pgroupe')->withPivot('prix');
    }

    public function ville()
    {
        return $this->belongsTo('App\models\VilleDepart');
    }


}
