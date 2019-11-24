<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Pays;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaysController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Pays::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(Pays::where('nom', 'like', $Nom . '%')->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Pays = Pays::findOrFail($input['id']);
            $Pays->nom = $input['nom'];
            $Pays->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($Pays);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $Pays = new Pays($attributes);
            $Pays->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        } catch (\Throwable $e) {
        }
        return response()->json($Pays);
    }

    public function delete($id)
    {
        try {
            Pays::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
