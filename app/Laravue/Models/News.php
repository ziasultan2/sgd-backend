<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title_lt',
        'description_lt',
        'title_ru',
        'description_ru',
        'title_en',
        'description_en',
        'image',
    ];
}
