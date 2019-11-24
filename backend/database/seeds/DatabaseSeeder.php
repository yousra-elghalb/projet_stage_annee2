<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{

    public function run()
    {
        Model::unguard();

        $this->call(PaysTableSeeder::class);
        $this->command->info('PaysTableSeeder table seeded!');

        $this->call(RoleTableSeeder::class);
        $this->command->info('Role table seeded!');

        $this->call(UserTableSeeder::class);
        $this->command->info('User table seeded!');

        $this->call(ModaliteDePaiementTableSeeder::class);
        $this->command->info('ModaliteDePaiementTableSeeder table seeded!');

        $this->call(PermissionTableSeeder::class);
        $this->command->info('PermissionTableSeeder table seeded!');

    }
}
