<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Societe;
use App\models\Vehicule;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VehiculeController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Vehicule::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $search = (isset($request->search)) ? $request->search : '';
        return response()->json(Vehicule::where(function ($query) use ($search) {
            $query->where('immatriculation', 'like', $search . '%');
            if (is_numeric($search))
                $query->orWhere('place', $search);
        })->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Vehicule = Vehicule::findOrFail($input['id']);
            $Vehicule->nom = $input['nom'];
            $Vehicule->immatriculation = $input['immatriculation'];
            $Vehicule->place = $input['place'];
            $Vehicule->date_ex_assurance = date('y-m-d', strtotime($input['date_ex_assurance']));

            $Vehicule->type_vehicule_id = $input['type_vehicule_id'];
            $Vehicule->marque_vehicule_id = $input['marque_vehicule_id'];
            $Vehicule->societe_id = $input['societe_id'];
            $Vehicule->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($Vehicule);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $Vehicule = new Vehicule($attributes);
            $Vehicule->date_ex_assurance = date('y-m-d', strtotime($attributes['date_ex_assurance']));
            $Vehicule->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        } catch (\Throwable $e) {
        }
        return response()->json($Vehicule);
    }

    public function delete($id)
    {
        try {
            Vehicule::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
