<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class SGroupe extends Model
{

    protected $table = 'sGroupe';
    public $timestamps = true;
    protected $appends = array('voyageurs', 'options', 'groupeConvention');


    public function getGroupeConventionAttribute()
    {
        return $this->groupeConvention()->get()->first();
    }

    public function getOptionsAttribute()
    {
//        return [['id' => "1", 'nom' => "ville", "pivot" => ["prix" => "1"]]];
        return $this->options()->get();
    }


    public function getVoyageursAttribute()
    {
        return $this->voyageurs()->get();
    }

    public function offreVoyage()
    {
        return $this->belongsTo('App\models\OffreVoyage');
    }

    public function voyageurs()
    {
        return $this->belongsToMany('App\models\Voyageur', 'voyageur_sGroupe')->withPivot('ville_depart');
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
        return $this->belongsToMany('App\models\Option', 'option_sgroupe')->withPivot('prix');
    }

    public function groupeConvention()
    {
        return $this->belongsTo('App\models\GroupeConvention');
    }

}
