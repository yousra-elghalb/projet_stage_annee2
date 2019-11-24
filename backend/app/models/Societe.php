<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Societe extends Model
{

    protected $table = 'societe';
    protected $guarded = ['id'];

    public $timestamps = true;

}
