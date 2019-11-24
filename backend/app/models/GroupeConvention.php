<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class GroupeConvention extends Model
{

    protected $table = 'groupe_convention';
    public $timestamps = true;
    protected $guarded = array('id');

    public function sGroupes()
    {
        return $this->hasMany('App\models\SGroupe');
    }

    public function voyageurs()
    {
        return $this->hasMany('App\models\Voyageur');
    }

}
