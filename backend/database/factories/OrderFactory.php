<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=> fake()->name(),
            'phone'=> fake()->phoneNumber(),
            'email'=>fake()->email(),
            'address'=>fake()->address(),
            'product_id'=> 3,
            'total'=> fake()->numberBetween(0,999),
            'quantity'=>1,
        ];
    }
}
