<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class ModaliteDePaiement extends Model
{

    protected $table = 'modaliteDePaiement';
    protected $fillable = ['nom'];
    public $timestamps = true;

    public function traites()
    {
        return $this->hasMany('App\models\Traite');
    }
}
