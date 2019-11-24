<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    protected $table = 'role';
    protected $fillable = ['nom'];
    public $timestamps = true;

    protected $appends = array('permissions');

    public function getPermissionsAttribute()
    {
//        return [['id' => "1", 'nomModule' => "ville", "pivot" => ["edit" => "1", "delete" => "1", "read" => "1"]]];
        return $this->permissions()->get();
    }


    public function users()
    {
        return $this->belongsToMany('App\models\User', 'user_role');
    }

    public function permissions()
    {
        return $this->belongsToMany('App\models\Permission', 'role_permission')->withPivot('edit', 'delete', 'read');
    }

}
