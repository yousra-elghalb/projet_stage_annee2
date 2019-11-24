<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model 
{

    protected $table = 'permission';
    public $timestamps = true;

    public function roles()
    {
        return $this->belongsToMany('App\models\Role', 'role_permission');
    }

}