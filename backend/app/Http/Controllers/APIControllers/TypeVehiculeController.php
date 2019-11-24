<?php

namespace App\Http\Controllers\APIControllers;

use App\models\TypeVehicule;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TypeVehiculeController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(TypeVehicule::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(TypeVehicule::where('nom', 'like', $Nom . '%')->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $TypeVehicule = TypeVehicule::findOrFail($input['id']);
            $TypeVehicule->nom = $input['nom'];
            $TypeVehicule->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($TypeVehicule);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $TypeVehicule = new TypeVehicule($attributes);
            $TypeVehicule->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        } catch (\Throwable $e) {
        }
        return response()->json($TypeVehicule);
    }

    public function delete($id)
    {
        try {
            TypeVehicule::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
