<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Categorie;
use App\models\Commercial;
use App\models\OffreVoyage;
use App\models\OffreVoyageLimited;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class OffreVoyageLimitedController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(OffreVoyageLimited::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }


    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(OffreVoyageLimited::where('nom', 'like', $Nom . '%')
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
            $OffreVoyageLimited = OffreVoyageLimited::findOrFail($input['id']);
            $OffreVoyageLimited->commercial_id = $input['commercial_id'];
            $OffreVoyageLimited->nbPlace = $input['nbPlace'];
            $OffreVoyageLimited->optionalDate = date('y-m-d', strtotime($input['optionalDate']));
            $OffreVoyageLimited->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($OffreVoyageLimited);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();
            $OffreVoyageLimiteds = $attributes['data'];
            foreach ($OffreVoyageLimiteds as $item) {
                $OffreVoyageLimited = new OffreVoyageLimited($item);
                $OffreVoyageLimited->optionalDate = date('y-m-d', strtotime($item['optionalDate']));
                $OffreVoyageLimited->saveOrFail();
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json([]);
    }

    public function delete($id)
    {
        try {
            OffreVoyageLimited::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
