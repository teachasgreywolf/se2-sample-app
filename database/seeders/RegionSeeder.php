<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genders = [
            ['name' => 'NCR', 'description' => 'National Capital Region (Luzon, Manila)', 'created_by' => 1],
            ['name' => 'CAR', 'description' => 'Cordillera Administrative Region (Luzon, Baguio)', 'created_by' => 1],
            ['name' => 'I', 'description' => 'Region I (Ilocos Region, Luzon, San Fernando)', 'created_by' => 1],
            ['name' => 'II', 'description' => 'Region II (Cagayan Valley, Luzon, Tuguegarao)', 'created_by' => 1],
            ['name' => 'III', 'description' => 'Region III (Central Luzon, Luzon, San Fernando)', 'created_by' => 1],
            ['name' => 'IV-A', 'description' => 'Region IV-A (Calabarzon, Luzon, Calamba)', 'created_by' => 1],
            ['name' => 'Mimaropa', 'description' => 'Southwestern Tagalog Region (Luzon, Calapan)', 'created_by' => 1],
            ['name' => 'V', 'description' => 'Region V (Bicol Region, Luzon, Legaspi)', 'created_by' => 1],
            ['name' => 'VI', 'description' => 'Region VI (Western Visayas, Visayas, Iloilo City)', 'created_by' => 1],
            ['name' => 'VII', 'description' => 'Region VII (Central Visayas, Visayas, Cebu City)', 'created_by' => 1],
            ['name' => 'VIII', 'description' => 'Region VIII (Eastern Visayas, Visayas, Tacloban)', 'created_by' => 1],
            ['name' => 'IX', 'description' => 'Region IX (Zamboanga Peninsula, Mindanao, Pagadian)', 'created_by' => 1],
            ['name' => 'X', 'description' => 'Region X (Northern Mindanao, Mindanao, Cagayan de Oro)', 'created_by' => 1],
            ['name' => 'XI', 'description' => 'Region XI (Davao Region, Mindanao, Davao City)', 'created_by' => 1],
            ['name' => 'XII', 'description' => 'Region XII (Soccsksargen, Mindanao, Koronadal)', 'created_by' => 1],
            ['name' => 'XIII', 'description' => 'Region XIII (Caraga, Mindanao, Butuan)', 'created_by' => 1],
            ['name' => 'BARMM', 'description' => 'Bangsamoro (Mindanao, Cotabato City)', 'created_by' => 1],
        ];

        foreach ($genders as $gender) {
            Region::create($gender);
        }
    }
}
