<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        db::table('users')->truncate();
        db::table('comments')->truncate();
        db::table('feedback')->truncate();

         User::factory(50)->create();
         Feedback::factory(50)->create();
         Comment::factory(50)->create();
    }
}
