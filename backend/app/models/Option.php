<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model 
{

    protected $table = 'option';
    protected $guarded = ['id'];

    public $timestamps = true;

    public function pgroupes()
    {
        return $this->belongsToMany('App\models\PGroupe', 'option_pgroupe');
    }

    public function sgroupes()
    {
        return $this->belongsToMany('App\models\SGroupe', 'option_sgroupe');
    }

}
