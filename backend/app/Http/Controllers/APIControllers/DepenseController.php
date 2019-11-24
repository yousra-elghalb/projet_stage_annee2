<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Depense;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DepenseController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Depense::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(Depense::where('nom', 'like', $Nom . '%')->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Depense = Depense::findOrFail($input['id']);
            $Depense->nom = $input['nom'];
            $Depense->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($Depense);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $Depense = new Depense($attributes);
            $Depense->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        } catch (\Throwable $e) {
        }
        return response()->json($Depense);
    }

    public function delete($id)
    {
        try {
            Depense::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
