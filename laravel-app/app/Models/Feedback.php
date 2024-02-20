<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','title','description','category'];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
    public function Comment()
    {
        return $this->belongsTo(Comment::class);
    }
}
