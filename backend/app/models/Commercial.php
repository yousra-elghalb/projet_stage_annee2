<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Commercial extends Model
{

    protected $table = 'commercial';
//    protected $guarded = ['id'];
    protected $casts = [
        'limitedAccess' => 'boolean',
    ];
    protected $fillable = [
        'nom',
        'prenom',
        'tel',
        'cin',
        'email',
        'limitedAccess',
        'agence_id',
    ];
    public $timestamps = true;
    protected $appends = array('srcImg');

    public function getSrcImgAttribute()
    {
        if (isset($this->attributes['srcImg']) && !empty($this->attributes['srcImg']))
            return asset('storage/profileImgs/' . $this->attributes['srcImg']);
        else
            return '';
    }

    public function user()
    {
        return $this->belongsTo('App\models\User');
    }


    public function pGroupes()
    {
        return $this->hasMany('App\models\PGroupe');
    }

    public function sGroupes()
    {
        return $this->hasMany('App\models\SGroupe');
    }

    // les offres de voyages d'un commercial externe
    public function offrevoyages()
    {
        return $this->belongsToMany('App\models\OffreVoyage', 'offre_voyage_limited')->withPivot('nbPlace', 'optionalDate');
    }

    public function agence()
    {
        return $this->belongsTo('App\models\Agence');
    }
}
