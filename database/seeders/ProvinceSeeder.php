<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            [
                'name' => 'Davao del Sur',
                'description' => 'Province of Davao del Sur',
                'region_id' => 14,
                'created_by' => 1,
            ],
        ];

        foreach ($provinces as $province) {
            Province::create($province);
        }
    }
}
