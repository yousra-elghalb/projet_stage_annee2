<?php

namespace App\Http\Controllers\APIControllers;

use App\models\SousCategorie;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SousCategorieController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(SousCategorie::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $Nom = (isset($request->nom)) ? $request->nom : '';
        $Result = SousCategorie::where('nom', 'like', $Nom . '%');
        return response()->json($Result->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $SousCategorie = SousCategorie::findOrFail($input['id']);
            $SousCategorie->nom = $input['nom'];
            DB::transaction(function () use ($SousCategorie, $request) {
                $SousCategorie->saveOrFail();
                $SousCategorie->categories()->sync($request->categoriesIds);
            });
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json($SousCategorie);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();
            $SousCategorie = new SousCategorie($attributes);
            DB::transaction(function () use ($SousCategorie, $request) {
                $SousCategorie->saveOrFail();
                $SousCategorie->categories()->sync($request->categorieId);
            });
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json($SousCategorie);
    }

    public function delete($id)
    {
        try {
            SousCategorie::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
