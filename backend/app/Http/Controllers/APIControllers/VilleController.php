<?php

namespace App\Http\Controllers\APIControllers;

use App\models\VilleDepart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VilleController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(VilleDepart::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $search = (isset($request->search)) ? $request->search : '';
        return response()->json(VilleDepart::where('nom', 'like', $search . '%')->orWhereHas('pays', function ($query) use ($search) {
            $query->where('nom', 'like', $search . '%');
        })->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $VilleDepart = VilleDepart::findOrFail($input['id']);
            $VilleDepart->nom = $input['nom'];
            $VilleDepart->pays_id = $input['pays_id'];
            $VilleDepart->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json($VilleDepart);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $VilleDepart = new VilleDepart($attributes);
            $VilleDepart->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
        return response()->json($VilleDepart);
    }

    public function delete($id)
    {
        try {
            VilleDepart::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
