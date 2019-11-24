<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Agence extends Model
{

    protected $table = 'agence';
    protected $fillable = [
        'nom',
        'logo',
        'fax',
        'adresse',
        'email',
        'tel',
    ];
    public $timestamps = true;
    protected $appends = array('logo');

    public function getLogoAttribute()
    {
        return asset('storage/logos/' . $this->attributes['logo']);
    }

    public function voyages()
    {
        return $this->hasMany('App\models\Voyage');
    }

}
