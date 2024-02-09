<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            ['nom' => 'DECORATION'],
            ['nom' => 'COSTUMES'],
            ['nom' => 'REGIES'],
            ['nom' => 'MATERIEL'],
        ]);
    }
}
