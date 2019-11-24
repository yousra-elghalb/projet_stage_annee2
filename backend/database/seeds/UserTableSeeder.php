<?php

use App\models\Role;
use App\models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('user')->delete();


        $role_admin = Role::where('nom', 'admin')->first();
        // defaultUser
        $defaultUser = new User();
        $defaultUser->email = 'admin';
        $defaultUser->password = '0000';
        $defaultUser->save();
        $defaultUser->commercial()->create(['nom' => 'admin', 'prenom' => 'admin']);
        $defaultUser->roles()->attach($role_admin->id);

    }
}
