<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Traite extends Model
{

    protected $table = 'traite';
    protected $fillable = ['id', 'montant', 'date', 'pieceJointe', 'modaliteDePaiement_id'];
    public $timestamps = true;
    protected $appends = array('modalite', 'pieceJointe', 'facture');

    public function getPieceJointeAttribute()
    {
        if (isset($this->attributes['pieceJointe']) && !empty($this->attributes['pieceJointe']))
            return asset('storage/pieceJoinPaiments/' . $this->attributes['pieceJointe']);
        else
            return '';
    }

    public function getFactureAttribute()
    {
        return $this->facture()->get()->first();
    }

    public function getModaliteAttribute()
    {
        return $this->modaliteDePaiement()->get()->first();
//        return ModaliteDePaiement::findOrFail($this->modaliteDePaiement_id);
    }

    public function modaliteDePaiement()
    {
        return $this->belongsTo('App\models\ModaliteDePaiement', "modaliteDePaiement_id");
    }

    public function paiement()
    {
        return $this->belongsTo('App\models\Paiement');
    }

    public function facture()
    {
        return $this->hasOne('App\models\Facture');
    }
}
