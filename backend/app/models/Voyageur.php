<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Voyageur extends Model
{
    protected $table = 'voyageur';
    protected $guarded = ['id'];
    public $timestamps = true;
    protected $casts = [
        'black' => 'boolean',
    ];
    protected $appends = array('groupeConvention');


    public function getGroupeConventionAttribute()
    {
        return $this->groupeConvention()->get()->first();
    }

    public function pGroupes()
    {
        return $this->belongsToMany('App\models\PGroupe', 'voyageur_pGroupe');
    }

    public function sGroupes()
    {
        return $this->belongsToMany('App\models\SGroupe', 'voyageur_sGroupe');
    }

    public function groupeConvention()
    {
        return $this->belongsTo('App\models\GroupeConvention', 'groupe_convention_id');
    }
}
