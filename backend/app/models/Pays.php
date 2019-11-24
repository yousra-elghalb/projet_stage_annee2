<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{

    protected $table = 'pays';
    protected $guarded = ['id'];
    public $timestamps = true;

    public function villeDeparts()
    {
        return $this->hasMany('App\models\VilleDepart');
    }

}
