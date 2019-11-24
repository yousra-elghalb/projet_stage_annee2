<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Depense extends Model
{

    protected $table = 'depense';
    protected $guarded = ['id'];

    public $timestamps = false;

}
