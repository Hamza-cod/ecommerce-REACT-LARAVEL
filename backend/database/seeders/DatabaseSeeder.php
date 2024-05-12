<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Order::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'hamza',
        //     'email' => 'hamza@gmail.com',
        //     'password' => '123',
        // ]);

    }
}
