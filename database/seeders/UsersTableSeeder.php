<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('root')
        ]);

        $permissions = Permission::all();
        $role = Role::where('name', 'admin')->first();

        Log::info($role);

        $role->syncPermissions($permissions);
        $user->assignRole($role);

        Log::info('Done assign role to admin.');
    }
}
