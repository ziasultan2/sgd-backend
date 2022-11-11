<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    protected $fillable =[
        'title_lt',
        'address_lt',
        'title_ru',
        'address_ru',
        'title_en',
        'address_en',
        'lat',
        'lng',
        'image'
    ];
}
