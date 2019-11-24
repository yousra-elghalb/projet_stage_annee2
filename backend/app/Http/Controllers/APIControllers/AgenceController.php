<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Agence;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class AgenceController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Agence::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(Agence::where('nom', 'like', $Nom . '%')
            ->orWhere('fax', 'like', $Nom . '%')
            ->orWhere('adresse', 'like', $Nom . '%')
            ->orWhere('email', 'like', $Nom . '%')
            ->orWhere('tel', 'like', $Nom . '%')
            ->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Agence = Agence::findOrFail($input['id']);
            $Agence->nom = $input['nom'];
            $Agence->fax = $input['fax'];
            $Agence->adresse = $input['adresse'];
            $Agence->email = $input['email'];
            $Agence->tel = $input['tel'];

            if ($Agence->logo != $input['logo']) {
                $base64_image = $request->logo;
                @list($type, $file_data) = explode(';', $base64_image);
                @list(, $type) = explode('/', $type);
                @list(, $file_data) = explode(',', $file_data);
                $data = base64_decode($file_data);
                $name = 'LOGO-' . auth()->id() . '-' . time() . '.' . $type;
                Storage::disk('logos')->put($name, $data);
                $nameToDelete = explode('/', $Agence->logo);
                $nameToDelete = end($nameToDelete);
                Storage::disk('logos')->delete($nameToDelete);
                $Agence->logo = $name;
            }
            $Agence->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($Agence);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();

            $base64_image = $request->logo;
            @list($type, $file_data) = explode(';', $base64_image);
            @list(, $type) = explode('/', $type);
            @list(, $file_data) = explode(',', $file_data);
            $data = base64_decode($file_data);
            $name = 'LOGO-' . auth()->id() . '-' . time() . '.' . $type;
            Storage::disk('logos')->put($name, $data);

            $Agence = new Agence($attributes);
            $Agence->logo = $name;
            $Agence->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($Agence);
    }

    public function delete($id)
    {
        try {
            $Agence = Agence::findOrFail($id);
//            @list(, $nameToDelete) = explode('/', $Agence->logo);
//            Storage::disk('logos')->delete($nameToDelete);
            $Agence->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
