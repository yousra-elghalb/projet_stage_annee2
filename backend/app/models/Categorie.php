<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{

    protected $table = 'categorie';
    protected $fillable = ['nom'];
    public $timestamps = true;
//
    protected $appends = array('sousCategories');


    public function voyages()
    {
        return $this->hasMany('App\models\Voyage');
    }

    public function sousCategories()
    {
        return $this->belongsToMany('App\models\SousCategorie', 'categorie_sous_categories');
    }


    public function getSousCategoriesAttribute()
    {
        return $this->sousCategories()->get();
    }

}
