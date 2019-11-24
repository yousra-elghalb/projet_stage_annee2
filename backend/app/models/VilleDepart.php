<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class VilleDepart extends Model
{

    protected $table = 'villeDepart';
//    protected $fillable = ['nom', 'pays_id'];
    protected $guarded = ['id'];

    public $timestamps = true;

    protected $appends = array('pays');

    public function getPaysAttribute()
    {
        return $this->pays()->get()->first();
    }


    public function pays()
    {
        return $this->belongsTo('App\models\Pays');
    }

    public function voyages()
    {
        return $this->belongsToMany('App\models\Voyage', 'ville_depart_voyage');
    }

}
