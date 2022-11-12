<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ImageConverter {

    public static function convert($image) {
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = Carbon::now()->toDateTimeString() . '.png';
        \File::put(storage_path(). '/' . $imageName, base64_decode($image));
        return $imageName;
    }

}
