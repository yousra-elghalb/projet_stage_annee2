<?php

namespace App\Http\Controllers\APIControllers;

use App\models\MarqueVehicule;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MarqueVehiculeController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(MarqueVehicule::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(MarqueVehicule::where('nom', 'like', $Nom . '%')->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $MarqueVehicule = MarqueVehicule::findOrFail($input['id']);
            $MarqueVehicule->nom = $input['nom'];
            $MarqueVehicule->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($MarqueVehicule);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $MarqueVehicule = new MarqueVehicule($attributes);
            $MarqueVehicule->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        } catch (\Throwable $e) {
        }
        return response()->json($MarqueVehicule);
    }

    public function delete($id)
    {
        try {
            MarqueVehicule::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
