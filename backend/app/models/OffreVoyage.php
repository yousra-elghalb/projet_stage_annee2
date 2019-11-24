<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class OffreVoyage extends Model
{

    protected $table = 'offreVoyage';
    protected $fillable = [
        'dateDarrive',
        'dateDepart',
        'statut',
        'groupe',
        'suffixe',
        'agence_id',
        'vehicule_id',
        'chauffeur_id',
        'voyage_id',
        'prixAdulte',
        'prixEnfant',
        'prixBebe',
        'num_autorisation',
        'num_dossier',
    ];
    protected $casts = [
        'groupe' => 'boolean',
    ];
    public $timestamps = true;
    protected $appends = array('voyage', 'enAttente', 'valide', 'annule', 'accompagnateurs', 'chauffeur', 'vehicule');

    public function getAccompagnateursAttribute()
    {
        return $this->accompagneurs()->get();
    }

    public function getChauffeurAttribute()
    {
        return $this->chauffeur()->get()->first();
    }

    public function getVehiculeAttribute()
    {
        return $this->vehicule()->get()->first();
    }

    public function getVoyageAttribute()
    {
        return $this->voyage()->get()->first();
    }

    public function getEnAttenteAttribute()
    {
        if (!isset($this->pivot)) {
            if ($this->groupe)
                return $this->sGroupes()->where(['etat' => 'en attente'])->count();
            else
                return $this->pGroupes()->where(['etat' => 'en attente'])->count();
        } else {
            if ($this->groupe)
                return $this->sGroupes()->where(['etat' => 'en attente', 'commercial_id' => $this->pivot->commercial_id])->count();
            else
                return $this->pGroupes()->where(['etat' => 'en attente', 'commercial_id' => $this->pivot->commercial_id])->count();
        }
    }

    public function getValideAttribute()
    {
        if (!isset($this->pivot)) {
            if ($this->groupe)
                return $this->sGroupes()->where(['etat' => 'validé'])->count();
            else
                return $this->pGroupes()->where(['etat' => 'validé'])->count();
        } else {
            if ($this->groupe)
                return $this->sGroupes()->where(['etat' => 'validé', 'commercial_id' => $this->pivot->commercial_id])->count();
            else
                return $this->pGroupes()->where(['etat' => 'validé', 'commercial_id' => $this->pivot->commercial_id])->count();
        }
    }

    public function getAnnuleAttribute()
    {
        if (!isset($this->pivot)) {
            if ($this->groupe)
                return $this->sGroupes()->where(['etat' => 'annulé'])->count();
            else
                return $this->pGroupes()->where(['etat' => 'annulé'])->count();
        } else {
            if ($this->groupe)
                return $this->sGroupes()->where(['etat' => 'annulé', 'commercial_id' => $this->pivot->commercial_id])->count();
            else
                return $this->pGroupes()->where(['etat' => 'annulé', 'commercial_id' => $this->pivot->commercial_id])->count();
        }
    }

    public function voyage()
    {
        return $this->belongsTo('App\models\Voyage');
    }

    public function agence()
    {
        return $this->belongsTo('App\models\Agence');
    }

    public function accompagneurs()
    {
        return $this->belongsToMany('App\models\Accompagneur', 'accompagneur_offreVoyage');
    }

    public function pGroupes()
    {
        return $this->hasMany('App\models\PGroupe');
    }

    public function sGroupes()
    {
        return $this->hasOne('App\models\SGroupe');
    }

    public function commerciaux()
    {
        return $this->belongsToMany('App\models\Commercial', 'offre_voyage_limited')->withPivot('nbPlace', 'optionalDate');
    }

    public function depenses()
    {
        return $this->belongsToMany('App\models\Depense', 'depenses_offre_voyage')->withPivot('prix');
    }

    public function chauffeur()
    {
        return $this->belongsTo('App\models\Chauffeur');
    }

    public function vehicule()
    {
        return $this->belongsTo('App\models\Vehicule');
    }

    public function hotels()
    {
        return $this->belongsToMany('App\models\Hotel', 'reservation_hotel')->withPivot('montant', 'payer');
    }
}
