<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Agence;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{

    public function downloadPieceJoint(Request $request)
    {
        return response()->download($request->src);

        $filename = 'temp-image.jpg';
        $tempImage = tempnam(sys_get_temp_dir(), $filename);
        copy('https://my-cdn.com/files/image.jpg', $tempImage);

        return response()->download($tempImage, $filename);
    }

}
