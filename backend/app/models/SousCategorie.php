<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class SousCategorie extends Model
{

    protected $table = 'sous_categorie';
    protected $fillable = ['nom'];
    public $timestamps = true;

    public function categories()
    {
        return $this->belongsToMany('App\models\Categorie', 'categorie_sous_categories');
    }

    public function voyages()
    {
        return $this->hasMany('App\models\Voyage');
    }


}
