<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Voyage extends Model
{

    protected $table = 'Voyage';
    protected $fillable = [
        'nom',
        'lien',
        'prixAdulte',
        'prixEnfant',
        'prixBebe',
        'minPlace',
        'description',
        'maxPlace',
        'sous_categorie_id',
        'categorie_id',
    ];

    public $timestamps = true;
    protected $appends = array('categorie', 'sousCategorie', 'villes', 'villesVisiter');

    public function getCategorieAttribute()
    {
        return $this->categorie()->first();
    }

    public function getSousCategorieAttribute()
    {
        return $this->sousCategorie()->first();
    }

    public function getVillesAttribute()
    {
        return $this->villeDeparts()->get();
    }

    public function getVillesVisiterAttribute()
    {
        return $this->villesVisiter()->orderBy('villes_a_visiter.id', 'asc')->get();
    }

    public function offreVoyages()
    {
        return $this->hasMany('App\models\OffreVoyage');
    }

    public function categorie()
    {
        return $this->belongsTo('App\models\Categorie');
    }

    public function sousCategorie()
    {
        return $this->belongsTo('App\models\SousCategorie');
    }

    public function villeDeparts()
    {
        return $this->belongsToMany('App\models\VilleDepart', 'ville_depart_voyage');
    }

    public function villesVisiter()
    {
        return $this->belongsToMany('App\models\VilleDepart', 'villes_a_visiter');
    }

}
