<?php

use Illuminate\Database\Seeder;
use App\models\Role;
use Illuminate\Support\Facades\DB;

class RoleTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('role')->delete();

        // admin
        Role::create(array('nom' => 'admin'));

    }
}
