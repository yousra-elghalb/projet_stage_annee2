<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Chauffeur extends Model
{

    protected $table = 'chauffeur';
//    protected $guarded = ['id'];
    protected $guarded = ['id'];
    public $timestamps = false;

}
